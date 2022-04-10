const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerateToken = (user) => {
  const {  name, email } = user; 
  const token = jwt.sign(
    { name, email },
    process.env.JWT_SECRET,
  );
  return token;
};

module.exports = jwtGenerateToken;
