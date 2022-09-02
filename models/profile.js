const mongoose = require('mongoose');
const constants = require('../utils/constants');

const profileSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
    },
    mbti: {
        type: String,
        required: true,
    },
    enneagram: {
        type: String,
        required: true,
    },
    variant : {
        type: String,
        required: true,
    },
    tritype: {
        type: Number,
        required: true,
    },
    socionics: {
        type: String,
        required: true,
    },
    sloan: {
        type: String,
        required: true,
    },
    psyche: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: constants.DEFAULT_PROFILE_IMAGE
    }
}, constants.defaultSchemaOptions)


const Profile = mongoose.model('Profile', profileSchema);

module.exports =  Profile;