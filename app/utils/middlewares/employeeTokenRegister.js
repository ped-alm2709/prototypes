const jwtGenerateToken = require("../jwtToken/jwtGenerateToken")

const employeeTokenRegister = async (req, res) => {
  const { email } = req.body;
  const db = await dbConnection();
  try {
    const user = await db.collection('users').findOne({ email });
    const token = jwtGenerateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).end();
  }
};

module.exports = employeeTokenRegister;