const mongoose = require('mongoose');
const constants = require('../utils/constants');

const commentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    mbti: {
      type: String,
      enum: constants.MBTI
    },
    enneagram: {
      type: String,
      enum: constants.enneagram
    },
    zodiac: {
      type: String,
      enum: constants.zodiac
    },
    likes: {
        default: 0,
        type: Number
      },
    profile: {
      required: true,
      type: Number,
      ref: 'Profile'
    },
    author: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedBy: [mongoose.Schema.Types.ObjectId]
  },
  constants.defaultSchemaOptions
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
