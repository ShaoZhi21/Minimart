import '../App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/muhammadiyah_logo.png';
import axios from 'axios';

function HomePage() {
  const [selectedAccount, setSelectedAccount] = useState("User");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      username,
      password,
      accountType: selectedAccount,  // Add account type here
    };
  
    try {
      const res = await axios.post('http://localhost:3009/login', credentials);
      const token = res.data.token;
      localStorage.setItem('authToken', token);
      alert('Logged in successfully');
      
      // Navigate to the appropriate page based on the account type
      if (selectedAccount === "Admin") {
        navigate('/dashboard'); // Navigate to /dashboard if Admin
      } else {
        navigate('/mart'); // Navigate to /mart if User
      }
    } catch (error) {
      console.error(error);
      setError('Invalid username or password');
    }
  };

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
            <label for="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
          </div>
          <div id="PasswordDiv">
            <label for="username">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>
          </div>
            {error && <div className="error-message">{error}</div>}
            <div id="LoginSignUpDiv">
              <button id="Login" onClick={handleLogin}>Login</button>
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