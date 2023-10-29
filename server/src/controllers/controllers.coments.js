import { response } from 'express';
import { checkUserExist } from '../models/models.auth.js';
import { createComentary, updateComentary, deleleComentary } from '../models/models.coments.js';


export const newComment = async ( req, res = response ) => {
  const { id_user, titulo_p, titulo_c, descp } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (response){
        const result = await createComentary( id_user, titulo_p, titulo_c, descp );
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


export const updateComment = async ( req, res = response ) => {
  const { id_user, titulo_a, titulo_c, descp } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (response){
        const result = await updateComentary( titulo_a, titulo_c, descp );
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


export const deleteComment = async ( req, res = response ) => {
  const { id_user, titulo_c } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (response){
        const result = await deleleComentary( titulo_c );
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
