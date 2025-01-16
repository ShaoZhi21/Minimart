# Hack4Good Hackathon: Muhammadiyah Welfare Home Minimart Website

## Project Overview

The **Muhammadiyah Welfare Home Minimart Website** is a web application developed as part of the **Hack4Good Hackathon**. The goal of this project is to provide an online minimart for the welfare home, allowing them to manage and sell essential goods, all while creating a user-friendly platform for both administrators and customers. 

## Features

### User Features

- **Sign Up and Login**: Users can create accounts and log in with different account types.
- **Product Browsing**: Products are categorized and listed, complete with images and descriptions.
- **Order Submission**: Users can add to cart and submit orders.
- **Order History**: Users can view their past orders, including details like product names and quantities.

### Admin Features

- **Manage Users**: Admins can view all users and delete users if necessary.
- **Manage Products**: Admins can add, update, and delete products from the inventory.
- **Order Management**: Admins can view all orders and complete order items.

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
    ```bash
    cd minimart
    npm install
    cd .. // To minimart
    npm install
3. **Set up MySQL Database**:
    ```bash
    CREATE DATABASE minimart_db (or any other name);
4. **Configure Environment Variables**:
    ```bash
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=minimart_db (or any other name)
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
    ```bash
    cd backend
    node index.js
    cd .. // To minimart
    npm start
The frontend will now be available at http://localhost:3000, and the backend at http://localhost:3009.<br>

## API Endpoints
### Auth Routes <br>
POST /signup - Register a new user<br>
POST /login - Log in and receive a JWT token<br>

### Product Routes <br>
GET /products - Get all products with their categories<br>
POST /products - Add a new product (Admin)<br>
DELETE /products/:id - Delete a product (Admin)<br>
PUT /products/:id - Update product quantity (Admin)<br>

### Order Routes<br>
POST /submit-order - Submit an order with the products from the cart<br>
GET /order-history/:username/:name - View order history<br>

### User Routes<br>
GET /users - Fetch all users (Admin)<br>
DELETE /users/:id - Delete a user (Admin)<br>

### Created by:<br>
Soong Shao Zhi<br>
Lee Chong Rui<br>
William Chua<br>
Fabian Lim<br>