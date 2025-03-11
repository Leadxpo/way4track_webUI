import React, { useState } from 'react';

const EditAttendance = () => {
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    branch: '',
    monthYear: '',
    day1InTime: '',
    day1InRemarks: '',
    day1OutTime: '',
    day1OutRemarks: '',
    day1Status: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Staff Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block font-semibold capitalize">
              {key.replace(/([A-Z])/g, ' $1').replace('day1', 'Day 1')}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="Enter"
              className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAttendance;
