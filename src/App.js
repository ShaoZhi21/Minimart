import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';
import SignUpPage from './Components/SignUpPage';
import MartPage from './Components/MartPage';
import DashboardPage from './Components/DashboardPage';
import ProductPage from './Components/ProductPage';
import AuctionPage from './Components/AuctionPage';
import CartPage from './Components/CartPage';
import OrderHistory from './Components/OrderHistory';
import Voucher from './Components/Voucher';

function App() {
  const [cart, setCart] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/mart" element={<MartPage cart={cart} setCart={setCart}/>}></Route>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/product/:productId" element={<ProductPage cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/orderhistory/:username/:name" element={<OrderHistory />} />
        <Route path="/voucher" element={<Voucher/>} />
      </Routes>
    </Router>
  );
}

export default App;
