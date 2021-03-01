const mysql = require("mysql");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const conn = mysql.createConnection({
  //   host: DB_HOST,
  //   user: DB_USERNAME,
  //   password: DB_PASSWORD,
  //   database: DB_DATABASE,
  host: "remotemysql.com",
  user: "jh0ceKOCmG",
  password: "ABziUsLgyw",
  database: "jh0ceKOCmG",
  multipleStatements: true,
});

conn.connect((error) =>
  error ? console.log(error) : console.log("Database Terhubung")
);

module.exports = conn;
