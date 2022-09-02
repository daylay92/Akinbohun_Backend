const Joi = require('joi');

const addUserSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.base': `The name field must be a string`,
    'string.empty': 'The name field must be a valid alphabet',
    'string.min': 'The name field must have atleast two characters',
    'any.required' : 'The name field is required',
  })
});

module.exports = addUserSchema;
