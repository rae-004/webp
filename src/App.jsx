import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:5000/api/orders';

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

  const placeOrder = async () => {
    if (selectedItems.length === 0) {
      alert("Please select items before ordering.");
      return;
    }
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: "user123", // Replace with actual user ID from auth
          deliveryTo: "selected address",
          items: selectedItems
        })
      });
  
      if (response.ok) {
        navigate("/orders");
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
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
