const express = require('express');
const router = express.Router();

// Define routes
router.get('/products', (req, res) => {
  res.send('List of products');
});

router.get('/product/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Details of product ${userId}`);
});

module.exports = router;