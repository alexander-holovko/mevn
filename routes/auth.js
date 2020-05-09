var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/Users.js');

/* AUTH */
router.post('/', function(req, res, next) {
  Users.find({ name: req.body.auth_data.log_name, pass: req.body.auth_data.log_pass}, function (err, docs) {
    res.send(docs);
    console.log(req.body.auth_data.log_name);
    console.log(req.body.auth_data);
  });
});

module.exports = router;
