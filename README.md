# WTSHTF - When The Shit Hits The Fan

repository for https://wtshtf.herokuapp.com, a webapp for gamma radiation alerts

## technologies used
- node.js, hosted by [heroku](http://heroku.com)
- mongodb, hosted by [mLab](https://mlab.com/)
- [sparkpost](http://sparkpost.com) for mailing
- [animate on scroll](https://michalsnik.github.io/aos/) for css animations

## running instructions
- clone this repo
- install [node](https://nodejs.org)
- install [nodemon](http://nodemon.io) using `npm install -g nodemon`
- run `npm install`
- sign up for a hosted mongodb at [mLab](https://mbla.com/)
- sign up for a hosted mail service at [sparkpost](https://sparkpost.com)
- create run.sh
```#!/bin/bash
export MONGO_DB_URL=[MONGODB AS A SERVICE URL]
export SPARKPOST_TOKEN=[TOKEN FOR SENDING MAILS VIA SPARKPOST]
export HEROKU_APP_NAME=[APP NAME as seen on https://devcenter.heroku.com/articles/dyno-metadata]
export DEFAULT_EMAIL=[DEFAULT EMAIL FOR RUNTIME ERRORS]
nodemon index.js
```
- chmod 744 run.sh
- ./run.sh 
