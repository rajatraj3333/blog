const {Schema, default: mongoose }=require('mongoose')


const usermodelSchema= new Schema({
    _id:Schema.Types.ObjectId,
    username:String,
    email:String,
    hashpassword:String,
    createdAt:String,
    allpost:[{type:mongoose.Types.ObjectId,ref:'Post'}]
})


module.exports=mongoose.model('User',usermodelSchema)