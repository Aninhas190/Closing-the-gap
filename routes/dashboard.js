'use strict';

const { Router } = require('express');
const dashboard = new Router();
const routeGuard = require('./../middleware/route-guard');

dashboard.get('/', routeGuard, (req, res, next) => {
  res.render('dashboard');
});

dashboard.get('/:userid/post/create', routeGuard, (req, res, next) => {
  res.render('create');
});

dashboard.post('/:userid/post/create', routeGuard, (req, res, next) => {
  const userid = req.params.userid;
  const title = req.body.title;
  const message = req.body.message;
});

module.exports = dashboard;
