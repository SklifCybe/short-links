const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.jwtSecret;

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Nope authorization.' });
    }

    const decode = jwt.verify(token, jwtSecret);

    req.user = decode;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Nope authorization.' });
  }
};
