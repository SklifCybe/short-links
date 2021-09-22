const { Router } = require('express');
require('dotenv').config();
const shortid = require('shortid');
const router = Router();
const Link = require('../models/Link');
const auth = require('../middleware/auth-middleware');
const baseUrl = process.env.baseUrl;

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({ message: 'Something want wrong.' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.status(200).json(link);
  } catch (err) {
    res.status(500).json({ message: 'Something want wrong.' });
  }
});

router.post('/generate', auth, async (req, res) => {
  try {
    const from = req.body.from;

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.status(200).json({ link: existing });
    }

    const code = shortid.generate();

    const to = baseUrl + '/t/' + code;

    const link = await new Link({
      from,
      to,
      code,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ message: 'Link has been generate.' });
  } catch (err) {
    res.status(500).json({ message: 'Something want wrong.' });
  }
});

module.exports = router;
