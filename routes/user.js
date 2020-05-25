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

/* Promote USER */
router.post('/:action', function(req, res, next) {
  if(req.params.action === 'promote') {
    Users.findByIdAndUpdate(req.body.id, {expert: true}, function (err, post) {
      res.json(post);
    })
  }

  if(req.params.action === 'unPromote') {
    Users.findByIdAndUpdate(req.body.id, {expert: false}, function (err, post) {
      res.json(post);
    })
  }

  if(req.params.action === 'delete') {

  }
});

module.exports = router;
