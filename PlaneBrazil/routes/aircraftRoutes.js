/*
   File: aircraftRoutes.js
   Objective: Routes definitions for Aircraft CRUD operations
*/
const express = require('express');
const aircraftController = require('../controllers/aircraftController');

const router = express.Router();

router.route('/')
    .post(aircraftController.createAircraft)
    .get(aircraftController.getallAircraft);

router.route('/:id')
    .delete(aircraftController.deleteAircraft)
    .get(aircraftController.getAircraft)
    .patch(aircraftController.updateAircraft);

module.exports = router;
