import React, { useState, useCallback, useRef, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';

const PersonnelDetails = ({ setPersonnelDetails,personnelDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    location: '',
    phoneNumber: '',
    alternateNumber: '',
    email: '',
    aadharNumber: '',
    panCardNumber: null,
    // drivingLicence: '',
    address: '',
    uanNumber: '',
    esicNumber: '', 
    bloodGroup: '',
    photo: null,
  });
  const [permissions, setPermissions] = useState({});
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState('');
  const fileInputRef = useRef(null);

  const validate = (fieldName, value) => {
    let error = '';
    

    // General required field validation
    if (value.trim() === '') {
      error = `${fieldName} is required.`;
    }

    // Email validation
    if (fieldName === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Please enter a valid email.';
    }

    // Phone number validation (10 digits)
    if (fieldName === 'phoneNumber' && value && !/^\d{10}$/.test(value)) {
      error = 'Phone number must be 10 digits.';
    }

    // Alternate phone number validation (10 digits)
    if (fieldName === 'alternateNumber' && value && !/^\d{10}$/.test(value)) {
      error = 'Alternate phone number must be 10 digits.';
    }

    // Aadhar Number validation (12 digits)
    if (fieldName === 'aadharNumber' && value && !/^\d{12}$/.test(value)) {
      error = 'Aadhar number must be 12 digits.';
    }

    // PAN Card Number validation (format: ABCDE1234F)
    if (
      fieldName === 'panCardNumber' &&
      value &&
      !/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(value)
    ) {
      error = 'Please enter a valid PAN Card number.';
    }

    // UAN Number validation (12 digits)
    if (fieldName === 'uanNumber' && value && !/^\d{12}$/.test(value)) {
      error = 'UAN number must be 12 digits.';
    }

    // ESIC Number validation (17 digits)
    if (fieldName === 'esicNumber' && value && !/^\d{17}$/.test(value)) {
      error = 'ESIC number must be 17 digits.';
    }

    // Blood group validation (e.g., A+, B-, AB+)
    if (
      fieldName === 'bloodGroup' &&
      value &&
      !/^(A|B|AB|O)[+-]$/.test(value)
    ) {
      error = 'Please enter a valid blood group (e.g., A+, B-, AB+).';
    }

    // DOB validation (date format check)
    if (fieldName === 'dob' && value) {
      const dobDate = new Date(value);
      if (dobDate >= new Date()) {
        error = 'Date of birth cannot be in the future.';
      }
    }

    // Gender validation (must be either 'Male' or 'Female')
    if (
      fieldName === 'gender' &&
      value &&
      !['Male', 'Female'].includes(value)
    ) {
      error = 'Please select a valid gender.';
    }

    return error;
  };

  useEffect(() => {
    const perms = getPermissions('staff');
    setPermissions(perms);
  }, [permissions]); // Include getStaffSearchDetails in the dependency array

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        setPersonnelDetails(updatedData);
        return updatedData;
      });

      // Validate the field and set the error if needed
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validate(name, value),
      }));
    },
    [setPersonnelDetails]
  );

  const handlePhotoChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setPhotoPreview(URL.createObjectURL(file));
        setFormData((prevData) => {
          const updatedData = { ...prevData, photo: file };
          setPersonnelDetails(updatedData);
          return updatedData;
        });
      }
    },
    [setPersonnelDetails]
  );

  const handleRemovePhoto = useCallback(() => {
    setPhotoPreview(null);
    setFormData((prevData) => {
      const updatedData = { ...prevData, photo: null };
      setPersonnelDetails(updatedData);
      return updatedData;
    });
  }, [setPersonnelDetails]);

   useEffect(() => {
          if (personnelDetails && Object.keys(personnelDetails).length > 0) {
            setFormData(personnelDetails);
          }
        }, [personnelDetails]);



  const validateField = async (field, value, regex, errorMessage) => {
  if (!regex.test(value)) return;

  try {
    const response = await ApiService.post(
      "/staff/getStaffVerification",
      { [field]: value },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.status === true) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMessage,
      }));
    }
  } catch (apiError) {
    console.error(`Error validating ${field}:`, apiError);
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [field]: `Error validating ${field}.`,
    // }));
  }
};

useEffect(() => {
  if (formData.phoneNumber) {
    validateField("phoneNumber", formData.phoneNumber, /^\d{10}$/, "Phone number already exists.");
  }
}, [formData.phoneNumber]);

useEffect(() => {
  if (formData.aadharNumber) {
    validateField("aadharNumber", formData.aadharNumber, /^\d{12}$/, "Aadhar number already exists.");
  }
}, [formData.aadharNumber]);

useEffect(() => {
  if (formData.email) {
    validateField("email", formData.email, /\S+@\S+\.\S+/, "Email already exists.");
  }
}, [formData.email]);

useEffect(() => {
  if (formData.panCardNumber) {
    validateField(
      "panCardNumber",
      formData.panCardNumber,
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 
      "PAN Card number already exists."
    );
  }
}, [formData.panCardNumber]);





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
      <h3 className="text-3xl font-semibold mb-6 text-center">
        Add Personal Details
      </h3>
      <div className="space-y-6">
        {Object.keys(formData)
          .filter((key) => key !== 'photo')
          .map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 capitalize">
                {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
              </label>
              {key === 'gender' ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none text-gray-700"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <input
                  type={key === 'dob' ? 'date' : 'text'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder="Enter"
                  className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none text-gray-700"
                />
              )}
              {errors[key] && (
                <span className="text-red-500 text-sm mt-2">{errors[key]}</span>
              )}
            </div>
          ))}
      {/* <button
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"
    >
      ADD
    </button> */}
          
      </div>
    </div>
  );
};

export default PersonnelDetails;
