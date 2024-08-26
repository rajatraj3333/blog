import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { setauth } from "../utils/setauth";
import { fetchuserdata } from "../redux/reducers/userSlice";
import { removealert, setalert } from "../redux/reducers/alertSlice";
import "./css/login.css";
import Notification from "../Component/Notification";
function Login() {
  //   setalert();
  const [open,setOpen]=useState(false);
  const { message, type } = useSelector((state) => state.alert);
  console.log(message,type);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);

    const newdata = { ...Object.fromEntries(formdata) };

    const { email, password } = newdata;

    if (email && password) {
      setTimeout(() => {
        dispatch(removealert());
      }, 5000);

      api
        .post("/user/login", newdata)
        .then((res) => {
          localStorage.setItem("token", res.data.token);

          setauth(localStorage.token);
          dispatch(fetchuserdata());

          // document.getElementById("alert").innerText = "txt is change";
          if (res.data.token) {
            setTimeout(() => {
              //     document.getElementById('btn').removeAttribute("disabled")
              if (res.data.token) navigate("/");
            }, 1500);
            setOpen(true);
            dispatch(
              setalert({ message: "sucessfully login", type: "bg-success" })
            );
          }
          if (res.data.message) {
            setOpen(true);
            dispatch(
              setalert({ message: "Invalid Credential", type: "bg-danger" })
            );
          }
        })
        .catch((err) => {
          console.log(err);

          if (err.request.status === 500)
            dispatch(
              setalert({ message: "Internal Server Error", type: "bg-danger" })
            );
        });
    } else {
      alert("Fill All Field in the form");
    }
  };

  // console.log(message,alert);
  return (
    <>
    {open && message &&  <Notification message={message} type={type} setOpen={setOpen} /> }
      <div className="login-wrapper">
        {/* <p  id="alertsucess" className=' hidden bg-success w-2/6 mx-auto '>sucessfully login...</p>
         */}
        {/* <p id="alert" className={`w-3/6 ${type} mx-auto h-14 text-center`}> */}
        {/* <p id="alert">{message}</p> */}
      
<div className="login_side">

<div className="Title">
        <a href="/">
        <img src="./img/logo.png"/>
        </a>
    </div>


        <div className="   ">
          <form action="" onSubmit={handlesubmit} className="forms">
            <input
              type="email"
              name="email"
              id="2"
              className="email"
              placeholder="    Email"
            />
            <input
              type="password"
              name="password"
              id="3"
              className="pass"
              placeholder="    Password"
            />
               <p className="account_create">
                Don't have Account? <a href="./register">Create now</a>
               </p>
            <button id="btn" className="formbtn">
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="login_image">
        <img src="./img/a-captivating-image-of-a-person-typing-away-on-a-l.jpeg" />
       </div>
      </div>

    </>
  );
}

export default Login;
