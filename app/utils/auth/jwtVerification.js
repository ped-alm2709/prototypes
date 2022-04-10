const jwt = require('jsonwebtoken');
const { detail } = require("../../controllers/app.controller")
require('dotenv').config();

const jwtVerification = (req, res, next) => {
  const token = req.header.authorization;
  if (!token) {
    return res.status(401).json({ message: "Missing authorization token!" });
  } 
  try {
    const { user: { email } } = jwt.verify(token, process.env.JTW_SECRET);
    const user = await detail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "JWT malformed!" })
  }
};

module.exports = jwtVerification;
