const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// add express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes); 
// by adding /api prefix here, we can remove it from individual route expressions

// Default response for any other request (Not found) 
// placement is important becuase it is a catchall route
// needs to go below all other requests to not override
app.use(((req, res) => {
    res.status(404).end();
}));

// Start server after DB connection 
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server is now running on port ${PORT}`);
    });
})
