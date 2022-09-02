const express = require('express');
const { asyncExceptionHandler } = require('../../utils/helpers');
const { validateRequest } = require('../../middlewares');
const { fetchComments } = require('../../controllers/comment');
const { getCommentsSchema } = require('../../validation_schemas/comment');
const router = express.Router();

router.get(
  '/:profileId/comments',
  validateRequest({ query: getCommentsSchema }),
  asyncExceptionHandler(fetchComments)
);

module.exports = router;