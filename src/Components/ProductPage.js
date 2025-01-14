import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the product ID from URL

function ProductPage() {
  const { id } = useParams(); // Get the product ID from the URL

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Here, you can fetch the product data from the backend using the product ID
    fetch(`http://localhost:3009/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, [id]); // Fetch data when the component mounts or when the id changes

  if (!product) {
    return <div>Loading...</div>; // Show a loading message while the data is being fetched
  }

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src="path_to_your_logo" alt="Logo" />
        <h1 className="ProductTitle">{product.name}</h1>
      </div>
      <div className="HomePageBottomDiv">
        <img src={product.image_url} alt={product.name} />
        <div>{product.description}</div>
        <div>Price: {product.price}</div>
        {/* Add more product details as needed */}
      </div>
    </div>
  );
}

export default ProductPage;
