import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removealert } from '../redux/reducers/alertSlice';
import { logout } from '../redux/reducers/userSlice';

function NewNav() {

const dispatch=useDispatch()    
const {isLoggin}=useSelector(state=>state.user)
const [btntext,Setbtntext]=useState(true)

function navmenutoggle(e){
    console.log('clicked');
e.preventDefault()
const target =document.querySelector('.navclass');


target.classList.toggle('hidden')?Setbtntext(true):Setbtntext(false);





}

  return (
<>
 
<header className=' contaier mx-auto    mt-4  '>
<div className='flex  justify-between md:hidden '>

<button className='flex flex-end p-4 ' onClick={navmenutoggle} id="btn" name='close'>


{btntext?

<img src='./img/menu.png' className='w-6 h-6' alt=''/>

:

<img src='./img/close.png' className='w-6 h-6'  alt=''/>

}


  
</button> 
<span className=' flex  text-3xl  m-2'>BlogN*</span>
</div>
 
<nav className=' navclass   hidden md:flex md:justify-around '>

<span className='text-lg hidden md:flex items-center '>BlogN*</span>
<hr className='border-1 '/>
{isLoggin?(
    <>
    <div className=''>
    <ul className='text-lg md:space-x-16 items-center 
    flex flex-col md:flex md:flex-row '>
    <Link to='/'>Home</Link>
                <Link to='/mypost'>My Post</Link>
               
                <Link to="/postcreate" className="p-2 text-white   text-bold rounded-lg bg-lightdarkblue mt-4 md:m-0  hover:text-black ">New Post</Link>
                <Link to="/" onClick={()=>{dispatch(logout())
                dispatch(removealert())}
        } className="p-2 text-white   text-bold rounded-lg bg-lightdarkblue  hover:text-black  mt-4 md:m-0">Logout</Link>     
              
</ul>
</div>

</>
):

(
    <> 
  <ul className='text-lg md:space-x-16 items-center 
    flex flex-col md:flex md:flex-row justify-between  '>
    <Link to='/'>Home</Link>
             
               
                <Link to="/login" className="p-2 text-white   text-bold rounded-lg bg-lightdarkblue  hover:text-black  mt-4 md:m-0">Login</Link>     
               
          
   
  
</ul>

<div className='flex space-x-4 mt-4'>


</div>
</>
)
}

</nav>

</header>




</>
 

 )
}

export default NewNav