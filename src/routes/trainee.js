const express = require('express');
const router = express.Router();
const Trainee = require('../models/trainee');
const { Op } = require('sequelize');

// const authenticateToken = require('../middlewares/auth')


router.post('/',async (req, res) => {
    try {
        const trainee = await Trainee.create(req.body);
        res.status(201).json(trainee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/count',async(req,res)=> {
    try{
        const traineeCount = await Trainee.count();
        res.status(200).json({count:traineeCount});
    }catch(err){
        res.status(500).json({error:err.message});
    } 
});

router.get('/',async (req, res) => {
    try {
        const trainees = await Trainee.findAll();
        res.json(trainees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/new/count',async (req, res) => {
    try {
        const currDate = new Date();
        console.log(currDate);
        currDate.setDate(currDate.getDate()-10);

        const trainee = await Trainee.findAll({
            where:{
                joinedDate:{
                    [Op.gte]:currDate,
                },
            },
        });
        console.log(currDate);
        console.log(trainee)
        res.json({ count: trainee.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const trainee = await Trainee.findByPk(req.params.id);
        if (trainee) res.json(trainee);
        else res.status(404).json({ error: 'Trainee not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const trainee = await Trainee.update(req.body, { where: { id: req.params.id } });
        res.json(trainee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id',async (req, res) => {
    try {
        await Trainee.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Trainee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
