/**
 * /models/blogpost.js contains the mongoose model for a blog post.
 * A blog post stores the userId of the user who wrote the post,
 *		title of the post, and the contents of the post.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogPostSchema = new Schema({
	userId: String,
	title: String,
	post: String
});

var BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;