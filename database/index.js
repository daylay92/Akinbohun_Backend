/* eslint-disable no-console */
const mongoose = require('mongoose');
const mongoMemoryServer = require('mongodb-memory-server');

module.exports = async () => {
    const mongoServer = await mongoMemoryServer.MongoMemoryServer.create();
    await mongoose.connect(
        mongoServer.getUri(), 
    { dbName: `social_app_db${process.env.NODE_ENV === 'test' ? '_test': ''}` }
    );
    console.log('MongoDB connected successful');
    mongoose.connection.on('error', () => {
        console.log('something broke on MongoDB after connection was established');
    }); 
};