const express = require('express');
const router = express.Router();
const Shelter = require('../models/Shelter');

// GET alle Shelter
router.get('/', async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST neuer Shelter
router.post('/', async (req, res) => {
  const { name, address, owner, animalCount, email, image } = req.body;
  const shelter = new Shelter({ name, address, owner, animalCount, email, image });

  try {
    const newShelter = await shelter.save();
    res.status(201).json(newShelter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;