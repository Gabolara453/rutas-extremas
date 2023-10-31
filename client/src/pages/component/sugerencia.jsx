import React, {useState, useEffect} from 'react';
import "./css/suge.css";
import { Avatar } from "@mui/material";
import { get_Post } from '../../context/auth.backend';
import { useNavigate, NavLink } from "react-router-dom";


function Sugerencia() {
  const [post, setPost] = useState();

  useEffect(() => {
    get_Post().then(data => {
      // console.log(data.response)
      const arrayPost = data.response;
      const mappedPost = arrayPost.map((item) => (
        <div className="suge">
        <h1>Segurencias</h1>
          <div className=".suge_header"></div>
            <div className="suge_headerAutor">
              <Avatar>R</Avatar>
              redian_ <span>12h</span> 
            </div>
          <div className="suge_img">

           <NavLink to={`/Post/:${item[0]}`}>
              <img className="img-post" src={item[12]} />
              </NavLink>
          </div>
          
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