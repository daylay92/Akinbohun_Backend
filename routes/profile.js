'use strict';
const express = require('express');
const Profile = require('../models/profile'); 
const router = express.Router();



router.get('/:id', async function(req, res, next) {
  const id = Number(req.params.id);
  if (id === NaN) return next();
  const profile = await Profile.findById(id);
  res.render('profile_template', {
      profile: profile || {},
    });
  });


module.exports = router;