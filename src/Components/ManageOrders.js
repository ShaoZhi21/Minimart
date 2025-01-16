import React, { useEffect, useState } from 'react';
import Logo from '../Assets/muhammadiyah_logo.png';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ManageOrders() {
  // Declare state to hold orders
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3009/orders');  // Fetch from the backend API
        const flattenedOrders = response.data.orders.flatMap(order => 
          order.orderItems.map(item => ({
            orderId: order.orderId,  // Keep the original orderId
            user: order.user,        // Keep the original user info
            productId: item.productId,  // Ensure productId is included
            productName: item.productName, // Product name from orderItems
            quantity: item.quantity,  // Quantity from orderItems
            orderItemId: `${order.orderId}-${item.productId}` // Unique ID for each product in the order
          }))
        );
        setOrders(flattenedOrders);  // Set the flattened orders with productId and unique orderItemId
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);
  
  const handleCompleteOrder = async (orderItemId, orderId, productId) => {
    try {
      console.log("Deleting product with OrderItemId:", orderItemId);
      console.log("Deleting product with OrderId:", orderId);
      console.log("Deleting product with ProductId:", productId);
      
      if (!orderItemId) {
        alert('Order Item ID is missing!');
        return;
      }
      
      // Send DELETE request to the API to delete the specific product from the order
      await axios.delete(`http://localhost:3009/orders/${orderId}/products/${productId}`);
      
      // Update the orders state after the deletion
      setOrders((prevOrders) => prevOrders.filter(order => order.orderItemId !== orderItemId));
      
      alert(`Product ${productId} from Order ${orderId} has been deleted!`);
    } catch (error) {
      console.error('Error deleting product from order:', error);
      alert('Failed to delete the product from the order.');
    }
  };
  return (
    <div className="MainPageFlex">
      {/* Top Section */}
      <div className="HomePageTopDiv">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1 className="WelcomeText">Manage Orders</h1>
        <div className="BackButtonContainer">
          <Link to="/dashboard">
            <button className="BackButton">Back to Dashboard</button>
          </Link>
        </div>
      </div>

      <div className="HomePageBottomDiv">
        <div className="OrdersDiv">
          {/* Content Section */}
          <div className="ManageOrders_Content">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.orderItemId} className="ManageOrders_Row">
                  <span className="ManageOrders">User: {order.user}</span>
                  <span className="ManageOrders">Order ID: {order.orderId}</span>

                  {/* Display Product and Quantity in Separate Divs */}
                  <div className="ManageOrders">
                    <div className="ManageOrders">
                      Product: {order.productName}
                    </div>
                    <div className="ManageOrders_Quantity">
                      Quantity: {order.quantity}
                    </div>
                  </div>

                  <button
                    className="ManageOrders_CompleteButton"
                    onClick={() => {
                        console.log('Order ID:', order.orderId);
    console.log('Product ID:', order.productId);
    handleCompleteOrder(order.orderItemId, order.orderId, order.productId)}} // Pass orderItemId, orderId, and productId
                  >
                    Complete Order
                  </button>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
