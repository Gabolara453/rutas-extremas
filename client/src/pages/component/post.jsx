import React, {useState, useEffect} from 'react';
import "./css/post.css";
import { Avatar } from "@mui/material";
import { get_Post, infoUser } from '../../context/auth.backend';
import { useAuth } from '../../context/authContext';
import { useNavigate, NavLink } from "react-router-dom";


function Post() {

  const auth = useAuth();

  const id = auth.id;
  
  const [post, setPost] = useState();
  const [userP, setUserP] = useState();
  

  useEffect(() => {
    get_Post().then(data => {
      //console.log(data.response)
      const arrayPost = data.response;
      const mappedPost = arrayPost.map((item) => (
        <div className='post' key={item[3]}>
          <div className="post-header">
            <div className="post-headerAutor">
              <Avatar>S</Avatar>
              <h3>
                {id === item[1] ?
                    <NavLink to={`/user/profile`}>{item[2]}</NavLink>
                  :
                    <NavLink to={`/user/profile/:${item[0]}`}>{item[2]}</NavLink>
                }
              </h3> 
            </div>
          </div>
          <div className='post-hero'>
            <div className='post-left'>
              <div className="post-img">
                <NavLink to={`/Post/:${item[3]}`}>
                  <img className="img-post" src={item[15]} />
                </NavLink>
              </div>
            </div>
            <div className='post-right'>
              <div className="post-footer">
                <NavLink>                
                  <h5 className="h5">{item[6]}</h5>
                </NavLink>
                <h2 className='h2'>
                  Ubicacion
                </h2>
                  <p>{item[14]},</p>
                  <p>{item[13]}</p>
                  <br />
                <h2 className='h2'>
                  Dificutad
                </h2>
                  <p>{item[12]}</p>
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
