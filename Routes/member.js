var express = require('express')
var router = express.Router();
const Member =require('../Models/member');
const authntication=require("../middlewares/Authntication")

router.post('/',authntication,async (req,res,next)=>{

const member = new Member(req.body);
member.age=member.getAge(req.body.birthDate);
const memberSaved = await member.save();
res.json({
    memberSaved
})


})

router.get('/',authntication,async (req,res,next)=>{

    
    const member = await Member.find({});
 
    res.json({
        member
    })
    
    })

module.exports= router;