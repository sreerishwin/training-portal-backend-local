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
        const { token, username, status } = await UserService.login(email, password);

        res.json({ token, email, password, username, status });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }

};

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        await UserService.requestPasswordReset(email);
        res.json({ message: 'Verification code sent to your email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await UserService.verifyCode(email, code);
        res.json({ message: 'Verification code verified', userId: user.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { userId } = req.params; 
    const { newPassword } = req.body;

    try {
        await UserService.resetPassword(userId, newPassword);
        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
         return res.json(user);
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

exports.deleteUser = async (req, res) => {
    try {
        const user = await UserService.deleteUser(req.params.id);
        res.status(200).json({ message: 'User status changed to Deleted', user });
    } catch (error) {
        res.status(500).json({ message: 'Error changing user status', error: error.message });
    }
};




};
