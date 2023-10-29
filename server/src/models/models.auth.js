import oracleDB from "oracledb";
import { connection_db } from "../server/config.db.js";

oracleDB.autoCommit = true;

let connection

const closeConnection = async ()  => {
  if(connection) {
    try {
      await connection.close()
    } catch (error) {
      console.error(error);
    }
  }
}

export async function checkUserExist(id_usr) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute(
      `select id_user from usuario where id_user = :id_usr`, [id_usr]
    );
    const result = response.rows[0];
    return result;
  } catch (error) {
    return console.error(error);
  } finally {
    closeConnection();
  }
}

export async function checkUsernameExist(usr) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute(
      `select username from usuario where username = :id_usr`, [usr]
    );
    const result = response.rows[0];
    return result;
  } catch (error) {
    return console.error(error);
  } finally {
    closeConnection();
  }
}

export async function getCoordsRg(id_rg) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute(
      `select coordenate_x, coordenate_y from regiones where id = :id_rg`, [id_rg]
    );
    const result = response.rows[0];
    return result;
  } catch (error) {
    return console.error(error);
  } finally {
    closeConnection();
  }
}

export async function loginUser( id_user, accessToken ) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    let resultado, msg;
    const fechaHoraActual = new Date();
    const fechaHoraSQL = fechaHoraActual.toISOString().replace(/T/, ' ').replace(/\..+/, '');

    const result = await connection.execute(
      `
      declare
          resultado varchar2(50);
          mensaje varchar2(100);
      begin
          update_sign(:id_user, :accessToken, :fechaHoraSQL, :resultdo, :mensaje);
          DBMS_OUTPUT.PUT_LINE(RESULTADO || ' - ' || MENSAJE );
      end;
      `,{
          id_user, accessToken,fechaHoraSQL,
          resultdo: { dir: oracleDB.BIND_OUT, type: oracleDB.STRING },
          mensaje: { dir: oracleDB.BIND_OUT, type: oracleDB.STRING }
        }
    );
    resultado = result.outBinds.resultdo
    msg = result.outBinds.mensaje
    // const response = result.rows;
    const response = {resultado, msg};
    return response;
  } catch (error) {
    console.error(error);
  } finally {
    closeConnection();
  }
}

export async function logoutUser( id_user ) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    let resultado, msg;
    const fechaHoraActual = new Date();
    const fechaHoraSQL = fechaHoraActual.toISOString().replace(/T/, ' ').replace(/\..+/, '');

    const result = await connection.execute(
      `
      declare
          resultado varchar2(50);
          mensaje varchar2(100);
      begin
          logout_sign(:id_user, :fechaHoraSQL, :resultdo, :mensaje);
          DBMS_OUTPUT.PUT_LINE(RESULTADO || ' - ' || MENSAJE );
      end;
      `,{
          id_user,fechaHoraSQL,
          resultdo: { dir: oracleDB.BIND_OUT, type: oracleDB.STRING },
          mensaje: { dir: oracleDB.BIND_OUT, type: oracleDB.STRING }
        }
    );
    resultado = result.outBinds.resultdo
    msg = result.outBinds.mensaje
    // const response = result.rows;
    const response = {resultado, msg};
    return response;
  } catch (error) {
    console.error(error);
  } finally {
    closeConnection();
  }
}


export async function getRegiones() {
  try {
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute('select id, nombre_region from regiones');
    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    closeConnection();
  }
}

export async function getComunas(id_region) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute(
      'select id, nombre_comuna from comunas where id_rg = :id_region', [id_region]
    );
    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    closeConnection();
  }
}



export async function getIdRegiones(nb_rg) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute('select id from regiones where nombre_region = :nb_rg', [nb_rg]);
    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    closeConnection();
  }
}


export async function getCategoria() {
  try {
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute('select id, nombre_categoria from categoria');
    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    closeConnection();
  }
}


export async function getSbCategoria(id_sbct) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute('select id, nombre_sb_ct from sub_categoria where id_sb_ct = :id_sbct', [id_sbct]);
    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    closeConnection();
  }
}

export async function getDificultad(id_sbct) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute('select id, nombre_dificultad from dificultad where id_ctg_d = :id_sbct', [id_sbct]);
    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    closeConnection();
  }
}
