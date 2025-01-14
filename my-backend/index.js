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
  const { username, password, accountType } = req.body;

  if (!username || !password || !accountType) {
    return res.status(400).send('Username, password, and account type are required');
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

      // Check if the provided accountType matches the user's account type
      if (user.accountType !== accountType) {
        return res.status(400).send('Incorrect account type');
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, accountType: user.accountType }, secret, { expiresIn: '1h' });
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/products', (req, res) => {
  const query = `
    SELECT c.id AS category_id, c.name AS category_name, p.id AS product_id, p.name AS product_name, p.image_url 
    FROM products p
    JOIN categories c ON p.category_id = c.id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('MySQL Error:', err);
      res.status(500).send(err);
    } else {
      console.log('Products fetched:', results); // Add this line to log the raw results
      const categories = results.reduce((acc, row) => {
        const { category_id, category_name, product_id, product_name, image_url } = row;
        
        // If category already exists in accumulator, push the product to it
        if (!acc[category_id]) {
          acc[category_id] = {
            id: category_id,
            name: category_name,
            products: []
          };
        }
        
        // Add product to the respective category
        acc[category_id].products.push({
          id: product_id,
          name: product_name,
          image_url: image_url
        });
        
        return acc;
      }, {});

      // Convert the accumulator object into an array and send it
      res.json(Object.values(categories)); // Send the grouped result
    }
  });
});

// Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
