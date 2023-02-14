const express = require("express");
const {randomBytes,scryptSync, timingSafeEqual}=require('crypto')
const user= require('../Model/Usermodel');
const { TIMEOUT } = require("dns");
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');



async function Registeruser(obj){


    console.log(process.env.SEC_KEY);
let result ={}

for (const key in obj) 
{
 (obj[key]==='')?result.message=`${key}:Must be not an empty`:result={}
}



if (result.hasOwnProperty('message')===false)
{

async function check(){
const u = await user.findOne({email:obj.email})

return u===null?true:false



}





if(await check()){
const  salt = randomBytes(16).toString('hex');


const hashedpassword = scryptSync(obj.password,salt,64).toString('hex');


obj.hashpassword=`${salt}:${hashedpassword}`

const {username,email,hashpassword}=obj


const userdata = Object.freeze({
    _id:new mongoose.Types.ObjectId,
    username,
    email,
    hashpassword,
    createdAt:`${new Date().toLocaleDateString()}:${new Date().toLocaleTimeString()}`

})


try {

let userfetchdata =   (await new user(userdata).save())._id;



if(userfetchdata!==undefined) {

const token = jwt.sign({token:userfetchdata},process.env.SEC_KEY,{expiresIn:'1h'})
return {token:token}

}

} catch (error) {
  return error
}



}

else{
    return 'User Already Exists'
}


}

else{

return result.message

}

}

async function loginuser(obj){
    console.log("test:"+process.env.SEC_KEY);

    const finduser = await user.findOne({email:obj.email},{createdAt:0})
if(finduser!==null){
    const [salt,key]=finduser.hashpassword.split(':')
const unhashed =scryptSync(obj.password,salt,64)
const keybuff =Buffer.from(key,'hex')


const rd = Object.freeze({
    username:finduser.username,
    _id:finduser._id,
    email:finduser.email,
    allpost:finduser.allpost 
})

const match = timingSafeEqual(unhashed,keybuff)

if(match){
    const token = jwt.sign({token:rd._id},process.env.SEC_KEY,{expiresIn:'1h'})
    console.log(token)
    return {token:token}
}

else{
return {message:'Invalid Credential'}
}

}
}

module.exports={Registeruser,loginuser}



