import { response } from 'express';
import { checkUserExist, checkUsernameExist } from '../models/models.auth.js';
import { get_user, createUser, updateUser, deleteUsers } from '../models/models.users.js';

export const user_info = async ( req, res = response ) => {
  const { id_user } = req.body;
  try {
    const result = await checkUserExist(id_user);
    if (result) {
      const response = await get_user(id_user);
      return res.json({ success: true, response }).status(200);
    }
    return res.status(400).json({
      msg: "ERROR: auth controller o db login"
    })
  } catch (error) {
    console.error(error);
  }
}

export const register = async ( req, res = response ) => {
  const { id_user, username, displayName, email, fecha_naci, region, comuna, accessToken } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (!response){
      const response2 = await checkUsernameExist(username);
      if(!response2){
        const result = await createUser( id_user, username, displayName, email, fecha_naci, region, comuna, accessToken);
        return res.json({
            success: true,
            result
        }).status(200);
      }
      return res.status(400).json({msg:"El username ya se encuentra resgistrado"});
    }
    return res.status(400).json({
        msg:"Su id ya se encuentra registrado"
    });
  } catch (error) {
    console.error("error en controlador",error);
  }
}


export const update = async ( req, res = response ) => {
  const { id_user, username, displayName, fecha_naci, region, comuna } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (response){
        const result = await updateUser( id_user, username, displayName, fecha_naci, region, comuna );
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

export const deleteUser = async ( req, res = response ) => {
  const { id_user } = req.body;
  
  try {
    const response = await checkUserExist(id_user);
    if (response){
        const result = await deleteUsers( id_user );
        return res.json({
            success: true,
            result
        }).status(200);
    }
    return res.status(400).json({
        msg:"ERROR: auth controller o db delete",
        response

    });
  } catch (error) {
    console.error(error);
  }
}
