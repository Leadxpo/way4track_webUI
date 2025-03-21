import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { useNavigate } from 'react-router';
import { initialAuthState } from '../../services/ApiService';

const AddHiring = () => {
  const navigate = useNavigate();

  const [qualifications, setQualifications] = useState([
    { name: '', marks: '', year: '' },
  ]);

  const [levelWiseData, setLevelWiseData] = useState([
    {
      dateOfConductor: '',
      conductorBy: '',
      conductorPlace: '',
      result: '',
      review: '',
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    candidateName: '',
    phoneNumber: '',
    email: '',
    address: '',
    hiringLevel: 2,
    resume: null,
    file: '',
    dateOfUpload: new Date().toISOString().split('T')[0],
    status: 'INTERVIEWED',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode // Will be populated dynamically
  });


  const [fileUploadedMessage, setFileUploadedMessage] = useState('');

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle qualification changes
  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index][field] = value;
    setQualifications(updatedQualifications);
  };

  const handleAddQualification = () => {
    setQualifications([...qualifications, { name: '', marks: '', year: '' }]);
  };

  const handleRemoveQualification = (index) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const filePath = URL.createObjectURL(file);
      setFileUploadedMessage(filePath);
      setFormData((prev) => ({
        ...prev,
        resumePath: filePath, // Storing for UI purposes
        resume: file, // Storing the file object
      }));
    }
  };


  // Handle adding a new level entry
  const handleAddLevel = () => {
    setLevelWiseData([...levelWiseData, { dateOfConductor: '', conductorBy: '', conductorPlace: '', result: '', review: '' }])
  };

  // Handle removing a level entry
  const handleRemoveLevel = (index) => {
    const updatedLevelWiseData = levelWiseData.filter((_, i) => i !== index);
    setLevelWiseData(updatedLevelWiseData)
  };

  // Handle level-wise input change
  const handleLevelInputChange = (levelIndex, field, value) => {
    const updatedLevelWiseData = [...levelWiseData];
    updatedLevelWiseData[levelIndex] = {
      ...updatedLevelWiseData[levelIndex],
      [field]: value,
    };
    setLevelWiseData(updatedLevelWiseData)
  };


  // Submit handler
  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append('hiringLevel', formData.hiringLevel);
    payload.append('candidateName', formData.candidateName);
    payload.append('phoneNumber', formData.phoneNumber);
    payload.append('email', formData.email);
    payload.append('address', formData.address);
    payload.append('dateOfUpload', formData.dateOfUpload);
    payload.append('status', formData.status);
    payload.append('companyCode', formData.companyCode);
    payload.append('unitCode', formData.unitCode);

    // Append qualifications
    qualifications.forEach((q, index) => {
      payload.append(`qualifications[${index}][qualificationName]`, q.name);
      payload.append(`qualifications[${index}][marks]`, q.marks);
      payload.append(`qualifications[${index}][yearOfPass]`, q.year);
    });

    // Append Level Wise Data
    levelWiseData.forEach((level, index) => {
      payload.append(`levelWiseData[${index}][dateOfConductor]`, level.dateOfConductor);
      payload.append(`levelWiseData[${index}][conductorBy]`, level.conductorBy);
      payload.append(`levelWiseData[${index}][conductorPlace]`, level.conductorPlace);
      payload.append(`levelWiseData[${index}][result]`, level.result);
      payload.append(`levelWiseData[${index}][review]`, level.review);
    });

    // Append resume file
    if (formData.resume) {
      payload.append('file', formData.resume);
    }

    try {
      const endpoint = `/hiring/saveHiringDetailsWithResume`;
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data) {
        alert('Hiring details saved successfully!');
        navigate('/hiring');
      } else {
        alert('Failed to save hiring details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving hiring details:', error);
      alert('Failed to save hiring details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        <h1 className="py-4 text-2xl font-bold">Hiring</h1>

        {/* Form Inputs */}
        <div className="space-y-4">
          <label className="block">
            <span className="block text-gray-700">Candidate Name:</span>
            <input required
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="block text-gray-700">Phone Number:</span>
            <input
            required
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </label>
          <label className="block">
            <span className="block text-gray-700">Email:</span>
            <input
            required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </label>
          <label className="block">
            <span className="block text-gray-700">Address:</span>
            <textarea
            required
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </label>

          {/* Qualifications */}
          <div>
            <div className="flex items-center justify-left mb-4 mt-2">
              <h2 className="text-lg font-semibold">Qualifications</h2>
              <button
                onClick={handleAddQualification}
                className="bg-green-700 text-white p-2 rounded-md ml-4"
              >
                +
              </button>
            </div>

            {qualifications.map((qualification, index) => (
              <div key={index} className="flex space-x-4 mb-4 bg-gray-200 p-4 rounded-md">
                {/* Qualification Fields */}
                <input
                  type="text"
                  value={qualification.name}
                  onChange={(e) => handleQualificationChange(index, 'name', e.target.value)}
                  placeholder="Qualification"
                  className="w-1/3 p-2"
                />
                <input
                  type="text"
                  value={qualification.marks}
                  onChange={(e) => handleQualificationChange(index, 'marks', e.target.value)}
                  placeholder="Marks"
                  className="w-1/3 p-2"
                />
                <input
                  type="text"
                  value={qualification.year}
                  onChange={(e) => handleQualificationChange(index, 'year', e.target.value)}
                  placeholder="Year"
                  className="w-1/3 p-2"
                />
                <button
                  onClick={() => handleRemoveQualification(index)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Level Wise Data */}
          {/* Level Wise Data */}
          <div>
            <div className="flex items-center justify-left mb-4 mt-2">
              <h2 className="text-lg font-semibold">Level Wise Data</h2>
              <button
                onClick={handleAddLevel}
                className="bg-green-700 text-white p-2 rounded-md ml-4"
              >
                +
              </button>
            </div>

            {levelWiseData.map((level, index) => (
              <div key={index} className="flex space-x-4 mb-4 bg-gray-200 p-4 rounded-md">
                <input
                  type="date"
                  value={level.dateOfConductor}
                  onChange={(e) => handleLevelInputChange(index, 'dateOfConductor', e.target.value)}
                  placeholder="Date of Conductor"
                  className="w-1/5 p-2"
                />
                <input
                  type="text"
                  value={level.conductorBy}
                  onChange={(e) => handleLevelInputChange(index, 'conductorBy', e.target.value)}
                  placeholder="Conductor By"
                  className="w-1/5 p-2"
                />
                <input
                  type="text"
                  value={level.conductorPlace}
                  onChange={(e) => handleLevelInputChange(index, 'conductorPlace', e.target.value)}
                  placeholder="Conductor Place"
                  className="w-1/5 p-2"
                />
                <input
                  type="text"
                  value={level.result}
                  onChange={(e) => handleLevelInputChange(index, 'result', e.target.value)}
                  placeholder="Result"
                  className="w-1/5 p-2"
                />
                <input
                  type="text"
                  value={level.review}
                  onChange={(e) => handleLevelInputChange(index, 'review', e.target.value)}
                  placeholder="Review"
                  className="w-1/5 p-2"
                />
                <button
                  onClick={() => handleRemoveLevel(index)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>


          {/* Resume Upload */}
          <div>
            <label className="block text-gray-700">
              <span>Upload Resume:</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
            </label>
            {fileUploadedMessage && <p>File uploaded: {fileUploadedMessage}</p>}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white p-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHiring;
