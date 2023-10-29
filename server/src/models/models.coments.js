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

export async function createComentary( id_user, titulo_p, titulo_c, descp ) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    let resultado, msg;
    const fechaHoraActual = new Date();
    const fechaHoraSQL = fechaHoraActual.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const result = await connection.execute(
      `
      declare
          resultdo varchar2(50);
          mensaje varchar2(100);
      begin
          crear_comment( :id_user, :titulo_p, :titulo_c, :descp, :fechaHoraSQL, :resultdo, :mensaje );
          DBMS_OUTPUT.PUT_LINE(RESULTDO || ' - ' || MENSAJE );
      end;
      `,{
          id_user, titulo_p, titulo_c, descp,fechaHoraSQL,
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


export async function updateComentary( titulo_a, titulo_c, descp ) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    let resultado, msg;
    const fechaHoraActual = new Date();
    const fechaHoraSQL = fechaHoraActual.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const result = await connection.execute(
      `
      declare
          resultdo varchar2(50);
          mensaje varchar2(100);
      begin
          update_comment(:titulo_a, :titulo_c, :descp, :fechaHoraSQL, :resultdo, :mensaje);
          DBMS_OUTPUT.PUT_LINE(RESULTDO || ' - ' || MENSAJE );
      end;
      `,{
          titulo_a, titulo_c, descp, fechaHoraSQL,
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

export async function deleleComentary( titulo_c ) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    let resultado, msg;
    const result = await connection.execute(
      `
      declare
          resultado varchar2(50);
          mensaje varchar2(100);
      begin
          delete_comment(:titulo_c, :resultdo, :mensaje);
          DBMS_OUTPUT.PUT_LINE(RESULTADO || ' - ' || MENSAJE );
      end;
      `,{
          titulo_c,
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
