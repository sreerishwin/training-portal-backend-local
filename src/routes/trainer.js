const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');
const Assessment = require('../models/traineeAssessment');
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

router.get('/:id/assessments',async(req,res)=>{
    try{
        const assess= await Assessment.findAll({
            where:{
                created_by: req.params.id
            }
        });
        res.status(200).json(assess);
    }catch{
        res.status(500);
    }
})

router.post('/:id/assessments',async(req,res)=>{
    const { title, description, duration, status } = req.body;
    try{
        const assess = await Assessment.create({
            assessment_name: title,
            description: description,
            duration: duration,
            status:status,
            created_by: req.params.id
        });
        await trainee_assessment.create({
            
        })
     res.status(200).json({ message: "Assessment Created"});
    }catch{
        res.status(500);
    }
})

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



router.delete('/remove/:id',async(req,res)=>{
    try{
        const trainerId = req.params.id;
        const trainer = await Trainer.findByPk(trainerId);
        if (trainer){
            if (trainer.status == 'Active' || trainer.status == 'active'){
                trainer.status = 'Deleted';
                await trainer.save();
                res.status(200).send('Updated');
            }else{
                res.send("Trainer not active");
            }
        }else{
            res.send("Trainer not found");
        }

    }catch(err){
        res.status(500).json({error:err.message});
    }

    
});


module.exports = router;
