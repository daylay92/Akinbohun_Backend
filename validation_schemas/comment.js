const Joi = require('joi');
const constants = require('../utils/constants');

const stringSchema = (field) =>
  Joi.string().messages({
    'string.base': `The ${field} parameter must be a string`,
    'string.empty': `The ${field} field cannot be an empty string`
  });
exports.createCommentSchema = Joi.object({
  authorId: Joi.string().required().messages({
    'any.required': `The author's ID is required`,
    'string.base': `The authorId parameter must be a string`,
    'string.empty': `The authorId field cannot be an empty string`
  }),
  title: stringSchema(),
  description: stringSchema(),
  mbti: Joi.string()
    .valid(...constants.MBTI)
    .messages({
      'string.base': `The mbti parameter must be a string.`,
      'string.empty': `The mbti field cannot be an empty string.`,
      'any.only': `mbti must be one of the following ${constants.MBTI.toString()}`
    }),
  enneagram: Joi.string()
    .valid(...constants.enneagram)
    .messages({
      'string.base': `The enneagram parameter must be a string.`,
      'string.empty': `The enneagram field cannot be an empty string.`,
      'any.only': `enneagram must be one of the following ${constants.enneagram.toString()}`
    }),
  zodiac: Joi.string()
    .valid(...constants.zodiac)
    .messages({
      'string.base': `The zodiac parameter must be a string.`,
      'string.empty': `The zodiac field cannot be an empty string.`,
      'any.only': `zodiac must be one of the following ${constants.zodiac.toString()}`
    }),
  profileId: Joi.number().required().messages({
    'any.required': `A valid id of the profile is required`,
    'number.base': `The profileId parameter must be a number`
  })
}).or('mbti', 'ennegram', 'zodiac', 'title', 'description');

const commentSortByValues = Object.values(constants.commentSortByField);
exports.getCommentsSchema = Joi.object({
  sortBy: Joi.string()
    .valid(...commentSortByValues)
    .messages({
      'string.base': `The sortBy parameter must be a string.`,
      'string.empty': `The sortBy field cannot be an empty string.`,
      'any.only': `sortBy must be one of the following ${commentSortByValues.toString()}`
    }),
  mbti: Joi.string()
    .valid(...constants.MBTI)
    .messages({
      'string.base': `The mbti parameter must be a string.`,
      'string.empty': `The mbti field cannot be an empty string.`,
      'any.only': `mbti must be one of the following ${constants.MBTI.toString()}`
    }),
  enneagram: Joi.string()
    .valid(...constants.enneagram)
    .messages({
      'string.base': `The enneagram parameter must be a string.`,
      'string.empty': `The enneagram field cannot be an empty string.`,
      'any.only': `enneagram must be one of the following ${constants.enneagram.toString()}`
    }),
  zodiac: Joi.string()
    .valid(...constants.zodiac)
    .messages({
      'string.base': `The zodiac parameter must be a string.`,
      'string.empty': `The zodiac field cannot be an empty string.`,
      'any.only': `zodiac must be one of the following ${constants.zodiac.toString()}`
    })
});

exports.addLikeOrDisLikeSchema = Joi.object({
  userId: Joi.string().required().messages({
    'any.required': `The userId is required`,
    'string.base': `The userId parameter must be a string`,
    'string.empty': `The userId field cannot be an empty string`
  }),
  commentId: Joi.string().required().messages({
    'any.required': `The commentId is required`,
    'string.base': `The commentId parameter must be a string`,
    'string.empty': `The commentId field cannot be an empty string`
  })
});
