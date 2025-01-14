import '../App.css';
import React, { useState, useEffect } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import Cart from '../Assets/cart.png';
import axios from 'axios'; 
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function MartPage() {
  const [search, setSearch] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch product categories from the backend when the component mounts
    axios.get('http://localhost:3009/products') // Replace with your actual API endpoint
      .then(response => {
        console.log('Fetched categories:', response.data);  // Check the fetched categories
        setCategories(response.data);  // Store categories in the state
        const allProducts = response.data.reduce((acc, category) => {
          return [...acc, ...category.products];
        }, []);
        console.log(allProducts)
        setProducts(allProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearch = () => {
    // Your search functionality here
  };

  const handleAddClick = (product) => {
    setSelectedProduct(product);
    console.log(product)
  };

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo"></img>
        <div id="NavBarMart">
          <input 
            type="text" 
            id="searchBar" 
            placeholder="Search..." 
            onChange={handleSearch} 
          />
          <div id="NavBar">
            <button className="navButton">Filter</button>
            <button className="navButton">Vouchers</button>
            <button className="navButton">Auction</button>
          </div>
        </div>
        <div id="Cart"><img src={Cart} alt="Cart"></img></div>
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
                      <Link to={`/ProductPage/${product.id}`} className="ProductLink">
                        <img className="productIMG" src={product.image_url} alt={product.name} />
                      </Link>
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