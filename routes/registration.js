'use strict';

var express = require('express'),
    validator = require('validator'),
    userService = require('../services/user-service.js');

module.exports = (function() {
    var route = express.Router();

    route.get('/confirm/:token', function(request, response) {
      userService.confirm(request.params.token, function(err, user){
        if (err){
          response.render('error', err);
        } else {
          response.render('pages/register-confirm-success');
        }
      })

    });

    route.get('/unregister', function(request, response) {
      response.render('pages/unregister');
    });

    route.post('/unregister', function(request, response) {
      let email = request.body.email;
      if (!validator.isEmail){
        response.render('pages/error', {error: 'Invalid email'});
      } else {
          userService.unregister(email, function(err) {
            if (err) {
              response.render('pages/error', {error: err});
            } else {
              response.render('pages/unregister-success');
            }
          });
      }
    });

    return route;
})();
