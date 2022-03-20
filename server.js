const express = require('express');
const PORT = process.env.PORT || 3001; 
const app = express(); 

// add express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default response for any other request (Not found)== placement is important becuase it is a catchall route! 
// needs to go below all other requests to not override
app.use(((req, res) => {
    res.status(404).end();
}));

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});