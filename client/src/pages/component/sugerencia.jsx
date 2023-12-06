import React, {useState, useEffect} from 'react';
import "./css/suge.css";
import { Avatar } from "@mui/material";
import { useAuth } from '../../context/authContext';
import { get_Post } from '../../context/auth.backend';
import { NavLink } from "react-router-dom";


function Sugerencia() {
  const [post, setPost] = useState();

  const auth = useAuth();

  const id = auth.id;

  useEffect(() => {
    get_Post().then(data => {
      // console.log(data.response)
      const arrayPost = data.response;
      const mappedPost = arrayPost.map((item) => (
        <div className="suge" key={item[4]}>
          <h1>Segurencias</h1>
          <div className=".suge-header">
            <div className="suge-headerAutor">
              <Avatar><img src={item[3]} /></Avatar>
              <h3>
                {id === item[1] ?
                    <NavLink to={`/user/profile`}>{item[2]}</NavLink>
                  :
                    <NavLink to={`/user/profile/:${item[0]}`}>{item[2]}</NavLink>
                }
              </h3> 
            </div>
          </div>
          <NavLink to={`/Post/:${item[3]}`}>
            <div className="suge_img">
              <img className="img-post" src={item[16]} />
            </div>
          </NavLink>
        </div>
      ));
      setPost(mappedPost);
      
    })
    // console.log(imagen)
  }, [])

  return (
    <div className='posts'>
      {post}
    </div>
  )
}

export default Sugerencia
