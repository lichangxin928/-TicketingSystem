const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'111',
    database:'ticketing'
})

conn.connect();

module.exports = conn;