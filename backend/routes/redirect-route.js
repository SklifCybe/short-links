const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:code', async (req, res) => {
  try {
    const code = req.params.code;

    const link = await Link.findOne({ code });

    if (link) {
      link.clicks++;
      await link.save();
      return res.redirect(link.from);
    }

    res.status(404).json({ message: 'Link not found.' });
  } catch (err) {
    res.status(500).json({ message: 'Something want wrong.' });
  }
});

module.exports = router;
