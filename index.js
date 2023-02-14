const express  = require('express');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const fileUpload = require('express-fileupload');
app.use(fileUpload())
const connecttodb =require('./config/conn')
require('dotenv').config({path:'./.env'})

connecttodb();

const auth = require('./Routes/auth')
const userRoute= require('./Routes/userRoute')
const postRoute = require('./Routes/postRoute')
const fileRoute = require('./Routes/fileroute')
app.use('/api/user',userRoute) 
app.use('/api/post',postRoute)
app.use('/api/auth',auth)
//app.use('/api/file',fileRoute)

app.post('/api/test/',(req,res)=>{
  console.log(req.body)
  res.send(req.body)
})

app.post('/api/file/upload', function(req, res) {

    const file = req.files.file
 


    let {name} =file

  name=  name.replaceAll(' ','')
 

   if (req.files===null || Object.keys(req.files).length === 0) {
     return res.status(400).send('No files were uploaded.');
   }
 
 
    
  // uploadPath = __dirname + '/../uploads/' + file.name;
 
 uploadPath =`${__dirname}/client/public/uploads/${name}`
 
 console.log(uploadPath)
   // Use the mv() method to place the file somewhere on your server
   file.mv(uploadPath, function(err) {
     if (err)
       return res.status(500).send(err);
 
   res.json({filename:name,filepath:`/uploads/${name}`})
   });
 

})



app.listen(5000,()=>console.log('server started  on port 5000'))