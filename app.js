var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./server/authenticate');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Start: Autoload models and routes
require('./server/autoload')(app);
// End: Autoload models and routes

app.use(express.static(path.join(__dirname, 'client/public')));

// Start: Serve AngularJS
app.use('/[^\.]+$', function(req, res, next) {
	// Start: Send 404 if request is JSON and route not found
	if(req.xhr || req.headers.accept.indexOf('json') > -1) {
		var err = new Error("Not Found");
		err.status = 404;
		next(err);
	}
	// End: Send 404 if request is JSON and route not found
	else {
		res.set('Content-Type', 'text/html').sendFile(__dirname + '/client/public/index.html');
    }
});
// End: Serve AngularJS

// Start: error handler
app.use(function(err, req, res, next) {
	console.log(err);
	if(req.xhr || req.headers.accept.indexOf('json') > -1) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: (app.get('env') === 'development' ? err : {})
		});
	} else {
		res.sendFile(path.join(__dirname, 'client/public/static/'+(err.status || 500)+'.html'));
	}
});
// End: error handler

module.exports = app;
