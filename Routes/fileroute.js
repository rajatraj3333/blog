const express = require('express');

const Router=express.Router();
const app = express();

// default options





Router.post('/upload', function(req, res) {

   const file = req.files.file

   // console.log(file);
    console.log(typeof req.files.file.name);

  if (req.files===null || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }


   
 // uploadPath = __dirname + '/../uploads/' + file.name;

uploadPath =`${__dirname}/../client/uploads/${file.name.replaeAll(' ','')}`
 
console.log(uploadPath)
  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

  res.json({filename:file.name,filepath:`/uploads/${file.name.replaeAll(' ','')}`})
  });
});

module.exports= Router