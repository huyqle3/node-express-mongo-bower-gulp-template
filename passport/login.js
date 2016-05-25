var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // Check in Mongo if a user with username exists or not.
            User.findOne({'username' :  username}, 
                function(err, user) {
                    // In case of any error, return using the done method.
                    if (err) {
                        return done(err);
                    }
                    // If username does not exist, log the error and redirect back.
                    if (!user) {
                        console.log('User not found with username ' + username);
                        // message sent and asynchronously printed on the web page.
                        return done(null, false, req.flash('message', 'User not found.'));                 
                    }
                    // If user exists but has the wrong password, log the error. 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        // Redirect back to log-in page on /.
                        return done(null, false, req.flash('message', 'Invalid password.'));
                    }
                    /**
                     * User and password both match, return user from done method,
                     *      which will be treated like success.
                     */
                    return done(null, user);
                }
            );

        })
    );

    /**
     * isValidPassword uses bCrypt to check if the password matches.
     */
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }   
}