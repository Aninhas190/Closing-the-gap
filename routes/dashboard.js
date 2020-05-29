'use strict';

const { Router } = require('express');
const dashboard = new Router();
const routeGuard = require('./../middleware/route-guard');

const Post = require('./../models/post');
const User = require('./../models/user');

dashboard.get('/', routeGuard, (req, res, next) => {
  Post.find()
    .sort({ createdDate: -1 })
    .populate('creator')
    .then((posts) => {
      res.render('dashboard', { posts });
    })
    .catch((error) => {
      next(error);
    });
});

dashboard.get('/:userid/post/create', routeGuard, (req, res, next) => {
  res.render('create');
});

dashboard.post('/:userid/post/create', routeGuard, (req, res, next) => {
  const userid = req.params.userid;
  const title = req.body.title;
  const message = req.body.message;

  return Post.create({
    title,
    message,
    creator: userid
  })
    .then((document) => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = dashboard;
