import '../App.css';
import React, { useState, useEffect } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddNewProduct() {
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState("");  // State to hold the image URL

  // Fetch categories from backend
  useEffect(() => {
    axios.get('http://localhost:3009/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value); // Update image URL if manually entered
    setImagePreview(null); // Clear the preview if URL is entered manually
  };

  const handleSubmit = () => {
    const productData = {
      name,
      description,
      image_url: imagePreview || imageUrl, // Use imagePreview if available, else use imageUrl
      category_id: selectedCategory || categoryInput,
      quantity,
    };

    // Send data to backend via API
    axios.post('http://localhost:3009/products', productData)
      .then((response) => {
        console.log('Product added:', response.data);
        alert('Product added successfully!');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        alert('Error adding product. Please try again.');
      });
  };

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1 className="WelcomeText">Inventory</h1>
        <div className="Empty"></div>
      </div>
      <div className="AddNewHomePageBottomDiv">
        <div className='AddNewDiv'>
        <div className="AddNewProductMain">
          <div className="AddNewUploadPhoto">
            <div className="AddNewImageDiv">
              {/* Ensure the white box is always visible */}
              <div className="AddNewPhotoPreviewBox">
                {/* Image preview or default text */}
                {imageUrl || imagePreview ? (
                  <img src={imageUrl || imagePreview} alt="URL not working" className="AddNewPhotoPreview" />
                ) : (
                  <div className='EmptyImagePreview'></div>
                )}
              </div>
              {/* Image URL input field */}
              <input
                type="text"
                className="AddNewDetailsBox"
                placeholder="Paste Image URL here"
                value={imageUrl}
                onChange={handleImageUrlChange}
              />
            </div>
          </div>
          <div className="AddNewProductInfo">
            <input
              type="text"
              placeholder="Name"
              className="AddNewDetailsBox"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            {/* Combined dropdown and input for category */}
            <div className="CategoryInputGroup">
              <select
                className="AddNewDetailsBox CategoryDropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="AddNewDetailsBox CategoryManualInput"
                placeholder="Or type new category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                required
              />
            </div>

            <input
              type="number"
              className="AddNewDetailsBox"
              placeholder="Type in Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <textarea
              className="AddNewDescriptionBox"
              placeholder="Type in Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className="AddNewButtonGroup">
          <button className="AddNewAddProductButton" onClick={handleSubmit}>Add Product</button>
          <Link to="/dashboard/manageinventory">
            <button className="BackToDashboardButton">Back</button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewProduct;
