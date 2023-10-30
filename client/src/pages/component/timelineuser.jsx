import React from 'react'
import "./css/timelineuser.css"
import Post from './post'
import Suge from './suge';

function Timelineuser() {
  return (
    <div className="timeline">
      <div className="timeline_left">
       <div className="timeline_post">
         <Post />
         <Post />
         <Post />

        </div>

      </div>
      <div className="timeline_right">
        <Suge/>


      </div>


      
    </div>
  );
}

export default Timelineuser