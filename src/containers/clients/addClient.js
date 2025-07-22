import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
const AddClient = () => {
  const navigate = useNavigate();

  const initialFormData = {

    name: '',
    phoneNumber: '',
    GSTNumber: '',
    branch: '',
    branchName: '',
    email: '',
    address: '',
    state: '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    file: null,
  };


  const [formData, setFormData] = useState(initialFormData);
  const [branches, setBranches] = useState([]);
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});
  const [gstErrors, setGstErrors] = useState({ purchaseGst: '' });
  const [isGST, setIsGST] = useState(true);
  const [gstData, setGstData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchGSTData = async () => {
    const gstNumber = formData.GSTNumber;
    if (!gstNumber) {
      alert('Please enter a GST number');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.post(
        'https://appyflow.in/api/verifyGST',
        {
          key_secret: 'bOlgiziIVxPo7Nzqqmlga2YuAfy1',
          gstNo: gstNumber,
        }
      );
      setGstData(response);
      setIsGST(response.error)
      if (response.error) {
        setGstErrors((prev) => ({
          ...prev,
          purchaseGst: 'GST number Invalid',
        }));
      } else {
        setGstErrors((prev) => ({
          ...prev,
          purchaseGst: 'GST number valid',
        }));
      }

    } catch (error) {
      console.error('GST Fetch Error:', error);
      alert('Error fetching GST data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

    // if (errors.email || errors.phoneNumber) {
    //   alert('Please fix the validation errors before saving.');
    //   return;
    // }

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'file' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });

    try {
      const response = await ApiService.post('/client/handleClientDetails', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status) {
        alert('Client added successfully!');
        navigate('/clients');
      } else {
        alert('Failed to save client details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving client details:', error);
      alert('Failed to save client details. Please try again.');
    }
  };


  const handleCancel = () => {
    navigate('/clients');
  };



  // Phone number validation with API call
  useEffect(() => {
    const checkPhoneNumber = async () => {
      if (!/^\d{10}$/.test(formData.phoneNumber)) return;

      try {
        const response = await ApiService.post(
          "/client/getClientVerification",
          { phoneNumber: formData.phoneNumber },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === false) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: 'Phone number already exists.',
          }));
        }
      } catch (apiError) {
        console.error('Error checking phone number:', apiError);
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: 'Error validating phone number.',
        }));
      }
    };

    if (formData.phoneNumber) {
      checkPhoneNumber();
    }
  }, [formData.phoneNumber]);


  // Email validation with API call
  useEffect(() => {
    const checkEmail = async () => {
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) return;

      try {
        const response = await ApiService.post(
          "/client/getClientVerification",
          { email: formData.email },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === false) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Email already exists.',
          }));
        }
      } catch (apiError) {
        console.error('Error checking email:', apiError);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Error validating email.',
        }));
      }
    };

    if (formData.email) {
      checkEmail();
    }
  }, [formData.email]);


  const validate = (fieldName, value) => {
    let error = '';


    // General required field validation
    if (value.trim() === '') {
      error = `${fieldName} is required.`;
    }

    // Email validation
    // if (fieldName === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
    //   error = 'Please enter a valid email.';
    // }

    // Phone number validation (10 digits)
    if (fieldName === 'phoneNumber' && value && !/^\d{10}$/.test(value)) {
      error = 'Phone number must be 10 digits.';
    }



    return error;
  };



  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        return updatedData;
      });

      // Validate the field and set the error if needed
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   [name]: validate(name, value),
      // }));
    },
    []
  );



  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            Add Customer
          </h1>
        </div>
        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <img
            src={image || 'https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg'}
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
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
            {errors && (
              <span className="text-red-500 text-sm mt-2">{errors.phoneNumber}</span>
            )}
          </div>


          {/* GST Number */}
          <div className="">
            <div className="relative z-[10]">
              <input
                type="text"
                placeholder="Purchase GST:"
                name="GSTNumber"
                value={formData.GSTNumber}
                maxLength={15}
                onChange={handleInputChange}
                className="w-full border rounded-lg pr-36 pl-3 py-2 text-black text-lg font-medium border-gray-400 bg-white h-[45px]"
              />
              <button
                onClick={handleFetchGSTData}
                type="button"
                disabled={loading || formData.GSTNumber?.length !== 15}
                className="absolute top-1 right-1 h-[37px] px-4 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? '...' : 'Get'}
              </button>
            </div>

            {gstErrors.purchaseGst && (
              <p className="text-red-500 text-sm mt-1">{gstErrors.purchaseGst}</p>
            )}

            {!isGST && (
              <div className="mt-6 p-6 rounded-xl shadow-lg bg-white border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  GST Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-sm">
                  <div>
                    <label className="font-semibold text-gray-600">
                      Company Name:
                    </label>
                    <p>{gstData?.taxpayerInfo?.tradeNam}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">
                      GST Number:
                    </label>
                    <p>{gstData?.taxpayerInfo?.gstin}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">
                      Type Of Company:
                    </label>
                    <p>{gstData?.taxpayerInfo?.dty}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">
                      Incorporate Type:
                    </label>
                    <p>{gstData?.taxpayerInfo?.ctb}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">Status:</label>
                    <p>{gstData?.taxpayerInfo?.sts}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-600">
                      Pan Number:
                    </label>
                    <p>{gstData?.taxpayerInfo?.panNo}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-gray-600">
                      Address:
                    </label>
                    <p className="leading-relaxed">
                      {gstData?.taxpayerInfo?.pradr.addr.bno &&
                        `${gstData?.taxpayerInfo?.pradr.addr.bno}, `}
                      {gstData?.taxpayerInfo?.pradr.addr.st &&
                        `${gstData?.taxpayerInfo?.pradr.addr.st}, `}
                      {gstData?.taxpayerInfo?.pradr.addr.loc &&
                        `${gstData?.taxpayerInfo?.pradr.addr.loc}, `}
                      {gstData?.taxpayerInfo?.pradr.addr.dst &&
                        `${gstData?.taxpayerInfo?.pradr.addr.dst}, `}
                      {gstData?.taxpayerInfo?.pradr.addr.stcd} -{' '}
                      {gstData?.taxpayerInfo?.pradr.addr.pncd}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <label className="font-semibold text-gray-600">State:</label>
                  <p>{gstData?.taxpayerInfo?.pradr.addr.stcd}</p>
                </div>
              </div>
            )}

          </div>


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
          {/* Email ID */}
          <div>
            <p className="font-semibold mb-1">Email ID</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
            {errors && (
              <span className="text-red-500 text-sm mt-2">{errors.email}</span>
            )}
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
          <p className="font-semibold mb-1">state</p>
          <input
            type="text"
            name="state"
            value={formData.state}
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

export default AddClient;