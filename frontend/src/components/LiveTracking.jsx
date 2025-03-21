import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: '100%',
  height: '400px'
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    };

    updatePosition();
    const intervalId = setInterval(updatePosition, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Live Tracking</h1>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
        >
          <Marker position={currentPosition} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LiveTracking;