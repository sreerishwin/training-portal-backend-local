const express = require('express');
const router = express.Router();
const assessments = require('../models/assessments');
const traineeAssessments = require('../models/traineeAssessment');
const Trainee = require('../models/trainee');
const Trainer = require('../models/trainer');
const TraineeAssessment = require('../models/traineeAssessment');
const { describe } = require('node:test');
// const authenticateToken = require('../middlewares/auth')

router.post('/',async (req, res) => {
    try {
        const assessment = await assessments.create({ ...req.body, assessment_name: req.body.title });
        const traineeAssessment = await TraineeAssessment.create({ ...req.body, assessment_id: assessment.id, status: req.body.traineeStatus })
        res.status(201).json(assessment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/count',async(req,res)=> {
    try{
        const assessmentCount = await assessments.count();
        res.status(200).json({count:assessmentCount});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

router.get('/',async(req,res) =>{
    try{
        const assessment = await assessments.findAll();
        res.status(201).json(assessment);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

router.get('/latest',async(req,res) =>{
    try {
        const fetchedAssessments = await assessments.findAll();
        const responseAssessments = await Promise.all(fetchedAssessments.map(async (assessment) => {
            const trainer = await Trainer.findByPk(assessment.created_by);
            return { id: assessment.id, title: assessment.assessment_name, due_date: assessment.duration, createdBy: trainer.name}
        }));
        res.status(201).json({ assessments: responseAssessments });
    } catch(err){
        res.status(500).json({error:err.message});
    }
});


router.get("/performance/:trainerId", async (req, res) => {
    try {
        const trainerId = req.params.trainerId;
        const fetchedAssessments = await assessments.findAll({
            where: {
                created_by: trainerId,    
            }
        });
        const perf = await Promise.all(fetchedAssessments.map(async (assessment) => {
            const perf = {
                "greaterThan90": 0,
                "greaterThan80": 0,
                "greaterThan75": 0,
                "greaterThan60": 0,
            };
            const traineeAssessments = await TraineeAssessment.findAll({
                where: {
                    assessment_id: assessment.id,
                }
            });
            traineeAssessments.forEach(traineeAssessment => {
                if (traineeAssessment.performance_score > 90) {
                    perf.greaterThan90++;
                } else if (traineeAssessment.performance_score > 80) {
                    perf.greaterThan80++;
                } else if (traineeAssessment.performance_score > 75) {
                    perf.greaterThan75++;
                } else if (traineeAssessment.performnace_score > 60) {
                    perf.greaterThan60++;
                }
            });
            let t = [
                {
                    value: perf.greaterThan90,
                    label: "Greater than 90"
                },
                {
                    value: perf.greaterThan80,
                    label: "Greater than80"
                },
                {
                    value: perf.greaterThan75,
                    label: "Greater than 75"
                },
                {
                    value: perf.greaterThan60,
                    label: "Greater than 60"
                }

            ]
            return { id: assessment.id, title: assessment.assessment_name, createdBy:assessment.created_by, description: assessment.description, perf: t};
        }));
        return res.status(201).json(perf);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
})

// router.get('/performance/:traineeId',async(req,res) =>{
//     try{
//         const trainerAssessmemts = await assessment.findAll({
//             where:{}
//         })
//     } catch(err){
//         res.status(500).json({error:err.message});
//     }
// });

router.get('/active',async(req,res) =>{
    try{
        const assessment = await assessments.findAll({
            where:{
                status:'completed'
            },
        });
        res.status(201).json(assessment.length);
        console.log(assessment.length);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});


router.get('/:id',async(req,res) =>{
    try{
        const assessment = await assessments.findByPk(req.params.id);
        if(assessment) res.status(201).json(assessment);
        else res.status(404).json({error:'Assessment not found.'});
    }catch(err){
        res.status(500).json({eror:err.message});
    }
});


router.put('/:id',async(req,res)=>{
    try{
        const assessment = await assessments.update(req.body,{where :{id:req.params.id}});
        res.json(assessment);
    }catch(err){
        req.status(500).json({error:err.message});
    }
});


router.delete('/:id',async(req,res)=>{
    try{
        await assessment.destroy({where:{id:req.params.id}});
        res.json({message:' Assesssment deleted'});
    }catch(err){
        res.status(500).json({ error: err.message });       
    }
});


module.exports = router;
