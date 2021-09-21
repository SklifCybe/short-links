const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const mongoUri = process.env.mongoUri;

app.use(express.json());
app.use('/api/auth', require('./routes/auth-route'));

const start = async () => {
  try {
    await mongoose.connect(mongoUri);
    app.listen(PORT, () => {
      console.log(`Server has been started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error from connect to DB', err.message);
    process.exit(1);
  }
};

start();
