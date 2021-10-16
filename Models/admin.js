const mongoose = require('mongoose');
const {person}=require("./person");
const {options}=require("./person");
const bcrypt = require('bcrypt');
const  {  saltRounds ,jwtSecret} =require('../config');
const _ = require('lodash');
const util = require('util');
const jwt = require('jsonwebtoken');
const signJwt=  util.promisify(jwt.sign);
const verifyJwt=util.promisify(jwt.verify);

const adminSchema=new mongoose.Schema({


 password:{type:String,required:true,minlength:4},
 token:{type:String}


},{
    toJSON:{
        transform:(doc,ret)=>{
            return  _.omit(ret,[ '__v' , 'password','kind']);
        }
    }



},options);

adminSchema.pre('save', async function(){
  if(this.isModified('password'))
  this.password= await bcrypt.hash(this.password,saltRounds);
});

adminSchema.methods.checkPassword= async function(plainPassword){
 return await bcrypt.compare(plainPassword,this.password);

}
adminSchema.methods.generateToken= async function(){

   return await  signJwt({id:this.id},jwtSecret,{expiresIn:'1m'})
}

adminSchema.statics.getAdminFromToken= async function(token){
    const { id }= await verifyJwt(token,jwtSecret);
    const admin =this.findById(id);
    return admin;
}


const admin = person.discriminator('admin',adminSchema);
module.exports=admin;