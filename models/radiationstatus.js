const mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

// create a schema
const radiationstatusSchema = new Schema({
    updated_at: Date,
    last_successful_check: Date
});

radiationstatusSchema.pre('save', function(next) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;
  next();
});

// the schema is useless so far
// we need to create a model using it
const Radiationstatus = mongoose.model('Radiationstatus', radiationstatusSchema);

// make this available to our users in our Node applications
module.exports = Radiationstatus;
