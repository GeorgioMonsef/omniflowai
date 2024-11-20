const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database file path
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Users table ready');
            }
        });
    }
});

// Helper function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// API to register a user
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Validation: Ensure all fields are not empty
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password cannot be empty' });
    }

    // Validation: Ensure email format is valid
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(query, [username, email, password], (err) => {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                // Detect which field caused the error
                if (err.message.includes('username')) {
                    res.status(400).json({ error: 'Username already exists' });
                } else if (err.message.includes('email')) {
                    res.status(400).json({ error: 'Email already exists' });
                }
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        } else {
            res.json({ message: 'User registered successfully' });
        }
    });
});

// API to log in a user
app.post('/login', (req, res) => {
    const { identifier, password } = req.body;

    // Validation: Ensure identifier and password are not empty
    if (!identifier || !password) {
        return res.status(400).json({ error: 'Username/Email and password cannot be empty' });
    }

    const query = `SELECT * FROM users WHERE username = ? OR email = ?`;
    db.get(query, [identifier, identifier], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username/email or password' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
    });
});

// API to fetch all users
app.get('/users', (req, res) => {
    const query = `SELECT id, username, email, password FROM users`; // Exclude password from the response for security
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            res.json(rows);
        }
    });
});

// API to delete a user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    const query = `DELETE FROM users WHERE id = ?`;
    db.run(query, [userId], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting user' });
        } else {
            res.status(204).send(); // No content response
        }
    });
});

// API to generate a new user
app.post('/users', (req, res) => {
    const randomUsername = `user${Math.floor(Math.random() * 10000)}`;
    const randomEmail = `user${Math.floor(Math.random() * 10000)}@example.com`;
    const randomPassword = `pass${Math.floor(Math.random() * 10000)}`;

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(query, [randomUsername, randomEmail, randomPassword], function (err) {
        if (err) {
            res.status(500).json({ error: 'Error generating user' });
        } else {
            res.status(201).json({
                id: this.lastID,
                username: randomUsername,
                email: randomEmail,
                password: randomPassword,
            });
        }
    });
});

// Serve React static files
app.use(express.static(path.join(__dirname, '../build')));

// Handle React routing, return index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
