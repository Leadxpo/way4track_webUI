import React, { useState, useEffect } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const AddEditVendor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({ purchaseGst: '' });
  const vendorData = location.state?.vendorDetails || {};
  const [isGST, setIsGST] = useState(true);
  const [gstData, setGstData] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    id: vendorData?.vendorId || null,
    name: vendorData.name || '',
    vendorPhoneNumber: vendorData.vendorPhoneNumber || '',
    alternatePhoneNumber: vendorData.alternatePhoneNumber || '',
    emailId: vendorData.emailId || '',
    address: vendorData.address || '',
    state: vendorData.state || '',
    bankDetails: vendorData.bankDetails || '',
    GSTNumber: vendorData.GSTNumber || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    photo: vendorData?.photo || null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(vendorData?.photo || '');
  const [bankName, setBankName] = useState(vendorData?.bankDetails?.split(",")[0] || '');
  const [accountHolderName, setAccountHolderName] = useState(initialFormData?.bankDetails?.split(",")[1] || '');
  const [accountNumber, setAccountNumber] = useState(initialFormData?.bankDetails?.split(",")[2] || '');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState(initialFormData?.bankDetails?.split(",")[2] || '');
  const [accountIFSC, setAccountIFSC] = useState(initialFormData?.bankDetails?.split(",")[3] || '');

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
        setErrors((prev) => ({
          ...prev,
          purchaseGst: 'GST number Invalid',
        }));
      } else {
        setErrors((prev) => ({
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

  const handleSave = async () => {
    if (String(accountNumber) !== String(confirmAccountNumber)) {
      alert("Account number and confirmation do not match.");
      return; // Stop execution if the account numbers don't match
    }
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photo' && value instanceof File) {
        payload.append(key, value);
      } else if (key === 'bankDetails') {
        payload.append(key, `${bankName},${accountHolderName},${accountNumber},${accountIFSC}`);
      } else {
        payload.append(key, value);
      }
    });

    try {
      const endpoint = formData.id
        ? '/vendor/handleVendorDetails'
        : '/vendor/handleVendorDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status) {
        alert(
          formData.id
            ? 'vendor updated successfully!'
            : 'vendor added successfully!'
        );
        navigate('/vendors');
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
    navigate('/vendors');
  };
  useEffect(() => {
    const getVendorDetails = async () => {
      const payload = {
        vendorId: formData?.id,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode
      }
      try {
        const response = await ApiService.post('/vendor/getVendorDetailsById', payload);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (location.state?.vendorDetails) {
      getVendorDetails();
    }
  }, [location.state?.vendorDetails]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {formData.id ? 'Edit Vendor' : 'Add Vendor'}
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

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Form field for Name */}
          <div>
            <p className="font-semibold mb-1">Vendor Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Vendor Number */}
          <div>
            <p className="font-semibold mb-1">Vendor Number</p>
            <input
              type="text"
              name="vendorPhoneNumber"
              value={formData.vendorPhoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Vendor Alternate Number</p>
            <input
              type="text"
              name="alternatePhoneNumber"
              value={formData.alternatePhoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <p className="font-semibold mb-1">Email ID</p>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              placeholder="Enter Email ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
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

            {errors.purchaseGst && (
              <p className="text-red-500 text-sm mt-1">{errors.purchaseGst}</p>
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
          {/* State */}
          <div>
            <p className="font-semibold mb-1">State</p>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter Aadhar Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Address */}
          <div>
            <p className="font-semibold mb-1">Address</p>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Bank Name</p>
            <input
              type="text"
              name="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter Bank Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>

          <div>
            <p className="font-semibold mb-1">Bank Account Holder Name</p>
            <input
              type="text"
              name="accountHolderName"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              placeholder="Enter Account Holder Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>

          <div>
            <p className="font-semibold mb-1">Bank Account Number</p>
            <input
              type="text"
              name="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter Bank Account Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Bank Account Number</p>
            <input
              type="text"
              name="confirmAccountNumber"
              value={confirmAccountNumber}
              onChange={(e) => setConfirmAccountNumber(e.target.value)}
              placeholder="Enter Confirmation Bank Account Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
            {String(accountNumber) !== String(confirmAccountNumber) &&
              <p className="font-semibold mb-1" style={{ backgroundColor: "red", color: '#f3f3f3', padding: 5, borderBottomRightRadius: 8, borderBottomLeftRadius: 8, fontSize: 10 }} >Confirmation Bank Account Number not Matching</p>

            }
          </div>

          <div>
            <p className="font-semibold mb-1">IFSC Code</p>
            <input
              type="text"
              name="accountIFSC"
              value={accountIFSC}
              onChange={(e) => setAccountIFSC(e.target.value)}
              placeholder="Enter IFSC Code"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
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

export default AddEditVendor;
