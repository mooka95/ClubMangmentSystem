const express = require('express');
var cors = require('cors');
const app = express()
require('express-async-errors');
const { port } = require("./config");
require('./db');

app.use(express.json());

app.use(cors());

const adminRoute=require("./Routes/admin");
const memberRoute=require("./Routes/member");
const handleError = require('./middlewares/handleError');


app.use('/admin',adminRoute);
app.use('/member',memberRoute);

app.use(handleError,(err,req,res,next)=>{

 err.statusCode=err.statusCode || 500;
 const handleError= err.statusCode<500 ? err.message:'something went Wrong ';
 res.status(err.statusCode).json({
    message:handleError,
    errors:err.errors || {}


 })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})