import '../App.css';
import React, { useState } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import { useNavigate, Link } from 'react-router-dom';

function OrderHistory() {
  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo"></img>
        <h1 className="WelcomeText">Order History</h1>
        <Link to="/mart">
        <button className='navButton'>Back</button>
        </Link>
      </div>
      <div className="HomePageBottomDiv">
      </div>
    </div>
  );
}

export default OrderHistory;