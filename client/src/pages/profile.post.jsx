import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogoImageName from "./assets/img/logo-nombre.jpg"
import NavbarSearch from "./component/navbar.search";

export function PostProfile(){
  const { id } = useParams()
  const _id = id.slice(1)

  return(
    <div>
      <header className="header">
        <div className="logo-tittle-name">
         <img src={LogoImageName} alt="" /> 
        </div>
        <NavbarSearch />
      </header>
      <div>
        Post Profile { _id }
      </div>
    </div>
  )
};

export default PostProfile;

