
import Home from './Page/Home';

import {

  BrowserRouter as Router,
  Routes,
  Route
}from 'react-router-dom'
import Registartion from './Page/Registartion';
//import Post from './Page/Post';
import Postonly from './Page/Postonly';
import Login from './Page/Login';
import Testcomp from './Component/Testcomp';
import { useEffect } from 'react';
import { setauth } from './utils/setauth';
import NewNav from './Component/NewNav';
import Postcreate from './Page/Postcreate';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchuserdata, logout } from './redux/reducers/userSlice';
import Mypost from './Page/Mypost';
import Pagenotfound from './Page/Pagenotfound';

import Edit from './Page/Edit';

import Protectedroute from './Component/Protectedroute';
import Fileupload from './Page/Fileupload';
import { addpost, initialpost } from './redux/reducers/postSlice';
import api from './utils/api';

function App() {
 
const dispatch = useDispatch();

const {isGuest,userdetails,isLoggin}=useSelector(state=>state.user);

//const [allpost,Setallpost]=useState(null);
  useEffect(()=>{
    dispatch(initialpost())
    if(localStorage.token){ 
setauth(localStorage.token);

dispatch(fetchuserdata());

}
else{

  dispatch(logout())
}

  },[dispatch,isGuest])


  return (
    <div className="container mx-auto">

    <Router>


<Routes>
  <Route  path='/' element={<Home/>}></Route> 
<Route  path='/register' element={<Registartion/>}></Route>
<Route exact path='/post' element={<Postonly/>}></Route>
<Route  path='/login' element={<Login/>}></Route>
<Route path='/test' element={<Testcomp/>}/>
<Route path='/post/:id' element={<Postonly/>}></Route>
<Route path='/newnav' element={<NewNav/>  }>

</Route>
<Route path='/fileupload' element={<Fileupload/>  }>

</Route>

<Route path='/postonly' element={<Postonly/>}/>
  
 



<Route path='/postcreate' element={
<Protectedroute isLoggin={isLoggin}>

  <Postcreate/>
</Protectedroute>

}></Route>
<Route path='/edit/:id' element={
  <Protectedroute isLoggin={isLoggin}>
    <Edit post={userdetails===null?'':userdetails.allpost}/>
  </Protectedroute>
}/>



<Route path='/mypost' element={

  <Protectedroute isLoggin={isLoggin}>
    <Mypost/>
  </Protectedroute>

}/>








<Route path="*" element={<Pagenotfound/>} />

</Routes>


    </Router>


    
    </div>
  );
}

export default App;
