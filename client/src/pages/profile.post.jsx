import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export function PostProfile(){
  const { id } = useParams()


  return(
    <div>
      Post Profile { id }
    </div>
  )
};

export default PostProfile;

