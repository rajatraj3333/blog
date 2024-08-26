import React,{useState} from 'react'
import api from '../utils/api';
import { useSelector,useDispatch } from 'react-redux';
import { setalert,removealert } from '../redux/reducers/alertSlice';
import { setauth } from '../utils/setauth';
import { fetchuserdata } from '../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import "./css/register.css";
import Notification from '../Component/Notification';

function Registartion() {
    const [open,setOpen]=useState(false);

const {type,message}=useSelector(state=>state.alert)
const navigate = useNavigate()
const dispatch = useDispatch();

    const handlesubmit=async(e)=>{

        e.preventDefault();

    

        const formdata = new FormData(e.target);

        const newdata ={...Object.fromEntries(formdata)}


        const {username,email,password,passwordrepeat}=newdata

        if(password!==passwordrepeat){
alert('password do not match')
        }
        else if(username&&email&&password&&passwordrepeat){

try {
 
    const res=    await   api.post('/user/register',newdata);

    if(res.data.token){
        localStorage.setItem('token',res.data.token);
        setauth(localStorage.token);   
        dispatch(fetchuserdata());
        setOpen(true);
        dispatch(setalert({message:'Successfully regsitered',type:'bg-success'}))
       setTimeout(()=>{
        navigate('/')
       },3000)
    }
    else{
        setOpen(true);
        dispatch(setalert({message:'User Already Exist',type:'bg-danger'}))
    }  
               
} catch (error) {
    console.log(error)
    if(error.request.status===500) dispatch(setalert({message:'Internal Server Error',type:'bg-danger'}))

}
finally{
    setTimeout(()=>{
        dispatch(removealert());
    },2000)
}

}


        
    }

    return (

<>
<div className="login-wrapper">
        {/* <p  id="alertsucess" className=' hidden bg-success w-2/6 mx-auto '>sucessfully login...</p>
         */}
        {/* <p id="alert" className={`w-3/6 ${type} mx-auto h-14 text-center`}> */}
        {/* <p id="alert">{message}</p> */}
        {open && message &&  <Notification message={message} type={type} setOpen={setOpen} /> }


<div className="login_side">

<div className="Title">
        <a href="/">
        <img src="./img/logo.png"/>
        </a>
    </div>


        <div className="rgstr-form">
        <form action="" onSubmit={handlesubmit} className="forms" >
        <input type="text"  name="username" id="1"  placeholder="Username"/>
        <input type="email" name="email" id="2"  placeholder="Email"/>
        <input type="password" name="password" id="3"  placeholder="Password"/>
        <input type="password" name="passwordrepeat" id="4"  placeholder="Re-Password"/>
        <p className="account_create">
                Already have Account? <a href="./login">Login now</a>
               </p>
        <button id="btn" className="formbtn">Signup</button>
        </form>

        </div>
      </div>
      <div className="login_image">
        <img src="./img/a-captivating-image-of-a-person-typing-away-on-a-l.jpeg" />
       </div>
      </div>


  
  
    



     </>   


  )

}

export default Registartion