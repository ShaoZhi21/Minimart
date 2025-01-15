import '../App.css';
import React, { useState } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import Cart from '../Assets/cart.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CartPage({ cart, setCart }) {
    const [updatedCart, setUpdatedCart] = useState(cart); // Local state for cart

    const handleIncrease = (productId) => {
        const newCart = updatedCart.map(item => 
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setUpdatedCart(newCart); // Update cart with new quantity
        setCart(newCart); // Also update the parent state
    };

    const handleDecrease = (productId) => {
        const newCart = updatedCart.map(item => 
            item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setUpdatedCart(newCart); // Update cart with decreased quantity
        setCart(newCart); // Also update the parent state
    };

    const handleRemove = (productId) => {
        const newCart = updatedCart.filter(item => item.id !== productId);
        setUpdatedCart(newCart); // Remove item from cart
        setCart(newCart); // Also update the parent state
    };

    
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const handleSubmitOrder = async (cart) => {
      try {
        const orderData = {
          username: userDetails.username,
          name: userDetails.name,
          address: userDetails.address,
          products: cart, // Array of products with { id, name, quantity }
        };
        console.log(orderData);
        await axios.post('http://localhost:3009/submit-order', orderData);
        alert('Order submitted successfully');
        setUpdatedCart([]);  // Empty local cart state
        setCart([]);
      } catch (err) {
        console.error(err);
        alert('Error submitting order');
      }
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="MainPageFlex">
            <div className="HomePageTopDiv">
                    <img className="Logo" src={Logo} alt="Logo"></img>
                    <h1 className="WelcomeText">Order History</h1>
                    <Link to="/mart">
                    <button className='navButton'>Back</button>
                    </Link>
                  </div>
            <div className="HomePageBottomDiv">
                <div id="CartDiv">
                    <h1 id="CartText">Cart</h1>
                    {updatedCart.length > 0 ? 
                        updatedCart.map((item) => (
                            <div className="CartItem" key={item.id}>
                                <div>
                                    <img className="CartItemImage" src={item.image_url} alt={item.name} />
                                </div>
                                <div className='CartRightDiv'>
                                    <div>
                                        {item.name}
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => handleIncrease(item.id)}>+</button>
                                        <button onClick={() => handleDecrease(item.id)}>-</button>
                                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                <Link to="/mart">
                <button id="SubmitButton" onClick={()=> handleSubmitOrder(updatedCart)}>Submit</button>
                </Link>
            </div>
        </div>
    );
}

export default CartPage;
