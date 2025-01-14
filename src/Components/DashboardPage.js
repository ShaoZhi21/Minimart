import '../App.css';
import React, { useState } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';

function DashboardPage() {
  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo"></img>
        <h1 className="WelcomeText">Dashboard</h1>
      </div>
      <div className="HomePageBottomDiv">
      </div>
    </div>
  );
}

export default DashboardPage;