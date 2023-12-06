import React, { useEffect, useState } from "react";
// import Data from "./prueba.json";
import './css/profile.user.css';
import imagen from "./assets/aa.jpg"
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
            <p>Fecha de Nacimiento: {user[4]}</p>
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
