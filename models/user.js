const mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    token: String,
    verified: Boolean,
    created_at: Date,
    updated_at: Date
});

userSchema.pre('save', function(next) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.token){
    this.token = uuid.v4();
    this.created_at = currentDate;
  }

  next();
});

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
