import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../output.css'
import { removealert } from '../redux/reducers/alertSlice'
import { logout } from '../redux/reducers/userSlice'
function Nav() {
const dispatch = useDispatch()

const {isLoggin}=useSelector(state=>state.user)
    return isLoggin? (

<>
       <nav className="  md:flex   md:justify-between">
        <div className="logo w-24 h-24 space-y-16 border bg-lightdarkblue text-white hover:text-black hover:cursor-pointer flex justify-center text-[24px] rounded-lg items-center">BlogN*</div>
     
        <div className="menu flex items-center">

            <ul className="flex space-x-4  items-center text-2xl text-bold">
           
                <Link to='/'>Home</Link>
                <Link to='/mypost'>My Post</Link>
               
                <Link to="/postcreate" className="p-4 text-white  text-lg text-bold rounded-lg bg-lightdarkblue mt-4 mb-6 mr-8  hover:text-black ">New Post</Link>
                <Link to="/" onClick={()=>{dispatch(logout())
                dispatch(removealert())}
        } className="p-4 text-white  text-lg text-bold rounded-lg bg-lightdarkblue mt-4 mb-6 mr-8  hover:text-black ">Logout</Link>     
               


               

            </ul>
            </div>
        </nav>
</>):
(<>
        <nav className="hidden  md:flex   md:justify-between">
        <div className="logo w-24 h-24 space-y-16 border bg-lightdarkblue text-white hover:text-black hover:cursor-pointer flex justify-center text-[24px] rounded-lg items-center">BlogN*</div>
     
        <div className="menu flex items-center">
 

            <ul className="flex space-x-4  items-center text-2xl text-bold">
            <Link to='/'>Home</Link>
                <Link to='/mypost'>All Post</Link>
               
                <Link to="/login" className="p-4 text-white  text-lg text-bold rounded-lg bg-lightdarkblue mt-4 mb-6 mr-8  hover:text-black ">Login</Link>     
               
          

            </ul>

            </div> 
</nav>



</>)    



   
}

export default Nav