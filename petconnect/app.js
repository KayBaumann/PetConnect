const express = require('express');
const cors = require('cors');
const path = require('path');
const i18n = require('i18n');
require('dotenv').config();
require('./config/database');

const petsRoute = require('./routes/pets');
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donation');
const shelterRoutes = require('./routes/shelter');
const messageRoutes = require('./routes/messages'); // <-- Wichtig!

const app = express();

i18n.configure({
  locales: ['en', 'de', 'fr'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  objectNotation: true,
  queryParameter: 'lang',
  autoReload: true,
  updateFiles: false
});

app.use(i18n.init);

app.use((req, res, next) => {
  const lang = req.query.lang || req.headers['accept-language']?.split(',')[0] || 'en';
  i18n.setLocale(req, lang);
  next();
});

app.use(cors({
    origin: ['http://localhost:5173', 'https://api.petconnect.bbzwinf.ch'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api/pets', petsRoute);
app.use('/api/auth', authRoutes);
app.use('/api', donationRoutes);
app.use('/api/shelters', shelterRoutes);
app.use('/api/messages', messageRoutes); // <-- Route einbinden

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

app.get('/health', (req, res) => {
  res.send('API läuft 🟢');
});
