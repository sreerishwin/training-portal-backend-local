const express = require('express');
const router = express.Router();
const Trainee = require('../models/trainee');
const t_assessment = require('../models/traineeAssessment');
const assessment = require('../models/assessments');

const { Op } = require('sequelize');
const Assessment = require('../models/assessments');
const Trainer = require('../models/trainer');
const { get } = require('http');
const { create } = require('domain');

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


router.get('/task/:traineeId', async (req, res) => {
    try {
        const traineeId = req.params.traineeId;
        const tr_assessments = await t_assessment.findAll({
            where: { 
                trainee_id: traineeId,
            }
        });
        console.log("TR assessments", tr_assessments)
        const result = await  Promise.all(tr_assessments.map(async (tr_assessment) => {
            const assessment = await  Assessment.findByPk(tr_assessment.assessment_id)
            console.log("Assessment", assessment)
            const trainer = await getTrainerById(assessment.created_by);
            const createdBy = trainer.name;
            console.log("CREATED BY", createdBy)
            return { ...(tr_assessment.toJSON()), ...(assessment.toJSON()), createdBy: createdBy}
        }));
        console.log("RESTULT", result)
        return res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

async function getTrainerById(id) {
    console.log("ID", id)
    const trainer = await Trainer.findByPk(id);
    console.log("TRAINER", trainer);
    return trainer
}

router.put('/:id', async (req, res) => {
    try {
        const trainee = await Trainee.update(req.body, { where: { id: req.params.id } });
        res.json(trainee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id/remove',async(req,res)=>{
    try{
        const traineeId = req.params.id;
        const trainee = await Trainee.findByPk(traineeId);
        if (trainee){
            if (trainee.status == 'Active'){
                trainee.status = 'Inactive';
                await trainee.save();
                res.status(200).send('Updated');
            }else{
                res.send("Trainee not active");
            }
        }else{
            res.send("Trainee not found");
        }

    }catch(err){
        res.status(500).json({error:err.message});
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
