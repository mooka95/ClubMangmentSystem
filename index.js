const express = require('express')
const app = express()
require('express-async-errors');
const { port } = require("./config");
require('./db');

app.use(express.json());



const adminRoute=require("./Routes/admin");
const memberRoute=require("./Routes/member");

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/admin',adminRoute);
app.use('/member',memberRoute);

app.use((err,req,res,next)=>{

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