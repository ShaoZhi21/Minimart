import '../App.css';
import React, { useState } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import { Link } from 'react-router-dom';

function DashboardPage() {
  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo"></img>
        <h1 className="WelcomeText">Dashboard</h1>
        <div className="Empty"></div>
      </div>
      <div className="HomePageBottomDiv">
        <div id="DashBar">
          <div id="MainDashBoard">
          <Link to="/dashboard/manageusers">
              <button className="dashButton">Manage Users</button>
            </Link>
            <Link to="/dashboard/manageinventory">
              <button className="dashButton">Manage Inventory</button>
            </Link>
          </div>
          <div id="MainDashBoard"> 
          <Link to="/dashboard/manageorders">
              <button className="dashButton">Manage Orders</button>
            </Link>
            <Link to="/dashboard/insights">
              <button className="dashButton">Insights</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;