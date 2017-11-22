'use strict';

module.exports = (function() {
  const url = process.env.MONGO_DB_URL;
  const mongoose = require('mongoose'),
      Radiationstatus = require('../models/radiationstatus');

  // mongoose.connect(url, {
  //   useMongoClient: true,
  // });

  function getLastSuccessfulCheck(callback){
    Radiationstatus.findOne({}, 'last_successful_check', callback);
  }

  function setLastSuccessfulCheck(){
    Radiationstatus.findOneAndUpdate({}, {last_successful_check: new Date()}, {new: true, upsert: true}, function(error, doc){
      console.log(error);
      console.log(doc);
    });
  };

  return {
    getLastSuccessfulCheck: getLastSuccessfulCheck,
    setLastSuccessfulCheck: setLastSuccessfulCheck
  };
}());
