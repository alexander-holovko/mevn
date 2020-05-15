var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/Users.js');

/* SAVE USER */
router.post('/', function(req, res, next) {
  Users.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE USER */
router.post('/:action', function(req, res, next) {
  if(req.params.action === 'promote') {
    Users
  }

  if(req.params.action === 'ban') {

  }

  if(req.params.action === 'delete') {

  }
});

module.exports = router;
