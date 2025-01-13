import '../App.css';
import React, { useState } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios'; 

function SignUpPage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedAccount, setSelectedAccount] = useState("User");

    const handleSubmit = async (e) => {
      e.preventDefault();

      const newUser = {
      name,
      address,
      email,
      phone,
      username,
      password,
      accountType: selectedAccount,
    };

    try {
      await axios.post('http://localhost:3009/signup', newUser);
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
      alert('Error registering user');
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
        <div id="SignUpDiv">
          <div id="SignUpDivTwo">
            <div id="TypeofAccountSignUp">
              <div id="User">
                <button className={selectedAccount === "User" ? "Selected" : ""} onClick={() => handleAccountSelection("User")}>User</button>
                </div>
              <div id="Admin">
                <button className={selectedAccount === "Admin" ? "Selected" : ""} onClick={() => handleAccountSelection("Admin")}>Admin</button>
              </div>
            </div>
            <div className="SignUpDetailsDiv">
              <label for="Name">Name: </label>
              <input type="text" id="name" name="name" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="SignUpDetailsDiv">
              <label for="Address">Address: </label>
              <input type="text" id="address" name="address" placeholder="Enter your Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="SignUpDetailsDiv">
              <label htmlFor="email">Email: </label>
              <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="SignUpDetailsDiv">
              <label htmlFor="phone">Number: </label>
              <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="SignUpDetailsDiv">
              <label for="username">Username: </label>
              <input type="text" id="username" name="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="SignUpDetailsDiv">
              <label for="username">Password: </label>
              <input type="text" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div id="LoginSignUpDiv">
              <Link to="/">
                <button id="Submit" onClick={handleSubmit}>Submit</button>
              </Link>
              <Link to="/">
                <button id="Back">Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;