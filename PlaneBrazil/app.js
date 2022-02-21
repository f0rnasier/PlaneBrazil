/*
   PlaneBrazil REST API Project
   Version: 0.0.1
   Author: Leonardo Brum Fornasier
   File: app.js
   Objective: starts server, defines view engine and initial routes 
*/
'use strict';
var debug = require('debug')('my express app');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Server Variables
var dotenv = require('dotenv');
var mongoose = require('mongoose');

dotenv.config({ path: './config.env' }); //// define onde esta as variaveis de ambiente

// Routes Variables
// var routes = require('./routes/index');
var userRouter = require('./routes/userRoutes');
var aircraftRouter = require('./routes/aircraftRoutes');
var viewRouter = require('./routes/viewRoutes');
// const User = require('./models/userModel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Definitions
app.use('/', viewRouter);
app.use('/api/v1/aircraft', aircraftRouter);
app.use('/api/v1/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

// Conectando o BANCO DE DADOS

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    connectTimeoutMS: 1000,
    // Note that mongoose will **not** pull `bufferCommands` from the query string
  })
  .then(console.log(`DB connection Successfull`));
//

// Iniciando Servidor
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
  console.log(`App running on port ${process.env.PORT}...`);
});
