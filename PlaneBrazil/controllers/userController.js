/*
   File: userController.js
   Objective: Controller for 
*/
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const user = require('../models/userModel');
const factory = require('./handlerFactory');

exports.getAllUsers = factory.getAll(user);
exports.getUser = factory.getOne(user);
exports.deleteUser = factory.deleteOne(user)
exports.UpdateUser = factory.updateOne(user);