require('dotenv').config();
const secret = process.env.JWT_SECRET; 

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Register route
app.post('/signup', async (req, res) => {
  const { name, address, email, phone, username, password, accountType } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert user
    const sql = 'INSERT INTO users (name, address, email, phone, username, password, accountType) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, address, email, phone, username, hashedPassword, accountType], (err, result) => {
      if (err) {
        console.error('MySQL Error:', err);
        return res.status(400).send('Error registering user');
      }
      res.status(201).send('User registered');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    // SQL query to get user by username
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(400).send('Error fetching user');
      }

      if (results.length === 0) {
        return res.status(400).send('User not found');
      }

      const user = results[0];

      // Compare password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).send('Invalid password');
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
