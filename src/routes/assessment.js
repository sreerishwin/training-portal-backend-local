const express = require('express');
const router = express.Router();
const Assessment = require('../models/assessments');

router.post('/', async (req, res) => {
    try {
        const assessment = await Assessment.create(req.body);
        res.status(201).json(assessment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/',async(req,res) =>{
    try{
        const assessment = await Assessment.findAll();
        res.status(201).json(assessment);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

router.get('/:id',async(req,res) =>{
    try{
        const assessment = await Assessment.findByPk(req.params.id);
        if(assessment) res.status(201).json(assessment);
        else res.status(404).json({error:'Trainee not found.'});
    }catch(err){
        res.status(500).json({eror:err.message});
    }
});


// // Get Single Trainee
// router.get('/:id', async (req, res) => {
//     try {
//         const trainee = await Trainee.findByPk(req.params.id);
//         if (trainee) res.json(trainee);
//         else res.status(404).json({ error: 'Trainee not found' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

router.put('/:id',async(req,res)=>{
    try{
        const assessment = await Assessment.update(req.body,{where :{id:req.params.id}});
        res.json(assessment);
    }catch(err){
        req.status(500).json({error:err.message});
    }
});

// // Update Trainee
// router.put('/:id', async (req, res) => {
//     try {
//         const trainee = await Trainee.update(req.body, { where: { id: req.params.id } });
//         res.json(trainee);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

router.delete('/:id',async(req,res)=>{
    try{
        await Assessment.destroy({where:{id:req.params.id}});
        res.json({message:'Assesssment deleted'});
    }catch(err){
        res.status(500).json({ error: err.message });       
    }
});

// // Delete Trainee
// router.delete('/:id', async (req, res) => {
//     try {
//         await Trainee.destroy({ where: { id: req.params.id } });
//         res.json({ message: 'Trainee deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;
