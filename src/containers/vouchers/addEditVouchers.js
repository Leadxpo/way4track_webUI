import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
const TABS = ['Receipt', 'Payment', 'Journal', 'Contra', 'Purchase', 'Invoice'];
const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'Card'];

const AddEditVouchers = () => {
  const dropdownOptions = {
    role: ['Manager', 'Accountant', 'Staff'],
    receiptTo: ['Client', 'Vendor'],
    amountGoingTo: ['Account A', 'Account B', 'Account C'],
    bankFrom: ['Bank A', 'Bank B', 'Bank C'],
    bankTo: ['Bank X', 'Bank Y', 'Bank Z'],
    branches: ['Vishakapatnam', 'Hyderabad'],
  };

  const formFieldsByTab = {
    Receipt: [
      { name: 'title', label: 'Title' },
      {
        name: 'branchName',
        label: 'Branch Name',
        type: 'dropdown',
        options: dropdownOptions.branches,
      },
      {
        name: 'role',
        label: 'Role',
        type: 'dropdown',
        options: dropdownOptions.role,
      },
      {
        name: 'receipt',
        label: 'Receipt To',
        type: 'dropdown',
        options: dropdownOptions.receiptTo,
      },
      { name: 'purpose', label: 'Purpose' },
      { name: 'creditAmount', label: 'Credit Amount' },
    ],
    Payment: [
      { name: 'title', label: 'Title' },
      {
        name: 'clientName',
        label: 'Client Name',
        type: 'dropdown',
        options: dropdownOptions.receiptTo,
      },
      {
        name: 'role',
        label: 'Role',
        type: 'dropdown',
        options: dropdownOptions.role,
      },
      {
        name: 'branchName',
        label: 'Branch Name',
        type: 'dropdown',
        options: dropdownOptions.branches,
      },
      { name: 'purpose', label: 'Purpose' },
      { name: 'debitAmount', label: 'Debit Amount' },
      { name: 'paymentTo', label: 'Payment To' },
      { name: 'amountPaid', label: 'Amount Paid' },
    ],
    Journal: [
      { name: 'title', label: 'Title' },
      {
        name: 'branchName',
        label: 'Branch Name',
        type: 'dropdown',
        options: dropdownOptions.branches,
      },
      { name: 'purpose', label: 'Purpose' },
      {
        name: 'amountTo',
        label: 'Amount Giving To',
        type: 'dropdown',
        options: dropdownOptions.amountGoingTo,
      },
      {
        name: 'requestFrom',
        label: 'From Request To',
        type: 'dropdown',
        options: dropdownOptions.amountGoingTo,
      },
      { name: 'amount', label: 'Amount' },
    ],
    Contra: [
      { name: 'title', label: 'Title' },
      { name: 'purpose', label: 'Purpose' },
      { name: 'amountTo', label: 'Amount Going To' },
      {
        name: 'transformBy',
        label: 'Transform By',
        type: 'dropdown',
        options: dropdownOptions.bankFrom,
      },
      {
        name: 'bankFrom',
        label: 'Bank From',
        type: 'dropdown',
        options: dropdownOptions.bankFrom,
      },
      {
        name: 'bankTo',
        label: 'Bank To',
        type: 'dropdown',
        options: dropdownOptions.bankTo,
      },
    ],
    Purchase: [
      { name: 'title', label: 'Title' },
      { name: 'purpose', label: 'Purpose' },
      { name: 'transformBy', label: 'Transform By' },
      {
        name: 'bankFrom',
        label: 'Bank From',
        type: 'dropdown',
        options: dropdownOptions.bankFrom,
      },
      {
        name: 'bankTo',
        label: 'Bank To',
        type: 'dropdown',
        options: dropdownOptions.bankTo,
      },
    ],
  };

  const paymentModeFields = {
    Cash: [
      { name: 'cashAmount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
    UPI: [
      { name: 'upiId', label: 'UPI ID' },
      {
        name: 'bank',
        label: 'Bank',
        type: 'dropdown',
        options: dropdownOptions.bankFrom,
      },
      { name: 'cashAmount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
    Bank: [
      {
        name: 'bankName',
        label: 'Bank Name',
      },
      {
        name: 'branch',
        label: 'Branch Name',
      },
      {
        name: 'ifsc',
        label: 'IFSC',
      },
      {
        name: 'accountNumber',
        label: 'Account Number',
      },
      { name: 'cashAmount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
    Cheque: [
      { name: 'chequeNumber', label: 'Check Number' },
      {
        name: 'bank',
        label: 'Bank',
        type: 'dropdown',
        options: dropdownOptions.bankFrom,
      },
      { name: 'cashAmount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
    Card: [
      { name: 'cardNumber', label: 'Card Number' },
      {
        name: 'bank',
        label: 'Bank',
        type: 'dropdown',
        options: dropdownOptions.bankFrom,
      },
      { name: 'cashAmount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
  };
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Receipt');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
  const [formData, setFormData] = useState({});

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

  // Populate form state for edit mode
  const [voucherFormData, setVoucherFormData] = useState(
    //isEditMode ? location.state.invoiceDetails : initialFormState
    initialFormState
  );
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
      items: prevData.items.slice(0, -1), // Remove the last item
    }));
  };

  const handleSave = () => {
    console.log('Saving estimate:', formData);
    navigate('/invoice');
  };

  //for purchase items
  const [rows, setRows] = useState([
    { id: 1, name: '', quantity: '', amount: 0 },
  ]);

  // Add a new row
  const addRow = () => {
    setRows([
      ...rows,
      { id: rows.length + 1, name: '', quantity: '', amount: 0 },
    ]);
  };

  // Remove the last row (ensure at least one row remains)
  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  // Handle input changes for Name, Quantity, and Amount
  const handlePurchaseItemsInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          [field]: field === 'amount' ? parseFloat(value) || 0 : value,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const calculateTotalAmount = () => {
    return rows.reduce((acc, row) => acc + (row.amount || 0), 0);
  };
  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${selectedTab === tab ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Form Fields */}
      {selectedTab !== 'Invoice' ? (
        <div className="mb-6">
          {formFieldsByTab[selectedTab]?.map((field) => (
            <div key={field.name} className="mb-2">
              <label className="block font-semibold">{field.label}</label>
              {field.type === 'dropdown' ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              )}
            </div>
          ))}
          {selectedTab === 'Purchase' && (
            <div className="pt-2">
              {/* Dynamic Input Rows */}
              <div className="space-y-4 border rounded-md p-4 bg-gray-50">
                {rows.map((row) => (
                  <div key={row.id} className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={row.name}
                      onChange={(e) =>
                        handlePurchaseItemsInputChange(
                          row.id,
                          'name',
                          e.target.value
                        )
                      }
                      className="p-2 border rounded-md w-1/3"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={row.quantity}
                      onChange={(e) =>
                        handlePurchaseItemsInputChange(
                          row.id,
                          'quantity',
                          e.target.value
                        )
                      }
                      className="p-2 border rounded-md w-1/3"
                    />
                    <input
                      type="text"
                      placeholder="Amount"
                      value={row.amount}
                      onChange={(e) =>
                        handlePurchaseItemsInputChange(
                          row.id,
                          'amount',
                          e.target.value
                        )
                      }
                      className="p-2 border rounded-md w-1/3"
                    />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 py-2">
                <button
                  onClick={addRow}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  +
                </button>
                <button
                  onClick={removeRow}
                  className={`bg-gray-300 text-white py-2 px-4 rounded-md ${rows.length === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
                  disabled={rows.length === 1}
                >
                  -
                </button>
              </div>

              {/* Total Amount */}
              <div className="text-right font-bold text-lg mt-4">
                Total Amount: {calculateTotalAmount().toLocaleString('en-IN')}{' '}
                /-
              </div>
            </div>
          )}
        </div>
      ) : (
        <form className="space-y-6">
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input
                type="text"
                name="client"
                value={voucherFormData.title}
                onChange={handleInputChange}
                placeholder="Client Name"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Ledger Name
              </label>
              <input
                type="text"
                name="clientNumber"
                value={voucherFormData.ledgerName}
                onChange={handleInputChange}
                placeholder="Client Number"
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
          <div className="border rounded-lg p-6 space-y-6">
            {/* Map through dynamic form entries */}
            {voucherFormData.items.map((entry, index) => (
              <div key={index} className="space-y-4 border-b pb-4">
                <div>
                  <label className="font-bold">HSN Code</label>
                  <input
                    type="text"
                    className="w-full bg-gray-200 h-12 rounded-md mt-2"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="font-bold">Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-200 h-12 rounded-md mt-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold">Quotiety</label>
                    <input
                      type="text"
                      className="w-full bg-gray-200 h-12 rounded-md mt-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold">Rate</label>
                    <input
                      type="text"
                      className="w-full bg-gray-200 h-12 rounded-md mt-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold">Amount</label>
                    <input
                      type="text"
                      className="w-full bg-gray-200 h-12 rounded-md mt-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="font-bold">GST / TDS</label>
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
                      className="w-full bg-gray-200 h-12 rounded-md mt-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold">CGST</label>
                    <input
                      type="text"
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
              Total Amount: 334000/-
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Total</label>
            <input
              type="text"
              name="clientNumber"
              value={voucherFormData.total}
              onChange={handleInputChange}
              placeholder="Client Number"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Ledger Amount
            </label>
            <input
              type="text"
              name="clientNumber"
              value={voucherFormData.ledgerAmount}
              onChange={handleInputChange}
              placeholder="Client Number"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Balance Amount
            </label>
            <input
              type="text"
              name="clientNumber"
              value={voucherFormData.balanceAmount}
              onChange={handleInputChange}
              placeholder="Client Number"
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
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Payment Mode Section */}
      {selectedTab !== 'Invoice' && (
        <h3 className="font-bold mb-2">Payment Mode</h3>
      )}
      <div className="flex space-x-2 mb-4">
        {selectedTab !== 'Invoice' &&
          PAYMENT_MODES.map((mode) => (
            <button
              key={mode}
              className={`px-4 py-2 rounded ${selectedPaymentMode === mode ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedPaymentMode(mode)}
            >
              {mode}
            </button>
          ))}
      </div>

      {/* Dynamic Payment Mode Fields */}
      <div>
        {selectedTab !== 'Invoice' &&
          paymentModeFields[selectedPaymentMode]?.map((field) => (
            <div key={field.name} className="mb-2">
              <label className="block font-semibold">{field.label}</label>
              {field.type === 'dropdown' ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddEditVouchers;
