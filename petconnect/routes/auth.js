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
  

module.exports = router;