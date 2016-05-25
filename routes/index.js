var express = require('express');
var router = express.Router();
var passport = require('passport');

/**
 * If user is authenticated in the session, allow access to the page.
 *		If not, redirect the user to the log-in page.	
 */
var isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

/** GET log-in page. */
router.get('/', function(req, res) {
	res.render('index', {title: 'Log-in',
						 message: req.flash('message')});
});

/** GET sample page. */
/*
router.get('/microwavesam', function(req, res, next) {
  res.render('microwavesam', {title: 'MicrowaveSam',
  							  microwavesam: 'kitchen appliance'});
});
*/

/** POST handles login. */
router.post('/login', passport.authenticate('login', {
	successRedirect: '/home',
	failureRedirect: '/',
	failureFlash : true  
}));

/** GET sign up page. */
router.get('/signup', function(req, res){
	res.render('signup', {title: 'Sign up',
						  message: req.flash('message')});
});

/** POST handles registration. */
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/home',
	failureRedirect: '/signup',
	failureFlash : true  
}));

/* GET home page. */
router.get('/home', isAuthenticated, function(req, res){
	res.render('home', {title: 'Home',
						user: req.user});
});

/* GET handles log out. */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;