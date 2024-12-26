import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddEditInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if editing or creating
  const isEditMode = location.state?.invoiceDetails ? true : false;

  // Initial state for form
  const initialFormState = {
    client: '',
    clientNumber: '',
    email: '',
    clientAddress: '',
    billingAddress: '',
    estimateDate: '',
    expiryDate: '',
    items: [{ product: '', description: '', amount: '' }],
    terms: '',
  };

  // Populate form state for edit mode
  const [formData, setFormData] = useState(
    //isEditMode ? location.state.invoiceDetails : initialFormState
    initialFormState
  );

  const [totalAmount, setTotalAmount] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);

  // Calculate total, SGST, and CGST
  useEffect(() => {
    const calculatedTotal = formData.items.reduce(
      (acc, item) => acc + parseFloat(item.amount || 0),
      0
    );
    setTotalAmount(calculatedTotal);
    const calculatedSgst = (calculatedTotal * 9) / 100;
    const calculatedCgst = (calculatedTotal * 9) / 100;
    setSgst(calculatedSgst);
    setCgst(calculatedCgst);
  }, [formData.items]);

  // Handle field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle items dynamically
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const addNewItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { product: '', description: '', amount: '' }],
    }));
  };

  const handleSave = () => {
    console.log('Saving estimate:', formData);
    navigate('/invoice');
  };

  const handleSaveAndSend = () => {
    console.log('Saving and sending estimate:', formData);
    navigate('/invoice');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl w-11/12 max-w-4xl p-8 shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? 'Edit Invoice' : 'Create Invoice'}
        </h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Client</label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                placeholder="Client Name"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Client Number
              </label>
              <input
                type="text"
                name="clientNumber"
                value={formData.clientNumber}
                onChange={handleInputChange}
                placeholder="Client Number"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Client Address
              </label>
              <textarea
                name="clientAddress"
                value={formData.clientAddress}
                onChange={handleInputChange}
                placeholder="Client Address"
                className="w-full h-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Billing Address
              </label>
              <textarea
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                placeholder="Billing Address"
                className="w-full h-full p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between ">
              <div className="mb-auto">
                <label className="block text-sm font-semibold mb-1">
                  Created Date
                </label>
                <input
                  type="date"
                  name="estimateDate"
                  value={formData.estimateDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-auto">
                <label className="block text-sm font-semibold mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <label className="block text-sm font-semibold mb-1">Items</label>
            <div className="border border-gray-300 rounded-md">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-2 bg-gray-100 p-2">
                <span className="col-span-1 font-semibold">#</span>
                <span className="col-span-4 font-semibold">
                  Service/Product
                </span>
                <span className="col-span-5 font-semibold">Description</span>
                <span className="col-span-2 font-semibold">Amount</span>
              </div>

              {/* Items Rows */}
              {formData.items &&
                formData.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-2 items-center p-2 border-t"
                  >
                    <span className="col-span-1">{index + 1}</span>
                    <input
                      type="text"
                      name="product"
                      value={item.product}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder="Service/Product"
                      className="col-span-4 p-2 border rounded-md"
                    />
                    <input
                      type="text"
                      name="description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder="Description"
                      className="col-span-5 p-2 border rounded-md"
                    />
                    <input
                      type="number"
                      name="amount"
                      value={item.amount}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder="Amount"
                      className="col-span-2 p-2 border rounded-md"
                    />
                  </div>
                ))}
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  onClick={addNewItem}
                  className="text-blue-500 text-sm font-semibold mt-2 ml-2"
                >
                  + Add Item
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-4">
            <table className="w-full text-right">
              {/* Total */}
              <tr className="border-b">
                <td className="text-right py-2">Total</td>
                <td className="pr-4">₹{totalAmount.toFixed(2)}</td>
              </tr>

              {/* SGST Tax */}
              <tr className="border-b">
                <td className="text-right py-2">SGST Tax (9%)</td>
                <td>
                  <input
                    type="text"
                    value={`₹${sgst.toFixed(2)}`}
                    readOnly
                    className="bg-blue-50 text-right border rounded-md px-2 w-24"
                  />
                </td>
              </tr>

              {/* CGST Tax */}
              <tr className="border-b">
                <td className="text-right py-2">CGST Tax (9%)</td>
                <td>
                  <input
                    type="text"
                    value={`₹${cgst.toFixed(2)}`}
                    readOnly
                    className="bg-blue-50 text-right border rounded-md px-2 w-24"
                  />
                </td>
              </tr>

              {/* Final Total */}
              <tr className="border-b">
                <td className="text-right py-2 font-semibold">Final Total</td>
                <td className="pr-4 font-semibold">
                  ₹{(totalAmount + sgst + cgst).toFixed(2)}
                </td>
              </tr>
            </table>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Other Information / Terms & Conditions
            </label>
            <textarea
              name="terms"
              value={formData.terms}
              onChange={handleInputChange}
              placeholder="Add Terms and Conditions"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleSave}
              className="py-2 px-4 text-white bg-blue-500 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleSaveAndSend}
              className="py-2 px-4 text-white bg-green-500 rounded-md"
            >
              Save & Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditInvoice;
