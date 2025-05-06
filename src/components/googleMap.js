import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ApiService from "../services/ApiService"; // Adjust path as needed

// Google Maps Container Style
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// Default Center Position (can adjust later to fit markers dynamically)
const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const GoogleMapComponent = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post("/branch/getBranchNamesDropDown");
        if (response.status) {
          const branchData = response.data;

          // Optional: Filter out invalid data (missing lat/lng)
          const validLocations = branchData.filter(
            (branch) => branch.latitude && branch.longitude
          );

          setBranches(validLocations);
          console.log("Fetched Branches with locations:", validLocations);
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
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={6} center={center}>
        {branches.map((branch, index) => (
          <Marker
            key={index}
            position={{ lat: parseFloat(branch.latitude), lng: parseFloat(branch.longitude) }}
            label={branch.branch_name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
