import React from 'react'
import { Navigate } from 'react-router-dom'



function Protectedroute({isLoggin,redirect='/',children}) {
    

if(!isLoggin){
  return  <Navigate to={redirect} replace/>
}

return children
  
}

export default Protectedroute




