const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // List users
  res.send('Users list');
});

router.get('/:id', (req, res) => {
  // Get user by ID
  res.send(`User with ID: ${req.params.id}`);
});

module.exports = router;