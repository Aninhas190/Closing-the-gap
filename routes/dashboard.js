'use strict';

const { Router } = require('express');
const dashboard = new Router();
const routeGuard = require('./../middleware/route-guard');

dashboard.get('/dashboard', routeGuard, (req, res, next) => {
  res.render('dashboard');
});

module.exports = dashboard;
