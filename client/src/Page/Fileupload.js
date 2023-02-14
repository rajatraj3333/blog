

import React, { useRef } from 'react'
import '../output.css'
import api from '../utils/api';

function Fileupload() {

  const fileref=useRef(null)




 
 
  







  const   handlesubmit=async(e)=>{
  e.preventDefault();



  // const formdata = new FormData(e.target)

  // const details = {...Object.fromEntries(formdata)};

  // console.log(details.file);


  const formData = new FormData()


  formData.append('file',fileref.current.files[0])


await api.post('/file/upload',formData,{
    headers:{
    'Content-Type':'multipart/form-data'
    }
  }).then(res=>console.log(res.data)).catch(err=>console.log(err))

// Setfile(null)

  }



  return (

<>
<form onSubmit={handlesubmit}  >

  
<label>Upload a file</label>
<input type='file'  name='file' ref={fileref} />

<button onSubmit={handlesubmit} className='p-4 bg-danger'>Submit</button>
</form>
</>
    ) 
}

export default Fileupload