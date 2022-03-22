const mysql = require('mysql2');

// Connect to sql database 
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MYSQL password,
    password: 'password',
    // which database to use 
    database: 'election'
},
    console.log('Connected to the election database.')
);

module.exports = db;