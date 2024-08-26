import React, { useEffect, useState } from 'react'
import '../output.css'
import Loading from '../Component/Loading';
import api from '../utils/api';
import {BsFillEyeFill,BsHeart} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { postlike,removelike} from '../redux/reducers/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import {FcLike} from 'react-icons/fc'
import './css/post.css'
function Post() {

const dispatch = useDispatch();    
console.log('component rendered')
    const [isLoading,Setisloading]=useState(true);
    const [post,Setpost]=useState([])
    const {allpost} =useSelector(state=>state.post)
    const {userdetails,isLoggin} =useSelector(state=>state.user)
    const navigate = useNavigate();

    // if(allpost!==null)Setisloading(false)

    const alterset=()=>{
alert('login to like')
    }
useEffect(()=>{
if(allpost!==null) Setisloading(false)
},[allpost])

const postlikes=(obj)=>{
    


    api.put('/post/likepost/',obj).then(res=>{
        console.log(res.status)
        if(res.status===200){
            dispatch(postlike({index:obj.index,userid:obj.userid}))

        }

        if(res.status===202){
            dispatch(removelike({index:obj.index,userid:obj.userid}))
        }
    })


}

return (
<> 
    {isLoading?
 (
<>
<Loading/>
</>
):(

   <div className=" md:container md:mx-auto md:space-x-4  md:flex md:flex-wrap mt-9" >
    
  
{  

allpost.map((post,i)=>( 

<div className="  md:w-[31%]  w-full m-2 
  post-container" key={post._id}>
<div  key={post._id}>
    <h1 className="post-title post-title-container">{post.title}</h1>
    <img src={post.image} alt={post.title} className=" md:my-mx-2 mb-2  h-44  w-full md:w-96 md:h-64 rounded-lg post-img
     "/>
   <span className='post-tag'>{post.tag}</span> 
     
    <h3 className='text-2xl post-desc post-title-container'>{post.description.substr(0,64)} </h3>
    <p className='text-lg post-content mt-4 mb-4'>{post.content.substr(0,96)}</p>


</div>
<div className='flex items-center  justify-evenly space-x-8'>
<button className="read-more-post" onClick={()=>navigate('/postonly',{state:{post}})}>Read More</button>    
<span className=' flex space-x-8 '>
<BsFillEyeFill/>
<p>{post.pageview}</p>

</span>
{
isLoggin?(
<div className='space-x-3'> 


<button onClick={()=>postlikes({index:i,userid:userdetails._id,postid:post._id})}>

{
post.likes.findIndex(fid=>fid===userdetails._id)>-1?<FcLike/>:<BsHeart/>
}

</button>
<span>{post.likes.length}</span>
</div>

)
:
(
<div className='space-x-3'> 
<button onClick={alterset}>
<BsHeart/>
</button>
<span>{post.likes.length}</span>
</div>
)
}
</div>

</div>



))     
   

}



   </div>
)

}
</>
)

}

export default Post









