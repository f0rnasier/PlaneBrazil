/*
   File: aircarftController.js
   Objective: Controller for rendering webpages
*/
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Aircraft = require('../models/aircraftModel');


exports.getOverview = catchAsync(async (req, res, nest) => {
    const aircraft = await Aircraft.find();

    res.status(200).render('index', {
        title: 'All Aircraft',
       aircraft,
    });
});