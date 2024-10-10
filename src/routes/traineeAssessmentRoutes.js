const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const t_assessments = require('../models/traineeAssessment');
const Trainer = require('../models/trainer');
// const authenticateToken = require('../middlewares/auth')

router.post('/:id',async (req, res) => {
    try {
        const t_assessment = await t_assessments.create({ ...req.body, id: req.params.id });
        res.status(201).json(t_assessment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/count',async(req,res)=> {
    try{
        const t_assessmentCount = await t_assessments.count();
        res.status(200).json({count:t_assessmentCount});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

router.get('/',async(req,res) =>{
    try{
        const t_assessment = await t_assessments.findAll();
        res.status(201).json(t_assessment);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});


router.get('/score',async(req,res)=>{
    try{
        const scores = await t_assessments.findAll({
            where:{
                performance_score:{
                    [Op.or]:[
                        {[Op.gt]:90},
                        {[Op.gt]:80},
                        {[Op.gt]:75},
                        {[Op.gt]:30},

                    ]
                }
            },
            attributes:['title','performance_score']
        });
        res.status(200).json(scores);

    }catch(err){
        res.status(500).json({error:err.message});
    }
});





router.get('/statistics', async(req,res) =>{
    try{
        const completedAssessments = await t_assessments.findAll({
            where:{
                status:'completed'
            },
        });
        const pendingAssessments = await t_assessments.findAll({
            where:{
                status:'hold'
            }
        });
        const todoAssessments = await t_assessments.findAll({
            where:{
                status:'todo'
            }
        });
        const inprogressAssessments = await t_assessments.findAll({
            where:{
                status:'in_progress'
            }
        });
        res.status(200).json({ completedCount: completedAssessments.length,
            pendingCount:pendingAssessments.length,
            todoCount:todoAssessments.length,
            inprogressCount:inprogressAssessments.length
        });
        // console.log(t_assessment.length);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});


router.get('/:id',async(req,res) =>{
    try{
        const t_assessment = await t_assessments.findByPk(req.params.id);
        if(t_assessment) res.status(201).json(t_assessment);
        else res.status(404).json({error:'Trainee assessment not found.'});
    }catch(err){
        res.status(500).json({eror:err.message});
    }
});

// router.get('/trainer/:traineeId',async(req,res) =>{
//     try {
//         const traineeid = req.params.traineeId;
//         const assessments = await t_assessments.findAll({
//             where: {
//                 trainee_id: traineeid, 
//             },attributes:['title','id','due_date']
//         });
//         if (assessments.length > 0) {
            
//             res.status(200).json({assessments});
//         } else {
//             res.status(404).json({ error: 'No assessments found for this trainee.' });
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


router.put('/:id',async(req,res)=>{
    try{
        const t_assessment = await t_assessments.update(req.body,{where :{id:req.params.id}});
        res.json(t_assessment);
    }catch(err){
        req.status(500).json({error:err.message});
    }
});


router.delete('/:id',async(req,res)=>{
    try{
        await t_assessment.destroy({where:{id:req.params.id}});
        res.json({message:'Trainee Assesssment deleted'});
    }catch(err){
        res.status(500).json({ error: err.message });       
    }
});


module.exports = router;
