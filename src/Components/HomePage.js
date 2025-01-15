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
      accountType: selectedAccount, // Ensure the selected account type is included
    };
  
    try {
      const res = await axios.post('http://localhost:3009/login', credentials);
  
      // Extract the token and user details from the response
      const { token, username: userUsername, name, address } = res.data;
  
      // Save the token and user details in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userDetails', JSON.stringify({ username: userUsername, name, address }));
      console.log('User details saved:', { username: userUsername, name, address });
      alert('Logged in successfully');
  
      // Navigate to the appropriate page based on the account type
      if (selectedAccount === "Admin") {
        navigate('/dashboard'); // Navigate to /dashboard if Admin
      } else {
        navigate('/mart'); // Navigate to /mart if User
      }
    } catch (error) {
      console.error(error);
  
      // Check the error response to provide a more specific error message
      if (error.response && error.response.data) {
        setError(error.response.data); // Use the error message from the backend
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };
  

  const handleAccountSelection = (account) => {
    setSelectedAccount(account);
  }

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo"></img>
        <h1 className="WelcomeText">Welcome to Muhammadiyah Welfare Home Minimart</h1>
      </div>
      <div className="HomePageBottomDiv">
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