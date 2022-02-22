/*
   PlaneBrazil REST API Project
   Version: 0.0.1
   Author: Leonardo Brum Fornasier
   File: app.js  
   Note: New version, separating all server instructions on a different file.
   Objective: starts server, defines view engine and initial routes 
*/
'use strict';
const path = require('path');
const express = require('express');
const debug = require('debug');
const logger = require('morgan');
//
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
//
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Route Declarations
const userRouter = require('./routes/userRoutes');
const aircraftRouter = require('./routes/aircraftRoutes');
const viewRouter = require('./routes/viewRoutes');

// Starting Express
const app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Development logging

// Security Calls
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Definitions
app.use('/', viewRouter);
app.use('/api/v1/aircraft', aircraftRouter);
app.use('/api/v1/users', userRouter);

// Error Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can´t find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// Starting Server
module.exports = app;
