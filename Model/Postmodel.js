const {Schema, default: mongoose}=require('mongoose')
const User = require('./Usermodel.js')

const PostSchema = Schema({
    _id: Schema.Types.ObjectId,
author:{type:Schema.Types.ObjectId,ref:'User'},
authorname:String,
title:String,
image:String,
description:String,
content:String,
postcreatedAt:String,
updatedAt:Date,
category:String,
tag:String,
likes:Array,
allcomment:Array,
pageview:Number



})

module.exports=mongoose.model('Post',PostSchema)