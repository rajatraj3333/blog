const moongoose=require('mongoose')
const express = require('express');
const ObjectId =moongoose.Types.ObjectId
const user =require('../Model/Usermodel')

const auth  = require('../Controller/auth')

const router = express.Router();


router.get('/',auth,async(req,res)=>{
console.log('auth');

    const respond =await user.findOne({_id:ObjectId(req.user)}).select('-hashpassword').populate('allpost').exec()

res.send(respond)

})

module.exports=router