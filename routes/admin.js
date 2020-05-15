var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/Users.js');

/* AUTH */
router.get('/', function(req, res, next) {

  Users.find(function (err, items) {

    if (err) return next(err);
    let sess = req.session;

    res.json({users: items, sess: sess})

  });

});

module.exports = router;
