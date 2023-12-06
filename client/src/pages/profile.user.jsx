import React, { useEffect, useState } from "react";
// import Data from "./prueba.json";
import './css/profile.user.css';
import LogoImageName from "./assets/img/logo-nombre.jpg"
import NavbarSearch from "./component/navbar.search";
import { useAuth } from "../context/authContext";
import { infoUser } from "../context/auth.backend";
import Slidenavuser from "./component/slidenavuser";


const UserProfile = () => {
  const auth =  useAuth();

  const id = auth.id;
  console.log(id);

  const [user, setUser] = useState();

  useEffect(() => {
    if(!id) return;
    infoUser(id).then(data => {
      console.log(data.response)
      const infoUser = data.response;
      setUser(infoUser);
    })
  }, [id])

  console.log(user);

  return (
    <>
      <header className="header">
          <div className="logo-tittle-name">
           <img src={LogoImageName} alt="" /> 
          </div>
          <NavbarSearch />
        </header>
      <div className="public">
        <div className="public_nav">
          <Slidenavuser />
        </div>
      </div>
      <div className="user-profile">
        {user ? 
          <>
            <h1><img src={user[6]} className="user-image" />{user[1]}</h1>
            
            <p>Nombre: {user[2]}</p>
            <p>Email: {user[3]}</p>
            <p>Edad: {user[4]}</p>
            <p>Fecha de nacimiento: {user[5]}</p>
            <p>Localidad: {user[8]}, {user[7]}</p>

            {/* Agrega más datos del usuario según sea necesario */}        
          </>
        : 
          <></>
        }
      </div>
    </>
  );
};


export default UserProfile;
