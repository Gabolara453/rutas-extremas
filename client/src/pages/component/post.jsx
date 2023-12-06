import React, {useState, useEffect} from 'react';
import "./css/post.css";
import { Avatar } from "@mui/material";
import { get_Post } from '../../context/auth.backend';
import { useAuth } from '../../context/authContext';
import { NavLink } from "react-router-dom";


function Post() {

  const auth = useAuth();

  const id = auth.id;
  
  const [post, setPost] = useState();
  // const [userP, setUserP] = useState();
  

  useEffect(() => {
    get_Post().then(data => {
      //console.log(data.response)
      const arrayPost = data.response;
      const fechaActual = new Date();
      const fechaPostCreado = arrayPost[0][23];
      const fechaPost = fechaPostCreado.replace(/T/, ' ').replace(/\..+/, '');
      const fechaTimePost = new Date(fechaPost) - fechaActual;
      var segundos = fechaTimePost/ 1000;
      var minutos = segundos / 60;
      var horas = minutos / 60;
      const tiempoPasado = fechaTimePost - ( horas - minutos)
      // console.log(horas)
      const mappedPost = arrayPost.map((item) => (
        <div className='post' key={item[4]}>
          <div className="post-header">
            <div className="post-headerAutor">
              <Avatar><img src={item[3]} /></Avatar>
              <h3>
                {id === item[1] ?
                    <NavLink to={`/user/profile`}>{item[2]}</NavLink>
                  :
                    <NavLink to={`/user/profile/:${item[0]}`}>{item[2]}</NavLink>
                }
              </h3>
            </div>
            {/*<span>12hr</span>*/}
          </div>
          <NavLink to={`/Post/:${item[4]}`}>
            <div className='post-hero'>
                <div className='post-left'>
                  <div className="post-img">
                      <img className="img-post" src={item[16]} />
                  </div>
                </div>
                <div className='post-right'>
                  <div className="post-footer">
                      <h5 className="h5">{item[7]}</h5>
                    <h2 className='h2'>
                      Ubicacion
                    </h2>
                      <p>{item[15]},</p>
                      <p>{item[14]}</p>
                      <br />
                    <h2 className='h2'>
                      Dificutad
                    </h2>
                      <p>{item[13]}</p>
                  </div>
                </div>
            </div>
          </NavLink>
          <div>
            <h2>Comentarios</h2>
          </div>
          <div className="contenedor">
            <p>no hay comentarios</p>
          </div>
        </div>
      ));
      setPost(mappedPost);
    })
  }, [])

  return (
    <div className='posts'>
      {post}
    </div>
  )
}

export default Post
