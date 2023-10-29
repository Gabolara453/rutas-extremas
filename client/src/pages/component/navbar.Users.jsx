import React, { useState } from "react";
import { useNavigate, NavLink, HashRouter } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import imgLogo from "../../img/l7.jpg"
import './css/navbar.css'
import Hamburger from '../../img/showNv.png'
// import { ReactComponent as Hamburger } from '../../img/showNv.png'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'

export function NavbarUser() {
  const auth = useAuth()
  
  const navigate = useNavigate();

  // const displyNme = auth.userName;
  const phtURL = auth.phto;

  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const handleLogout = () => {
    auth.logout()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img className="logo" src={imgLogo} />
          <h1 className="tittleBar">Rutas Extremas</h1>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={Hamburger}/>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <div className="logo-user">
            <ul>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/user/newPost">Nuevo Post</NavLink>
              </li>
              <li>
                <NavLink to="/map">Map</NavLink>
              </li>
              <li>
                 <button onClick={() => handleLogout()} className="button">Logout</button>
              </li>
              <li>
                <NavLink to="/Profile">
                  <h1 className="nameBar">Perfil</h1>
                </NavLink>
              </li>
            </ul>
            { phtURL && <img className="logo-img" src={phtURL} /> }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarUser;


