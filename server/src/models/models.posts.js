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

export async function get_Posts() {
  try{
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute(
      `
        select U.id, U.id_user, U.username, U.photURL, P.id, CT.nombre_categoria, SB.nombre_sb_ct, P.titulo, 
          D.dscp1, D.dscp2, D.dscp3, D.dscp4, D.dscp5, 
          DF.nombre_dificultad, R.nombre_region, C.nombre_comuna, 
          I.img1, I.img2, I.img3, I.img4, I.img5, CD.coord_x, CD.coord_y, P.created_it 
          from post P inner join categoria CT on P.id_ctg = CT.id
          inner join sub_categoria SB on P.id_sb_ctg = SB.id
          inner join dificultad DF on P.id_dificult = DF.id
          inner join ubicacion_post UP on P.id_ubi_post = UP.id
          inner join regiones R on UP.id_rgn_p = R.id 
          inner join comunas C on UP.id_cma_p = C.id
          inner join images I on P.id_img = I.id 
          inner join descripcion_post D on P.id_dscp_p = D.id
          inner join coordenates CD on P.id_cdts = CD.id
          inner join user_post UPO on P.id = UPO.id_post_
          inner join usuario U on UPO.id_usrp_ = U.id
      `
    );
    const result = response.rows;
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    closeConnection();
  }
}

export async function get_ID_Post() {
  try{
    connection = await oracleDB.getConnection(connection_db);
    const response = await connection.execute(`select max(id) from post`)
    const result = parseInt(response.rows[0]) + 1;
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    closeConnection();
  }
}

export async function newPost( id_user, id_ct, id_sb_ct, titulo, descp1, descp2, descp3, 
                                descp4, descp5, id_dificult, id_region, id_comuna, 
                                img1, img2, img3, img4, img5, coord_x, coord_y ) {
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
          crear_post(:id_user, :id_ct, :id_sb_ct, :titulo, :descp1, :descp2, :descp3, 
                :descp4, :descp5, :id_dificult, :id_region, :id_comuna, 
                :img1, :img2, :img3, :img4, :img5, :coord_x, :coord_y, :fechaHoraSQL,
                :resultdo, :mensaje);
          DBMS_OUTPUT.PUT_LINE(RESULTDO || ' - ' || MENSAJE );
      end;
      `,{
          id_user, id_ct, id_sb_ct, titulo, descp1, descp2, descp3, 
          descp4, descp5, id_dificult, id_region, id_comuna, 
          img1, img2, img3, img4, img5, coord_x, coord_y ,fechaHoraSQL,
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


export async function updatePost( tittle_a, id_user, id_ct, id_sb_ct, tittle_n, descp1, descp2, descp3, 
                                descp4, descp5, id_dificult, id_region, id_comuna, 
                                img1, img2, img3, img4, img5, coord_x, coord_y ) {
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
          update_post( :tittle_a, :id_user, :id_ct, :id_sb_ct, :tittle_n, :descp1, :descp2, :descp3, 
              :descp4, :descp5, :id_dificult, :id_region, :id_comuna, :img1, :img2, :img3, :img4, :img5,
              :coord_x, :coord_y, :fechaHoraSQL, :resultdo, :mensje);
          DBMS_OUTPUT.PUT_LINE(RESULTADO || ' - ' || MENSAJE );
      end;
      `,{
          tittle_a, id_user, id_ct, id_sb_ct, tittle_n, descp1, descp2, descp3, 
          descp4, descp5, id_dificult, id_region, id_comuna, 
          img1, img2, img3, img4, img5, coord_x, coord_y, fechaHoraSQL, 
          resultdo: { dir: oracleDB.BIND_OUT, type: oracleDB.STRING },
          mensje: { dir: oracleDB.BIND_OUT, type: oracleDB.STRING }
        }
    );
    resultado = result.outBinds.resultdo
    msg = result.outBinds.mensje
    // const response = result.rows;
    const response = {resultado, msg};
    return response;
  } catch (error) {
    console.error(error);
  } finally {
    closeConnection();
  }
}

export async function updateStructPost( tittle, struct_post ) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    let resultado, msg;
    const result = await connection.execute(
      `
        declare
          resultado varchar2(50);
          mensaje varchar2(100);
        begin
          update_struct_post( :tittle, :struct_post, :resultdo, :mensje);
          DBMS_OUTPUT.PUT_LINE(RESULTADO || ' - ' || MENSAJE);
        end;
      `,{
        tittle, struct_post,
        resultdo: { dir: oracleDB.BIND_OUT, type: oracleDB.STRING },
        mensje: { dir: oracleDB.BIND_OUT, type: oracleDB.STRING }
      }
    );
    resultado = result.outBinds.resultdo;
    msg =  result.outBinds.mensje;

    const response = { resultado, msg };
    return response;
  } catch (error) {
    console.error(error);
  } finally {
    closeConnection();
  }
}

export async function deletePost( id_post, id_user ) {
  try {
    connection = await oracleDB.getConnection(connection_db);
    let resultado, msg;
    const result = await connection.execute(
      `
      declare
          resultado varchar2(50);
          mensaje varchar2(100);
      begin
          delete_post( :id_post, :id_user, :resultdo, :mensaje);
          DBMS_OUTPUT.PUT_LINE(RESULTADO || ' - ' || MENSAJE );
      end;
      `,{
          id_post, id_user,
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
