This is the new GovLab website.

## Requirements

* Python 2.7
* [pip and virtualenv](http://stackoverflow.com/q/4324558)

## Quick Start

```
virtualenv venv

# On Windows, replace the following line with 'venv\Scripts\activate'.
source venv/bin/activate

pip install -r requirements.txt
```

To build the site and continuously rebuild it as you change the source,
run `python build.py`.

The `site` directory will contain the generated website files. You can
run `python -m SimpleHTTPServer` in that directory for easy development.

## Deployment

To deploy the site, run `git subtree push --prefix site origin master`.
