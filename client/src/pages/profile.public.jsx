import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
// import Data from "./prueba.json";
import './css/profile.user.css';
import imagen from "./assets/aa.jpg"
// import { useAuth } from "../context/authContext";
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
      <div className="public">
        <div className="public_nav">
          <Slidenavuser />
        </div>
      </div>
      <div className="user-profile">
        {user ? 
          <>
            <img src={imagen} className="user-image" />
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


export default UserProfilePublic;
