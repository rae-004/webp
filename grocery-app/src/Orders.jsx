import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState({
    current: [],
    buyAgain: [],
    cancelled: []
  });
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = localStorage.getItem("order");
    if (orderData) {
      const order = JSON.parse(orderData);
      setOrders(prevOrders => ({
        ...prevOrders,
        current: [order]
      }));
    }
  }, []);

  const cancelOrder = (orderId) => {
    const orderToCancel = orders.current.find(order => order.id === orderId);
    if (orderToCancel) {
      setOrders(prevOrders => ({
        ...prevOrders,
        current: prevOrders.current.filter(order => order.id !== orderId),
        cancelled: [...prevOrders.cancelled, orderToCancel]
      }));
      localStorage.removeItem("order");
      alert("Order canceled.");
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