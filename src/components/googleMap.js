import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ApiService from "../services/ApiService"; // Adjust path as needed

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 15.9129, // Approximate center of Andhra Pradesh
  lng: 79.7400,
};

const GoogleMapComponent = () => {
  const [branches, setBranches] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post("/branch/getBranchDetails");

        if (response.status) {
          const rawBranches = response.data;

          // Filter and parse valid lat/lng branches only
          const validBranches = rawBranches.filter(branch => {
            const lat = parseFloat(branch.latitude);
            const lng = parseFloat(branch.longitude);
            return !isNaN(lat) && !isNaN(lng);
          });

          setBranches(validBranches);

          // Optionally center the map on the first valid branch
          if (validBranches.length > 0) {
            const first = validBranches[0];
            setMapCenter({
              lat: parseFloat(first.latitude),
              lng: parseFloat(first.longitude),
            });
          }
        } else {
          console.error("Failed to fetch branches");
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCmiyc8iXq1KDOmW_-yWsjALkQVY1z8krw">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={7} center={mapCenter}>
        {branches.map((branch, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(branch.latitude),
              lng: parseFloat(branch.longitude),
            }}
            label={branch.branchName}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
