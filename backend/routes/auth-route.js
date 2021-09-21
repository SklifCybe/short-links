const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const router = Router();
const salt = Number(process.env.salt);
const jwtSecret = process.env.jwtSecret;

router.post(
  '/registration',
  [
    check('email', 'Incorrect email.').isEmail(),
    check('password', 'Small password, min symbols is 5.').isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: errors.array()[0].msg,
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'This user is exist.' });
      }

      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'User has been created.' });
    } catch (err) {
      res.status(500).json({ message: 'Something want wrong.' });
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'Incorrect email').normalizeEmail(),
    check('password', 'Incorrect password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: errors.array()[0].msg,
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password' });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

      res.status(200).json({ token, userId: user.id });
    } catch (err) {
      res.status(500).json({ message: 'Something want wrong.' });
    }
  },
);

module.exports = router;
