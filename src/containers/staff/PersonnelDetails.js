import React, { useState, useCallback, useRef } from 'react';
import { initialAuthState } from '../../services/ApiService';

const PersonnelDetails = ({ setPersonnelDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    location: '',
    phoneNumber: '',
    alternateNumber: '',
    email: '',
    aadharNumber: '',
    panCardNumber: '',
    address: '',
    uanNumber: '',
    esicNumber: '',
    bloodGroup: '',
    beforeExperience:null,
    photo: null,

  });

  const [photoPreview, setPhotoPreview] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (prevData[name] === value) return prevData;
      const updatedData = { ...prevData, [name]: value };
      setPersonnelDetails(updatedData);
      return updatedData;
    });
  }, [setPersonnelDetails]);

  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        photo: file,
      }));
      setPersonnelDetails((prevData) => ({
        ...prevData,
        photo: file,
      }));
    }
  }, [setPersonnelDetails]);




  const handleRemovePhoto = useCallback(() => {
    setPhotoPreview(null);
    setFormData((prevData) => {
      const updatedData = { ...prevData, photo: null };
      setPersonnelDetails(updatedData);
      return updatedData;
    });
  }, [setPersonnelDetails]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
      {/* Photo Upload Section */}
      <div className="flex items-center mb-6">
        <div className="relative">
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} alt="Uploaded" className="w-full h-full object-cover" />
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
            <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleRemovePhoto}>
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <h3 className="text-3xl font-semibold mb-6 text-center">Add Personal Details</h3>
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default PersonnelDetails;