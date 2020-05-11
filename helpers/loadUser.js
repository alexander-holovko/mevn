var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/Users.js');

function loadUser(req, res, next) {
  console.log(req.session);

  if (req.session.user_id) {
    Users.findById(ObjectId(req.session.user_id), function(user) {

      console.log(user);
      if (user) {
        req.currentUser = user;
        next();
      } else {
        console.log('not allowed');
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
}

module.exports = loadUser;
