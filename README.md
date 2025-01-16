# Hack4Good Hackathon: Muhammadiyah Welfare Home Minimart Website

## Project Overview

The **Muhammadiyah Welfare Home Minimart Website** is a web application developed as part of the **Hack4Good Hackathon**. The goal of this project is to provide an online minimart for the welfare home, allowing them to manage and sell essential goods, all while creating a user-friendly platform for both administrators and customers. 

## Context and Purpose
**Mission of the NPO**
This project supports Muhammadiyah Welfare Home, which helps boys aged 10-19 who have experienced neglect, abuse, homelessness, or involvement in the juvenile justice system. The NPO aims to provide a safe environment where these boys can rebuild their lives and develop essential life skills.

**Intended Users**
The minimart prototype serves the boys in the NPO’s care, allowing them to access basic necessities such as food, hygiene products, and clothing, empowering them to meet their needs independently.

**The Role of the Minimart**
The minimart provides an online platform for boys to select and request essential items, offering both access to necessities and a sense of autonomy, which contributes to their well-being and dignity.

**Long-Term Impact**
The minimart aims to improve the boys' quality of life by addressing immediate needs and fostering independence, while also helping them develop life skills and self-esteem, supporting their long-term growth and rehabilitation.

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

### Technical Features and Benefits

**Front-End Interface:** The front-end of the minimart is designed to be intuitive and easy to use. It allows the boys to browse through available products, select what they need, and place their orders. This interface helps give the boys a sense of control and independence over their choices, fostering a sense of normalcy and dignity as they manage their own needs.

**Back-End System:** The back-end of the minimart is responsible for processing the boys' orders and maintaining an up-to-date inventory. It ensures that orders are tracked, processed efficiently, and the inventory reflects the most current stock levels. This backend ensures that caretakers and administrators can monitor orders and ensure that supplies are always available.

**Secure User Access:** To keep the boys' personal information safe, we’ve implemented a secure login process. This ensures that only authorized users can access their accounts and request items from the minimart, protecting their privacy and security.

**Inventory Management:** The minimart system keeps track of all available products, like food and hygiene items. This helps ensure that the NPO always has enough supplies on hand to meet the boys' needs, making sure they never run out of essentials.

**Efficient Order Processing:** Once an order is placed, it is processed and fulfilled quickly, ensuring that the boys receive the items they request without delay. This streamlines the process and reduces wait times for essential supplies.

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