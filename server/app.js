var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var weixin = require('./routes/weixin');
var host = require('./routes/host');
var user = require('./routes/user');

var app = express();

// view engine setup

// app.set('dist', path.join(path.resolve(__dirname, '../../receptions/'), 'dist'));
// app.engine('html', require('ejs').renderFile);
//
// app.set('view engine', 'views');

app.set('views', path.join(path.resolve(__dirname, '../receptions/'), 'dist'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(path.resolve(__dirname, '..'), 'receptions', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(__dirname, '../receptions/'), 'dist')));
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     if(req.method=="OPTIONS") res.sendStatus(200);
//     else  next();
// });

app.use('/', index);

app.use('/wx', weixin);
app.use('/hs', host);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//允许跨域

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({'error':'error'});
});

module.exports = app;
