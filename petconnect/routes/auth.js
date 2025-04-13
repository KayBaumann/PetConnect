const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password);
  
    try {
      const user = await User.findOne({ email });
      console.log('Gefundener User:', user);
  
      if (!user) {
        return res.status(401).json({ message: 'Email nicht gefunden' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ message: 'Falsches Passwort' });
      }
  
      res.status(200).json({ message: 'Login erfolgreich', userId: user._id });
    } catch (err) {
      console.error('Fehler im Login:', err);
      res.status(500).json({ message: 'Serverfehler', error: err });
    }
  });
  
// Register
router.post('/register', async (req, res) => {
  console.log('Register route hit'); // Log to confirm the route is hit
  const { email, password } = req.body;
  console.log('Register attempt:', email, password); // Log the incoming data

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = new User({ email, password });
    const savedUser = await newUser.save();
    console.log('Saved user:', savedUser); // Log the saved user

    res.status(201).json({ message: 'Registration successful', userId: savedUser._id });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;