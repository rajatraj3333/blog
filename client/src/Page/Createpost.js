import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../output.css'
import { setalert } from '../redux/reducers/alertSlice';

import api from '../utils/api';



function Createpost() {
const navigate = useNavigate()
const dispatch =useDispatch()
const fileref= useRef(null);

  const {userdetails,isLoggin}=useSelector(state=>state.user)
const {message,type}=useSelector(state=>state.alert) 

if(!isLoggin) navigate('/')

const handlesubmit =(e)=>{
e.preventDefault();

const formdata = new FormData(e.target)

const details = {...Object.fromEntries(formdata)};
console.log(fileref.current.files[0])
details.authorname=userdetails.username
details.userid=userdetails._id



console.log(details);

api.post('/post/createpost',details,{
  headers:{
  'Content-Type': 'multipart/form-data'
  }
}).then(res=>{
  console.log(res);
  dispatch(setalert({message:res.data,type:'bg-success'}))
})
.catch(err=>{
  console.log(err);
  if(userdetails===null) dispatch(setalert({message:'Unauthorized User',type:'bg-danger'}))
  dispatch(setalert({message:err.data,type:'bg-danger'}))

})

  }


  const handleupload=(e)=>{

    e.preventDefault();
    console.log('upload run complete')


      console.log('File already uploaded');
   


const formData = Object.freeze({file:fileref.current.files[0]})

//Setuploadedfile(fileref.current.files[0].name)

api.post('/file/upload',formData,{ 
  headers:{
    'Content-Type':'multipart/form-data'
  }
}).then(resp=>console.log(resp.data)
  ).catch(err=>console.log(err))
}



  return (
    <div className='container mx-auto h-screen  '>

<p  id="alert" className={`w-3/6 ${type} mx-auto h-14 text-center`}>{message}</p>
    
<div className='   rounded-lg   flex justify-center w-3/4  mx-auto     '>
<div className=' flex flex-col  border-2 rounded-lg bg-darkblue    md:w-3/4     '>
  
<form onSubmit={handlesubmit}  className= '   flex flex-col mt-4    content-center  items-center space-y-4  ' >
<input name='title' type='text' placeholder='Title' className=' boder-2 w-3/4  h-9 items-center  border-2 rounded-lg'  required />

<input type='text' name='desciption' placeholder='Description' required  className=' w-3/4  h-9 border-2 rounded-lg'/>
<textarea  placeholder='Content' name='content' required className=' w-3/4 h-24  border-2 rounded-lg' >
</textarea>

<label htmlFor="category"  className='text-3xl text-white'>Select Category</label>

<select name="category" className=''>
<option value="Technology">Technology</option>
<option value="Marketing">Marketing</option>
<option value="Finance">Finance</option>
<option value="Business">Business</option>

</select>

<label for="category" className='text-3xl text-white'>Select Tag</label>

<select name="tag" className=''>
<option value="Technology">Technology</option>
<option value="Marketing">Marketing</option>
<option value="Finance">Finance</option>
<option value="Business">Business</option>

</select>


<div className='flex flex-col p-4 mb-4   ml-28   w-2/4 bg-cyanlight justify-center -space-y-4  '>


</div>
<button onSubmit={handlesubmit} className='bg-pinkred p-1 mb-2 '>Submit</button>

</form> 



</div>
</div>

<div className='flex'>
<input type='file'  className=' ' ref={fileref} name='file' />
<button onClick={handleupload} className='bg-danger p-1 '>Upload</button>

</div>


    </div>
  )
}

export default Createpost


