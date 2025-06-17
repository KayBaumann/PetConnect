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

// Alle Tiere eines Users laden
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Ungültige Benutzer-ID' });
  }

  try {
    const pets = await Pet.find({ fk_userId: userId });
    res.json(pets);
  } catch (err) {
    console.error('Fehler beim Laden der Nutzertiere:', err.message);
    res.status(500).json({ message: 'Fehler beim Abrufen', error: err.message });
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

const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  console.log('📥 Create advertisement route hit');
  console.log('📦 Incoming request body:', JSON.stringify(req.body, null, 2));

  const {
    name,
    type,
    breed,
    age,
    gender,
    location,
    vaccinated,
    description,
    image,
    fk_userId
  } = req.body;

  try {
    // 🧱 Pflichtfelder prüfen
    if (!name || !type || !breed) {
      return res.status(400).json({ message: res.__('pet.missing_fields') });
    }

    // 🆔 ObjectId validieren
    if (!mongoose.Types.ObjectId.isValid(fk_userId)) {
      console.warn('⚠️ Ungültige Benutzer-ID erhalten:', fk_userId);
      return res.status(400).json({ message: 'Ungültige Benutzer-ID' });
    }

    // 🐶 Neues Tierinserat erstellen
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
      fk_userId: new mongoose.Types.ObjectId(fk_userId) // 🧠 entscheidend!
    });

    // 💾 Speichern
    const savedPet = await newPet.save();
    console.log('✅ Saved advertisement:', savedPet);

    res.status(201).json({ message: res.__('pet.created'), petId: savedPet._id });
  } catch (err) {
    console.error('❌ Error during advertisement creation:', err.message);
    console.error(err.stack);
    res.status(500).json({
      message: res.__('errors.server'),
      error: err.message
    });
  }
});



router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      type,
      breed,
      age,
      adopted,
      image,
      description,
      gender,
      location,
      vaccinated
    } = req.body;

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      {
        name,
        type,
        breed,
        age,
        adopted,
        image,
        description,
        gender,
        location,
        vaccinated
      },
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