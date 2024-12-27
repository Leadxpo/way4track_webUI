import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import { useNavigate } from 'react-router';
import { initialAuthState } from '../../services/ApiService';

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
    file: '',
    dateOfUpload: new Date().toISOString().split('T')[0],
    status: 'INTERVIEWED',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode
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
      const filePath = URL.createObjectURL(file);
      setFileUploadedMessage(filePath);
      setFormData((prev) => ({
        ...prev,
        resumePath: filePath, // Storing for UI purposes
        resume: file,        // Storing the file object
      }));
    }
  };

  // Handle Form Submission
  // const handleSubmit = async () => {
  //   const payload = {
  //     hiringLevel: formData.hiringLevel,
  //     candidateName: formData.candidateName,
  //     phoneNumber: formData.phoneNumber,
  //     email: formData.email,
  //     address: formData.address,
  //     qualifications: qualifications.map((q) => ({
  //       qualificationName: q.name,
  //       marks: q.marks,
  //       yearOfPass: q.year,
  //     })),
  //     file: formData.file,
  //     dateOfUpload: formData.dateOfUpload,
  //     status: formData.status,
  //   };

  //   try {

  //     const endpoint = formData.id
  //       ? `/hiring/saveHiringDetailsWithResume` // Edit branch
  //       : `/hiring/saveHiringDetailsWithResume`; // Add branch (same endpoint)
  //     const response = await ApiService.post(endpoint, payload, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     if (response.data.status) {
  //       alert(formData.id ? 'Hiring updated successfully!' : 'Hiring added successfully!');
  //       navigate('/hiring');
  //     } else {
  //       alert('Failed to save branch details. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error saving hiring details:', error);
  //     alert('Failed to save hiring details. Please try again.');
  //   }
  // };
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

    qualifications.forEach((q, index) => {
      payload.append(`qualifications[${index}][qualificationName]`, q.name);
      payload.append(`qualifications[${index}][marks]`, q.marks);
      payload.append(`qualifications[${index}][yearOfPass]`, q.year);
    });

    if (formData.resume) {
      payload.append('file', formData.resume); // File field expected by backend
    }

    try {
      const endpoint = `/hiring/saveHiringDetailsWithResume`;
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
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
        <div>
          <p className="font-semibold mb-1">HiringLevel</p>
          <select
            name="hiringLevel"
            value={formData.hiringLevel}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option value="">Select hiringLevel</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div>
          <p className="font-semibold mb-1">status</p>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Qualified">Qualified</option>
            <option value="APPLIED">APPLIED</option>
            <option value="INTERVIEWED">INTERVIEWED</option>
          </select>
        </div>

        <label className="block">
          <span className="block text-gray-700">DateOfUpload:</span>
          <input
            type="date"
            name="dateOfUpload"
            value={formData.dateOfUpload}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </label>
        <div className="flex items-center space-x-4 shadow-lg p-4 rounded-md">
          <span className="block flex-1">Upload Resume</span>
          <label className="bg-green-700 text-white p-2 rounded-md cursor-pointer">
            Upload File
            <input type="file" className="hidden" name="file" onChange={handleFileUpload} />
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
