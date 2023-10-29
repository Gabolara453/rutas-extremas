import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./css/home.css"
import { get_Post } from "../context/auth.backend";
import NavbarPublic from "./component/navbar.Public";


export function HomePublic() {

  const [posts, setPost] = useState([]);

  // const navigate = useNavigate();

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

  


  console.log("home Public");
  
  return (
    <div >
      <NavbarPublic />
      <h1></h1>
      <div className="div-posts section-container"> 
        {posts}
      </div>
    </div>
  )
};

export default HomePublic;
