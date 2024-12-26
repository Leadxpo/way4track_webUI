import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';

const AddBranchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const branchData = location.state?.branchDetails;

  const [branchName, setBranchName] = useState(branchData?.branchName || '');
  const [branchNumber, setBranchNumber] = useState(
    branchData?.branchNumber || ''
  );
  const [managerName, setManagerName] = useState(branchData?.managerName || '');
  const [branchAddress, setBranchAddress] = useState(
    branchData?.branchAddress || ''
  );
  const [addressLine1, setAddressLine1] = useState(
    branchData?.addressLine1 || ''
  );
  const [addressLine2, setAddressLine2] = useState(
    branchData?.addressLine2 || ''
  );
  const [city, setCity] = useState(branchData?.city || '');
  const [state, setState] = useState(branchData?.state || '');
  const [pincode, setPincode] = useState(branchData?.pincode || '');
  const [branchOpening, setBranchOpening] = useState(
    branchData?.branchOpening || ''
  );
  const [email, setEmail] = useState(branchData?.email || '');
  const [image, setImage] = useState(branchData?.branchPhoto || '');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setImage(imageURL);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      branchName,
      branchNumber,
      managerName,
      branchAddress,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      branchOpening,
      email,
      branchPhoto: image,
    };

    try {
      await ApiService.post('/branch/saveBranchDetails', payload);
      navigate('/branches');
    } catch (error) {
      console.error('Failed to save branch details:', error);
      alert('Failed to save branch details. Please try again.');
    }
  };

  useEffect(() => {
    if (branchData?.id) {
      const fetchBranchDetails = async () => {
        try {
          const response = await ApiService.post('/branch/getBranchDetails', {
            id: branchData.id,
          });
          const branch = response.data[0];
          setBranchName(branch.branchName || '');
          setManagerName(branch.managerName || '');
          setBranchAddress(branch.address || '');
          setBranchOpening(branch.branchOpening || '');
          setCity(branch.city || '');
          setEmail(branch.email || '');
        } catch (error) {
          console.error('Error fetching branch details:', error);
          alert('Failed to fetch branch details.');
        }
      };
      fetchBranchDetails();
    }
  }, [branchData]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        <div className="flex items-center space-x-4 mb-8">
          <img
            src="logo-square.png"
            alt="Logo"
            className="w-20 h-20 rounded shadow-lg"
          />
          <h1 className="text-3xl font-bold text-green-600">
            {branchData ? 'Edit Branch' : 'New Branch'}
          </h1>
        </div>
        <div className="space-y-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-bold mb-1">Branch Name</label>
              <input
                type="text"
                placeholder="Enter Branch Name"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block font-bold mb-1">Branch Number</label>
              <input
                type="text"
                placeholder="Enter Branch Number"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                value={branchNumber}
                onChange={(e) => setBranchNumber(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block font-bold mb-1">Manager Name</label>
            <input
              type="text"
              placeholder="Enter Manager Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Branch Address</label>
            <input
              type="text"
              placeholder="Enter Address 1"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Address 2"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none mt-4"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">City</label>
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">State</label>
            <input
              type="text"
              placeholder="State"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Pincode</label>
            <input
              type="text"
              placeholder="Pincode"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Branch Opening</label>
            <input
              type="date"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={branchOpening}
              onChange={(e) => setBranchOpening(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Email ID</label>
            <input
              type="email"
              placeholder="Enter Email ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Branch Photo</label>
            <button
              onClick={() => document.getElementById('fileInput').click()}
              className="mb-2 px-2 py-1 font-semibold rounded-md bg-blue-500 text-white"
            >
              Upload Photo
            </button>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            {image && (
              <div className="w-full h-48 border rounded-md flex items-center justify-center">
                <img
                  src={image}
                  alt="Uploaded"
                  className="h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-md shadow-lg hover:bg-yellow-500"
              onClick={handleSubmit}
            >
              {branchData ? 'Submit Changes' : 'Add Branch'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBranchForm;
