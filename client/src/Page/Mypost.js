import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import './css/mypost.css'
import "../output.css";
import { removepost } from "../redux/reducers/userSlice";

import api from "../utils/api";
import NewNav from "../Component/NewNav";

function Mypost() {
  const { userdetails, isLoggin } = useSelector((state) => state.user);
  const [flag, Setflag] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoggin === false) navigate("/pagenotfound");

  useEffect(() => {
    if (userdetails.allpost !== undefined) Setflag(true);
  }, [userdetails.allpost, isLoggin]);

  const deletepost = async (id) => {
    const resp = await api.delete(`/post/${id}`);
    if (resp.status === 200) dispatch(removepost(resp.data._id));
  };

  return (
    <>
      <div className="">
        {/* 
<h1>Hello{userdetails.username}</h1>

<p>{userdetails.email}</p>
<p>{userdetails.createdAt}</p>

<a className='p-5 bg-darkblue ' href='/'>Home</a>
 */}

        <NewNav />
      </div>

      <div className="container mx-auto md:space-x-4  md:flex md:flex-wrap mt-9">
        {flag &&
          userdetails.allpost.map((e) => (
            <div className="  md:w-[31%]   w-6/8 m-4  " key={e._id}>
              <div className="post1">
                <h1 className="post-title">{e.title}</h1>
                <img
                  src={e.image}
                  alt=""
                  className=" my-mx-2  h-44 w-full md:w-96 md:h-64 rounded-lg  "
                />

                <h3 className="post-desc">{e.description.substr(0, 64)} </h3>
                <br />
                <p className="post-content">{e.content.substr(0, 64)}</p>
              </div>

              <button
                className="read-more"
                onClick={() => navigate("/postonly", { state: { post: e } })}
              >
                Read More
              </button>

              <Link
                to={`/edit/${e._id}`}
                className="edit"
              >
                Edit
              </Link>
              <button
                className="delete"
                onClick={() => deletepost(e._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Mypost;
