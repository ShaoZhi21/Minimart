Muhammadiyah Welfare Home Minimart Website
This is an e-commerce platform designed for a minimart at a welfare home. The platform allows residents and staff to browse a variety of essential products, add them to their cart, and place orders. It aims to provide a convenient and accessible way for the welfare home community to manage their shopping needs, featuring user-friendly navigation and an efficient order management system.

Features
User Authentication: Users can register and log in to manage their accounts and view order history.
Product Browsing: Users can browse products by category and search for specific items.
Shopping Cart: Users can add products to the cart and view the number of items in their cart at all times.
Order Submission: Users can place orders for the products in their cart, which are saved to the system.
Order History: Users can view their order history and track previous purchases.
Admin Features: Admin users can manage products and users through backend routes.

Tech Stack
Frontend: React.js, Axios for API calls
Backend: Node.js, Express, MySQL
Authentication: JWT (JSON Web Tokens)
Database: MySQL
Styling: CSS
Installation
1. Clone the repository
git clone https://github.com/ShaoZhi21/Minimart.git
cd minimart-e-commerce
2. Install dependencies
cd minimart
npm install

cd backend
npm install

3. Set up environment variables
Create a .env file in the backend folder with the following content:

DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret

4. Start the development servers
cd backend
node index.js

cd minimart
npm start
The frontend will now be available at http://localhost:3000, and the backend at http://localhost:3009.

Endpoints
Auth Routes
POST /signup - Register a new user
POST /login - Log in and receive a JWT token
Product Routes
GET /products - Get all products with their categories
POST /products - Add a new product (Admin)
DELETE /products/:id - Delete a product (Admin)
PUT /products/:id - Update product quantity (Admin)
Order Routes
POST /submit-order - Submit an order with the products from the cart
GET /order-history/:username/:name - View order history
User Routes
GET /users - Fetch all users (Admin)
DELETE /users/:id - Delete a user (Admin)
Usage
Register: Create a new account by providing your name, email, phone, username, password, and account type.
Log in: Log in using your username and password.
Browse Products: Search or browse products by category.
Add to Cart: Add products to your shopping cart.
Checkout: Submit your order with the products in your cart.

Created by:
Soong Shao Zhi
Lee Chong Rui
William Chua
Fabian Lim