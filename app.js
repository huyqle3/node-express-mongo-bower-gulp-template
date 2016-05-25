var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');
var blogpost = require('./routes/blogpost');

/**
 * We use db.js to connect to a specified database.
 * We use mongoose for easy to read models.
 */
var dbConfig = require('./db');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

var app = express();

// Import of passport for user authentication and express-session for user sessions.
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'secretKey',
                        resave: true,
                        saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * We use connect-flash middleware for sending messages
 *    for error debugging between requests.
 */
var flash = require('connect-flash');
app.use(flash());

// Initialize passport through init.js inside passport folder.
var initPassport = require('./passport/init');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);
app.use('/blogpost', blogpost);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
