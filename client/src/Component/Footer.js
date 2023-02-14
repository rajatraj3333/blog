import React from 'react'
import '../output.css'
function Footer() {
  return (
   <>
   
<footer className=" bg-darkblue mt-4">
    <div className="container mx-auto flex flex-col  items-center md:flex  md:flex-row-reverse justify-between"> 
    <div className="flex  sm:flex sm:flex-col  ">
            <div className="address flex mt-4 mb-4">
    <ul className="text-white text-lg text-bold">
        <h1 className="text-2xl">Social  Link</h1>

        <li><a href="#">Facebook</a></li>
        <li><a href="#">YouTube</a></li>
        <li><a href="#">Linkledn</a></li>
        <li><a href="#">Twitter</a></li>
        <li><a href="#">Slack</a></li>
    </ul>
    </div>
    
    </div>

    <div className=" flex">
    
        <div className="sociallink flex mt-4 mb-4">
    
            <ul className="text-white text-lg text-bold">
                <h1 className="text-2xl">Usefull  Link</h1>
    
                <li><a href="#">Carrer</a></li>
        <li><a href="#">About us</a></li>
        <li><a href="#">Address</a></li>
        <li><a href="#">Sitemap</a></li>
        <li><a href="form.html">Login</a></li>
    
    </ul>
    </div>
    </div>

<div className=" logo flex items-center ">
    <div className=" bg-lightdarkblue w-28 h-28  justify-center flex  text-white text-2xl items-center">Logo</div>
    </div>
    </div>



<div className="flex sm:flex sm:flex-col"> 
    <div className="copyright flex logo text-white text-2xl items-center">Copyright reserved</div>

</div>


    

</footer>

   </>
  )
}

export default Footer