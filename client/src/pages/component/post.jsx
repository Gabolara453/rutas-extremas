import React, {useState, useEffect} from 'react';
import "./css/post.css";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { get_Post } from '../../context/auth.backend';


function Post() {
  const [titulo, setPost1] = useState();
  const [imagen, setPost] = useState();
  useEffect(() => {
    get_Post().then(data => {
      console.log(data.response)
      
      setPost1(data.response[1])
      setPost(data.response[3])
      //setPost(mappedPost)
  })
}, [])
  return (
    <div className='post'>
      <div className=".post_header"></div>
      <div className="post_headerAutor">
        <Avatar>R</Avatar>
        redian_ <span>12h</span> 
      </div>
      <MoreHorizIcon/>
    <div className="post_img">
    <img src= " ">
    
    </img>



    </div>
  
    <div className=".post_footer"></div>
    </div>
  )
}

export default Post