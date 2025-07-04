const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number,
  adopted: { type: Boolean, default: false },
  image: String,
  description: String,
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  location: String,
  vaccinated: { type: Boolean, default: false },
  fk_userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Pet', petSchema);