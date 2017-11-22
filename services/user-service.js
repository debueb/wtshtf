'use strict';

module.exports = (function() {
  const url = process.env.MONGO_DB_URL;
  const mongoose = require('mongoose'),
      User = require('../models/user');

  mongoose.connect(url, {
    useMongoClient: true,
  });

  function register(email, callback){
    var newUser = User({
      email: email
    });

    newUser.save(callback);
  };

  function confirm(token, callback){
    User.findOneAndUpdate({ token: token }, { verified: true }, {new: true}, callback);
  };

  function unregister(email, callback){
    User.find({ email: email }, function(err, user) {
      if (err){
        callback(err);
      } else {
        if (!user.length || user.length === 0){
          callback('Email not registered');
        } else {
          user.forEach(function(u){
            u.remove(callback);
          });
        }
      }
    });
  };

  function findVerified(callback){
    User.find({verified: true}, callback);
  };

  return {
    register: register,
    confirm: confirm,
    unregister: unregister,
    findVerified: findVerified
  };
}());
