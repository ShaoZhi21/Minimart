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

// Updated Login Route
app.post('/login', async (req, res) => {
  const { username, password, accountType } = req.body;

  if (!username || !password || !accountType) {
    return res.status(400).send('Username, password, and account type are required');
  }

  try {
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
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).send('Invalid password');
      }

      if (user.accountType !== accountType) {
        return res.status(400).send('Incorrect account type');
      }

      const token = jwt.sign(
        { userId: user.id, accountType: user.accountType },
        secret,
        { expiresIn: '1h' }
      );

      // Send back user details and token
      res.json({
        token,
        username: user.username,
        name: user.name,
        address: user.address,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/products', (req, res) => {
  const query = `
    SELECT c.id AS category_id, c.name AS category_name, p.id AS product_id, p.name AS product_name, p.image_url, p.quantity
    FROM products p
    JOIN categories c ON p.category_id = c.id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('MySQL Error:', err);
      res.status(500).send(err);
    } else {
      console.log('Products fetched:', results); // Log raw results
      const categories = results.reduce((acc, row) => {
        const { category_id, category_name, product_id, product_name, image_url, quantity } = row;
        
        // If category already exists in accumulator, push the product to it
        if (!acc[category_id]) {
          acc[category_id] = {
            id: category_id,
            name: category_name,
            products: []
          };
        }
        
        // Add product to the respective category with quantity
        acc[category_id].products.push({
          id: product_id,
          name: product_name,
          image_url: image_url,
          quantity: quantity // Include quantity here
        });
        
        return acc;
      }, {});

      // Convert the accumulator object into an array and send it
      res.json(Object.values(categories)); // Send the grouped result
    }
  });
});


// Submit Order Route
app.post('/submit-order', (req, res) => {
  const { username, name, address, products } = req.body;

  if (!username || !name || !address || !Array.isArray(products)) {
    return res.status(400).send('Invalid order data');
  }

  const orderQuery = `
    INSERT INTO orders (username, name, address) VALUES (?, ?, ?);
  `;

  db.query(orderQuery, [username, name, address], (err, result) => {
    if (err) {
      console.error('MySQL Error:', err);
      return res.status(500).send('Error saving order');
    }

    const orderId = result.insertId;

    // Insert products associated with the order
    const productQuery = `
      INSERT INTO order_items (order_id, product_id, product_name, quantity) VALUES ?;
    `;
    const productData = products.map(product => [
      orderId,
      product.id,
      product.name,
      product.quantity,
    ]);

    db.query(productQuery, [productData], (err) => {
      if (err) {
        console.error('MySQL Error:', err);
        return res.status(500).send('Error saving order items');
      }

      res.status(200).send('Order submitted successfully');
    });
  });
});

app.get('/order-history/:username/:name', (req, res) => {
  const { username, name } = req.params;

  const query = `
    SELECT oi.product_name, oi.product_id, oi.quantity, p.image_url
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.username = ? AND o.name = ?
  `;

  db.query(query, [username, name], (err, results) => {
    if (err) {
      console.error('Error fetching order history:', err);
      return res.status(500).json({ error: `Error fetching order history: ${err.message}` });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.json(results); // Send the fetched data as a response
  });
});

// Route to fetch users data
app.get('/users', (req, res) => {
  db.query('SELECT id, name, email, phone, address, accountType FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      res.json(results); // Send user data as JSON
    }
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log('Received request to delete user with ID:', userId);  // Debugging log

  // Delete user from database
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Failed to delete user' });
    }
    console.log('Delete result:', result);  // Debugging log to show query result
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ message: 'Failed to delete product' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});

// Update product quantity
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;

  if (quantity === undefined || isNaN(quantity)) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  const query = 'UPDATE products SET quantity = ? WHERE id = ?';
  db.query(query, [quantity, productId], (err, results) => {
    if (err) {
      console.error('Error updating quantity:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Quantity updated successfully', productId, quantity });
  });
});

app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM Categories'; // Ensure this matches your table name
  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error fetching categories:', err.message);
      res.status(500).json({ error: 'Failed to fetch categories' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/products', (req, res) => {
  const { name, description, image_url, category_id, quantity } = req.body;

  // Check if all required fields are present
  if (!name || !category_id || !quantity) {
    return res.status(400).json({ error: 'Name, category, and quantity are required' });
  }

  const sql = 'INSERT INTO products (name, description, image_url, category_id, quantity) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, description, image_url, category_id, quantity], (err, result) => {
    if (err) {
      console.error('MySQL Error:', err);
      return res.status(500).json({ error: 'Error adding product' });
    }
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  });
});

app.get('/orders', (req, res) => {
  // Query to get all orders along with order items by joining the orders and order_items tables
  const sqlQuery = `
    SELECT o.id AS orderId, o.name AS user, oi.product_id, oi.product_name, oi.quantity
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
  `;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error fetching orders and order items:', err);
      return res.status(500).json({ error: 'Error fetching orders and order items' });
    }

    // Log the raw result to check what data was returned
    console.log('Raw result:', result);

    if (result.length === 0) {
      console.log('No orders found');
      return res.status(404).json({ error: 'No orders found' });
    }

    // Grouping the result by orderId to get all items under one order
    const ordersWithItems = result.reduce((acc, row) => {
      console.log('Processing row:', row);  // Log each row to see the data

      // Check if the order already exists in accumulator
      let order = acc.find(order => order.orderId === row.orderId);

      if (!order) {
        // If the order is not in the accumulator, create a new order entry
        order = {
          orderId: row.orderId,
          user: row.user,
          orderItems: []
        };
        acc.push(order);
      }

      // Add the current item to the order's items list
      order.orderItems.push({
        productId: row.product_id,  // Now adding productId
        productName: row.product_name,
        quantity: row.quantity
      });

      return acc;
    }, []);

    // Log the grouped orders
    console.log('Orders with items:', ordersWithItems);

    // Send the response with orders and their corresponding items
    res.status(200).json({ orders: ordersWithItems });
  });
});


app.delete('/orders/:orderId/products/:productId', (req, res) => {
  const { orderId, productId } = req.params;

  // Query to delete the product from the order_items table
  const deleteProductQuery = 'DELETE FROM order_items WHERE order_id = ? AND product_id = ?';
  db.query(deleteProductQuery, [orderId, productId], (err, result) => {
    if (err) {
      console.error('Error deleting product from order:', err);
      return res.status(500).json({ message: 'Error deleting product from order' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found in the order' });
    }

    res.status(200).json({ message: `Product with ID ${productId} deleted from order ID ${orderId}` });
  });
});


// Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
