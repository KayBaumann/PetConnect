const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number,
  adopted: { type: Boolean, default: false },
  image: String,
  description: String
});

module.exports = mongoose.model('Pet', petSchema);
