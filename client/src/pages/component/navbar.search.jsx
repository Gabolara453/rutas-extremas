import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { get_Post } from "../../context/auth.backend";
import LogoFilter from "../assets/img/pngegg-filter.png"
import './css/navbar.css'
import Hamburger from '../assets/img/t.png'
// import { ReactComponent as Hamburger } from '../../img/showNv.png'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'

export function NavbarSearch() {
  const auth = useAuth()
  
  const navigate = useNavigate();


  const [showNavbar, setShowNavbar] = useState(false)
  const [search, setSearch] = useState("")
  const [postR, setPostR] = useState("")
  const [post, setPost] = useState("")
  const [tablaPost, setTablaPost] = useState("")
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  useEffect(() => {
    get_Post().then( data => {
      setPost(data.response);
      setTablaPost(data.response);
    }).catch(error => {
        console.error("error en obtener los post, navbar", error)
      })
  }, [])

  // useEffect(() => {
  //   if(postR) {
  //     onChangeSearch(postR);
  //   }
  // },[postR])

  const handleTextSearch = (e) => {
    e.preventDefault();
    setPostR(e.target.value)
    setSearch(e.target.value)
    filtrar(e.target.value)
    console.log("busqueda: "+e.target.value);
    
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaPost.filter((elemento) => {
      if(elemento[3].toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        
        return elemento[3]
      };
      
    });
    const resultado = resultadosBusqueda.map((item) => (
        <li className="list-seach" key={item[4]}>
          <NavLink to={`/Post/:${item[4]}`}>
            {item[7]}
          </NavLink>
        </li>
    ));
    setPostR(resultado);
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="input-field-search" /* onClick={(e) => } */>
          <input type="text" placeholder="Buscar Publicación" onChange={handleTextSearch} />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {/* <img src={Hamburger}/> */}
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <div className="logo-tittle">
            <img className="logo" src={LogoFilter} />
          </div>
        </div>
      </div>
      {search ? 
        <ul className="ul-seach">
          {postR}
        </ul>
      : <></>}
    </nav>
  )
}

export default NavbarSearch;


