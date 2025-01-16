import React, { useState, useEffect } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import trashIcon from '../Assets/trash.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from your API
    axios.get('http://localhost:3009/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const deleteUser = (userId) => {
    console.log('Deleting user with ID:', userId); // Add this to debug
    axios.delete(`http://localhost:3009/users/${userId}`)
      .then(response => {
        console.log('User deleted:', response.data);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1 className="WelcomeText">Management Users</h1>
        <div className="BackButtonContainer">
          <Link to="/dashboard">
            <button className="BackButton">Back to Dashboard</button>
          </Link>
        </div>
      </div>
      <div className="HomePageBottomDiv">
        <div className='listbackdiv'>
        <div className="listdiv">
          <div className="userHeader">
            <div className="userName">Name</div>
            <div className="userEmail">Email</div>
            <div className="userPhone">Phone Number</div>
            <div className="userAddress">Address</div>
            <div className="userAccountType">Account Type</div>
            <div className="UserDelete">Delete</div>
          </div>
          {users.map((user) => (
            <div className="userdiv" key={user.id}>
              <div className="userName">{user.name}</div>
              <div className="userEmail">{user.email}</div>
              <div className="userPhone">{user.phone}</div>
              <div className="userAddress">{user.address}</div>
              <div className="userAccountType">{user.accountType}</div> {/* User or Admin */}
              <button className="UserDelete" onClick={() => deleteUser(user.id)}>
                <img src={trashIcon} alt="Delete" className="icon" />
              </button>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
