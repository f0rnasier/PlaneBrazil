/*
   File: viewRoutes.js
   Objective: Routes definitions for Aircraft rendering operations
*/
const express = require('express');
const aircraftController = require('../controllers/aircraftController');
const viewController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewController.getOverview);

module.exports = router;