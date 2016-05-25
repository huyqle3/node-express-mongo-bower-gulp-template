var passport = require('passport');
var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

/**
 * Passport serializes and deserializes users to support persistent log-in sessions.
 */
passport.serializeUser(function(user, done) {
    console.log('Serializing user: ');
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        console.log('Deserializing user: ', user);
        done(err, user);
    });
});

/**
 * These two functions trigger /passport/login.js and /passport/signup.js.
 */
login(passport);
signup(passport);

module.exports = passport;