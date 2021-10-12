const CustomError = require("../helpers/CustomError");
const Admin = require("../Models/admin");





module.exports=  async (req,res,next)=>{

const token =req.headers.authorization;
if(!token){
 throw new CustomError("Please Login First ",401)

}
req.admin= await Admin.getAdminFromToken(token);


if(!req.admin){
    throw new CustomError("Please Login First ",401);
}
next();




}