import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const EditPersonnelDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state?.data || location.state || {}; // Extract data properly

  console.log(stateData, 'stateData11111');

  const [data, setData] = useState({
    staffId: '',
    name: '',
    dob: '',
    gender: '',
    location: '',
    phoneNumber: '',
    alternateNumber: '',
    email: '',
    aadharNumber: '',
    panCardNumber: '',
    drivingLicenceNumber: '',
    address: '',
    uanNumber: '',
    esicNumber: '',
    bloodGroup: '',
    staffPhoto: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Bind incoming data once
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...stateData, // Correctly merge state data
      staffPhoto: stateData.staffPhoto || null,
    }));
    if (stateData?.staffPhoto) {
      setPhotoPreview(stateData.staffPhoto);
    }
  }, [stateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setData((prev) => ({
        ...prev,
        staffPhoto: file,
      }));
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setData((prev) => ({
      ...prev,
      staffPhoto: null,
    }));
  };

  // const handleSubmit = async () => {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach((key) => {
  //       formData.append(key, data[key]);
  //     });

  //     const response = await ApiService.post("/staff/handleStaffDetails", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     if (response.status) {
  //       alert("Personnel details updated successfully!");
  //     } else {
  //       alert("Failed to update personnel details.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating personnel details:", error);
  //     alert("An error occurred while updating personnel details.");
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();
      payload.append('staffId', data.staffId);
      payload.append('name', data.name);
      payload.append('dob', data.dob);
      payload.append('gender', data.gender);
      payload.append('location', data.location);
      payload.append('phoneNumber', data.phoneNumber);
      payload.append('alternateNumber', data.alternateNumber);
      payload.append('email', data.email);
      payload.append('aadharNumber', data.aadharNumber);
      payload.append('panCardNumber', data.panCardNumber);

      payload.append('drivingLicenceNumber', data.drivingLicenceNumber);
      payload.append('address', data.address);
      payload.append('uanNumber', data.uanNumber);
      payload.append('esicNumber', data.esicNumber);
      payload.append('bloodGroup', data.bloodGroup);
      payload.append('id', data.id);

      // Handling staffPhoto if it's a file
      if (data.staffPhoto instanceof File) {
        payload.append('photo', data.staffPhoto);
      } else {
        payload.append('photo', ''); // Send empty if no file
      }

      const response = await ApiService.post(
        '/staff/handleStaffDetails',
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      if (response.status) {
        alert('Personnel details updated successfully!');
        console.log("rrr :",stateData)
        navigate('/staff-details', { state: { staffDetails: stateData } });
      } else {
        alert('Failed to update personnel details.');
      }
    } catch (error) {
      console.error('Error updating personnel details:', error);
      alert('An error occurred while updating personnel details.');
    }
  };
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
      <h3 className="text-3xl font-semibold mb-6 text-center">
        Edit Personal Details
      </h3>

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
            {photoPreview ? 'Change Photo' : 'Add Photo'}
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
      <div className="space-y-6">
        {Object.keys(data)
          .filter((key) => key !== 'staffPhoto')
          .map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 capitalize">
                {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
              </label>
              <input
                type={key === 'dob' ? 'date' : 'text'}
                name={key}
                value={data[key] || ''}
                onChange={handleChange}
                placeholder="Enter"
                className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none text-gray-700"
              />
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
