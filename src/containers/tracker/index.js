import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Replace with your own Google Maps API key
const apiKey = 'AIzaSyCmiyc8iXq1KDOmW_-yWsjALkQVY1z8krw';

const Tracker = () => {
  const [map, setMap] = useState(null);

  const latitude = 40.7128;
  const longitude = -74.006;
  const staffName = 'John';

  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  useEffect(() => {
    if (map) {
      map.setCenter(center);
    }
  }, [map]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">{staffName}'s Location</h1>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Tracker;
