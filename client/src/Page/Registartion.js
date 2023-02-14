import React from 'react'
import api from '../utils/api';
import { useSelector,useDispatch } from 'react-redux';
import { setalert,removealert } from '../redux/reducers/alertSlice';
import { setauth } from '../utils/setauth';
import { fetchuserdata } from '../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

function Registartion() {

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

        dispatch(setalert({message:'Successfully regsitered',type:'bg-success'}))
       setTimeout(()=>{
        navigate('/')
       },3000)
    }
    else{
        dispatch(setalert({message:'Invalid credential',type:'bg-danger'}))
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



<div className=" container mx-auto  flex-col md:flex h-screen">
    <span  id="alert" className={`w-3/6 ${type} mx-auto h-14 text-center`}>{message}</span>
        
    
    <div className="flex justify-end md:mt-4 m-2"> 
        <button className="pl-6 pr-6 pb-3 pt-3 text-white bg-pinkred rounded-lg "><a href="index.html">BlogN*</a></button>
        
    </div>
        
    <div className=" flex loginh2 justify-center "><h1 className="text-3xl text-bold">Register</h1></div>
        <div className="   m-auto md:w-1/2 w-3/4 bg-gray-100 rounded-lg h-96">
    
    <form action="" onSubmit={handlesubmit} className="  space-y-4  m-3 flex justify-center items-center flex-col " >
        <input type="text"  name="username" id="1" className=" border-2 rounded-lg border-red h-9 mt-9 md:w-3/4 w-full placeholder:text-2xl placeholder:text-gray-500 " placeholder="    Username"/>
        <input type="email" name="email" id="2" className=" border-2 border-red rounded-lg h-9 md:w-3/4 w-full placeholder:text-2xl placeholder:text-gray-500 " placeholder="Email"/>
        <input type="password" name="password" id="3" className=" border-2 border-red rounded-lg h-9 md:w-3/4 w-full placeholder:text-2xl  placeholder:text-gray-500 " placeholder="    Password"/>
        <input type="password" name="passwordrepeat" id="4" className=" border-2 border-red rounded-lg h-9 md:w-3/4 w-full placeholder:text-2xl placeholder:text-gray-500 " placeholder="    Re-Password"/>
        <button className="px-9 py-3.5 hover:bg-gray-300  hover:text-black text-white bg-pinkred rounded-lg ">Submit</button>
        
    </form>

    </div>
    
        </div>
    



     </>   


  )

}

export default Registartion