import React, {useState, useEffect} from 'react';
import "./css/post.css";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { get_Post } from '../../context/auth.backend';


function Post() {
  const [post, setPost] = useState();

  useEffect(() => {
    get_Post().then(data => {
      // console.log(data.response)
      const arrayPost = data.response;
      const mappedPost = arrayPost.map((item) => (
        <div className='post'>
          <div className=".post_header"></div>
            <div className="post_headerAutor">
              <Avatar>R</Avatar>
              redian_ <span>12h</span> 
            </div>
            <MoreHorizIcon/>
          <div className="post_img">
            <img src={item[12]}/>
          </div>
        
          <div className=".post_footer"></div>
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
