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

    
    const members = await Member.find({});
 
    res.json({
        members
    })
    
    })


    router.delete('/:id', authntication,async (req,res,next)=>{
       await Member.deleteOne({_id:req.params.id});
       const members = await Member.find({});

     res.json({
         members,
         "message":"deleted Succesfully"
     })
      

    })

    router.put('/',authntication,async (req,res,next)=>{

        const member = new Member(req.body);
        member.age=member.getAge(req.body.birthDate);

        const updatedMember= await Member.updateOne({_id:req.body._id},member);

        res.json({

            updatedMember
        })






    })

module.exports= router;