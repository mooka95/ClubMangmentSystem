const CustomError = require("../helpers/CustomError")

module.exports=(err,req,res,next)=>{
 if(err.message ==='jwt expired'){
     throw new CustomError("please login first",401)
 }
 if(err.code===11000)
 throw new CustomError("Email already Exists",409)


else
next();





    
}