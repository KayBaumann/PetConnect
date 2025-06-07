const express = require('express');
const Pet = require('../models/Pet');
const router = express.Router();

// Get all pets
router.get('/', async (req, res) => {
  console.log('GET /api/pets request received');
  try {
    const pets = await Pet.find();
    console.log('Pets fetched from database:', pets);
    res.json(pets);
  } catch (err) {
    console.error('Error fetching pets:', err);
    res.status(500).json({ message: res.__('errors.server'), error: err.message });
  }
});

// Get a single pet by ID
router.get('/:id', async (req, res) => {
  console.log(`GET /api/pets/${req.params.id} request received`);
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: res.__('pet.not_found') });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: res.__('errors.server'), error: err.message });
  }
});

// Create a new pet
router.post('/', async (req, res) => {
  console.log('Create advertisement route hit');
  const { name, type, breed, age, gender, location, vaccinated, description, image } = req.body;
  console.log('Create advertisement attempt:', name);

  try {
    if (!name || !type || !breed) {
      return res.status(400).json({ message: res.__('pet.missing_fields') });
    }

    const newPet = new Pet({
      name,
      type,
      breed,
      age,
      gender,
      location,
      vaccinated,
      description,
      image,
    });

    const savedPet = await newPet.save();
    console.log('Saved advertisement:', savedPet);

    res.status(201).json({ message: res.__('pet.created'), petId: savedPet._id });
  } catch (err) {
    console.error('Error during advertisement creation:', err);
    res.status(500).json({ message: res.__('errors.server'), error: err });
  }
});

// Update a pet
router.put('/:id', async (req, res) => {
  try {
    const { name, type, breed, age, adopted, image, description } = req.body;

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { name, type, breed, age, adopted, image, description },
      { new: true, runValidators: true }
    );

    if (!updatedPet) return res.status(404).json({ message: res.__('pet.not_found') });
    res.json({ message: res.__('pet.updated'), pet: updatedPet });
  } catch (err) {
    res.status(500).json({ message: res.__('errors.server'), error: err.message });
  }
});

// Delete a pet
router.delete('/:id', async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: res.__('pet.not_found') });
    res.json({ message: res.__('pet.deleted'), deletedPet });
  } catch (err) {
    res.status(500).json({ message: res.__('errors.server'), error: err.message });
  }
});

module.exports = router;