'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

const User = require('./../models/user');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user-image-hackathon'
  }
});

const uploader = multer({ storage });

router.get('/', (req, res) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/profile', routeGuard, (req, res) => {
  res.render('userProfile');
});

router.get('/profile/edit', routeGuard, (req, res) => {
  res.render('edit');
});

router.post('/profile/edit', uploader.single('image'), (req, res, next) => {
  const userId = req.user._id;
  const image = req.file.path;
  User.findByIdAndUpdate(userId, { image })
    .then((user) => {
      res.redirect('/profile');
    })
    .catch((error) => next(error));
});

module.exports = router;
