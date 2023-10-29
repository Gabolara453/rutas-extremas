export const connection_db = {
  user : 'db', 
  password : 'hola123',
  connectString : '10.243.37.137:1521/xe' 
  // connectString : '(DESCRIPTION=(ADDRESS=(host=localhost)(protocol=TCP)(port=1521))(CONNECT_DATA=(SERVICE_NAME=orclpdb)))'
}

// export const connection_db = {
//   user : 'prueba', 
//   password : '12345',
//   connectString : 'localhost:1521/xe' 
//   // connectString : '(DESCRIPTION=(ADDRESS=(host=localhost)(protocol=TCP)(port=1521))(CONNECT_DATA=(SERVICE_NAME=orclpdb)))'
// }

// export const connection_db = {
//   user : process.env.DB,
//   password : process.env.PASSWORD_DB,
//   connectString : process.env.CONNECTSTRING
//   // connectString : '(DESCRIPTION=(ADDRESS=(host=localhost)(protocol=TCP)(port=1521))(CONNECT_DATA=(SERVICE_NAME=orclpdb)))'
// }
