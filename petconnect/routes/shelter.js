const express = require('express');
const router = express.Router();
const Shelter = require('../models/Shelter');

// Alle Shelter anzeigen
router.get('/', async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (err) {
    console.error('Error fetching shelters:', err);
    res.status(500).json({ message: res.__('errors.server'), error: err.message });
  }
});

// Neuen Shelter hinzufügen
router.post('/', async (req, res) => {
  const { name, address, owner, animalCount, email, image } = req.body;

  if (!name || !address || !owner || !email) {
    return res.status(400).json({ message: res.__('shelter.missing_fields') });
  }

  const shelter = new Shelter({ name, address, owner, animalCount, email, image });

  try {
    const newShelter = await shelter.save();
    res.status(201).json({ message: res.__('shelter.created'), shelter: newShelter });
  } catch (err) {
    console.error('Error creating shelter:', err);
    res.status(400).json({ message: res.__('errors.server'), error: err.message });
  }
});

module.exports = router;
