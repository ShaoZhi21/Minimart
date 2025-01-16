import '../App.css';
import React, { useState, useEffect } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
  
    let username = '';
    let name = '';
  
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      username = userDetails.username;
      name = userDetails.name;
  
      console.log(userDetails.username); // Should print 'shaozhi'
      console.log(userDetails.name); // Should print 'Shao Zhi'
      console.log(userDetails.address); // Should print '123 Main St'
    } else {
      console.log('No userDetails found in localStorage');
    }
  
    if (username && name) {
      // Fetch order history when the component mounts
      axios.get(`http://localhost:3009/order-history/${username}/${name}`)
        .then(response => {
          setItems(response.data);  // Store fetched order history
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching order history:', error);
        });
    } else {
      console.error('Username or name is missing from localStorage');
    }
  }, []); // Empty dependency array ensures the effect runs only once, on mount

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1 className="WelcomeText">Order History</h1>
        <Link to="/mart">
          <button className="Back">Back</button>
        </Link>
      </div>
      <div className="HomePageBottomDiv">
        <div id="CartDiv">
          {items.length > 0 ? (
            items.map((item) => (
              <div className="CartItem" key={item.product_id}>
                <div>
                  <img className="CartItemImage" src={item.image_url} alt={item.product_name} />
                </div>
                <div className="CartRightDiv">
                  <div>
                    {item.product_name}
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items found in your order history.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;