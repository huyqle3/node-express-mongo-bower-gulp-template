var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    passport.use('signup', new LocalStrategy({
            // Allows us to pass back the entire request to the callback.
            passReqToCallback : true
        },
        function(req, username, password, done) {
            findOrCreateUser = function() {
                // Find a user in Mongo with the provided username.
                User.findOne({'username' :  username}, function(err, user) {
                    // In case of any error, return using the done method.
                    if (err) {
                        console.log('Error in sign up: ' + err);
                        return done(err);
                    }
                    // If the user already exists, log the error.
                    if (user) {
                        console.log('User already exists with username: ' + username);
                        return done(null, false, req.flash('message','User already exists.'));
                    } else {
                        // If there is no existing user with the chosen username, create the new user.
                        var newUser = new User();

                        // Set the new user's local credentials.
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');

                        // Save the new user.
                        newUser.save(function(err) {
                            if (err) {
                                console.log('Error in saving user: ' + err);  
                                throw err;  
                            }
                            console.log('User registration was successful.');    
                            return done(null, newUser);
                        });
                    }
                });
            };

            /**
             * Delay the execution of findOrCreateUser and execute the method
             *      in the next tick of the event loop.
             */
            process.nextTick(findOrCreateUser);
        })
    );

    /**
     * Generates hash using bCrypt.
     */
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}