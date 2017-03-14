var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var md5 = require('md5');

var nconf = require('nconf');
nconf.use('file', {file: path.join(__dirname, 'config.json')});

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//request interceptor for checking auth
app.use(function(req, res, next) {
	req.app_id = nconf.get('vk:app_id');
	var user = checkAuth(req.cookies['vk_app_' + req.app_id])
	if (user) {
		req.user = user;
		next('route');
	} else {
		res.render('login', { VK_APP_ID: req.app_id });
	}
});

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function checkAuth(cookieString) {
	if (cookieString == undefined) 
		return false;

	var allowed = ['expire', 'mid', 'secret', 'sid', 'sig'];
	var data = [];
	cookieString.split('&', 10).forEach(function(i) {
		var pair = i.split('=', 2);
		if (allowed.indexOf(pair[0]) >= 0) {
			data[pair[0]] = pair[1];
		}
	});

	if (allowed.every(function(key) { return data[key] | false; })) 
		return false;

	var sig = '';
	for (var key in data) {
		if (data.hasOwnProperty(key) && key !== 'sig') {
			sig += key + '=' + data[key];
		}
	}
	sig += nconf.get('vk:secret_key');
	sig = md5(sig);

	var currentTime = (new Date()).getTime() / 1000;
	if (sig == data['sig'] && currentTime < data['expire']) {
		return {
			mid: data['mid']
		}
	}

	return false;
}

module.exports = app;
