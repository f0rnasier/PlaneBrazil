/*
   File: aircarftController.js
   Objective: Controllers for aircraft CRUD operations
   Create - Read - Update - Delete
*/
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const aircraft = require('../models/aircraftModel');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');
// const { query } = require('express');

exports.createAircraft = factory.createOne(aircraft);
exports.getallAircraft = factory.getAll(aircraft);
exports.deleteAircraft = factory.deleteOne(aircraft);
exports.getAircraft = factory.getOne(aircraft);
exports.updateAircraft = factory.updateOne(aircraft);
