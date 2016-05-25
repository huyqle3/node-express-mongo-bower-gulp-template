/**
 * /models/user.js contains the mongoose model for a user.
 * A user contains username, password, email, firstName, and lastName.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;