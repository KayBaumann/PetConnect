const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number,
  adopted: { type: Boolean, default: false },
  image: String,
  description: String,
  gender: { type: String, enum: ['Male', 'Female'], required: true }, // Added gender field
  location: String, // Added location field
  vaccinated: { type: Boolean, default: false } // Added vaccinated field
});

module.exports = mongoose.model('Pet', petSchema);
