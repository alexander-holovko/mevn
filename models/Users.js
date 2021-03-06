var mongoose = require('mongoose'), Schema = mongoose.Schema;

var LoginSchema = new mongoose.Schema({
  name: String,
  pass: String,
  email: String,
  created_date: { type: Date, default: Date.now },
  expert: Boolean,
});

module.exports = mongoose.model('Users', LoginSchema);
