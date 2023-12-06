import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
// import Data from "./prueba.json";
import './css/profile.user.css';
// import { useAuth } from "../context/authContext";
import LogoImageName from "./assets/img/logo-nombre.jpg"
import NavbarSearch from "./component/navbar.search";
import { public_infoUser } from "../context/auth.backend";
import Slidenavuser from "./component/slidenavuser";


const UserProfilePublic = () => {
  // const auth =  useAuth();

  // const id = auth.id;
  // console.log(id);
  const { id } = useParams()
  const _id = id.slice(1)
  const [user, setUser] = useState();

  useEffect(() => {
    public_infoUser(_id).then(data => {
      const infoUser = data.response;
      setUser(infoUser);

    })
  }, [])

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
            <img src={user[6]} className="user-image" />
            <h2>{user[1]}</h2>
            <p>Nombre: {user[2]}</p>
            <p>Email: {user[3]}</p>
            <p>Edad: {user[4]}</p>
            <p>Fecha de nacimiento: {user[5]}</p>
            <p>Localidad: {user[7]}</p>
            {/* Agrega más datos del usuario según sea necesario */}        
          </>
        : 
          <></>
        }
      </div>
    </>
  );
};


export default UserProfilePublic;
