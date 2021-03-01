const mysql = require("mysql");
let conn;
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const get_SQL_Connection = function () {
  conn = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    multipleStatements: true,
  });
  // When connected
  conn.connect(function (err) {
    if (err) {
      console.log("SQL CONNECT ERROR&gt;&gt;" + err);
      setTimeout(get_SQL_Connection, 2000); // Retry when connection fails
    } else {
      console.log("SQL CONNECT SUCCESSFUL.");
    }
  });
  // In case of error
  conn.on("error", function (err) {
    console.log("SQL CONNECTION ERROR&gt;&gt;" + err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("=&gt;RECONECT ...");
      // reconnect
      get_SQL_Connection();
    } else {
      throw err;
    }
  });
};
get_SQL_Connection();
module.exports = conn;
