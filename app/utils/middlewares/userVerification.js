const verifyUser = async (req, _res, next) => {
  const { user } = req;
  try {
    if (!user) {
      return res.status(401).json('Employee not registered!');
    }
    
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = verifyUser;