var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');     //引入模版引擎
var session = require("express-session")

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var articleRouter = require('./routes/article');
var frontArticle = require('./routes/frontArticle');


var app = express();

app.set('views',path.join(__dirname,'views/'));
app.engine('.html',ejs.__express);    
app.set('view engine','html');  

app.use(express.static('static'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"123",//设置签名秘钥 内容可以任意填写
  name : "cdw",
  resave : false ,
  saveUninitialized : true,
  cookie : {maxAge:8000000000000}//设置cookie的过期时间，例：80s后    session和相应的cookie失效过期
}))

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login',loginRouter);
app.use('/admin/article',articleRouter);
app.use('/article',frontArticle);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
