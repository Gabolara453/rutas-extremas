import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./css/home.css"
import { useAuth } from "../context/authContext";
import NavbarUser from "./component/navbar.Users";
import Timeline from "./component/timeline";
import Slidenavuser from "./component/slidenavuser";
import { get_Post } from "../context/auth.backend";


export function HomeUsers() {
  const auth = useAuth() 
  
  const navigate = useNavigate();
  const [posts, setPost] = useState([]);

  

  console.log("home User");
  
  useEffect(() => {
      get_Post().then(data => {
        const arrayPost = data.response;
        console.log(data.response)
        const mappedPost = arrayPost.map((item) => (
          <div className="div-post" key={item[0]}>
            <NavLink to={`/Post/:${item[0]}`}>
              <img className="img-post" src={item[12]} />
              <h5 className="h5">{item[3]}</h5>
              
            </NavLink>
          </div>
        ));
        setPost(mappedPost)
    })
  }, [])
  
  return (
    <>
      <h1></h1>
      <section>
        <div className="public">
          <div className="public_nav">
            <Slidenavuser />
          </div>
          <div className="public_time">
            <Timeline />
              <h1>

              </h1>
              <div className="div-posts section-container"> 
                {posts}
              </div>
          </div>
        </div>
      </section>
    </>
    
  )
};

export default HomeUsers;
