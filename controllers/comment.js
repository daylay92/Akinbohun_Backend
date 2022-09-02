const { createComment, fetchComments, likeOrDisLikeComment } = require('../services/comment');
const { successResponse } = require('../utils/helpers');

exports.createComment = async (req, res, _next) => {
  const { title, description, likes, id, author, createdAt, enneagram, zodiac, mbti } = await createComment(
    req.body
  );
  return successResponse({
    req,
    res,
    code: 201,
    data: {
      title,
      description,
      likes,
      id,
      author,
      createdAt,
      enneagram,
      zodiac,
      mbti
    },
    message: 'Successfully created comment'
  });
};

exports.fetchComments = async (req, res, _next) => {
  const data = await fetchComments({
    profileId: req.params.profileId,
    ...req.query
  });
  return successResponse({
    req,
    res,
    data,
    message: 'Successfully retrieved comments'
  });
};

exports.likeOrDisLikeComment = async (req, res, _next) => {
  const { title, description, likes, id, createdAt, enneagram, zodiac, mbti } =
    await likeOrDisLikeComment(req.params.commentId, req.params.userId);
  return successResponse({
    req,
    res,
    data: { title, description, likes, id, createdAt, enneagram, zodiac, mbti },
    message: 'Successfully voted on comment'
  });
};
