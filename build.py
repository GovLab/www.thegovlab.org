from os import path, getcwd, makedirs, listdir, remove
from yaml import load
from shutil import rmtree
from slugify import slugify
from staticjinja import make_site


# We define constants for the deployment.
searchpath = path.join(getcwd(), 'templates')
outputpath = path.join(getcwd(), 'site')

# We load the data we want to use in the templates.
PROJECTS = load(open('data/projects.yaml'))
EVENTS = load(open('data/events.yaml'))

# Clean the output folder.
if path.exists(outputpath):
    rmtree(outputpath)

# We create a slugyfied version of the title to be used in the article_url.
# for item in DATA:
#     item['article_url'] = 'article-' + slugify(item['title'].lower()) + '.html'

def loadData():
    return {
        'projects': PROJECTS,
        'events': EVENTS
    }

# Create a filter for slugs
def slug(text):
    try:
        text = text.lower()
        return slugify(text)
    except (AttributeError, TypeError):
        return text



# CREATES A MULTIPLE PAGE GENERATOR, BASED IN THE 'article.html' TEMPLATE
template = open('%s/project.html' % searchpath).read()

# Remove publication templates that are no longer needed.
for filename in listdir(searchpath):
    filepath = '%s/%s' % (searchpath, filename)

    if filename.startswith('project-') and path.isfile(filepath):
        remove(filepath)

# Clean the output folder.
if path.exists(outputpath):
    rmtree(outputpath)

makedirs(outputpath)



# CREATES A MULTIPLE PAGE GENERATOR, BASED IN THE 'project.html' TEMPLATE
for index, project in enumerate(PROJECTS):
    filename = slugify(project['title'].lower())
    new_file = open('%s/project-%s.html' % (searchpath, filename), 'w+')
    new_page = template.replace('projects[0]', 'projects[%d]' % index)

    new_file.write(new_page)
    new_file.close()

site = make_site(
    filters = { 'slug': lambda x: slug(x) },
    outpath = outputpath,
    contexts = [(r'.*.html', loadData)],
    searchpath = searchpath,
    staticpaths = ['static', '../data']
)

site.render(use_reloader=True)
























