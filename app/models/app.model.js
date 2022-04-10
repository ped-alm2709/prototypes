const mongoose = require("mongoose");
const User = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
  });

module.exports = mongoose.model("User", User);
