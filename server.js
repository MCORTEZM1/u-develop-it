const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001; 
const app = express(); 

// add express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// db object uses query method which runs SQL query and executes the callback 
db.query(`SELECT * FROM candidates`, (err, rows) => {
    // err = is an error response ofc; null if no errs. 
    // rows is the database query response
    console.log(rows);
});


// Default response for any other request (Not found)== placement is important becuase it is a catchall route! 
// needs to go below all other requests to not override
app.use(((req, res) => {
    res.status(404).end();
}));

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});