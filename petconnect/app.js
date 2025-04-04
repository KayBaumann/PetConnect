const express = require('express');
require('dotenv').config();
require('./config/database');
const petsRoute = require('./routes/pets');

const app = express();
app.use(express.json());

app.use('/api/pets', petsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is on Port ${PORT}`));
