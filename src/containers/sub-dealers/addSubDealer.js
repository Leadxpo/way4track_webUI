import React, { useState, useEffect } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';
import ApiService from '../../services/ApiService';

const AddEditSubDealer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subDealerData = location.state?.subDealerDetails || {};

  const initialFormData = {
    name: subDealerData.subDealerName || '',
    number: subDealerData.number || '',
    alternateNumber: subDealerData.alternateNumber || '',
    gstNumber: subDealerData.gstNumber || '',
    productTypes: subDealerData.productTypes || '',
    startDate: subDealerData.startDate || '',
    email: subDealerData.email || '',
    aadhar: subDealerData.aadhar || '',
    address: subDealerData.address || '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const isEmpty = Object.values(formData).some((value) => value === '');
    if (isEmpty) {
      setErrorMessage('Please fill all details');
      return;
    } else {
      setErrorMessage('');
    }

    const payload = {
      name: formData.name,
      subDealerPhoneNumber: formData.number,
      alternatePhoneNumber: formData.alternateNumber,
      gstNumber: formData.gstNumber,
      startingDate: formData.startDate,
      emailId: formData.email,
      aadharNumber: formData.aadhar,
      address: formData.address,
      voucherId: 2,
    };

    try {
      if (subDealerData.subDealerName) {
        await ApiService.put('/sub-dealer/saveSubDealerDetails', payload);
      } else {
        await ApiService.post('/subdealer/saveSubDealerDetails', payload);
      }
      alert('Sub-dealer saved successfully!');
      navigate('/sub_dealers');
    } catch (error) {
      console.error('Error saving sub-dealer:', error);
      alert('Failed to save sub-dealer. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/sub_dealers');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {subDealerData.subDealerName ? 'Edit Sub Dealer' : 'Add Sub Dealer'}
          </h1>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <div className="p-8 bg-gray-200 rounded-full">
            {subDealerData.subDealerName ? (
              <img
                src="logo-square.png"
                className="w-24 h-24 rounded-full object-cover"
                alt="Sub Dealer"
              />
            ) : (
              <FaFileCirclePlus className="text-gray-800" size={30} />
            )}
          </div>
          <button className="ml-4 border p-2 rounded">Add Photo</button>
          <button className="ml-2 text-red-500">Remove</button>
        </div>

        <div className="space-y-4">
          {[
            {
              label: 'Dealer Name',
              name: 'name',
              type: 'text',
              placeholder: 'Enter Name',
            },
            {
              label: 'Dealer Number',
              name: 'number',
              type: 'text',
              placeholder: 'Enter Number',
            },
            {
              label: 'Alternate Mobile Number',
              name: 'alternateNumber',
              type: 'text',
              placeholder: 'Enter Alternate Mobile Number',
            },
            {
              label: 'GST Number',
              name: 'gstNumber',
              type: 'text',
              placeholder: 'Enter GST Number',
            },
            {
              label: 'Product Types',
              name: 'productTypes',
              type: 'text',
              placeholder: 'Enter Product Types',
            },
            {
              label: 'Starting Date',
              name: 'startDate',
              type: 'date',
              placeholder: '',
            },
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
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <p className="font-semibold mb-1">{label}</p>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
          ))}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-red-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-600 transition-all"
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

export default AddEditSubDealer;
