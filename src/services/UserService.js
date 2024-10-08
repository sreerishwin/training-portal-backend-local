// src/services/UserService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    static async register(username, email, password, confirmPassword) {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        return user;
    }

    static async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

    static async getAllUsers() {
        return await User.findAll();
    }

    static async getUserById(id) {
        return await User.findByPk(id);
    }

    static async updateUser(id, updates, confirmPassword) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');

        if (updates.password && updates.password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        await user.update(updates);
        return user;
    }

    static async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        await user.destroy();
        return user;
    }
}

module.exports = UserService;
