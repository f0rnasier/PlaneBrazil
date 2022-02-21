/*
   File: aircraftModel.js
   Objective: Aircraft Model definitions for MongoDB
*/
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
// const User = require('./userModel');

const aircraftSchema = new mongoose.Schema(
    {
        acftName: {
            type: String,
            required: [true, 'A Aircraft must have a name'],
            unique: true,
            trim: true,
            maxlength: [40, 'A Aircraft name must have less or equal then 40 characters'],
            minlength: [10, 'A Aircraft name must have more or equal then 10 characters'],
            // validate: [validator.isAlpha, 'Tour name must only contain characters']
        },
        slug: String,
        maxRange: {
            type: Number,
            required: [true, 'A Aircraft must have max range'],
        },
        maxSeats: {
            type: Number,
            required: [true, 'A Aircraft must have a max seats'],
        },
        acftType: {
            type: String,
            required: [true, 'A Aircraft must have a type'],
            enum: {
                values: ['jet', 'turboprop', 'single-engine'],
                message: 'Difficulty is either: easy, medium, difficult',
            },
        },
        price: {
            type: Number,
            required: [true, 'A Aircraft must have a price'],
        },
        summary: {
            type: String,
            trim: true,
            required: [true, 'A Aircraft must have a summary'],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            // required: [true, 'A tour must have a cover image'],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        geoLocation: {
            // GeoJSON
            type: {
                type: String,
                default: 'Point',
                enum: ['Point'],
            },
            coordinates: [Number],
            address: String,
            description: String,
        },
        acftSeller: [
            {
                // type: mongoose.Schema.ObjectId,
                // ref: 'User',
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);


const Aircraft = mongoose.model('Aircraft', aircraftSchema); /// cria a collections para ser usada usando o tourschema

module.exports = Aircraft;