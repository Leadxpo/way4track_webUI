import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const apiKey = 'AIzaSyCmiyc8iXq1KDOmW_-yWsjALkQVY1z8krw';
const latitude = 40.7128;
const longitude = -74.006;
const staffName = 'John';
const Tracker = () => {
  const [map, setMap] = useState(null);
  const [staffId, setStaffId] = useState('');
  const [staffDetails, setStaffDetails] = useState(null);
  const [error, setError] = useState('');

  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const handleSearch = async () => {
    try {
      const response = await ApiService.post('/staff/getStaffDetailsById', {
        staffId: staffId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });
      if (!response.status) {
        throw new Error('Staff not found');
      }
      const data = await response.data;
      setStaffDetails(data);
      setError('');
    } catch (err) {
      setStaffDetails(null);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (map && staffDetails) {
      map.setCenter({
        lat: staffDetails.latitude || latitude,
        lng: staffDetails.longitude || longitude,
      });
    }
  }, [map, staffDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Tracker</h1>
      <div className="mb-4">
        <input
          type="text"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          placeholder="Enter Staff ID"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-green-700 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {staffDetails ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: staffDetails.latitude || latitude,
              lng: staffDetails.longitude || longitude,
            }}
            zoom={13}
            onLoad={(mapInstance) => setMap(mapInstance)}
          >
            <Marker
              position={{
                lat: staffDetails.latitude || latitude,
                lng: staffDetails.longitude || longitude,
              }}
            />
          </GoogleMap>
        </LoadScript>
      ) : (
        !error && <p>Enter a staff ID to search for their location.</p>
      )}
    </div>
  );
};

export default Tracker;
