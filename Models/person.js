const mongoose = require('mongoose');


const options = { discriminatorKey: 'kind' };

const personSchema = new mongoose.Schema({
    name:{type:String,required:true},    
    email: {
      type:String,
      required:true,
      unique:true
    }
  },
  options);
const person = mongoose.model('Person', personSchema);
module.exports={person,options};




// class PersonClass {
   
    

//     constructor(email,name){
//        this.email=email;
//        this.name=name;
//     }


// }

// const personSchema = new mongoose.Schema({

//       });
//       personSchema.loadClass(PersonClass);
//       const person = mongoose.model('Persons', personSchema);

//       module.exports=person;
