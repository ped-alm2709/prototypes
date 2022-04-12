const mongoose = require("mongoose");
require('dotenv').config();

const dataBase = () => mongoose.connect(
  process.env.URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB');
  }
);

module.exports = dataBase;
