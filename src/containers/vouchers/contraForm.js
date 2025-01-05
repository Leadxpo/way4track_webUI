import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ApiService from '../../services/ApiService';

const ContraForm = ({ branches }) => {
  const { control, handleSubmit } = useForm();
  const [selectedTab, setSelectedTab] = useState('Contra');
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
    Contra: [
      { name: 'name', label: 'Title' },
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
        name: 'ifsc',
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
      const response = await ApiService.post('/voucher/save', data); // Adjust the endpoint URL as needed
      console.log('Response:', response);
      // Handle the response (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle the error (e.g., show an error message)
    }
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

export default ContraForm;
