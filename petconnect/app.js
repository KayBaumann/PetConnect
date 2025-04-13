const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');
const petsRoute = require('./routes/pets');
const authRoutes = require('./routes/auth'); // Ensure this is imported

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pets', petsRoute);
app.use('/api/auth', authRoutes); // Ensure this route is registered

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});