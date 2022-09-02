const express = require('express');
const { asyncExceptionHandler } = require('../../utils/helpers');
const { validateRequest } = require('../../middlewares');
const { createComment, likeOrDisLikeComment } = require('../../controllers/comment');
const { createCommentSchema, addLikeOrDisLikeSchema } = require('../../validation_schemas/comment');
const router = express.Router();

router.post(
  '/',
  validateRequest({
    body: createCommentSchema
  }),
  asyncExceptionHandler(createComment)
);

router.patch(
  '/:commentId/users/:userId/likes',
  validateRequest({
    params: addLikeOrDisLikeSchema
  }),
  asyncExceptionHandler(likeOrDisLikeComment)
);
module.exports = router;
