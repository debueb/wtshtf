'use strict';

var express = require('express'),
    validator = require('validator'),
    userService = require('../services/user-service.js'),
    emailService = require('../services/email-service.js');

module.exports = (function() {
    var route = express.Router();

    route.get('/', function(request, response) {
      response.render('pages/index');
    });

    route.post('/', function(request, response) {
      const email = request.body.email;
      if (!validator.isEmail){
        response.render('pages/error', {error: 'Invalid email'});
      } else {
        userService.register(email, function(err, user) {
          if (err) {
            if (err.code === 11000){
              response.render('pages/error', {error: 'You are already registered, dummy.'});
            } else {
              response.render('pages/error', {error: err});
            }
          } else {
            emailService.sendMail([email], 'Registration confirmation', `Please confirm your registration by clicking the following link:\n\nhttp://${process.env.HEROKU_APP_NAME}.herokuapp.com/registration/confirm/${user.token}[[data-msys-clicktrack="0"]]`);
            response.render('pages/register-success');
          }
        });
      }
    });

    return route;
})();
