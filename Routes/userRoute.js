const express =require('express');

const {Registeruser,loginuser} =require('../Controller/usercontroller.js')

const Route = express.Router();
const auth =require('../Controller/auth')


Route.post('/register',async (req,res)=>{
  
const resp=await Registeruser(req.body)

if(resp.hasOwnProperty('token')) res.cookie("token",resp.token)
    
res.send(resp);


})
Route.post('/login',async(req,res)=>{
console.log(req.body)
  const resp=await loginuser(req.body)

    res.send(resp);

}
 
)



Route.post('/test',(req,res)=>{
  
//  console.log(req.header('x-auth-token'));
//   console.log(req[x-authorization]);
  res.send(req.body)
    // res.send(await test())
})


module.exports=Route