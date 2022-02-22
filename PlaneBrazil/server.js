/*
   File: server.js
   Objective: File to start server and DB connection
   Note: New file to work alongside app.js
*/
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Uncaught Exeption
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! ?? Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Definindo path para variaveis de servidor
dotenv.config({ path: './config.env' });

// Database Connection
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        connectTimeoutMS: 1000,
        // Note that mongoose will **not** pull `bufferCommands` from the query string
    })
    .then(console.log(`DB connection Successfull from New Server file`));

// Starting Server
const port = process.env.port || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// Unhandled Rejection
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! ?? Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('?? SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('?? Process terminated!');
    });
});
