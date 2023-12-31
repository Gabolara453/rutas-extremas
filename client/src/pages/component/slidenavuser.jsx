import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, HashRouter } from "react-router-dom";
import { useAuth } from "../../context/authContext";
// import imgLogo from "../assets/img/l7.jpg"
import './css/slidenav.css'
// import Hamburger from '../assets/img/t.png'
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
//import SlideshowIcon from "@mui/icons-material/Slideshow";
import AddCircleIcon from '@mui/icons-material/AddCircle';
//import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { infoUser } from "../../context/auth.backend";

export function Slidenavuser() {
    const auth = useAuth()
    
    const navigate = useNavigate();

    const id = auth.id;
    // const displyNme = auth.userName;
    const phtURL = auth.phto;
    const [User, setUser] = useState()

    useEffect(()=>{
      if(!id) return;

      infoUser(id).then((data)=>{
        const arrayUser = data.response;
        setUser(arrayUser)
      }) 
    },[id])
    

  //   const [showNavbar, setShowNavbar] = useState(false)
  // 
  //   const handleShowNavbar = () => {
  //     setShowNavbar(!showNavbar)
  //   }
  
    const handleLogout = () => {
      auth.logout()
      navigate("/")
    }
    return (
        
      <div className="slidenav">
        <div className="div-user">
          <img className="slidenav_logo" src={phtURL}/>
      
        </div>
       
        <div className="slidenav_buttons">
    
            <NavLink to="/home">
              <button className="slidenav_button">
                <HomeIcon />
                <span>Home</span>
              </button>
            </NavLink>
    
            <NavLink to="/user/newPost">
              <button className="slidenav_button">
                <AddCircleIcon />
                <span>Crear</span>
              </button>
            </NavLink>
    


            <NavLink to="/user/profile">
              <button className="slidenav_button">
                <AccountCircleIcon />
                <span>Perfil</span>
              </button>
            </NavLink>
    
            <button className="slidenav_button" onClick={() => handleLogout()}>
              <LogoutIcon />
              <span>Logout</span>
            </button>
        </div>
    
      </div>
    )
  
}

export default Slidenavuser
