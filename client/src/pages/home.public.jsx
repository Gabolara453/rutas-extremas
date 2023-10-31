import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./css/home.css"
import { get_Post } from "../context/auth.backend";
//import NavbarPublic from "./component/navbar.Public";
import Slidenav from "./component/slidenav";
import Timeline from "./component/timeline";


export function HomePublic() {

  const [posts, setPost] = useState([]);

  // const navigate = useNavigate();



  


  console.log("home Public");
  
  return (
    <div className="App">
      <section>
        <div className="public">
          <div className="public_nav">
            <Slidenav />
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

      
    </div>

  )
};

export default HomePublic;
