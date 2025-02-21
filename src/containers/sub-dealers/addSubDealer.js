import React, { useState, useEffect } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AddEditSubDealer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subDealerData = location.state?.subDealerDetails || {};
  console.log(subDealerData, "<<<<<<<")
  const initialFormData = {
    id: subDealerData?.id || null,
    name: subDealerData.name || '',
    subDealerPhoneNumber: subDealerData.subDealerPhoneNumber || '',
    alternatePhoneNumber: subDealerData.alternateNumber || '',
    gstNumber: subDealerData.gstNumber || '',
    password: subDealerData.password || '',
    startingDate: subDealerData.startDate || '',
    emailId: subDealerData.emailId || '',
    aadharNumber: subDealerData.aadharNumber || '',
    address: subDealerData.address || '',
    photo: subDealerData?.photo || null,
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState(subDealerData?.photo || '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (
      location.state?.subDealerDetails ||
      location.state?.subDealerDetails?.subDealerId
    ) {
      const fetchClientDetails = async () => {
        try {
          const response = await ApiService.post(
            '/subdealer/getSubDealerDetails',
            {
              subDealerId: subDealerData.subDealerId,
              companyCode: initialAuthState.companyCode,
              unitCode: initialAuthState.unitCode,
            }
          );
          const subDealer = response.data?.[0];
          console.log(subDealer);
          setFormData((prev) => ({
            ...prev,
            ...subDealer,
          }));
          setImage(subDealer?.photo || '');
        } catch (error) {
          console.error('Error fetching branch details:', error);
          alert('Failed to fetch branch details.');
        }
      };
      fetchClientDetails();
    }
  }, [location.state?.subDealerDetails]);

  const handleSave = async () => {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photo' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });
    console.log(payload, formData, '+++++++++++++++++++++++++');
    try {
      const endpoint = formData.id
        ? '/subdealer/handleSubDealerDetails'
        : '/subdealer/handleSubDealerDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status) {
        alert(
          formData.id
            ? 'vendor updated successfully!'
            : 'vendor added successfully!'
        );
        navigate('/sub_dealers');
      } else {
        alert('Failed to save employee details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving employee details:', error);
      alert('Failed to save employee details. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFormData((prev) => ({
        ...prev,
        photo: selectedFile,
      }));
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
            {subDealerData.name ? 'Edit Sub Dealer' : 'Add Sub Dealer'}
          </h1>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <img
            src={image || 'https://i.pravatar.cc/150?img=5'}
            alt="Employee"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            name="photo"
            className="ml-4 border p-2 rounded"
            onChange={handleFileChange}
          />
          {formData.photo && (
            <button
              onClick={() => {
                setFormData({ ...formData, photo: null });
                setImage('');
              }}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          )}
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
              name: 'subDealerPhoneNumber',
              type: 'text',
              placeholder: 'Enter Number',
            },
            {
              label: 'Alternate Mobile Number',
              name: 'alternatePhoneNumber',
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
              label: 'Starting Date',
              name: 'startingDate',
              type: 'date',
              placeholder: '',
            },
            {
              label: 'Email ID',
              name: 'emailId',
              type: 'email',
              placeholder: 'Enter Email ID',
            },
            {
              label: 'Password',
              name: 'password',
              type: 'text',
              placeholder: 'Enter Password',
            },
            {
              label: 'Aadhar Number',
              name: 'aadharNumber',
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
