const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbchunin',
    multipleStatements: true
});

conn.connect((error)=> error ? console.log(error) : console.log("Database Terhubung"))

module.exports = conn;