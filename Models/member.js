const mongoose = require('mongoose');
const {person}=require("./person");
const {options}=require("./person");
const getAge = require('get-age');
const _ = require('lodash');

const memberSchema=new mongoose.Schema({


 address:{type:String,required:true},
 birthDate:{type:Date,required:true},
 age:{type:Number,required:true},
 enteranceDate:{type:Date,required:true}

},{
    toJSON:{
        transform:(doc,ret)=>{
            return  _.omit(ret,[ '__v' ,'kind']);
        }
    }



},options);

memberSchema.methods.getAge=  function(birthDate){
  return getAge(birthDate);

}
const member=person.discriminator('member',memberSchema);
module.exports=member;