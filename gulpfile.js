/**
 * Basic gulp file that does bower installs, uses font-awesome,
 * 		and translates sass to css.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var notify = require("gulp-notify");
var bower = require('gulp-bower');

/**
 * Quick access variables for directory names.
 */
var config = {
	bootstrapDir: './bower_components/bootstrap-sass',
	fontawesomeDir: './bower_components/font-awesome',
	publicDir: './public',
	bowerDir: './bower_components'
}

/**
 * Task for installing new bower dependencies inside bower.json.
 */
gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest(config.bowerDir))
});

/**
 * Task for moving font-awesome fonts inside the /public/fonts folder.
 */
gulp.task('fonts', function() {
	return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
		.pipe(gulp.dest('./public/fonts'));
});

/**
 * Task for translating sass inside the /public/sass folder to css in the
 *		/public/stylesheets folder.
 */
gulp.task('css', function() {
	return gulp.src('./public/sass/style.scss')
		.pipe(sass({
			includePaths: [config.bootstrapDir + '/assets/stylesheets', config.fontawesomeDir + '/scss'],
		}))
		.pipe(gulp.dest(config.publicDir + '/stylesheets'));
});

/**
 * Watch task that looks for .scss file changes inside the /public/sass folder.
 * `gulp watch`.
 */
gulp.task('watch',function() {
	gulp.watch('./public/sass/**/*.scss', ['css']);
});

/**
 * When using `gulp`, bower, fonts, and css tasks are triggered.
 * `gulp`
 */
gulp.task('default', ['bower', 'fonts', 'css']);