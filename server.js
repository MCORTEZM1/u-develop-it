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

// // db object uses query method which runs SQL query and executes the callback 
// =========== UNCOMMENT AS YOU CREATE EXPRESS ROUTES ===================

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     // err = is an error response ofc; null if no errs. 
//     // rows is the database query response
//     console.log(rows);
// });

// // GET a single candidate 
// db.query(`SELECT * FROM candidates WHERE id = 1;`, (err, row) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(row);
// });


// // Delete a candidate 
// db.query(`DELETE FROM candidates WHERE id = ?`, 2, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result)
// });

// // Create a candidate 
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//                 VALUES (?,?,?,?)`;
// const params = [2, 'Virginia', 'Woolf', 1];

// db.query(sql, params, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });


// Default response for any other request (Not found)== placement is important becuase it is a catchall route! 
// needs to go below all other requests to not override
app.use(((req, res) => {
    res.status(404).end();
}));

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});