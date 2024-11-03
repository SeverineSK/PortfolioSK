require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post(
    '/api/contact',
    [
        body('name').isLength({ min: 1 }).trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('subject').isLength({ min: 1 }).trim().escape(),
        body('message').isLength({ min: 1 }).trim().escape()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, subject, message } = req.body;
        const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, email, subject, message], (err, result) => {
            if (err) {
                console.error('Error saving message:', err);
                res.status(500).json({ error: 'Error saving message' });
            } else {
                res.status(200).json({ message: 'Message saved successfully' });
            }
        });
    }
);

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM admin_users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Server error' });
        } else if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            const match = await bcrypt.compare(password, results[0].password);
            if (match) {
                const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    });
});

app.get('/api/messages', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const errorType = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
            return res.status(401).json({ error: errorType });
        }

        const sql = 'SELECT * FROM contact_messages ORDER BY created_at DESC';
        db.query(sql, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Error fetching messages' });
            } else {
                res.json(results);
            }
        });
    });
});

app.delete('/api/messages/:id', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const { id } = req.params;
        const sql = 'DELETE FROM contact_messages WHERE id = ?';

        db.query(sql, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting message' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Message not found' });
            }
            res.status(204).send();
        });
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
