import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./css/home.css"
import { useAuth } from "../context/authContext";
import NavbarUser from "./component/navbar.Users";
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
              <img className="img-post" src={item[3]} />
              <h5>{item[1]}</h5>
              <h6>{item[2]}</h6>
            </NavLink>
          </div>
        ));
        setPost(mappedPost)
    })
  }, [])
  
  return (
    <>
      <NavbarUser />
      <h1></h1>
      <div>
        <div className="div-posts section-container"> 
          {posts}
        </div>      
      </div>
      
    </>
    
  )
};

export default HomeUsers;
