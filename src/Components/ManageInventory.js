import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import Logo from '../Assets/muhammadiyah_logo.png';
import { Link } from 'react-router-dom';
import '../App.css';

function ManageInventory() {
  const [categories, setCategories] = useState([]); // State to store fetched categories and products
  const [newQuantities, setNewQuantities] = useState({}); // State to store the new quantities for products

  // Fetch products and categories from backend
  useEffect(() => {
    axios.get('http://localhost:3009/products')
      .then(response => {
        setCategories(response.data); // Set the response data to state
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Update product quantity function
  const updateProductQuantity = (productId, categoryId) => {
    const newQuantity = newQuantities[productId];
    if (newQuantity === undefined || isNaN(newQuantity)) {
      alert('Please enter a valid quantity.');
      return;
    }

    axios.put(`http://localhost:3009/products/${productId}`, { quantity: newQuantity })
      .then(response => {
        console.log('Product quantity updated:', response.data);
        setCategories(prevCategories =>
          prevCategories.map(category =>
            category.id === categoryId
              ? {
                  ...category,
                  products: category.products.map(product =>
                    product.id === productId
                      ? { ...product, quantity: newQuantity }
                      : product
                  )
                }
              : category
          )
        );
        alert('Quantity updated successfully!');
      })
      .catch(error => {
        console.error('Error updating product quantity:', error);
        alert('Failed to update quantity. Please try again.');
      });
  };

  // Delete product function
  const deleteProduct = (productId) => {
    axios.delete(`http://localhost:3009/products/${productId}`)
      .then(response => {
        console.log('Product deleted:', response.data);
        // Update the state to remove the deleted product
        setCategories(prevCategories =>
          prevCategories.map(category => ({
            ...category,
            products: category.products.filter(product => product.id !== productId)
          }))
        );
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1 className="WelcomeText">Inventory</h1>
        <div className="BackButtonContainer">
          <Link to="/dashboard">
            <button className="BackButton">Back to Dashboard</button>
          </Link>
        </div>
      </div>
      <div className="AddNewHomePageBottomDiv">
        <div className="InvBot">
          <Link to="/dashboard/manageinventory/addnewproduct">
            <button className="InvAddNew">Add New</button>
          </Link>
        </div>
        <div className="InvMain">
          {/* Render categories and products dynamically */}
          {categories.map(category => (
            <div key={category.id}>
              <h2 id="InvCategory">{category.name}</h2>
              {category.products.map(product => (
                <div key={product.id} className="InvProduct">
                  <img src={product.image_url} alt={product.name} className="icon" />
                  <div className="InvFields">
                    <div className="InvQtybox">
                      <div className="InvQty">Quantity:</div>
                      {/* Display the current quantity from product.quantity */}
                      <div className="InvQtyNumber">{product.quantity}</div>
                    </div>
                    <div className="InvAddRemoveBox">
                      <button
                        className="InvEditBtn"
                        onClick={() => updateProductQuantity(product.id, category.id)}
                      >
                        Update
                      </button>
                      <input
                        className="InvNewQty"
                        type="number"
                        placeholder="0"
                        min="0"
                        onChange={(e) =>
                          setNewQuantities({
                            ...newQuantities,
                            [product.id]: parseInt(e.target.value, 10)
                          })
                        }
                      />                      
                    </div>
                    <button
                      className="InvDelete"
                      onClick={() => deleteProduct(product.id)} // Trigger delete on button click
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageInventory;
