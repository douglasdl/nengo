// routes/convert.js
const express = require('express');
const router = express.Router();
const { convertYear } = require('../controllers/nengoController');

// Define the conversion endpoint
router.get('/convert', (req, res) => {
  const year = parseInt(req.query.year, 10);
  
  if (isNaN(year)) {
    return res.status(400).json({ error: "Invalid year parameter" });
  }

  const results = convertYear(year);

  if (results.error) {
    return res.status(400).json(results);
  }

  res.json({
    westernYear: year,
    eras: results
  });
});

module.exports = router;