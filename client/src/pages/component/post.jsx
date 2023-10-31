import React, {useState, useEffect} from 'react';
import "./css/post.css";
import { Avatar } from "@mui/material";
import { get_Post } from '../../context/auth.backend';
import { useNavigate, NavLink } from "react-router-dom";


function Post() {
  const [post, setPost] = useState();

  useEffect(() => {
    get_Post().then(data => {
      // console.log(data.response)
      const arrayPost = data.response;
      const mappedPost = arrayPost.map((item) => (
        <div className='post' key={item[0]}>
          <div className="post_header"></div>
            <div className="post_headerAutor">
              <Avatar>R</Avatar>
              redian_ <span>12h</span> 
            </div>
          <div className="post_img">

           <NavLink to={`/Post/:${item[0]}`}>
              <img className="img-post" src={item[12]} />
              </NavLink>
          </div>
        
          <div className=".post_footer">
            <NavLink>
              <h5 className="h5">{item[3]}</h5>
              
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

export default Post
