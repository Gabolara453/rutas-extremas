import React from "react";
import Data from "./prueba.json";
import './css/profile.user.css';
import imagen from "./assets/aa.jpg"
import Slidenavuser from "./component/slidenavuser";


const UserProfile = () => {
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