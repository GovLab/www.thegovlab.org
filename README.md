This is the new GovLab website.

## Requirements

* Python 2.7
* [pip and virtualenv](http://stackoverflow.com/q/4324558)
* [SASS](http://sass-lang.com/install)

## Quick Start

```
virtualenv venv

# On Windows, replace the following line with 'venv\Scripts\activate'.
source venv/bin/activate

pip install -r requirements.txt
```

To develop the site, run `python build.py` and visit
http://localhost:7000/. All static assets will be rebuilt as
you change them.

The `site` directory will contain the generated website files.

## Deployment

To deploy the site, run `git subtree push --prefix site origin master`.
