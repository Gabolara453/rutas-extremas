import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import LogoFilter from "../assets/img/pngegg-filter.png"
import './css/navbar.css'
import Hamburger from '../assets/img/t.png'
// import { ReactComponent as Hamburger } from '../../img/showNv.png'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'

export function NavbarSearch() {
  const auth = useAuth()
  
  const navigate = useNavigate();


  const [showNavbar, setShowNavbar] = useState(false)
  // const [search, setSearch] = useState("")
  // const [tablaPost, setTablaPost] = useState("")

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const handleTextSearch = (e) => {
    e.preventDefault();
    auth.logout()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="input-field-search">
          <input type="text" placeholder="Buscar Publicación" onClick={(e) => handleTextSearch(e.target.value)} />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={Hamburger}/>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <div className="logo-tittle">
            <img className="logo" src={LogoFilter} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarSearch;


