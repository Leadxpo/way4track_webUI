import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ApiService from '../../services/ApiService';

const PurchaseForm = ({ branches }) => {
  const { control, handleSubmit } = useForm();
  const [selectedTab, setSelectedTab] = useState('Purchase');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');

  const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'Card'];
  const dropdownOptions = {
    role: ['Manager', 'Accountant', 'Staff'],
    receiptTo: ['Client', 'Vendor'],
    amountGoingTo: ['Account A', 'Account B', 'Account C'],
    bankFrom: ['Bank A', 'Bank B', 'Bank C'],
    bankTo: ['Bank X', 'Bank Y', 'Bank Z'],
    branches: ['001', '002'],
  };
  const formFieldsByTab = {
    Purchase: [
      { name: 'name', label: 'Title' },
      { name: 'purpose', label: 'Purpose' },
      {
        name: 'transformBy',
        label: 'Transform By',
        type: 'dropdown',
        options: dropdownOptions.bankFrom,
      },
      {
        name: 'goingTo',
        label: 'Amount Going To',
        type: 'dropdown',
        options: dropdownOptions.bankFrom,
      },
    ],
  };

  const paymentModeFields = {
    Cash: [
      { name: 'amount', label: 'Amount' },
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
      { name: 'amount', label: 'Amount' },
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
        name: 'ifscCode',
        label: 'IFSC',
      },
      {
        name: 'accountNumber',
        label: 'Account Number',
      },
      { name: 'amount', label: 'Amount' },
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
      { name: 'amount', label: 'Amount' },
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
      { name: 'amount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
  };
  const onSubmit = async (data) => {
    try {
      console.log('Form Data:', data);
      data.voucherType = selectedTab.toLowerCase();
      data.paymentType = selectedPaymentMode.toLowerCase();
      //data.amount=calculateTotalAmount();
      //data.quantity=calculateTotalQuantity();
      const response = await ApiService.post('/voucher/save', data); // Adjust the endpoint URL as needed
      console.log('Response:', response);
      // Handle the response (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle the error (e.g., show an error message)
    }
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

  const getTotalQuantity = () => {
    return rows.reduce((total, item) => {
      // Convert quantity to number and add to the total
      const quantity = parseFloat(item.quantity) || 0;
      return total + quantity;
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Render form fields for the selected tab */}
      {formFieldsByTab[selectedTab]?.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field: controllerField }) => {
            switch (field.type) {
              case 'dropdown':
                return (
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      {field.label}
                    </label>
                    <select
                      {...controllerField}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              default:
                return (
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      {field.label}
                    </label>
                    <input
                      {...controllerField}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                );
            }
          }}
        />
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
            Total Amount: {calculateTotalAmount().toLocaleString('en-IN')} /-
          </div>
        </div>
      )}

      {/* Payment Mode Section */}
      <h3 className="font-bold mb-2">Payment Mode</h3>
      <div className="flex space-x-2 mb-4">
        {PAYMENT_MODES.map((mode) => (
          <button
            key={mode}
            className={`px-4 py-2 rounded ${selectedPaymentMode === mode ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedPaymentMode(mode)}
            type="button"
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Dynamic Payment Mode Fields */}
      <div>
        {paymentModeFields[selectedPaymentMode]?.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block font-semibold mb-2">{field.label}</label>
            {field.type === 'dropdown' ? (
              <Controller
                name={field.name}
                control={control}
                defaultValue=""
                render={({ field: controllerField }) => (
                  <select
                    {...controllerField}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
            ) : (
              <Controller
                name={field.name}
                control={control}
                defaultValue=""
                render={({ field: controllerField }) => (
                  <input
                    {...controllerField}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        variant="contained"
        color="primary"
        className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default PurchaseForm;
