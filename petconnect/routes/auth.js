const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  console.log('Login attempt:', identifier, password);

  try {
    const user = await User.findOne({ 
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });
    console.log('Gefundener User:', user);

    if (!user) {
      return res.status(401).json({ message: res.__('auth.invalid') });
    }

    res.status(200).json({ message: res.__('auth.success'), userId: user._id });
  } catch (err) {
    console.error('Fehler im Login:', err);
    res.status(500).json({ message: res.__('errors.server'), error: err });
  }
});

// Register
router.post('/register', async (req, res) => {
  console.log('Register route hit');
  const { username, firstName, lastName, email, password } = req.body;
  console.log('Register attempt:', email);

  try {
    if (!email || !password) {
      return res.status(400).json({ message: res.__('auth.missing_fields') });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: res.__('user.already_exists') });
    }

    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password,
    });

    const savedUser = await newUser.save();
    console.log('Saved user:', savedUser);

    res.status(201).json({ message: res.__('user.created'), userId: savedUser._id });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: res.__('errors.server'), error: err });
  }
});

// Get user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: res.__('user.not_found') });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: res.__('errors.server'), error: err.message });
  }
});

module.exports = router;