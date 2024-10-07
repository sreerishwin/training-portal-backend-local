const express = require('express');
const router = express.Router();
const Trainee = require('../models/trainee');
// const authenticateToken = require('../middlewares/auth')


// Create Trainee
router.post('/',async (req, res) => {
    try {
        const trainee = await Trainee.create(req.body);
        res.status(201).json(trainee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Trainees
router.get('/',async (req, res) => {
    try {
        const trainees = await Trainee.findAll();
        res.json(trainees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Single Trainee
router.get('/:id', async (req, res) => {
    try {
        const trainee = await Trainee.findByPk(req.params.id);
        if (trainee) res.json(trainee);
        else res.status(404).json({ error: 'Trainee not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Trainee
router.put('/:id', async (req, res) => {
    try {
        const trainee = await Trainee.update(req.body, { where: { id: req.params.id } });
        res.json(trainee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Trainee
router.delete('/:id',async (req, res) => {
    try {
        await Trainee.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Trainee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
