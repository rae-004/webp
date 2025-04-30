import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:5000/api/orders';

const Orders = () => {
  const [orders, setOrders] = useState({
    current: [],
    buyAgain: [],
    cancelled: []
  });
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/user/user123`); // Replace with actual user ID
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);
  
  // Modify cancelOrder
  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/cancel/${orderId}`, {
        method: 'PUT'
      });
  
      if (response.ok) {
        setOrders(prevOrders => ({
          ...prevOrders,
          current: prevOrders.current.filter(order => order.orderId !== orderId),
          cancelled: [...prevOrders.cancelled, prevOrders.current.find(order => order.orderId === orderId)]
        }));
        alert("Order canceled.");
      } else {
        alert("Failed to cancel order");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Error canceling order");
    }
  };

  const renderOrders = () => {
    switch (activeTab) {
      case "orders":
        return orders.current;
      case "buyAgain":
        return orders.buyAgain;
      case "cancelled":
        return orders.cancelled;
      default:
        return [];
    }
  };

  return (
    <div>
      <header>
        <button onClick={() => navigate(-1)}>←</button>
        <h2>Your Orders</h2>
      </header>

      <nav>
        <a
          href="#"
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </a>
        <a
          href="#"
          className={activeTab === "buyAgain" ? "active" : ""}
          onClick={() => setActiveTab("buyAgain")}
        >
          Buy Again
        </a>
        <a
          href="#"
          className={activeTab === "cancelled" ? "active" : ""}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </a>
      </nav>

      {renderOrders().length > 0 ? (
        renderOrders().map(order => (
          <div className="order-box" key={order.id}>
            <div className="order-header">
              <span><strong>ORDER PLACED:</strong> {order.datePlaced}</span>
              <span><strong>DELIVER TO:</strong> {order.deliveryTo}</span>
              <span><strong>TOTAL:</strong> ${order.total}</span>
              <span><strong>ORDER NUMBER:</strong> {order.id}</span>
            </div>
            <h3>restaurant name</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item.name} - ${item.price}</li>
              ))}
            </ul>
            <div className="order-actions">
              <button onClick={() => navigate("/track")}>Track order</button>
              {activeTab === "orders" && (
                <button onClick={() => cancelOrder(order.id)}>Cancel order</button>
              )}
              <button onClick={() => alert("Redirecting to review page...")}>Review it</button>
            </div>
          </div>
        ))
      ) : <p>No orders found.</p>}
    </div>
  );
};

export default Orders;