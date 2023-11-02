import React, {  useState } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
import "./css/home.css"
// import { useAuth } from "../context/authContext";
import LogoImageName from "./assets/img/logo-nombre.jpg"
import NavbarSearch from "./component/navbar.search";
import Timeline from "./component/timeline";
import Slidenavuser from "./component/slidenavuser";
import Footer from "./component/footer";
import { useAuth } from "../context/authContext";
import { infoUser } from "../context/auth.backend";


export function HomeUsers() {
  const auth = useAuth() 

//  const navigate = useNavigate();
//  const [posts, setPost] = useState([]);

  const name = auth.username
  return (
    <>
      <header className="header">
        <div className="logo-tittle-name">
         <img src={LogoImageName} alt="" /> 
        </div>
        <NavbarSearch />
      </header>
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
                {/*posts*/}
              </div>
          </div>
        </div>
      </section>
      <div>      
        <Footer />
      </div>
    </>
    
  )
};

export default HomeUsers;
