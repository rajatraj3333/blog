import api from '../utils/api';
import React from 'react'
import '../output.css' 

function Testcomp() {

  // const {username}=useSelector(state=>state.user.user)

  async  function loaduser(){
   
    console.log('clicked');

    console.log((await api.get('/user/test'))?.data);
    console.log((await api.get('/auth/'))?.data);
   
    

  }
 
    return (

    <div>Welcome 

<button onClick={loaduser} className="px-9 py-3.5 hover:bg-gray-300  hover:text-black text-white bg-pinkred rounded-lg ">Check</button>

    </div>
  )
}

export default Testcomp