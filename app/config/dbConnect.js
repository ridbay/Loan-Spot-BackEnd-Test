/* eslint-disable */
const mysql = require('mysql2');
const config = require('./config');

const dbConfig = {
  host: config.DB.host,
  user: config.DB.user,
  password: config.DB.password,
  database: config.DB.database,
  port: 3306,
  connectTimeout: 27700,
  multipleStatements: true,
  // waitForConnections: true,
  connectionLimit: 10,
  // queueLimit: 0
};

let connection;
function handleDisconnect() {
  connection = mysql.createPool(dbConfig); // Recreate the connection, since the old one cannot be reused.
  // console.log("Collected to Database successfully...")
  connection.getConnection(function (err, connection) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      connection.release(); // release the connection
      console.error('error when connecting to db:', err);
      setTimeout(handleDisconnect, 10000); // We introduce a delay before attempting to reconnect,to avoid a hot loop, and to allow our node script to  process asynchronous requests in the meantime. If serving http, display a 503 error.
    } else {
      console.log('Connected to the database');
      connection.release(); // release the connection
    }
  });

  connection.on('error', function onError(err) {
    console.error('db error', err);
    if (err.code == 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually lost due to either server restart, or a connnection idle timeout (the wait_timeout server variable configures this)
      handleDisconnect();
    } else {
      // throw err;
      console.log(err);
    }
  });
}
handleDisconnect();

module.exports = connection;
