var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
var userLogin = require('./routes/userLogin');
var userData = require('./routes/userData');
var userMedicines = require('./routes/userMedicine');
var userAppointments = require('./routes/userAppointments');
var userInvoices = require('./routes/userInvoices');
var userImmunization = require('./routes/userImmunization');
var userDiagnosis = require('./routes/userDiagnosis');
var userAllergies = require('./routes/userAllergies');
var userAdmin = require('./routes/userAdmin');

var app = express();

var mongoose = require('mongoose'),
    connStr = 'mongodb://localhost:27017/440w';

function connectMongo(logMessage){
    mongoose.connect(connStr, function(err) {
        if (err) throw err;
        console.log(logMessage);
    });
}

function disconnectMongo(logMessage){
    if(mongoose.connection.close()){
        console.log(logMessage);
    }
}

connectMongo('APPJS::Successfully connected to MongoDB');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
app.use('/userlogin', userLogin);
app.use('/userdata', userData);
app.use('/usermedicines', userMedicines);
app.use('/userappointments', userAppointments);
app.use('/userinvoices', userInvoices);
app.use('/userimmunization', userImmunization);
app.use('/userdiagnosis', userDiagnosis);
app.use('/userallergies', userAllergies);
app.use('/useradmin', userAdmin);

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
