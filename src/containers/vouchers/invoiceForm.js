import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
const InvoiceForm = () => {
  const initialFormState = {
    title: '',
    ledgerName: '',
    clientAddress: '',
    billingAddress: '',
    estimateDate: '',
    expiryDate: '',
    total: '',
    ledgerAmount: '',
    balanceAmount: '',
    items: [
      {
        hsncode: '',
        name: '',
        quantity: '',
        rate: '',
        amount: '',
        sgst: '',
        gst: true,
        cgst: '',
        finalAmount: '',
      },
    ],
  };

  const [voucherFormData, setVoucherFormData] = useState(initialFormState);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);

  // Calculate total, SGST, and CGST
  useEffect(() => {
    const calculatedTotal = voucherFormData.items.reduce(
      (acc, item) => acc + parseFloat(item.amount || 0),
      0
    );
    setTotalAmount(calculatedTotal);
    const calculatedSgst = (calculatedTotal * 9) / 100;
    const calculatedCgst = (calculatedTotal * 9) / 100;
    setSgst(calculatedSgst);
    setCgst(calculatedCgst);
  }, [voucherFormData.items]);

  // Handle field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoucherFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle items dynamically
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...voucherFormData.items];
    updatedItems[index][name] = value;
    setVoucherFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const addNewItem = () => {
    setVoucherFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          hsncode: '',
          name: '',
          quantity: '',
          rate: '',
          amount: '',
          sgst: '',
          gst: true,
          cgst: '',
          finalAmount: '',
        },
      ],
    }));
  };

  const removeItem = () => {
    setVoucherFormData((prevData) => ({
      ...prevData,
      items: prevData.items.slice(0, -1),
    }));
  };

  const handleSave = async () => {
    try {
      console.log('Form Data:', voucherFormData);
      voucherFormData.voucherType = 'invoice';

      const response = await ApiService.post('/voucher/save', voucherFormData); // Adjust the endpoint URL as needed
      console.log('Response:', response);
      // Handle the response (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle the error (e.g., show an error message)
    }
    console.log('Saving voucher:', voucherFormData);
  };

  return (
    <div>
      <form className="space-y-6">
        {/* Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={voucherFormData.title}
              onChange={handleInputChange}
              placeholder="Invoice Title"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Ledger Name
            </label>
            <input
              type="text"
              name="ledgerName"
              value={voucherFormData.ledgerName}
              onChange={handleInputChange}
              placeholder="Ledger Name"
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
              value={voucherFormData.clientAddress}
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
              value={voucherFormData.billingAddress}
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
                value={voucherFormData.estimateDate}
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
                value={voucherFormData.expiryDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="border rounded-lg p-6 space-y-6">
          {voucherFormData.items.map((entry, index) => (
            <div key={index} className="space-y-4 border-b pb-4">
              <div>
                <label className="font-bold">HSN Code</label>
                <input
                  type="text"
                  name="hsncode"
                  value={entry.hsncode}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full bg-gray-200 h-12 rounded-md mt-2"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="font-bold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={entry.name}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full bg-gray-200 h-12 rounded-md mt-2"
                  />
                </div>
                <div>
                  <label className="font-bold">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={entry.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full bg-gray-200 h-12 rounded-md mt-2"
                  />
                </div>
                <div>
                  <label className="font-bold">Rate</label>
                  <input
                    type="text"
                    name="rate"
                    value={entry.rate}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full bg-gray-200 h-12 rounded-md mt-2"
                  />
                </div>
                <div>
                  <label className="font-bold">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    value={entry.amount}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full bg-gray-200 h-12 rounded-md mt-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="font-bold">GST</label>
                  <div className="flex mt-2">
                    <button className="w-1/2 bg-gray-300 text-black py-2 rounded-l-md">
                      TDS
                    </button>
                    <button className="w-1/2 bg-green-500 text-white py-2 rounded-r-md">
                      GST
                    </button>
                  </div>
                </div>
                <div>
                  <label className="font-bold">SGST</label>
                  <input
                    type="text"
                    name="sgst"
                    value={entry.sgst}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full bg-gray-200 h-12 rounded-md mt-2"
                  />
                </div>
                <div>
                  <label className="font-bold">CGST</label>
                  <input
                    type="text"
                    name="cgst"
                    value={entry.cgst}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full bg-gray-200 h-12 rounded-md mt-2"
                  />
                </div>
              </div>
            </div>
          ))}
          {/* Add and Remove Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={addNewItem}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              +
            </button>
            <button
              type="button"
              onClick={removeItem}
              className="bg-gray-300 text-black p-2 rounded-md"
            >
              -
            </button>
          </div>

          {/* Total Amount Display */}
          <div className="text-right font-bold text-lg mt-4">
            Total Amount: {totalAmount} /-
          </div>
        </div>

        {/* Total, Ledger Amount, and Balance */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Total</label>
            <input
              type="text"
              name="total"
              value={voucherFormData.total}
              onChange={handleInputChange}
              placeholder="Total"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Ledger Amount
            </label>
            <input
              type="text"
              name="ledgerAmount"
              value={voucherFormData.ledgerAmount}
              onChange={handleInputChange}
              placeholder="Ledger Amount"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Balance Amount
            </label>
            <input
              type="text"
              name="balanceAmount"
              value={voucherFormData.balanceAmount}
              onChange={handleInputChange}
              placeholder="Balance Amount"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="py-2 px-4 text-white bg-blue-500 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;