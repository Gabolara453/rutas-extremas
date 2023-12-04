import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export function PostProfile(){
  const { id } = useParams()
  const _id = id.slice(1)

  return(
    <div>
      Post Profile { _id }
    </div>
  )
};

export default PostProfile;

