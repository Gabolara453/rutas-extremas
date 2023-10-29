import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import imgLogo from "../../img/l7.jpg"
import './css/navbar.css'


export function NavbarPublic() {
  const auth = useAuth()
  const navigate = useNavigate();

  const handleRegisterWithGoogle = (e) => {
    e.preventDefault()
    auth.registerWithGoogle()
  }

  return (
    <nav className="navbar">
      <div className="container">
         <div className="logo">
          <img className="logo" src={imgLogo} />
          <h1 className="nameBar">Rutas Extremas</h1>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/map">map</NavLink>
            </li>
            <li>
               <button className="button" onClick={(e) => handleRegisterWithGoogle(e)}>Login with Gooogle</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavbarPublic;
