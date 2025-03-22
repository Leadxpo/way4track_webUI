

import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ApiService from "../../services/ApiService";

const EditPersonnelDetails = () => {
  const location = useLocation();
  const { state } = location || {}; // Receiving data from navigation
  console.log("locationnnn", state);

  // State Initialization with Navigation Data Binding
  const [data, setData] = useState({
    name: "",
    dob: "",
    gender: "",
    location: "",
    phoneNumber: "",
    alternateNumber: "",
    email: "",
    aadharNumber: "",
    panCardNumber: "",
    drivingLicence: "",
    address: "",
    uanNumber: "",
    esicNumber: "",
    bloodGroup: "",
    staffPhoto: null,
  });

    useEffect(() => {
      if (location.state?.data) {
        setData(location.state.data);
      }
    }, [location.state]);

  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Effect to bind navigation data when available
  useEffect(() => {
    if (state) {
      setData((prev) => ({
        ...prev,
        ...state,
        staffPhoto: state.staffPhoto || null,
      }));
      if (state?.staffPhoto) {
        setPhotoPreview(state.staffPhoto);
      }
    }
  }, [state]);

  // Handle Input Change & Bind to State
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Photo Upload & Bind
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileObject = { name: file.name, file: file };
      setPhotoPreview(URL.createObjectURL(file));

      setData((prevData) => ({
        ...prevData,
        staffPhoto: fileObject,
      }));
    }
  };

  // Remove Photo
  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setData((prevData) => ({
      ...prevData,
      staffPhoto: null,
    }));
  };

  const handleSubmit = async () => {
    try {
      const endpoint = "/staff/handleStaffDetails"; 
      const response = await ApiService.post(endpoint,data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.status) {
        alert("Personnel details updated successfully!");
        return response.data;
      } else {
        alert("Failed to update Personnel details.");
        return null;
      }
    } catch (error) {
      console.error("Error updating personnel details:", error);
      alert("An error occurred while updating personnel details.");
      return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
      {/* Photo Upload Section */}
      <div className="flex items-center mb-6">
        <div className="relative">
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-lg">+</span>
              )}
            </div>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="ml-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            onClick={() => fileInputRef.current.click()}
          >
            {photoPreview ? "Change Photo" : "Add Photo"}
          </button>
          {photoPreview && (
            <button
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={handleRemovePhoto}
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <h3 className="text-3xl font-semibold mb-6 text-center">
        Edit Personal Details
      </h3>
      <div className="space-y-6">
        {Object.keys(data)
          .filter((key) => key !== "staffPhoto")
          .map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 capitalize">
                {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </label>
              {key === "gender" ? (
                <select
                  name={key}
                  value={data[key] || ""}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none text-gray-700"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <input
                  type={key === "dob" ? "date" : "text"}
                  name={key}
                  value={data[key] || ""}
                  onChange={handleChange}
                  placeholder="Enter"
                  className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none text-gray-700"
                />
              )}
            </div>
          ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditPersonnelDetails;
