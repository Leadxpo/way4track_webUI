import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Google Maps Container Style
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

// Default Center Position
const center = {
  lat: 12.9716, // Example: Bangalore, India
  lng: 77.5946,
};

// List of Marker Coordinates
const locations = [
  { id: 1, name: "Fuel Station A", lat: 12.9716, lng: 77.5946 },
  { id: 2, name: "Fuel Station B", lat: 12.2958, lng: 76.6394 },
  { id: 3, name: "Fuel Station C", lat: 13.0827, lng: 80.2707 },
];

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={6} center={center}>
        {locations.map((location) => (
          <Marker key={location.id} position={{ lat: location.lat, lng: location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
