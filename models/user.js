const mongoose = require('mongoose');
const constants = require('../utils/constants');
const { toUpperCaseAll } = require('../utils/helpers');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        set: name => name.toLowerCase(),
        get: (name) => toUpperCaseAll(name)
      },
}, constants.defaultSchemaOptions)


const User = mongoose.model('User', userSchema);

module.exports =  User;