const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Afonso10',
    database: 'todolist'
})

module.exports = connection