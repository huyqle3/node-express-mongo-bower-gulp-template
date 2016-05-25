/**
 * BlogPostController.js is used to handle any functionality that uses
 * 		the Mongoose BlogPost model, /models/blogpost.js.
 */

var BlogPost = require('../models/blogpost');

// BlogPostController represents an empty constructor.
var BlogPostController = function() {};

/**
 * With BlogPostController.addPost, you can add new posts.
 *  
 * @param {object} data Data contains the userId, title, and post of the
 *					 	submitted blog post.
 * @param {function} callback Callback is a function returned back to the
 *					 place where addPost was called. It returns an error
 *					 and a response.
 * @return {function} Return is just used to stop the function.
 */
BlogPostController.addPost = function(data, callback) {
	var newBlogPost = new BlogPost();

	newBlogPost.userId = data.userId;
	newBlogPost.title = data.title;
	newBlogPost.post = data.post;

	newBlogPost.save(function(err) {
		if (err) {
			console.log('Error in saving blog post: ' + err);
			return callback(err, null);	
		} else {
			return callback(null, newBlogPost);
		}
	});
}

/**
 * listAllPosts returns the list of all blog posts in the Mongo database.
 *  
 * @param {function} callback Callback is a function returned back to the
 *					 place where addPost was called. It returns an error
 *					 and a response.
 * @return {function} Return is just used to stop the function.
 */
BlogPostController.listAllPosts = function(callback) {
	BlogPost.find({}, function(err, posts) {
		if (err) {
			console.log('Error in finding blog posts: ' + err);
			return callback(err, null);	
		} else {
			return callback(null, posts);
		}
	});
}

/**
 * listYourPosts only returns your user's posts in the Mongo database that
 *		correspond to your userId.
 *
 * @param {string} userId This is your logged in user's id.
 * @param {function} callback Callback is a function returned back to the
 *					 place where addPost was called. It returns an error
 *					 and a response.
 * @return {function} Return is just used to stop the function.
 */
BlogPostController.listYourPosts = function(userId, callback) {
	BlogPost.find({userId: userId}, function(err, yourPosts) {
		if (err) {
			console.log('Error in finding your blog posts: ' + err);
			return callback(err, null);	
		} else {
			return callback(null, yourPosts);
		}
	});
}

module.exports = BlogPostController;