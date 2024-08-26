import './css/notification.css'
const Notification=({message,type,setOpen})=>{

    return(
        <>
        <div className='noti-container'>
        <div className={`noti-wrapper ${type==='bg-danger'?'error':'success'}`}>
            <p className='noti-content'>
              {message}
            </p>
            <p className='close-icons' onClick={()=>setOpen(false)}>X</p>
        </div>
        </div>
      
        </>
    )
}

export default Notification