import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  { name: "Milk", price: 12 },
  { name: "Bread", price: 15 },
  { name: "Eggs", price: 12 },
  { name: "Rice", price: 15 },
  { name: "Pasta", price: 12 },
  { name: "Salt", price: 12 },
  { name: "Flour", price: 15 }
];

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const addToOrder = (index) => {
    setSelectedItems([...selectedItems, items[index]]);
  };

  const placeOrder = () => {
    if (selectedItems.length === 0) {
      alert("Please select items before ordering.");
      return;
    }

    const orderId = localStorage.getItem("orderId") 
      ? parseInt(localStorage.getItem("orderId")) + 1 
      : 1;

    const order = {
      id: "#A" + orderId.toString().padStart(6, "0"),
      datePlaced: new Date().toLocaleDateString(),
      deliveryTo: "selected address",
      items: selectedItems,
      total: selectedItems.reduce((sum, item) => sum + item.price, 0),
    };

    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("orderId", orderId);
    navigate("/orders");
  };

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price} 
            <button onClick={() => addToOrder(index)}>+</button>
          </li>
        ))}
      </ul>
      <button onClick={placeOrder}>Order Now</button>
    </div>
  );
};

export default App;
