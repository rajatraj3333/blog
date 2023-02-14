import React, { useEffect, useMemo, useRef, useState } from 'react'
import Footer from '../Component/Footer'

import '../output.css'
import { useLocation } from 'react-router-dom'
import api from '../utils/api'
import {BsCloudLightning, BsFillEyeFill,BsHeart} from 'react-icons/bs'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import {FcLike} from 'react-icons/fc'
import NewNav from '../Component/NewNav'
import { useDispatch, useSelector } from 'react-redux'
import { initialpost,
     createpostcomment,
     deletecomment,
     addliketopost,
     removelikefromcomment,
     updatecommentfrompost,
     updatepageview
    
    } from '../redux/reducers/postSlice'

function Postonly() {
const [comment,Setcomment]=useState('');
const dispatch = useDispatch()
const location = useLocation();
const {userdetails,isLoggin}=useSelector(state=>state.user)
const {allpost} =useSelector(state=>state.post)
   const {post }=location.state
const [commentupdate,Setcommentupdate]=useState('')
console.log(commentupdate)
const [postpageview,Setpostpageview]=useState('')

useEffect(()=>{

    api.get(`/post/${post._id}`).then(res=>{
        Setpostpageview(res.data.pageview)
        dispatch(updatepageview({postid:post._id}))
    })

},[])




 
  const addcomment=(e)=>{
e.preventDefault();
if(comment==='') 
{
window.alert('Add comment first')
}
const newdata = Object.freeze({
  postid:post._id,
 user:userdetails.username,
  comment:comment  
})  

api.post('/post/comment',newdata).then((resp)=>{

    if(resp.data) {
        let updatedata = {
            _id: resp.data,
            userid:userdetails._id,
            user:newdata.user,
            comment:newdata.comment,
            likes:[]
        }
   console.log(dispatch(createpostcomment({_id:newdata.postid,data:updatedata})))
   Setcomment('')
}
})

}

const deletecommentfrompost =(obj)=>{
console.log('clicked')
const {postid,commentid}=obj
console.log(postid,commentid)

 api.post('/post/delcomment/',obj).then(res=>{
    console.log(res)
    if(res.status===200){
    dispatch(deletecomment({postid,commentid}))
}
 })


}

const likecomment=(obj)=>{

    const {postid,commentid,i} = obj
const userid = userdetails._id
console.log(i)
api.put('post/commentlike',{postid,commentid,userid}).then(res=>{
if(res.status===200){
    dispatch(addliketopost({postid,i,userid}))
}
if(res.status===202){
    dispatch(removelikefromcomment({postid,commentid,userid}))
}

})

}


const editcomment=(i)=>{
console.log(i)
const edit = document.querySelectorAll('.edit')

edit[i].classList.toggle('hidden');


}

const updatecomment=(obj)=>{
const {postid,commentid,comment,i} = obj

api.put('/post/comment',{postid,commentid,comment}).then(res=>{
   console.log(comment)
    setTimeout(()=>{
        const edit = document.querySelectorAll('.edit')

        edit[i].classList.toggle('hidden');
      
    dispatch(updatecommentfrompost({postid,commentindex:i,comment}))   
    Setcommentupdate('')
    },2000)
    
console.log(res)
})

}

   return (
   <>
       <div className="container mx-auto"> 
<NewNav/>
<div className="md:flex md:flex-row flex flex-col"> 

 
<div className=" w-full md:basis-3/4">
    <h1 className="text-center text-2xl text-bold">
   
<strong>
  {post.title}

</strong>

</h1>


<br/>
<span className='text-3xl font-serif ml-4 '>{post.authorname}</span>
<p className="m-4 text-bold antialiased font-serif text-gray-600 text-lg ">
 
{post.description}
    
</p>

<img src={post.image} alt={post.title}
className="object-cover h-64 md:h-96 w-11/12 m-4 md:m-6"/>
<div className='flex justify-center mx-auto space-x-2'>
  <span>View</span>
    <span className='mt-1'>
    <BsFillEyeFill/> 

    </span>
{/* <span>{pageref}</span> */}
 <strong>{postpageview}</strong>
 </div>

<h1 className="text-center text-2xl text-bold">


</h1>
<p className="m-4 text-bold antialiased font-serif text-gray-600 text-lg ">
 
  
{post.content}
</p>


<div >
    {isLoggin?
    <>
    
<span className='text-2xl text-bold' >Leave a Comment</span>
<div className=''  >
    <input type='text ' value={comment} className='rounded border-2 border-slate-200 w-full  h-14 placeholder:text-2xl' placeholder='Comment ' onChange={(e)=>Setcomment(e.target.value)} />
<button onClick={addcomment}   className=' flex p-3 bg-pink-400 rounded mx-auto mt-4'>
    Submit
    </button>
</div>
</>
:
<span>Comment here login</span>
}
</div>
<div>

{
  allpost!==null?allpost.filter((fid)=>fid._id===post._id).map(com=>(
   
        com.allcomment!==undefined?
        com.allcomment.map((allcom,i)=>(
            
                    <div key={allcom._id}> 
                    <span className='text-lg'>{allcom.user}</span>
                    <br/>
                    <span className='text-xl'>{allcom.comment}</span>
                   <div className='space-x-4'>
                   {
                   
                   isLoggin&&allcom.userid===userdetails._id?(
                    <>
                   
                    <div className='mt-4 ml-4 space-x-6'> 
                   
                    <button className='p-2 border-2' onClick={()=>deletecommentfrompost({postid:com._id,commentid:allcom._id})}><AiFillDelete/></button>
                    <button className='p-2 border-2'  onClick={()=>editcomment(i)}><AiFillEdit/></button>
                  
              
                    <button className='p-2 ' onClick={()=>likecomment({postid:com._id,commentid:allcom._id,i})}>{
                    
allcom.likes.findIndex(li=>li===userdetails._id)>-1?<FcLike />:<BsHeart/>
}</button>


</div>
<br/>
<div className='hidden edit'>
<textarea  placeholder='edit comment' className='  border-2  border-slate-500 w-full mt-4 ml-[-4]' value={commentupdate} onChange={(e)=>Setcommentupdate(e.target.value)}></textarea>
<button className='bg-slate-500 p-2' onClick={()=>updatecomment({postid:com._id,commentid:allcom._id,comment:commentupdate,i})}>Update</button>
</div>
                        
                    </>
                    
                    )

                    :
                 
       
<>
{
   isLoggin&&(
    <>
            <button className='p-2 ' onClick={()=>likecomment({postid:com._id,commentid:allcom._id,i})}>{
allcom.likes.findIndex(li=>li===userdetails._id)>-1?<FcLike />:<BsHeart/>
    }</button>
    </>
)
}
</>

               
                    }
                  
                
                    </div>
                    <br/>
                    </div>
                ))
        
        :(  <span>No Comment Yet</span>  )
    
    
  ) 
  )
    
   :<span>Loading...</span>
}
</div>




   </div>


   


</div>
</div>
   
   <Footer/>
   </>
  )
}

export default Postonly
