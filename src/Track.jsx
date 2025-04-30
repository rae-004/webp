import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Track = () => {
  const [trackingInfo, setTrackingInfo] = useState(null);
  const { orderId } = useParams();
  const API_URL = 'http://localhost:5000/api/orders';

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/track/${orderId}`);
        const data = await response.json();
        setTrackingInfo(data);
      } catch (error) {
        console.error("Error fetching tracking info:", error);
      }
    };

    fetchTrackingInfo();
  }, [orderId]);

  return (
    <div>
      <h2>Track Your Order #{orderId}</h2>
      {trackingInfo ? (
        <div>
          <p><strong>Status:</strong> {trackingInfo.status}</p>
          <p><strong>Estimated Delivery:</strong> {new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}</p>
          <p><strong>Current Location:</strong> {trackingInfo.currentLocation}</p>
          <p><strong>Tracking Number:</strong> {trackingInfo.trackingNumber}</p>
          <img src="your-map-image.jpg" alt="Map Tracking" style={{ width: "100%", maxWidth: "600px" }} />
        </div>
      ) : (
        <p>Loading tracking information...</p>
      )}
    </div>
  );
};

export default Track;