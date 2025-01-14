import '../App.css';
import React, { useState } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';

function MartPage() {
  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo"></img>
        <h1 className="WelcomeText">Minimart</h1>
      </div>
      <div className="HomePageBottomDiv">
      </div>
    </div>
  );
}

export default MartPage;