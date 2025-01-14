import '../App.css';
import React, { useState, useEffect } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import Cart from '../Assets/cart.png';
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom';

function MartPage({ cart, setCart }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch product categories from the backend when the component mounts
    axios.get('http://localhost:3009/products') // Replace with your actual API endpoint
      .then(response => {
        setCategories(response.data);  // Store categories in the state
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleProductClick = (product) => {
    // Navigate to ProductPage with the selected product as state
    navigate(`/product/${product.id}`, { state: { viewProduct: product } });
  };

  const handleAddClick = (product) => {
    console.log("Cart before update:", cart);
  
    if (!Array.isArray(cart)) {
      console.error("Cart is not an array:", cart);
      setCart([]);
      return;
    }
  
    const productIndex = cart.findIndex((item) => item.id === product.id);
  
    if (productIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === productIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
    }
  
    console.log("Cart after update:", cart);
  };

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo"></img>
        <div id="NavBarMart">
          <input 
            type="text" 
            id="searchBar" 
            placeholder="Search..." 
            // Add search functionality here
          />
          <div id="NavBar">
            <button className="navButton">Filter</button>
            <button className="navButton">Vouchers</button>
            <button className="navButton">Auction</button>
          </div>
        </div>
        <Link to="/cart" state={{ cart }}>
          <div id="CartContainer">
            <img id="Cart" src={Cart} alt="Cart" />
            {totalItems > 0 && (
              <div className="cart-badge">{totalItems}</div>
            )}
          </div>
        </Link>
      </div>

      <div className="HomePageBottomDivShop">
        {categories.length > 0 ? (
          categories.map(category => (
            <div key={category.id} className="CategoryRow">
              <div className="CategoryLabel">{category.name}</div>
              <div className="Products">
                {category.products.length > 0 ? (
                  category.products.map(product => (
                    <div key={product.id} className="ProductSquare">
                      <div className="ProductLink" onClick={() => handleProductClick(product)}>
                        <img className="productIMG" src={product.image_url} alt={product.name} />
                      </div>
                      <div className="NameCart">
                        <div className="productName">{product.name}</div>
                        <button className="add-to-cart-button" onClick={() => handleAddClick(product)}>Add</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No products available</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </div>
    </div>
  );
}

export default MartPage;
