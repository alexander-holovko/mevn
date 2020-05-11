var mongoose = require('mongoose'), Schema = mongoose.Schema;

var AdminSchema = new mongoose.Schema({
  name: String,
  pass: String,
  email: String,
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admins', AdminSchema);
