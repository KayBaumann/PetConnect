const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  owner: { type: String, required: true },
  animalCount: { type: Number, required: true },
  email: { type: String, required: true },
  image: { type: String, required: false }
});

module.exports = mongoose.model('Shelter', shelterSchema);