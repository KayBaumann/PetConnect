const express = require('express');
const Pet = require('../models/Pet'); // ← nutzt dein Schema
const router = express.Router();

// Alle Tiere abrufen
router.get('/', async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

// Neues Tier hinzufügen
router.post('/', async (req, res) => {
  const newPet = new Pet(req.body);
  await newPet.save();
  res.status(201).json(newPet);
});

module.exports = router;
