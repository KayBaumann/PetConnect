// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  try {
    const { fromUserId, petId, text } = req.body;

    if (!fromUserId || !petId || !text) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newMessage = new Message({
      fromUserId,
      petId,
      text,
      date: new Date()
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

const Pet = require('../models/Pet');

router.get('/owner/:ownerId', async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

    const pets = await Pet.find({ fk_userId: ownerId }).select('_id');
    const petIds = pets.map(p => p._id);

    const messages = await Message.find({ petId: { $in: petIds } }).populate('petId');
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error loading messages for user pets:', err);
    res.status(500).json({ message: 'Error loading messages' });
  }
});

