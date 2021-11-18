require('dotenv').config()

const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "my_db"
})
db.connect();

module.exports = db;