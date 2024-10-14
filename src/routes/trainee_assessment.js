const express = require('express');
const router = express.Router();
const t_assessments = require('../models/trainee_assessments');
// const authenticateToken = require('../middlewares/auth')

router.post('/',async (req, res) => {
    try {
        const t_assessment = await t_assessments.create(req.body);
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

router.get('/:id',async(req,res) =>{
    try{
        const t_assessment = await t_assessments.findByPk(req.params.id);
        if(t_assessment) res.status(201).json(t_assessment);
        else res.status(404).json({error:'Trainee assessment not found.'});
    }catch(err){
        res.status(500).json({eror:err.message});
    }
});


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
