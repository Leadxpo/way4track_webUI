import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const AddEditAppointmentForm = () => {
  const location = useLocation();
  const appointmentDetails = location.state?.appointmentDetails || null;

  const [formData, setFormData] = useState({
    type: appointmentDetails?.type || '',
    name: appointmentDetails?.name || '',
    assignTo: appointmentDetails?.assignTo || '',
    date: appointmentDetails?.date || '',
    slot: appointmentDetails?.slot || '00:00',
    interval: appointmentDetails?.interval || '30 min',
    period: appointmentDetails?.period || 'AM',
    branch: appointmentDetails?.branch || '',
    clientName: appointmentDetails?.clientName || '',
    clientPhone: appointmentDetails?.clientPhone || '',
    address: appointmentDetails?.address || '',
    description: appointmentDetails?.description || '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appointmentDetails) {
      console.log('Editing appointment:', formData);
    } else {
      console.log('Creating new appointment:', formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-6 rounded-lg space-y-6"
    >
      <h1 className="text-3xl font-bold mb-4">
        {appointmentDetails ? 'Edit Appointment' : 'Create Appointment'}
      </h1>

      {/* Type */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Select Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="Service">Service</option>
          <option value="Product">Product</option>
        </select>
      </div>

      {/* Name */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Enter Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          placeholder="Enter Name"
        />
      </div>

      {/* Assign To */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Assign To:</label>
        <select
          name="assignTo"
          value={formData.assignTo}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="Employee 1">Employee 1</option>
          <option value="Employee 2">Employee 2</option>
        </select>
      </div>

      {/* Slot */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Slot:</label>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          />
          <select
            name="slot"
            value={formData.slot}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option>00:00</option>
            <option>01:00</option>
            <option>02:00</option>
            {/* Add other options */}
          </select>
          <select
            name="interval"
            value={formData.interval}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option>30 min</option>
            <option>1 hour</option>
          </select>
          <select
            name="period"
            value={formData.period}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>
      </div>

      {/* Branch */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Branch:</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          placeholder="Enter Branch"
        />
      </div>

      {/* Client Details */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Client Name:</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          placeholder="Enter Client Name"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Client Phone Number:</label>
        <input
          type="text"
          name="clientPhone"
          value={formData.clientPhone}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          placeholder="Enter Client Phone Number"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter Address"
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Description"
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Submit
      </button>
    </form>
  );
};

export default AddEditAppointmentForm;
