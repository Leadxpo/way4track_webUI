import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
const AddEditClient = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const clientData = location.state?.clientDetails || {};
  console.log(clientData, "?????????")
  const initialFormData = {
    name: clientData.name || '',
    phoneNumber: clientData.phoneNumber || '',
    clientId: clientData.clientId || '',
    branch: clientData.branch || '',
    dob: clientData.dob || '',
    email: clientData.email || '',
    address: clientData.address || '',
    joiningDate: clientData.joiningDate,
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    file: clientData?.file || null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [branches, setBranches] = useState([]);
  const [image, setImage] = useState(clientData?.file || '');


  console.log(formData, "+++++++++++++++++==")
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "++++++++++++++++++")
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFormData((prev) => ({
        ...prev,
        file: selectedFile,
      }));
    }
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post('/branch/getBranchNamesDropDown');
        if (response.status) {
          setBranches(response.data); // Set branches to state
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);




  const handleSave = async () => {

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'file' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });
    console.log(payload, "___________")
    try {
      const endpoint = formData.id ? '/client/handleClientDetails' : '/client/handleClientDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert(formData.id ? 'client updated successfully!' : 'client added successfully!');
        navigate('/clients');
      } else {
        alert('Failed to save employee details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving employee details:', error);
      alert('Failed to save employee details. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/clients');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {clientData.id ? 'Edit Client' : 'Add Client'}
          </h1>
        </div>
        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <img
            src={image || 'https://i.pravatar.cc/150?img=5'}
            alt="Employee"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            name="file"
            className="ml-4 border p-2 rounded"
            onChange={handleFileChange}
          />
          {formData.file && (
            <button
              onClick={() => {
                setFormData({ ...formData, file: null });
                setImage('');
              }}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          )}
        </div>
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <p className="font-semibold mb-1">Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Phone Number */}
          <div>
            <p className="font-semibold mb-1">Phone Number</p>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Client ID */}
          {/* Branch */}
          {branches.length > 0 && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Branch</p>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                >
                  <option value="" disabled>Select a Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {/* Date of Birth */}
          <div>
            <p className="font-semibold mb-1">Date of Birth</p>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Email ID */}
          <div>
            <p className="font-semibold mb-1">Email ID</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Address */}
          <div>
            <p className="font-semibold mb-1">Address</p>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <p className="font-semibold mb-1">Joining Date</p>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handleSave}
          className="bg-red-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-700 transition-all"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-black text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-gray-800 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>

  );
};

export default AddEditClient;
