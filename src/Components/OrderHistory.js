import '../App.css';
import React, { useState, useEffect } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
  const [items, setItems] = useState([]);

  // Retrieve username and name from localStorage
  const username = localStorage.getItem('username');
  const name = localStorage.getItem('name');

  useEffect(() => {
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
  }, [username, name]); // Run effect when username or name changes

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1 className="WelcomeText">Order History</h1>
        <Link to="/mart">
          <button className="navButton">Back</button>
        </Link>
      </div>
      <div className="HomePageBottomDiv">
        <div id="CartDiv">
          <h1 id="CartText">Cart</h1>
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
