import React, { useEffect, useState } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Insights() {
 
  return (
    <div className="MainPageFlex">
      {/* Top Section */}
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1 className="WelcomeText">Manage Orders</h1>
        <div className="BackButtonContainer">
          <Link to="/dashboard">
            <button className="BackButton">Back to Dashboard</button>
          </Link>
        </div>
      </div>

      <div className="HomePageBottomDiv">
        </div>
    </div>
  );
}

export default Insights;
