const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// create voter get routes 
router.get('/voters', (req, res) => {
    const sql =`SELECT * FROM voters ORDER BY last_name`

    db.query(sql, (err, rows) => {
        if (err)  {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET voter by id 
router.get('/voter/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// POST create voter 
router.post('/voter', ({ body }, res) => {
    // Data validation 
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO voters (first_name, last_name, email)
                Values (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        })
    
    });
});

// PUT/update voter email address
router.put('/voter/:id', (req, res) => {
    // Data validation 
    const errors = inputCheck(req.body, "email");
    if (errors) {
        res.status(400).json( { error: errors });
        return;
    }

    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message }); 
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Voter not found'
            });
        }
        else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});


// DELETE voter route 
router.delete('/voter/:id', (req, res) => {
    const sql = `DELETE FROM voters WHERE ID = ?`;
    
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message});
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Voter not found'
            });
        }
        else {
            res.json({
                message: 'success',
                changes: result.affectedRows,
                id: req.params.id
            })
        }
    });
});

module.exports = router; 