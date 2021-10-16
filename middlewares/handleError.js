const CustomError = require("../helpers/CustomError")

module.exports=(err,req,res,next)=>{
 switch(err.code){
    case 11000:
        throw new CustomError('Email Already exists',409);
        break;
        default:
            next();



 }







    
}