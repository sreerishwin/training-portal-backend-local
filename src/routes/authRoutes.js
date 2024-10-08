// src/routes/authRoutes.js
const express = require('express');
const {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

module.exports = router;
