const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Profile = require('../models/profile');
const User = require('../models/user');
const constants = require('../utils/constants');
const { HttpException } = require('../utils/errors');

exports.createComment = async (data) => {
  const { profileId, authorId, ...rest } = data;
  const profile = await Profile.findById(profileId);
  if (!profile) throw HttpException({ status: 404, message: 'Profile was not found' });
  const author = await User.findById(data.authorId);
  if (!author) throw new HttpException({ status: 404, message: 'Author was not found' });
  const comment = new Comment({
    profile,
    author,
    ...rest
  });
  return comment.save();
};

exports.fetchComments = async ({
  profileId,
  sortBy = constants.commentSortByField.BEST,
  mbti,
  enneagram,
  zodiac
}) => {
    const profile = await Profile.findById(profileId);
    if (!profile) throw HttpException({ status: 404, message: 'Profile was not found' });
    const options =  { 'profile' : profile };
    if (mbti) options.mbti = mbti;
    if (enneagram) options.enneagram = enneagram;
    if (zodiac) options.zodiac = zodiac;
  const query = Comment.find(options).select('-likedBy -__v -profile');
  if (sortBy === constants.commentSortByField.BEST) query.sort('-likes');
  else query.sort('-createdAt');
  return query.exec();
};

exports.likeOrDisLikeComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new HttpException({ status: 404, message: 'Comment was not found' });
  const user = await User.findById(userId);
  if (!user) throw new HttpException({ status: 404, message: 'User was not found' });
  const likesByClone = [...(comment.likedBy || [])];
  const userIndex = likesByClone.findIndex((id) => id.toString() === user._id.toString());
  if (userIndex === -1) {
    likesByClone.push(user._id);
    comment.likes += 1;
  } else {
    likesByClone.splice(userIndex, 1);
    comment.likes -= 1;
  }
  comment.likedBy = likesByClone;
  return comment.save();
};
