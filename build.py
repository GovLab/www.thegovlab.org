# -*- coding: utf-8 -*-

from os import path, getcwd, listdir, remove, chdir
from sys import argv
import subprocess
from yaml import load
from shutil import rmtree
from slugify import slugify
from datetime import date, datetime
from unidecode import unidecode
import staticjinja
import argh
from watchdog.events import FileSystemEventHandler

from govlabstatic.cli import Manager

_TODAY = date.today()

# Define constants for the deployment.
_SASSPATH = path.join(getcwd(), 'sass')
_SEARCHPATH = path.join(getcwd(), 'templates')
_OUTPUTPATH = path.join(getcwd(), 'site')
_DATAPATH = path.join(getcwd(), 'data')

# Load the data we want to use in the templates.
_EVENTS = path.join(_DATAPATH, 'events.yaml')
_PROJECTS = path.join(_DATAPATH, 'projects.yaml')
_TEAM = path.join(_DATAPATH, 'team.yaml')
_FUNDERS = path.join(_DATAPATH, 'funders.yaml')

_SLUG = lambda x: slugify(unicode(unidecode(unicode(x).lower())) if x else u'')


def filters():
    return {'slug': _SLUG}


def clean():
    '''
    Clean the output folder.
    '''

    if path.exists(_OUTPUTPATH):
        rmtree(_OUTPUTPATH)


def render_project_detail_pages(env, template, **kwargs):
    '''
    staticjinja rule for generating all individual project detail pages.
    '''

    template = env.get_template('_project.html')
    for index, project in enumerate(kwargs['projects']):
        out = 'project-%s.html' % (_SLUG(project['title']),)
        template.stream(project=project, **kwargs).\
            dump(path.join(env.outpath, out))


class ReloadingContext(FileSystemEventHandler):
    '''
    Regenerates a template context, and the static site, whenever files
    in the data directory change.
    '''

    path = _DATAPATH

    def __init__(self):
        FileSystemEventHandler.__init__(self)
        self.cache_context()

    def get(self):
        return self._cached_context

    def add_to(self, manager):
        self.site = manager.site
        manager.watcher.observer.schedule(self, self.path)

    def on_any_event(self, event):
        self.cache_context()
        self.site.render_templates(self.site.templates)

    def cache_context(self):
        self._cached_context = self.build_context()

    def build_context(self):
        dic = {}

        dic['events'] = load(open(_EVENTS))
        dic['projects'] = load(open(_PROJECTS))
        dic['team'] = load(open(_TEAM))
        dic['funders'] = load(open(_FUNDERS))
        dic['events_slider_counter'] = 0
        dic['projects_slider_counter'] = 0

        for x in dic['events']:
            x['date'] = datetime.strptime(x['date'], '%m-%d-%Y').date()
            x['has_passed'] = x['date'] < _TODAY
            x['is_featured'] = str(x.get('is_featured', '')).lower()

            if x['is_featured'] in ['1', 'true', 'yes', 'on']:
                x['is_featured'] = True

                if x['date'] >= _TODAY:
                    dic['events_slider_counter'] += 1

            else:
                x['is_featured'] = False

        for x in dic['projects']:
            x['is_featured'] = str(x.get('is_featured', '')).lower()

            if x['is_featured'] in ['1', 'true', 'yes', 'on']:
                x['is_featured'] = True
                dic['projects_slider_counter'] += 1

            else:
                x['is_featured'] = False

        dic['events'].sort(key=lambda x: x['date'])

        return dic

def deploy():
    '''
    Deploy the site to production.
    '''

    subprocess.check_call(
        'git subtree push --prefix site origin gh-pages',
        shell=True
    )

if __name__ == '__main__':
    context = ReloadingContext()

    site = staticjinja.make_site(
        filters=filters(),
        outpath=_OUTPUTPATH,
        contexts=[
            (r'.*.html', context.get),
            (r'project-detail-pages.custom', context.get),
        ],
        rules=[
            (r'project-detail-pages.custom', render_project_detail_pages)
        ],
        searchpath=_SEARCHPATH,
        staticpaths=['static']
    )

    manager = Manager(
        sass_src_path=path.join(_SASSPATH, 'styles.scss'),
        sass_dest_path=path.join(_SEARCHPATH, 'static', 'styles',
                                 'styles.css'),
        site=site,
        site_name='www.thegovlab.org',
    )
    context.add_to(manager)
    argh.add_commands(manager.parser, [deploy, clean])

    manager.run()
