'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

const User = require('./../models/user');

const multer = require('multer');
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'user-image-hackathon'
});

const uploader = multer({ storage });

//import User from './../models/user';

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/profile', routeGuard, (req, res, next) => {
  res.render('userProfile');
  console.log(req.user);
});

router.get('/profile/edit', routeGuard, (req, res) => {
  res.render('edit');
  console.log(req.user._id);
});

router.post('/profile/edit', uploader.single('image'), routeGuard, (req, res, next) => {

  const userId = req.user._id;
  const image = req.file.url;
  console.log(image);

  console.log(userId, image);

  User.findByIdAndUpdate(userId, { image })
    .then((user) => {
      console.log(user);
      res.redirect('/');
    })
    .catch((error) => next(error));
});

module.exports = router;
