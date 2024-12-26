import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import { useNavigate } from 'react-router';

const AddHiring = () => {
  const navigate = useNavigate();
  const [qualifications, setQualifications] = useState([
    { name: '', marks: '', year: '' },
  ]);

  const [formData, setFormData] = useState({
    candidateName: '',
    phoneNumber: '',
    email: '',
    address: '',
    hiringLevel: 2,
    resume: null,
    resumePath: '',
    dateOfUpload: new Date().toISOString().split('T')[0],
    status: 'INTERVIEWED',
  });

  const [fileUploadedMessage, setFileUploadedMessage] = useState('');

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Qualification Changes
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

  // Handle File Upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await ApiService.post(
          '/hiring/uploadResume',
          formData
        );
        setFormData((prev) => ({
          ...prev,
          resumePath: response.resumePath,
        }));
        setFileUploadedMessage('File uploaded successfully!');
      } catch (error) {
        console.error('File upload failed:', error);
        setFileUploadedMessage('File upload failed. Please try again.');
      }
    }
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    const payload = {
      hiringLevel: formData.hiringLevel,
      candidateName: formData.candidateName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      qualifications: qualifications.map((q) => ({
        qualificationName: q.name,
        marks: q.marks,
        yearOfPass: q.year,
      })),
      resumePath: formData.resumePath,
      dateOfUpload: formData.dateOfUpload,
      status: formData.status,
    };

    try {
      const response = await ApiService.post(
        '/hiring/saveHiringDetails',
        payload
      );
      console.log('Hiring details saved successfully:', response);
      alert('Hiring details saved successfully!');
      navigate('/hiring');
    } catch (error) {
      console.error('Error saving hiring details:', error);
      alert('Failed to save hiring details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        <h1 className="py-4 text-2xl font-bold">Hiring</h1>

        {/* Input Fields */}
        <div className="space-y-4">
          <label className="block">
            <span className="block text-gray-700">Candidate Name:</span>
            <input
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
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="3"
            ></textarea>
          </label>
        </div>

        {/* Qualification Section */}
        <div>
          <div className="flex items-center justify-left mb-4 mt-2">
            <h2 className="text-lg font-semibold">Qualification</h2>
            <button
              onClick={handleAddQualification}
              className="bg-green-700 text-white p-2 rounded-md ml-4"
            >
              +
            </button>
          </div>

          {qualifications.map((qualification, index) => (
            <div
              key={index}
              className="flex space-x-4 mb-4 bg-gray-200 p-4 rounded-md"
            >
              <input
                type="text"
                placeholder="Enter Qualification Name"
                value={qualification.name}
                onChange={(e) =>
                  handleQualificationChange(index, 'name', e.target.value)
                }
                className="flex-1 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Enter Marks"
                value={qualification.marks}
                onChange={(e) =>
                  handleQualificationChange(index, 'marks', e.target.value)
                }
                className="flex-1 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Year Of Pass"
                value={qualification.year}
                onChange={(e) =>
                  handleQualificationChange(index, 'year', e.target.value)
                }
                className="flex-1 p-2 border rounded-md"
              />
              <button
                onClick={() => handleRemoveQualification(index)}
                className="bg-gray-300 p-2 rounded-md"
              >
                -
              </button>
            </div>
          ))}
        </div>

        {/* Upload Resume */}
        <div className="flex items-center space-x-4 shadow-lg p-4 rounded-md">
          <span className="block flex-1">Upload Resume</span>
          <label className="bg-green-700 text-white p-2 rounded-md cursor-pointer">
            Upload File
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
        {fileUploadedMessage && (
          <p className="text-green-600 text-sm mt-2">{fileUploadedMessage}</p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-700 text-white p-3 rounded-md mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddHiring;
