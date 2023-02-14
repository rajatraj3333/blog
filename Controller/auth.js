
const jwt = require('jsonwebtoken')

const testmiddleware = function (req,res,next){


  const token =req.header('X-Authorization');

  if(token){
try {

    const jwttoken=jwt.verify(token,process.env.SEC_KEY);
    req.user=jwttoken.token

next()
    
} catch (error) {
  res.sendStatus(401);
  
}
  }
  else{
  
    res.sendStatus(401)
  
  }

  }
  

  module.exports=testmiddleware
