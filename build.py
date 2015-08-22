# -*- coding: utf-8 -*-

from os import path, getcwd, makedirs, listdir, remove
from yaml import load
from shutil import rmtree
from slugify import slugify
from staticjinja import make_site


# We define constants for the deployment.
_SEARCHPATH = path.join(getcwd(), 'templates')
_OUTPUTPATH = path.join(getcwd(), 'site')

# We load the data we want to use in the templates.
_EVENTS = load(open('data/events.yaml'))
_PROJECTS = load(open('data/projects.yaml'))


# Create a filter for slugs.
def slug(text):
    return slugify(text.lower() if text else '')


def loadData():
    evt = []
    dic = {}

    for x in _EVENTS:
        if x.get('is_featured'):
            # x['date'] = parse_to_date(x['date'])
            #
            # if x['date'] > today:

            evt.append(x)

    # evt.sort(key=lambda x: x['date'])

    dic['events'] = _EVENTS
    dic['projects'] = _PROJECTS
    dic['featured_events'] = evt[:3]
    dic['featured_projects'] = [x for x in _PROJECTS if x.get('is_featured')]

    return dic


def cleanup():
    # Remove templates that are no longer needed.
    for filename in listdir(_SEARCHPATH):
        filepath = '%s/%s' % (_SEARCHPATH, filename)

        if filename.startswith('project-') and path.isfile(filepath):
            remove(filepath)

    # Clean the output folder.
    if path.exists(_OUTPUTPATH):
        rmtree(_OUTPUTPATH)

    makedirs(_OUTPUTPATH)


def create_custom_templates():
    template = open('%s/project.html' % _SEARCHPATH).read()

    for index, project in enumerate(_PROJECTS):
        filename = slug(project['title'])
        new_file = open('%s/project-%s.html' % (_SEARCHPATH, filename), 'w+')
        new_page = template.replace('projects[0]', 'projects[%d]' % index)

        new_file.write(new_page)
        new_file.close()


if __name__ == '__main__':
    site = make_site(
        filters={'slug': lambda x: slug(x)},
        outpath=_OUTPUTPATH,
        contexts=[(r'.*.html', loadData)],
        searchpath=_SEARCHPATH,
        staticpaths=['static', '../data']
    )

    cleanup()

    create_custom_templates()

    site.render(use_reloader=True)
