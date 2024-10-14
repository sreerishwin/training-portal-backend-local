const express = require('express');
const router = express.Router();
const Roles = require('../models/roles');
// const authenticateToken = require('../middlewares/auth')


router.post('/', async (req, res) => {
    try {
        const roles = await Roles.create(req.body);
        res.status(201).json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/',async(req,res) =>{
    try{
        const roles = await Roles.findAll();
        res.status(201).json(roles);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

router.get('/:id',async(req,res) =>{
    try{
        const roles = await Roles.findByPk(req.params.id);
        if(roles) res.status(201).json(roles);
        else res.status(404).json({error:'Role not found.'});
    }catch(err){
        res.status(500).json({eror:err.message});
    }
});



router.put('/:id',async(req,res)=>{
    try{
        const roles = await Roles.update(req.body,{where :{id:req.params.id}});
        res.json(roles);
    }catch(err){
        req.status(500).json({error:err.message});
    }
});


router.delete('/:id',async(req,res)=>{
    try{
        await Roles.destroy({where:{id:req.params.id}});
        res.json({message:'Role deleted'});
    }catch(err){
        res.status(500).json({ error: err.message });       
    }
});

module.exports = router;
