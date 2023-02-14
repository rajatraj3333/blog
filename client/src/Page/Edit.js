import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { removealert, setalert } from '../redux/reducers/alertSlice';
import { fetchuserdata } from '../redux/reducers/userSlice';
import api from '../utils/api';

function Edit({post}) {
  
const {isLoggin,userdetails}=useSelector(state=>state.user)
const {message,type}=useSelector(state=>state.alert)

const dispatch=useDispatch()
const navigate=useNavigate();
//if(!isLoggin) navigate('/');
 
    const {id}=useParams()
 const [postdetails,setpostdetails]=useState(null)
 const [file,Setfile]=useState('')
 const [uploadedfile,Setuploadedfile]=useState({})

  

useEffect(()=>{
    if(post!==undefined) { 
        const singlepost=post.find(f=>f._id===id); 
   setpostdetails(singlepost)
}

},[post,id])



const setfile =(e)=>{
    Setfile(e.target.files[0])
  }



const uploadphoto=async(e)=>{
    e.preventDefault();
console.log('clicked');
const formData = new FormData();
formData.append('file',file)

try {
  
const resp=await api.post('/file/upload/',formData,{ 
  headers:{
    'Content-Type':'multipart/form-data'
  }
})


console.log(resp.data);
const {filename,filepath}=resp.data

Setuploadedfile({filename,filepath});


}

 
catch (error) {
  console.log(error);
  dispatch(setalert({message:'Something went wrong',type:'bg-danger'}))
  setTimeout(() => {
    dispatch(removealert())
  
}, 4000);
}


}



const handlesubmit =(e)=>{
    e.preventDefault();
    if(uploadedfile.filename===undefined&&postdetails.image===undefined) window.alert('Upload Image Please To Create a Post')

else{

    const formdata = new FormData(e.target)
    
    const details = {...Object.fromEntries(formdata)};
    
const image = uploadedfile.filename===undefined?postdetails.image:`/uploads/${ uploadedfile.filename}`

console.log(image)

    details.image=image
console.log(details);
    
    api.put(`/post/updatedpostbyid/${id}`,details).then(res=>{
       // console.log(res);
      dispatch(setalert({message:'post updated succesfully',type:'bg-success'}))

setTimeout(() => {
    dispatch(removealert())
    navigate('/mypost')
}, 4000);

      dispatch(fetchuserdata())
    })
    .catch(err=>{
      console.log(err);
      if(userdetails===null) dispatch(setalert({message:'Unauthorized User',type:'bg-danger'}))
      dispatch(setalert({message:err.data,type:'bg-danger'}))
    
    })
    
}
      }
    


    return postdetails!=null&&isLoggin?(
        <>

<div className='container mx-auto h-screen   ' key={postdetails._id}>

<p  id="alert" className={`w-3/6 ${type} mx-auto h-14 text-center`}>{message}</p>



<div className=''>

<form className='flex justify-center flex-col items-center' onSubmit={handlesubmit}> 
<label htmlFor="fname">Post Title:</label>
<br/>
<input type='text'  className='border-2 border-slate-400 rounded-sm w-3/6 h-11' required name='title'  defaultValue={postdetails.title} />
<br/>

<br/>
 <label htmlFor="fname">Post Description:</label>
<br/>
<input type='text'  className='border-2 border-slate-400 rounded-sm w-3/6 h-11' required name='description' defaultValue={postdetails.description}/>


<label htmlFor="fname">Post Content:</label>
<br/>
<textarea  className='border-2 border-slate-400 rounded-sm w-3/6 h-64' required name='content' defaultValue={postdetails.content}/>

<div className='flex space-x-8 mt-4'>
 <label htmlFor='category'>Category</label>
 <br/>
  <select name='category' defaultValue={postdetails.category}>
    <option>Technology</option>
    <option>Marketing</option>
    <option>Finance</option>
    <option>Information Technology</option>
     </select>
     <label htmlFor='tag'>Tag</label>
 <br/>
  <select name='tag' defaultValue={postdetails.tag}>
    <option>Technology</option>
    <option>Marketing</option>
    <option>Finance</option>
    <option>Information Technology</option>
     </select>

</div>
 <input type='submit' className='bg-red-300 p-3 rounded-lg w-24 mt-6' value='Upload'/>

</form>


<div className='  mt-14 pb-3 flex justify-center  mx-auto'>
 <form onSubmit={uploadphoto}>

 
  <input type='file' onChange={setfile} />
  <input type='submit' className='bg-slate-400 p-3 rounded-lg w-24' value='Upload'/>
{/* <button onSubmit={uploadphoto} className='bg-slate-400 p-3 rounded-lg w-24'>Upload</button> */}

</form>
 
</div>

{ uploadedfile.hasOwnProperty('filepath')?
<div className=' mx-auto border-2   flex justify-center w-1/6 h-36 mb-4  '>
  <img src={uploadedfile.filepath} alt=""/>
</div>
: <div className=' mx-auto border-2   flex justify-center w-1/6 h-36 mb-4  '>
<img src={postdetails.image} alt=''/>
</div>
}


</div> 







    </div>

       


        </>

        ):(
        <>
        <h1>Loading....</h1>

        </>
    )
}

export default Edit











