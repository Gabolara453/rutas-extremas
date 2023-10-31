import React from 'react'
import "./css/timeline.css"
import Post from './post'
import Sugerencia from './sugerencia';


function Timeline() {
  return (
    <div className="timeline">
      <div className="timeline_left">
       <div className="timeline-post">
       <Post />
       <br></br>

        </div>

      </div>
      <div className="timeline_right">
        <Sugerencia/>
      </div>

    </div>
  );
}

export default Timeline
