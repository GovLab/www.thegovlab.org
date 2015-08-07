from os import path, getcwd, makedirs, listdir, remove
from yaml import load
from shutil import rmtree
from slugify import slugify
from staticjinja import make_site


# We define constants for the deployment.
searchpath = path.join(getcwd(), 'templates')
outputpath = path.join(getcwd(), 'site')

# We load the data we want to use in the templates.
DATA = load(open('data/data.yaml'))

# Clean the output folder.
if path.exists(outputpath):
    rmtree(outputpath)

# We create a slugyfied version of the title to be used in the article_url.
# for item in DATA:
#     item['article_url'] = 'article-' + slugify(item['title'].lower()) + '.html'


def loadData():
    return {'data': DATA}

# CREATES A MULTIPLE PAGE GENERATOR, BASED IN THE 'article.html' TEMPLATE
# template = open('%s/article.html' % searchpath).read()



# Remove publication templates that are no longer needed.
for filename in listdir(searchpath):
    filepath = '%s/%s' % (searchpath, filename)

    if filename.startswith('article-') and path.isfile(filepath):
        remove(filepath)

# Clean the output folder.
if path.exists(outputpath):
    rmtree(outputpath)

makedirs(outputpath)

# CREATES A MULTIPLE PAGE GENERATOR, BASED IN THE 'article.html' TEMPLATE
# for index, data in enumerate(DATA):
#     filename = slugify(data['title'].lower())
#     new_file = open('%s/article-%s.html' % (searchpath, filename), 'w+')
#     new_page = template.replace('data[0]', 'data[%d]' % index)

#     new_file.write(new_page)
#     new_file.close()

site = make_site(
    filters={},
    outpath=outputpath,
    contexts=[(r'.*.html', loadData)],
    searchpath=searchpath,
    staticpaths=['static', '../data']
)

site.render(use_reloader=True)
