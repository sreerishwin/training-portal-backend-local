// src/controllers/authController.js
const UserService = require('../services/UserService');

exports.register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const user = await UserService.register(username, email, password, confirmPassword);
        res.status(201).json({ message: 'User created', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await UserService.login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { password, confirmPassword, ...updates } = req.body;
        const user = await UserService.updateUser(req.params.id, updates, confirmPassword);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await UserService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
