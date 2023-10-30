import React from 'react'
import "./css/timeline.css"
import Post from './post'
import Suge from './suge';

function Timeline() {
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

export default Timeline