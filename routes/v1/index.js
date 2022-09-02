const express = require('express');
const userRouter = require('./user');
const commentRouter = require('./comment');
const profileRouter = require('./profile');

const router = express.Router();

router.use('/users', userRouter);
router.use('/profiles', profileRouter);
router.use('/comments', commentRouter);

module.exports = router;