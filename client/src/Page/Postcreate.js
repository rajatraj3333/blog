import React, { useState } from 'react'
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { updateallpost } from '../redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removealert, setalert } from '../redux/reducers/alertSlice';

function Postcreate() {
  const dispatch = useDispatch();
  const {type,message}=useSelector(state=>state.alert)
  const {userdetails}=useSelector(state=>state.user)
 
console.log('component re-rendered');
  const [uploadedfile,Setuploadedfile]=useState({})

const [file,Setfile]=useState('')

const navigate =useNavigate()

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
//Setalert('File Uploaded Successfully')


}

 
catch (error) {
  console.log(error);
  dispatch(setalert({message:'Some thing went wrong',type:'bg-danger'}))

  setTimeout(() => {
    dispatch(removealert())
  }, 2000);

}


}


const submitform=async(e)=>{

e.preventDefault()
if(uploadedfile.filename===undefined) window.alert('Upload Image Please To Create a Post')
else
{

  const formData = new FormData(e.target)
const newdata  = {...Object.fromEntries(formData)}


newdata.image=`/uploads/${uploadedfile.filename}`
newdata.authorname=userdetails.username
//newdata.append('file',uploadedfile.filename)
console.log(newdata);


 
try {
 const resp =  await api.post('/post/createpost/',newdata)
  console.log(resp.data)
  dispatch(updateallpost(resp.data))
  dispatch(setalert({message:'post created succesfully',type:'bg-success'}))

setTimeout(()=>{
  if(resp.data) navigate('/mypost')
  dispatch(removealert())

},4000)

} catch (error) {
  dispatch(setalert({message:'Some thing went wrong',type:'bg-danger'}))
}


}
}









  return (
   <>
   
   <div className='conatiner mx-auto h-screen'>

   <p  id="alert" className={`w-3/6 ${type} mx-auto h-14 text-center`}>{message}</p>
    
<div className=''>

<form className='flex justify-center flex-col items-center' onSubmit={submitform}> 
<label htmlFor="fname">Post Title:</label>
<br/>
<input type='text'  className='border-2 border-slate-400 rounded-sm w-3/6 h-11' required name='title'/>
<br/>

<br/>
 <label htmlFor="fname">Post Description:</label>
<br/>
<input type='text'  className='border-2 border-slate-400 rounded-sm w-3/6 h-11' required name='description'/>


<label htmlFor="fname">Post Content:</label>
<br/>
<textarea  className='border-2 border-slate-400 rounded-sm w-3/6 h-64' required name='content'/>

<div className='flex space-x-8 mt-4'>
 <label htmlFor='category'>Category</label>
 <br/>
  <select name='category'>
    <option>Technology</option>
    <option>Marketing</option>
    <option>Finance</option>
    <option>Information Technology</option>
     </select>
     <label htmlFor='tag'>Tag</label>
 <br/>
  <select name='tag'>
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
  <img src={uploadedfile.filepath} alt=''/>
</div>
:''
}


</div> 
   </div>
   
   </>
  )
}

export default Postcreate