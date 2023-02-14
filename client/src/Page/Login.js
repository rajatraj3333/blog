import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setauth } from '../utils/setauth';
import { fetchuserdata } from '../redux/reducers/userSlice';
import { removealert, setalert } from '../redux/reducers/alertSlice';


function Login() {


 //   setalert();

   const {message,type}= useSelector(state=>state.alert)
   console.log(message);


   const navigate = useNavigate()

const dispatch =useDispatch();




    const handlesubmit=(e)=>{

        e.preventDefault();

        const formdata = new FormData(e.target);

        const newdata ={...Object.fromEntries(formdata)}


        const {email,password}=newdata

         if(email&&password){

  setTimeout(()=>{
    dispatch(removealert())    
  },5000)

api.post('/user/login',newdata).then(res=>{
   
   
localStorage.setItem("token",res.data.token);

setauth(localStorage.token);   
    dispatch(fetchuserdata());
  
    document.getElementById('alert').innerText='txt is change'
    if(res.data.token) { 
        setTimeout(()=>{
       //     document.getElementById('btn').removeAttribute("disabled")
            if(res.data.token) navigate('/')
          
    },7000)
    

    dispatch(setalert({message:'sucessfully login',type:'bg-success'}))

 

}     
    if(res.data.message) {

        dispatch(setalert({message:'Invalid Credential',type:'bg-danger'}))
          }
}).catch(err=>{
console.log(err);

if(err.request.status===500) dispatch(setalert({message:'Internal Server Error',type:'bg-danger'}))


})
  
    }

 
        else{
            alert('Fill All Field in the form') 
        }
    }


return (
<>
<div className=" container mx-auto  flex-col md:flex h-screen">

    {/* <p  id="alertsucess" className=' hidden bg-success w-2/6 mx-auto '>sucessfully login...</p>
     */}
    <p  id="alert" className={`w-3/6 ${type} mx-auto h-14 text-center`}>{message}</p>
    
    <div className="flex justify-end md:mt-4 m-2"> 
        <button className="pl-6 pr-6 pb-3 pt-3 text-white bg-pinkred rounded-lg "><a href="/">BlogN*</a></button>
        
    </div>
        
    <div className=" flex loginh2 justify-center "><h1 className="text-3xl text-bold">Register</h1></div>
        <div className="   m-auto md:w-1/2 w-3/4 bg-gray-100 rounded-lg h-96">
    
    <form action="" onSubmit={handlesubmit} className="  space-y-4  m-3 flex justify-center items-center flex-col " >
        <input type="email" name="email" id="2" className=" border-2 border-red rounded-lg h-9 md:w-3/4 w-full placeholder:text-2xl placeholder:text-gray-500 " placeholder="    Email"/>
        <input type="password" name="password" id="3" className=" border-2 border-red rounded-lg h-9 md:w-3/4 w-full placeholder:text-2xl  placeholder:text-gray-500 " placeholder="    Password"/>
  
        <button id="btn" className="px-9 py-3.5 hover:bg-gray-300  hover:text-black text-white bg-pinkred rounded-lg ">Submit</button>
        
    </form>

    </div>

    
        </div>
    



     </>   


  )
}

export default Login