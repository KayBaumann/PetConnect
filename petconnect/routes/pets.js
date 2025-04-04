const express = require('express');
const Pet = require('../models/Pet');
const router = express.Router();

// All pets
router.get('/', async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

// add new pet
router.post('/', async (req, res) => {
  const newPet = new Pet(req.body);
  await newPet.save();
  res.status(201).json(newPet);
});

module.exports = router;
