[![Build Status](https://travis-ci.org/GovLab/www.thegovlab.org.svg?branch=master)](https://travis-ci.org/GovLab/www.thegovlab.org)

The GovLab website.

## Quick Start

### NOTE:
**  If you are updating from any commit prior to 1.0.0 (e425c0ae65ad6fe046bdf29895df1a27ec1d7875), run `npm i` before developing **

### Installation

Make sure the following are installed on your machine:

* npm
* Python 2.7
* [pip and virtualenv](http://stackoverflow.com/q/4324558)
* [SASS](http://sass-lang.com/install) (Optional, however, if `sass` isn't on your command-line,
your SASS files won't be rebuilt.)

Run the following commands:

```
npm i

virtualenv venv

# see (1)
source venv/bin/activate

pip install -r requirements.txt
```

(1) On Windows, use `source venv\Scripts\activate`

### Development

From within local repo, run:

```
source venv/bin/activate

python build.py runserver
```

Site will be served at http://localhost:7000 by default.

### Deployment

From within local repo, run:

```
python build.py deploy
```
