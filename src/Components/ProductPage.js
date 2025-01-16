import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Logo from '../Assets/muhammadiyah_logo.png';
import Cart from '../Assets/cart.png';

function ProductPage({ cart, setCart }) {
  const location = useLocation();
  const product = location.state?.viewProduct;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const productIndex = cart.findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      // Update quantity if the product already exists in the cart
      const updatedCart = cart.map((item, index) =>
        index === productIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCart(updatedCart);
    } else {
      // Add new product to the cart
      const updatedCart = [...cart, { ...product, quantity }];
      setCart(updatedCart);
    }
  };
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="MainPageFlex">
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo" />
        <div id="NavBarMart">
          <input
            type="text"
            id="searchBar"
            placeholder="Search..."
          />
          <Link to="/mart">
            <button className='navButton'>Back</button>
          </Link>
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

      <div className="HomePageBottomDiv">
        <div className="ProductDiv">
          <img className="ProductPageImage" src={product.image_url} alt={product.name} />
          <div className="DetailsAdd">
            <h1 id="ProductPageName">{product.name}</h1>
            <div className="QuantityAdd">
                <div className="quantity-controls">
                    <button onClick={handleDecrease} disabled={quantity <= 1}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <button id="Add" onClick={handleAddToCart}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;