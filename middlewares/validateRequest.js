const {  validationResult } = require('express-validator');
const CustomError = require('../helpers/CustomError');
const _ = require('lodash');



module.exports=(validatorsArray)=> async (req,res,next)=>{
 
    const promises=validatorsArray.map(validator=>validator.run(req));
    await Promise.all(promises);
    const { errors } = await validationResult(req);
    if (errors.length){
        throw new CustomError('Validation error',422,_.keyBy(errors,'param'));

    }
    next();
}