const express = require('express')
const router = express.Router();
const Admin =require('../Models/admin');
const CustomError=require("../helpers/CustomError");
const { check
 } = require('express-validator');
const validateRequest=require('../middlewares/validateRequest');

router.post('/signup',validateRequest([
    check('email').exists(),
    check('email').isEmail(),
    check('password').exists(),
    check('password').isLength({ min: 4 }),

]),  async (req,res,next)=>{

const admin = new Admin(req.body);
const adminSaved = await admin.save();
res.json({
    adminSaved
})});


router.post('/login',  async (req,res,next)=>{
    const admin = await Admin.findOne({email:req.body.email});
    if(!admin){
        throw  new CustomError("Wrong userName or password",401);
    }
    const isMatch=  admin.checkPassword(req.body.password);
    if(!isMatch){
        throw  new CustomError("Wrong userName or password",401);
    }
    let token =  await admin.generateToken();

  res.json({
      admin,
      token,
      "message":"Logged In Succesfully"
  })

})

module.exports= router;

