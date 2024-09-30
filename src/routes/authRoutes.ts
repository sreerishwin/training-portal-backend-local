import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  // Handle login
  res.send('Login endpoint');
});

router.post('/register', (req, res) => {
  // Handle registration
  res.send('Register endpoint');
});

export default router;