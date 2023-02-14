const moongoose = require('mongoose')
const ObjectId =moongoose.Types.ObjectId
const express= require('express')

const app = express();

const {unlink}=require('fs')



const fileUpload=require('express-fileupload')
const post =require('../Model/Postmodel')
const user = require('../Model/Usermodel');
const Route = require('../Routes/postRoute');
async function Createpost(obj,req){
    app.use(fileUpload());
    const crpost = Object.freeze({
_id:new moongoose.Types.ObjectId,
author:req.user,
authorname:obj.authorname,
title:obj.title,
image:obj.image,
description:obj.description,
content:obj.content,
postcreatedAt:`${new Date().toLocaleDateString()}:${new Date().toLocaleTimeString()}`,
category:obj.category,
tag:obj.tag,
likes:[],
pageview:1

})

console.log(obj);











const res =(await new  post(crpost).save())


const resposnsefromuser=await user.updateOne({_id:req.user},{$push:{allpost:res._id}})
console.log('post controller')
console.log(res);
return resposnsefromuser.modifiedCount?res:'Something Wrong!'


 
}

async function getpostbyid(id){
 const postbyid=  await post.findOneAndUpdate({_id:ObjectId(id)},{$inc:{pageview:1}}).setOptions({returnDocument:'after'})

 const view =  postbyid.pageview;
return {pageview:view}
}






async function getallpost(skip){
    const limit=10

return await post.find().skip(skip).limit(limit)
}
async function startpost(){
  const posts = await post.find();
 
  return posts
}





async function getalluserpostbyid(id){


const allpost= await user.findOne({_id:ObjectId(id)}).select('username').populate('allpost').exec()

return allpost

}

async function updatedpostbyid(id,obj){

console.log(obj);
console.log(id);
    const updatedpostid = await post.findOneAndUpdate({_id:ObjectId(id)},obj).setOptions({returnDocument:'after'})
console.log(updatedpostid);
    return updatedpostid


}


async function deletepostbyid(id){

const resp =await post.findByIdAndDelete({_id:id});


console.log(resp);
if(resp)
{
    
unlink(`${__dirname}/../client/public${resp.image}`, (err) => {
    if (err) throw err;
    console.log(`successfully deleted ${resp.image}`);
  });
} 

return resp

}


async function addcomment(obj,req){
    console.log('testing userid')
console.log(req.user)
    const newdata= Object.freeze({
        _id:new moongoose.Types.ObjectId,
        userid:req.user,
        user:obj.user,
        comment:obj.comment,
        likes:[]
    })
const resp =  await post.updateOne({_id:obj.postid},{$push:{allcomment:newdata}}).setOptions({returnDocument:'after'})
 
if(resp.modifiedCount===1){
    return newdata._id
}
  

//return res.modifiedCount===1?200:500
}

async function deletecomment(obj){
   
   
const postdata = await post.updateOne({_id:ObjectId(obj.postid)},{$pull:{allcomment:{_id:ObjectId(obj.commentid)}}});


return postdata
  
}

async function updatecomment(obj){ 
 
    const query = {
        _id:ObjectId(obj.postid),
       'allcomment._id':ObjectId(obj.commentid)
    }
   
    const updatequery = {
        $set:{'allcomment.$.comment':obj.comment}

    }
return  await post.updateOne(query,updatequery).setOptions({returnDocument:'after'})

}

async function addlikeandunlike(obj){
const response = {} 
    const query = {
        _id:ObjectId(obj.postid),
        'allcomment._id':ObjectId(obj.commentid)

    }

    const updatedocument = { 

       // $addToSet:{'allcomment.$[elem].likes':ObjectId(obj.userid)}
       $addToSet:{'allcomment.$.likes':ObjectId(obj.userid)}
    }
    
  //  const option = {arrayFilters:[{'elem._id':ObjectId(obj.commentid)}]}

response.insert =  await post.updateOne(query,updatedocument)
 
    
    if(response.insert.modifiedCount===0){


     
   
        response.deleted =  await post.updateOne(query,{$pull:{'allcomment.$.likes':ObjectId(obj.userid)}})

    }
    return response.insert.modifiedCount===1?200:202
   


}

async function postlike(obj){
 
    const response ={}
    response.insert = await post.updateOne({_id:ObjectId(obj.postid)},{$addToSet:{likes:ObjectId(obj.userid)}})

   if(response.insert.modifiedCount===0){
    response.deleted =     await post.updateOne({_id:ObjectId(obj.postid)},{$pull:{likes:ObjectId(obj.userid)}})
   }

   return response.insert.modifiedCount===1?200:202

}




module.exports={Createpost,getpostbyid,
    getalluserpostbyid,
    updatedpostbyid,
    getallpost,
    startpost,
    deletepostbyid,
    addcomment,
    deletecomment,
    updatecomment,
    addlikeandunlike,
    postlike
}
