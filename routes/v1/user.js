const express = require('express');
const { asyncExceptionHandler } = require('../../utils/helpers');
const { validateRequest } = require('../../middlewares');
const { addUser } = require('../../controllers/user');
const createUserSchema = require('../../validation_schemas/user');

const router = express.Router();

router.post(
  '/',
  validateRequest({
    body: createUserSchema
  }),
  asyncExceptionHandler(addUser)
);


module.exports = router;