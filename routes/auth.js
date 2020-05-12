var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/Users.js');

/* AUTH */
router.post('/:action', function(req, res, next) {

  if(req.params.action === 'login') {
    Users.find({ name: req.body.auth_data.log_name, pass: req.body.auth_data.log_pass}, function (err, docs) {
      if(docs.length > 0) {
        req.session.user_id = docs[0]._id;
        req.session.save(() => {
          return res.json({
            user_id: docs[0]._id,
          });
        });
      }
    });
  }

  if(req.params.action === 'logout') {
    req.session.destroy();
    res.json('session destroyed');
  }

});

module.exports = router;
