import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get_Posted } from '../context/auth.backend'; 
import LogoImageName from "./assets/img/logo-nombre.jpg"
import NavbarSearch from "./component/navbar.search";
import Slidenavuser from "./component/slidenavuser";
import MapView from "./component/map.view"
import "./css/profile.post.css"

export function PostProfile(){
  const { id } = useParams()
  const _id = id.slice(1)

  const [posted, setPosted] = useState([]);
  const [mapCenter, setMapCenter] = useState([]);

  useEffect(() => {
    get_Posted(_id).then(data => {
      const postsInfo = data.response;
      const postInfo = postsInfo[0];
      setPosted(postInfo);
      const coordenate = {
        lat: postInfo[21],
        lng: postInfo[22]
      }
      setMapCenter(coordenate)
    })
  }, [_id])

  console.log(posted)

  return(
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
        <section className='posted'>
          <div className='container-post'>
            <h2>{posted[7]}</h2>
            <ul>
              <li>Región: {posted[14]}</li>
              <li>Comuna: {posted[15]}</li>
              <li>Disciplina: {posted[5]}</li>
              <li>tipo de ruta: {posted[6]}</li>
              <li>Dificultad: {posted[13]}</li>
            </ul>
            <div className='hero-posted'>
              <div className='descripciones'>
                <div className='descripcion'>
                  {posted[8]}
                </div>
                <div className='descripcion'>
                  {posted[9]}
                </div>
                <div className='descripcion'>
                  {posted[10]}
                </div>
                <div className='descripcion'>
                  {posted[11]}
                </div>
                <div className='descripcion'>
                  {posted[12]}
                </div>
                <div className="map-view">
                  {/*<MapView coordenates={[posted[21],posted[22]]}/>*/}
                  {/*<MapView coordenates={mapCenter}/>*/}
                </div>
              </div>
              <div className='imagenes'>
                <div className='imagen'>
                  <img src={posted[16]} />
                </div>
                <div className='imagen'>
                  <img src={posted[17]} />
                </div>
                <div className='imagen'>
                  <img src={posted[18]} />
                </div>
                <div className='imagen'>
                  <img src={posted[19]} />
                </div>
                <div className='imagen'>
                  <img src={posted[20]} />
                </div>
              </div>
            </div>
            <div className='ubicacion'>
              <div className='ubi-left'>

              </div>
              <div className='ubi-right'>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
};

export default PostProfile;

