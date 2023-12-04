import { response } from "express";
import {  
  checkPublicUserExist,
  checkUserExist, 
  checkUsernameExist,
  loginUser, 
  logoutUser, 
  getRegiones,
  getComunas,
  getCoordsRg,
  getCategoria,
  getSbCategoria,
  getDificultad
} from "../models/models.auth.js";

export const getCheckPublicUserExist = async ( req, res = response ) => {
  const result = await checkPublicUserExist(req.body.id);
  if ( result ) {
    res.json({ success: true }).status(200);
  } else {
    res.json({ success: false }).status(200);
  }
}

export const getCheckUserExist = async ( req, res = response ) => {
  const result = await checkUserExist(req.body.id_usr);
  if ( result ) {
    res.json({ success: true }).status(200);
  } else {
    res.json({ success: false }).status(200);
  }
}

export const getCheckUsernameExist = async ( req, res = response ) => {
  const result = await checkUsernameExist(req.body.usr);
  if ( result ) {
    res.json({ success: true }).status(200);
  } else {
    res.json({ success: false }).status(200);
  }
}

export const login = async ( req, res = response ) => {
  const { id_user, accessToken } = req.body;
  try {
    const result = await checkUserExist(id_user);
    if (result) {
      const response = await loginUser(id_user, accessToken);
      return res.json({ success: true, response }).status(200);
    }
    return res.status(400).json({
      msg: "ERROR: auth controller o db login"
    })
  } catch (error) {
    console.error(error);
  }
}

export const logout = async ( req, res = response ) => {
  const { id_user } = req.body;
  try {
    const result = await checkUserExist(id_user);
    if (result) {
      const response = await logoutUser(id_user);
      return res.json({ success: true, response }).status(200);
    }
    return res.status(400).json({
      msg: "ERROR: auth controller o db logout"
    })
  } catch (error) {
    console.error(error);
  }
}


export const regiones = async ( req, res = response ) => {
  try {
    const response = await getRegiones();
    res.json({success: true, response});
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const comunas = async ( req, res = response ) => {
  try {
    const { id_rg } = req.body;
    const response = await getComunas(id_rg);
    res.json({success: true, response});
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const getCoordRegion = async ( req, res = response ) => {
  try {
    const { id_rg } = req.body;
    const response = await getCoordsRg(id_rg);
    res.json({success: true, response});
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const categorias = async ( req, res = response ) => {
  try {
    const response = await getCategoria();
    res.json({success: true, response});
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const subCategorias = async ( req, res = response ) => {
  try {
    const { id_ct } = req.body;
    const response = await getSbCategoria(id_ct);
    res.json({success: true, response});
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const dificultades = async ( req, res = response ) => {
  try {
    const { id_ct } = req.body;
    const response = await getDificultad(id_ct);
    res.json({success: true, response});
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}
