import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Orders from "./Orders.jsx";
import Track from "./Track";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/track" element={<Track />} />
    </Routes>
  </BrowserRouter>
);
