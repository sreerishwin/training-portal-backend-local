const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');
// const authenticateToken = require('../middlewares/auth')


router.post('/',async (req, res) => {
    try {
        const trainer = await Trainer.create(req.body);
        res.status(201).json(trainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/count',async(req,res)=> {
    try{
        const trainerCount = await Trainer.count();
        res.status(200).json({count:trainerCount});
    }catch(err){
        res.status(500).json({error:err.message});
    }
    
});

router.get('/', async (req, res) => {
    try {
        const trainers = await Trainer.findAll();
        res.json(trainers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id);
        if (trainer) res.json(trainer);
        else res.status(404).json({ error: 'Trainer not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const trainer = await Trainer.update(req.body, { where: { id: req.params.id } });
        res.json(trainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Trainer.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Trainer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
