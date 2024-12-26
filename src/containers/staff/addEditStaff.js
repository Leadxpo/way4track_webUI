import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
const AddEditEmployeeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if data is available from the location state
  const employeeData = location.state?.staffDetails || {};

  // Initialize form data with defaults
  const initialFormData = {
    name: employeeData.name || '',
    number: employeeData.number || '',
    staffId: employeeData.staffId || '',
    designation: employeeData.designation || '',
    branch: employeeData.branch || '',
    dob: employeeData.dob || '',
    email: employeeData.email || '',
    aadhar: employeeData.aadhar || '',
    address: employeeData.address || '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    // Ensure all undefined/null values are converted to empty strings
    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value || ''])
    );

    try {
      const response = await ApiService.post(
        '/staff/handleStaffDetails',
        payload
      );

      if (response) {
        console.log('Employee details saved successfully');
        navigate('/staff');
      } else {
        console.error('Failed to save employee details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/staff');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {employeeData.name ? 'Edit Employee' : 'Add Employee'}
          </h1>
        </div>

        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <img
            src={'https://i.pravatar.cc/150?img=5'}
            alt="Employee"
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="ml-4 border p-2 rounded">Add Photo</button>
          <button className="ml-2 text-red-500">Remove</button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {[
            {
              label: 'Name',
              name: 'name',
              type: 'text',
              placeholder: 'Enter Name',
            },
            {
              label: 'Number',
              name: 'number',
              type: 'text',
              placeholder: 'Enter Number',
            },
            {
              label: 'Staff ID',
              name: 'staffId',
              type: 'text',
              placeholder: 'Enter Staff ID',
            },
            {
              label: 'Designation',
              name: 'designation',
              type: 'text',
              placeholder: 'Enter Designation',
            },
            {
              label: 'Branch',
              name: 'branch',
              type: 'select',
              options: ['Visakhapatnam', 'Hyderabad', 'Vijayawada', 'Kakinada'],
            },
            { label: 'Date of Birth', name: 'dob', type: 'date' },
            {
              label: 'Email ID',
              name: 'email',
              type: 'email',
              placeholder: 'Enter Email ID',
            },
            {
              label: 'Aadhar Number',
              name: 'aadhar',
              type: 'text',
              placeholder: 'Enter Aadhar Number',
            },
            {
              label: 'Address',
              name: 'address',
              type: 'text',
              placeholder: 'Enter Address',
            },
          ].map((field) => (
            <div key={field.name}>
              <p className="font-semibold mb-1">{field.label}</p>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                >
                  <option value="" disabled>
                    Select a Branch
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
              )}
            </div>
          ))}
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
    </div>
  );
};

export default AddEditEmployeeForm;
