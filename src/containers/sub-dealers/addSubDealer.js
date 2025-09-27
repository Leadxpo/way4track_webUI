import React, { useState, useEffect } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AddSubDealer = () => {
  const navigate = useNavigate();
  
  const initialFormData = {
    id: null,
    name: '',
    subDealerPhoneNumber: '',
    alternatePhoneNumber: '',
    gstNumber: '',
    password:'',
    startingDate:'',
    emailId:'',
    aadharNumber:'',
    address:'',
    subDealerPhoto:null,
    branchId:'',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  };

  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post('/branch/getBranchNamesDropDown');
        if (response.status) {
          setBranches(response.data);
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

    // Append form fields correctly, ensuring no duplicate id
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'id' && value !== null) {
        payload.append(key, String(value)); // Ensure id is a string
      } else if (key === 'subDealerPhoto' && value instanceof File) {
        payload.append(key, value); // Ensure photo is a file if uploaded
      } else if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    const requiredFields = ["gstNumber", "aadharNumber",'startingDate'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage(`${field} is required`);
        return;
      }
    }
  
    try {

      const response = await ApiService.post('/subdealer/handleSubDealerDetails', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response, '✅ API Response');

      if (response.status) {
        alert('Sub-dealer added successfully!');
        navigate('/sub_dealers');
      } else {
        alert(response.data.internalMessage || 'Failed to save sub-dealer details. Please try again.');
      }
    } catch (error) {
      console.error('🚨 Error saving sub-dealer details:', error);
      alert('Failed to save sub-dealer details. Please try again.');
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
            Add Sub Dealer
          </h1>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <img
            src={image || 'https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg'}
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
          {formData.subDealerPhoto && (
            <button
              onClick={() => {
                setFormData({ ...formData, subDealerPhoto: null });
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
              required:false,
              placeholder: 'Enter Name',
            },
            {
              label: 'Dealer Number',
              name: 'subDealerPhoneNumber',
              type: 'text',
              required:false,
              placeholder: 'Enter Number',
            },
            {
              label: 'Alternate Mobile Number',
              name: 'alternatePhoneNumber',
              type: 'text',
              required:false,
              placeholder: 'Enter Alternate Mobile Number',
            },
            {
              label: 'GST Number',
              name: 'gstNumber',
              type: 'text',
              required:true,
              placeholder: 'Enter GST Number',
            },
            {
              label: 'Starting Date',
              name: 'startingDate',
              type: 'date',
              required:false,
              placeholder: '',
            },
            {
              label: 'Email ID',
              name: 'emailId',
              type: 'email',
              required:false,
              placeholder: 'Enter Email ID',
            },
            {
              label: 'Password',
              name: 'password',
              type: 'text',
              required:false,
              placeholder: 'Enter Password',
            },
            {
              label: 'Aadhar Number',
              name: 'aadharNumber',
              type: 'text',
              required:true,
              placeholder: 'Enter Aadhar Number',
            },
            {
              label: 'Address',
              name: 'address',
              type: 'text',
              required:false,
              placeholder: 'Enter Address',
            },
          ].map(({ label, name, type, placeholder,required }) => (
            <div key={name}>
              <p className="font-semibold mb-1">{label}</p>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                required={required}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
          ))}
                    {/* Branch */}
                    {branches.length > 0 && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Branch</p>
                <select
                  name="branchId"
                  value={formData.branchId}
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

export default AddSubDealer;
