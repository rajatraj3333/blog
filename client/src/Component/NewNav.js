import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removealert } from "../redux/reducers/alertSlice";
import { logout } from "../redux/reducers/userSlice";
import "./css/nav.css";
function NewNav() {
  const dispatch = useDispatch();
  const { isLoggin } = useSelector((state) => state.user);
  const [btntext, Setbtntext] = useState(true);

  function navmenutoggle(e) {
    console.log("clicked");
    e.preventDefault();
    const target = document.querySelector(".navclass");

    target.classList.toggle("hidden") ? Setbtntext(true) : Setbtntext(false);
  }

  return (
    <>
      <header className=" contaier mx-auto  nav-menu">
        <div className="flex  justify-between md:hidden ">
          <button
            className="flex flex-end p-4 "
            onClick={navmenutoggle}
            id="btn"
            name="close"
          >
            {btntext ? (
              <img src="./img/menu.png" className="w-6 h-6" alt="" />
            ) : (
              <img src="./img/close.png" className="w-6 h-6" alt="" />
            )}
          </button>
          <span className=" flex  text-3xl  m-2">BlogN*</span>
        </div>

        <nav className=" navclass   hidden md:flex md:justify-around ">
          <span className="text-lg hidden md:flex items-center ">BlogN*</span>
          {isLoggin ? (
            <>
              <div className="nav-menus">
                <ul
                  className="text-lg md:space-x-16 items-center 
    flex flex-col md:flex md:flex-row "
                >
                  <Link className="nav_link" to="/">Home</Link>
                  <Link className="nav_link" to="/mypost">My Post</Link>

                  <Link
                    to="/postcreate"
                    className="navBtn"
                  >
                    New Post
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      dispatch(logout());
                      dispatch(removealert());
                    }}
                    className="navBtn"
                  >
                    Logout
                  </Link>
                </ul>
              </div>
            </>
          ) : (
            <>
              <ul
                className="login-nav"
              >
                <Link
                  to="/login"
                  className="navBtn loginBtn"
                >
                  Login
                </Link>
              </ul>

              <div className="flex space-x-4 mt-4"></div>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default NewNav;
