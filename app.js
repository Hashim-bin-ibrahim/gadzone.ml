const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const db = require('./config/connection')
var session = require('express-session')
const nocache = require("nocache");
var fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const vendorRouter = require('./routes/vendor');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialDir:__dirname+'/views/prtials/'}))
app.engine('hbs', hbs.engine({helpers:{inc: function(value, option){
  return parseInt(value)+1;
}},extname: 'hbs',defaultLayout: 'layout', layoutsDir:__dirname + '/views/layout', partialDir:__dirname + '/views/partials'}));
app.use(nocache());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.connect((err)=>{
  if(err) console.log("connection error "+err)
  else console.log("Database connected to port 27017")
}) 
app.use(session({secret:"key", resave:false,saveUninitialized:true, cookie:{maxAge:600000}}));
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/vendor',vendorRouter);

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
