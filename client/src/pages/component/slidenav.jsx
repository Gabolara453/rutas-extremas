import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import LogoNoAccount from "../assets/img/pngegg.png"
import "./css/slidenav.css"
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
//import SlideshowIcon from "@mui/icons-material/Slideshow";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
// import MapIcon from '@mui/icons-material/Map';

function Slidenav() {
  const auth = useAuth()
  const navigate = useNavigate();

  const handleRegisterWithGoogle = (e) => {
    e.preventDefault()
    auth.registerWithGoogle()
  }
  return( 
  <div className="slidenav">
    <div className="div-no-user">
      <img className="slidenav_logo" src={LogoNoAccount}/>
    </div>

   
    <div className="slidenav_buttons">

      <NavLink to="/home">
        <button className="slidenav_button">
          <HomeIcon />
          <span>Home</span>
        </button>
      </NavLink>



      <button className="slidenav_button" onClick={(e) => handleRegisterWithGoogle(e)}>
        <LoginIcon />
        <span>Login</span>
      </button>
    </div>
  </div>
  );
    
    
  
}

export default Slidenav
