const mysql = require('mysql2/promise')
require('dotenv').config()

const connection = mysql.createPool({
    database: 'chat',
    user: 'root',
    host: 'localhost',
    password: process.env.MYSQL_PASSWORD
})

module.exports = connection