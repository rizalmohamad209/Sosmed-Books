const mysql = require("mysql");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
const pool = require("generic-pool");
const mysql = require("mysql");

const conn = pool.createPool(
  {
    create: (done) => {
      return mysql
        .createConnection({
          hostname: "localhost",
          user: "root",
          password: "root",
          database: "chat_db",
        })
        .connect(done);
    },
    destroy: (connection) => connection.destroy(),
    validate: (connection) => connection.threadId,
  },
  {
    testOnBorrow: true,
    acquireTimeoutMillis: 10000,
    min: 1,
    max: size,
  }
);
module.exports = conn;
