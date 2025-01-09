import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generatePDF from '../../common/commonUtils';

const AddEditEstimate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if editing or creating
  const isEditMode = location.state?.estimateDetails ? true : false;

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
    isEditMode ? location.state.estimateDetails : initialFormState
  );

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

    navigate('/estimate');
  };

  const handleSaveAndSend = () => {
    console.log('Saving and sending estimate:', formData);
    generatePDF({
      quotationNumber: 'EST-000641',
      invoiceDate: '15/11/2024',
      placeOfSupply: 'Andhra Pradesh (37)',
      billTo: {
        name: 'VENKATA SAI KRISHNA STONE CRUSHER',
        gstin: '37AAGFV7908J1ZM',
      },
      items: [
        {
          description: 'Bs Techotronics AIS40 DEVICE',
          hsn: '85299090',
          qty: 8,
          rate: 6500,
          cgstRate: 9,
          cgstAmt: 3966.1,
          sgstRate: 9,
          sgstAmt: 3966.1,
          amount: 52000,
        },
      ],
      totalTaxableAmount: 44067.8,
      cgstRate: 9,
      cgstAmount: 3966.1,
      sgstRate: 9,
      sgstAmount: 3966.1,
      totalAmount: 52000,
      notes: 'Looking forward for your business.',
      bankDetails: {
        name: 'Sharon Telematics Pvt Ltd.',
        accountNumber: '131905001314',
        bankName: 'ICICI Bank',
        branchName: 'BUTCHIRAJU PALAM',
        ifsc: 'ICIC0001319',
      },
      signatureName: 'Suneel G',
    });
    navigate('/estimate');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl w-11/12 max-w-4xl p-8 shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? 'Edit Estimate' : 'Create Estimate'}
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
                  Estimate Date
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
                  Expiry Date
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

          {/* Dates */}

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

          {/* Terms & Conditions */}
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

          {/* Buttons */}
          <div className="flex space-x-4 justify-center">
            <button
              type="button"
              onClick={handleSaveAndSend}
              className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600"
            >
              Save & Send
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditEstimate;
