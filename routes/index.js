'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

//import User from './../models/user';

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/profile', routeGuard, (req, res, next) => {
  res.render('userProfile', req.user);
});


module.exports = router;
