# Hack4Good Hackathon: Muhammadiyah Welfare Home Minimart Website

## Project Overview

The **Muhammadiyah Welfare Home Minimart Website** is a web application developed as part of the **Hack4Good Hackathon**. The goal of this project is to provide an online minimart for the welfare home, allowing them to manage and sell essential goods, all while creating a user-friendly platform for both administrators and customers. The website facilitates:

- User registration and login
- Product listing and categorization
- Order placement and order history tracking
- Admin functions like adding products, updating stock, and viewing user information

## Features

### User Features

- **Sign Up and Login**: Users can create accounts and log in with different account types.
- **Product Browsing**: Products are categorized and listed, complete with images and descriptions.
- **Order Submission**: Users can submit orders with selected products and have them delivered to their address.
- **Order History**: Users can view their past orders, including details like product names and quantities.

### Admin Features

- **Manage Users**: Admins can view all users and delete users if necessary.
- **Manage Products**: Admins can add, update, and delete products from the inventory.
- **Order Management**: Admins can view all orders and manage order items.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens) for secure authentication
- **Hashing**: bcryptjs for password hashing

## Installation

### Prerequisites

1. **Node.js**: Ensure that Node.js is installed on your machine.
2. **MySQL Database**: Set up a MySQL database to store user and product information.

### Steps to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShaoZhi21/Minimart.git
   cd minimart
2. **Install dependencies**:
**Frontend**
    ```bash
    cd minimart
    npm install
**Backend**
    ```bash
    cd backend
    npm install
3. **Set up MySQL Database**:
    ```bash
    CREATE DATABASE minimart_db;
4. **Configure Environment Variables**:
    ```bash
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret
5. **Create Tables**:
    ```bash
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(15),
    username VARCHAR(50),
    password VARCHAR(255),
    accountType VARCHAR(50)
    );

    CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        image_url VARCHAR(255),
        category_id INT,
        quantity INT
    );

    CREATE TABLE orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50),
        name VARCHAR(255),
        address VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_id INT,
        product_name VARCHAR(255),
        quantity INT
    );

    CREATE TABLE categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    );
6. **Run the Application**: 
    **Backend**
    ```bash
    cd backend
    node index.js
    **Frontend**
    ```bash
    cd minimart
    npm start
The frontend will now be available at http://localhost:3000, and the backend at http://localhost:3009.

### API Endpoints
**Auth Routes**
POST /signup - Register a new user
POST /login - Log in and receive a JWT token
**Product Routes**
GET /products - Get all products with their categories
POST /products - Add a new product (Admin)
DELETE /products/:id - Delete a product (Admin)
PUT /products/:id - Update product quantity (Admin)
**Order Routes**
POST /submit-order - Submit an order with the products from the cart
GET /order-history/:username/:name - View order history
**User Routes**
GET /users - Fetch all users (Admin)
DELETE /users/:id - Delete a user (Admin)
**Usage**
Register: Create a new account by providing your name, email, phone, username, password, and account type.
Log in: Log in using your username and password.
Browse Products: Search or browse products by category.
Add to Cart: Add products to your shopping cart.
Checkout: Submit your order with the products in your cart.

**Created by**:
Soong Shao Zhi
Lee Chong Rui
William Chua
Fabian Lim