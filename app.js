var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var cookieSession=require('cookie-session');
var passport=require('passport');
var expressValidator=require('express-validator');
var LocalStrategy=require('passport-local');
var multer=require('multer');
var bcrypt = require('bcryptjs');
var uploads=multer({dest:'./uploads'});
var flash=require('connect-flash');
var mongo=require('mongodb');
var mongoose=require('mongoose');
var db=mongoose.connection;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var faculty_route = require('./routes/faculty');
var staff_route = require('./routes/staff');
var Admin_route = require('./routes/Admin');
var mngmnt_route = require('./routes/mngmnt');
var Members_route = require('./routes/Members');
var Student_route=require('./routes/Student');
var Parent_route=require('./routes/Parent');
var Grv_route=require('./routes/post');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
  


app.use(logger('dev'));
app.use(express.json());
//app.use(express.bodyParser());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//handles sessions
app.set('trust proxy', 1);

/*app.use(session({
  name: 'session'
  , secret: "secret"
  , httpOnly: true
  , maxAge: 30 * 60 * 1000
  , secure: false
  , overwrite: false
}));*/
app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized:true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
//validator
app.use(expressValidator({

  errorFormatter:function(param, msg, value){
    var namespace=param.split('.'),
    root =namespace.shift(),
    formParam=root;
    while(namespace.length){
      formParam+='['+namespace.shift();
    }
    return{
      param: formParam,
      msg: msg,
      value:value
    };
    }
  
}));
app.use(function(req, res, next) {//clearing cache for back button problem
  if (!req.active)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use(require('connect-flash')());
app.use(function (req,res,next)
{
  res.locals.messages=require('express-messages')(req, res);
  next();
});

app.get('*', function(req,res,next){
res.locals.user=req.user||null;
next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/faculty',faculty_route);
app.use('/staff',staff_route);
app.use('/Admin',Admin_route);
app.use('/mngmnt',mngmnt_route);
app.use('/Members',Members_route);
app.use('/Student',Student_route);
app.use('/Parent',Parent_route);
app.use('/post',Grv_route);


/*
app.use(bodyParser.raw({limit: '150mb'}));
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));
app.use(bodyParser.json());
*/
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
