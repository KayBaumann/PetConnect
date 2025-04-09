const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');
const petsRoute = require('./routes/pets');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pets', petsRoute);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is on Port ${PORT}`));