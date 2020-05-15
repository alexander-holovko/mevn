var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room = require('../models/Room.js');
var loadUser = require('../helpers/loadUser.js');

/* GET ALL ROOMS */
router.get('/', function(req, res, next) {

  Room.find(function (err, items) {

    if (err) return next(err);
    let sess = req.session;

    res.json({rooms: items, sess: sess})

  });
});


/* GET SINGLE ROOM BY ID */
router.get('/:id', function(req, res, next) {
  Room.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ROOM */
router.post('/', function(req, res, next) {
  Room.create(req.body.room_info, function (err, post) {

    console.log(post);
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ROOM */
router.put('/:id', function(req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ROOM */
router.delete('/:id', function(req, res, next) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
