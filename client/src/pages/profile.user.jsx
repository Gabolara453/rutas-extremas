import React, { useEffect, useState } from "react";
import Data from "./prueba.json";
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
      const response = data.response;
      setUser(response);
    })
  }, [id])

  console.log(user);

    

  return (
    <><div className="public">
      <div className="public_nav">
        <Slidenavuser />
      </div>
    </div><div className="user-profile">
        <img src={imagen} className="user-image" />
        <h2>{Data.username}</h2>
        <p>Nombre: {Data.displayName}</p>
        <p>Email: {Data.email}</p>
        <p>Fecha de Nacimiento: {Data.fecha_naci}</p>
        {/* Agrega más datos del usuario según sea necesario */}
      </div></>
  );
};


export default UserProfile;
