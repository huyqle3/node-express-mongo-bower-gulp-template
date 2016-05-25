var express = require('express');
var router = express.Router();
var BlogPostController = require('../controllers/BlogPostController');

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

/**
 * GET /blogpost page.
 * Lists all posts and your posts in the database.
 */
router.get('/', isAuthenticated, function(req, res) {
	BlogPostController.listAllPosts(function(err, posts) {
		BlogPostController.listYourPosts(req.user._id, function(err2, yourPosts) {
			if (!err && !err2) {
				res.render('post', {title: 'Post',
									posts: posts,
									yourPosts: yourPosts});
			}
		});
	});
});

/**
 * POST handles creating a new blog post.
 */
router.post('/', isAuthenticated, function(req, res) {
	var data = {
		userId: req.user._id, 
		title: req.body.title,
		post: req.body.post
	};

	// After adding a new post, redirect to /blogpost and see the update.
	BlogPostController.addPost(data, function(err) {
		if (!err) {
			res.redirect('/blogpost');
		}
	});
});

module.exports = router;