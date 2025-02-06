import React, { useState } from 'react';

const InHandProductsForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    staffId: '',
    date: '',
    time: '10:00',
    interval: '30 min',
    period: 'AM',
    type: '',
    quantity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  // const handleSubmit = async () => {
  //   const payload = new FormData();
  //   try {
  //     const endpoint =
  //       '/api/product-assign/handleProductDetails';
  //     const response = await ApiService.post(endpoint, payload, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });

  //     if (response.data.status) {
  //       navigate('/product_assign');
  //     } else {
  //       alert('Failed to save product details. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error saving product details:', error);
  //     alert('Failed to save product details. Please try again.');
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-6 rounded-lg space-y-6"
    >
      <h1 className="text-3xl font-bold mb-4">In Hand Products</h1>

      {/* To */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">To:</label>
        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          placeholder="Enter recipient"
        />
      </div>

      {/* Staff ID */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Staff ID:</label>
        <input
          type="text"
          name="staffId"
          value={formData.staffId}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          placeholder="Enter Staff ID"
        />
      </div>

      {/* Date and Time */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Date:</label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <select
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option>00:00</option>
            <option>01:00</option>
            <option>02:00</option>
            <option>03:00</option>
            <option>04:00</option>
            <option>05:00</option>
            <option>06:00</option>
            <option>07:00</option>
            <option>08:00</option>
            <option>09:00</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>12:00</option>
          </select>
          <select
            name="interval"
            value={formData.interval}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option>30 min</option>
            <option>1 hour</option>
          </select>
          <select
            name="period"
            value={formData.period}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>
      </div>

      {/* Type */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Type:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          placeholder="Enter type"
        />
      </div>

      {/* Quantity */}
      <div className="flex flex-col">
        <label className="font-semibold mb-2">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          placeholder="Enter quantity"
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

export default InHandProductsForm;
