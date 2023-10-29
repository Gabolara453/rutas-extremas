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

export async function createUser( id_user, username, displayName, email, fecha_naci, region, comuna, accessToken ) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    let resultado, msg;
    // Obtener la fecha y hora actual en formato de base de datos Oracle
    const fechaHoraActual = new Date();
    const fechaHoraSQL = fechaHoraActual.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const result = await connection.execute(
      `
      declare
          resultdo varchar2(50);
          mensaje varchar2(100);
      begin
          crear_usuario(:id_user, :username, :displayName, :email, :fecha_naci, :region, 
                  :comuna, :accessToken, :fechaHoraSQL, :resultdo, :mensaje);
          DBMS_OUTPUT.PUT_LINE(RESULTDO || ' - ' || MENSAJE );
      end;
      `,{
          id_user, username, displayName, email, fecha_naci, region, comuna, accessToken, fechaHoraSQL,
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
    console.error("error en procedimiento",error);
  } finally {
    closeConnection();
  }
}


export async function updateUser( id_user, username, displayName, fecha_naci, region, comuna ) {
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
          update_usuario(:id_user, :username, :displayName, :fecha_naci, :region, 
                  :comuna, :fechaHoraSQL, :resultdo, :mensaje);
          DBMS_OUTPUT.PUT_LINE(RESULTADO || ' - ' || MENSAJE );
      end;
      `,{
          id_user, username, displayName, fecha_naci, region, comuna, fechaHoraSQL,
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

export async function deleteUsers( id_user ) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    let resultado, msg;
    const result = await connection.execute(
      `
      declare
          resultado varchar2(50);
          mensaje varchar2(100);
      begin
          delete_usuario(:id_user, :resultdo, :mensaje);
          DBMS_OUTPUT.PUT_LINE(RESULTADO || ' - ' || MENSAJE );
      end;
      `,{
          id_user,
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
