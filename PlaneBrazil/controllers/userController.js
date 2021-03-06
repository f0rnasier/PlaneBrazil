/*
   File: userController.js
   Objective: Controller for CRUD User operations, photos  
*/
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const user = require('../models/userModel');
const factory = require('./handlerFactory');
// Image work declarations
const multer = require('multer');
const sharp = require('sharp');

// Working with Images
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.UploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/users/${req.file.filename}`);

    next();
});

// Get ME / Update ME / Delete ME operations
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

// GET
exports.getMe = (req, res, next) => {
    console.log(req.user.id);
    req.params.id = req.user.id;
    next();
};

// PATH
exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    console.log(req.user.id);
    const updatedUser = await user.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

// DELETE
exports.deleteMe = catchAsync(async (req, res, next) => {
    await user.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null,
    });
});


// CRUD Operations via HandlerFactory
exports.getAllUsers = factory.getAll(user);
exports.getUser = factory.getOne(user);
exports.deleteUser = factory.deleteOne(user)
exports.UpdateUser = factory.updateOne(user);