const express = require('express');
const Pet = require('../models/Pet');
const router = express.Router();

// All pets  
router.get('/', async (req, res) => {
  console.log('GET /api/pets request received'); // Log the request
  try {
    const pets = await Pet.find(); // Fetch all pets from MongoDB
    console.log('Pets fetched from database:', pets); // Log the fetched pets
    res.json(pets); // Return pets as JSON
  } catch (err) {
    console.error('Error fetching pets:', err); // Log the error
    res.status(500).json({ message: 'Error fetching pets', error: err.message });
  }
});

// add new pet
router.post('/', async (req, res) => {
  const newPet = new Pet(req.body);
  await newPet.save();
  res.status(201).json(newPet);
});

// edit pet
router.put('/:id', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) return res.status(404).json({ message: 'Pet not found' });
    res.json(updatedPet);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
});

// delete pet
router.delete('/:id', async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet deleted', deletedPet });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err });
  }
});

module.exports = router;