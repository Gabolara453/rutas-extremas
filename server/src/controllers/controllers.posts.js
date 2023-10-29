import { response } from 'express';
import { checkUserExist } from '../models/models.auth.js';
import { get_ID_Post, newPost, updatePost, updateStructPost, deletePost, get_Posts } from '../models/models.posts.js';

export const getPosts = async ( req, res = response ) => {
  try {
    const response = await get_Posts();
    if(!response){  
      return res.json({succes: true, response }).status(200);
    }else{
      return res.json({succes: true, response}).status(200);
    }
  } catch (error) {
    console.error(error)
  }
}


export const get_ID_newPost = async ( req, res = response ) => {
  try {
    const response = await get_ID_Post();
    if(!response){  
      return res.json({succes: true, response: 1}).status(200);
    }else{
      return res.json({succes: true, response}).status(200);
    }
  } catch (error) {
    console.error(error)
  }
}

export const newPosted = async ( req, res = response ) => {
  const { id_user, id_ct, id_sb_ct, titulo, descp1, descp2, descp3, 
          descp4, descp5, id_dificult, id_region, id_comuna, img1, img2, img3, img4,
          img5, coord_x, coord_y } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (response){
        const result = await newPost( id_user, id_ct, id_sb_ct, titulo, descp1, descp2, descp3, 
            descp4, descp5, id_dificult, id_region, id_comuna, img1, img2, img3, img4,
            img5, coord_x, coord_y );
        return res.json({
            success: true,
            result
        }).status(200);
    }
    return res.status(400).json({
        msg:"ERROR: auth controller o db register"
    });
  } catch (error) {
    console.error(error);
  }
}


export const updatePosted = async ( req, res = response ) => {
  const { tittle_a, id_user, id_ct, id_sb_ct, tittle_n, descp1, descp2, descp3, 
          descp4, descp5, id_dificult, id_region, id_comuna, img1, img2, img3, img4,
          img5, coord_x, coord_y } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (response){
        const result = await updatePost( tittle_a, id_user, id_ct, id_sb_ct, tittle_n, descp1, descp2, descp3, 
            descp4, descp5, id_dificult, id_region, id_comuna, img1, img2, img3, img4,
            img5, coord_x, coord_y );
        return res.json({
            success: true,
            result
        }).status(200);
    }
    return res.status(400).json({
        msg:"ERROR: auth controller o db update"
    });
  } catch (error) {
    console.error(error);
  }
}

export const newStructPost = async ( req, res = response ) => {
  const { tittle, id_user, struct_post } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (response){
        const result = await updateStructPost( tittle, struct_post );
        return res.json({
            success: true,
            result
        }).status(200);
    }
    return res.status(400).json({
        msg:"ERROR: auth controller o db update"
    });
  } catch (error) {
    console.error(error);
  }
}

export const deletePosted = async ( req, res = response ) => {
  const { id_post, id_user } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (response){
        const result = await deletePost( id_post, id_user );
        return res.json({
            success: true,
            result
        }).status(200);
    }
    return res.status(400).json({
        msg:"ERROR: auth controller o db update"
    });
  } catch (error) {
    console.error(error);
  }
}
