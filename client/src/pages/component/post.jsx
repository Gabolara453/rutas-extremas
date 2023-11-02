import React, {useState, useEffect} from 'react';
import "./css/post.css";
import { Avatar } from "@mui/material";
import { get_Post } from '../../context/auth.backend';
import { useNavigate, NavLink } from "react-router-dom";


function Post() {
  const [post, setPost] = useState();

  useEffect(() => {
    get_Post().then(data => {
      console.log(data.response)
      const arrayPost = data.response;
      const mappedPost = arrayPost.map((item) => (
        <div className='post' key={item[0]}>
          <div className="post-header">
            <div className="post-headerAutor">
              <Avatar>S</Avatar>
              <h3>redian_</h3> 
            </div>
          </div>
          <div className='post-hero'>
            <div className='post-left'>
              <div className="post-img">
                <NavLink to={`/Post/:${item[0]}`}>
                  <img className="img-post" src={item[12]} />
                </NavLink>
              </div>
            </div>
            <div className='post-right'>
              <div className="post-footer">
                <NavLink>                
                  <h5 className="h5">{item[3]}</h5>
                </NavLink>
                <h2 className='h2'>
                  Ubicacion
                  <p>{item[11]},</p>
                  <p>{item[10]}</p>
                  <br />
                  Dificutad
                  <p>{item[9]}</p>

                </h2>
              </div>
            </div>
          </div>
          <div>
            <h2>Comentarios</h2>
          </div>
          <div className="contenedor">
            <input type="text" className="caja-de-texto" placeholder="Ingresa tu texto" />
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
