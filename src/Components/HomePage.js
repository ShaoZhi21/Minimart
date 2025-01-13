import '../App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Logo from '../Assets/muhammadiyah_logo.png';
import SignUpPage from './SignUpPage';
import MartPage from './MartPage';


function HomePage() {
  const [selectedAccount, setSelectedAccount] = useState("User");

  const handleAccountSelection = (account) => {
    setSelectedAccount(account);
  }

  return (
    <div id="MainPageFlex">
      <div id="HomePageTopDiv">
        <img id="Logo" src={Logo} alt="Logo"></img>
        <h1 id="WelcomeText">Welcome to Muhammadiyah Welfare Home Minimart</h1>
      </div>
      <div id="HomePageBottomDiv">
        <div id="LoginDiv">
          <div id="TypeofAccountDiv">
            <div id="User">
              <button className={selectedAccount === "User" ? "Selected" : ""} onClick={() => handleAccountSelection("User")}>User</button>
              </div>
            <div id="Admin">
              <button className={selectedAccount === "Admin" ? "Selected" : ""} onClick={() => handleAccountSelection("Admin")}>Admin</button>
            </div>
          </div>
          <div id="UsernamePasswordDiv">
          <div id="UsernameDiv">
            <label for="username">Username: </label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
          </div>
          <div id="PasswordDiv">
            <label for="username">Password: </label>
            <input type="text" id="password" name="password" placeholder="Enter your password" required />
          </div>
          </div>
            <div id="LoginSignUpDiv">
            <Link to="/mart">
              <button id="Login">Login</button>
            </Link>
            <Link to="/signup">
              <button id="SignUp">Sign Up</button>
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;