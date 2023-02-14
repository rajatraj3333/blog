const express =require('express');
const app= express()
const auth =require('../Controller/auth')

const fileUpload =require('express-fileupload')


const {Createpost,
    getpostbyid, 
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
    }=require('../Controller/postcontroller')


const Route = express.Router();


Route.get('/allpost/:pageno',async(req,res)=>{
  
    res.send(await getallpost(req.params.pageno))
})
 
Route.get('/startingpost',async(req,res)=>{
    res.send(await startpost())
})
Route.post('/createpost',auth,async (req,res)=>{
  
res.send(await Createpost(req.body,req))
})
Route.get('/:id',async(req,res)=>{
 
    res.json(await getpostbyid(req.params.id))
})

Route.delete('/:id',async(req,res)=>{
   res.send(await deletepostbyid(req.params.id)) 
})

Route.get('/userallpost/:id',auth,async(req,res)=>{
    res.send(await getalluserpostbyid(req.user))
})

Route.put('/updatedpostbyid/:id',auth,async(req,res)=>{

    res.send(await updatedpostbyid(req.params.id,req.body))
})
Route.post('/comment/',auth,async(req,res)=>{
res.send(await addcomment(req.body,req))
})
 
Route.post('/delcomment/',auth,async(req,res)=>{
  
  res.send( await deletecomment(req.body))
})
 
Route.put('/comment/',auth,async(req,res)=>{
    res.send(await updatecomment(req.body))
    
})
Route.put('/commentlike',auth,async(req,res)=>{
    res.sendStatus(await addlikeandunlike(req.body))
})
Route.put('/likepost',auth,async(req,res)=>{
    res.sendStatus(await postlike(req.body))
})


module.exports=Route 