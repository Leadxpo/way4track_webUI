import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ApiService, { initialAuthState } from '../../services/ApiService';

const ReceiptForm = ({ branches, bankOptions }) => {
  const { control, handleSubmit, setValue, getValues, reset } = useForm();
  const [selectedTab, setSelectedTab] = useState('Receipt');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
  const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'Card', 'EMI'];
  const productTypes = [
    { value: "service", label: "Service" },
    { value: "product", label: "Product" },
    { value: "sales", label: "Sales" },
    { value: "expanses", label: "Expanses" },
    { value: "salaries", label: "Salaries" },
  ];

  const dropdownOptions = {
    // role: ['Manager', 'Accountant', 'Staff'],
    receiptTo: ['Client', 'Vendor'],
    amountGoingTo: ['Account A', 'Account B', 'Account C'],
    bankFrom: ['Bank A', 'Bank B', 'Bank C'],
    bankTo: ['Bank X', 'Bank Y', 'Bank Z'],
    branches: ['001', '002'],
  };
  const formFieldsByTab = {
    Receipt: [
      { name: 'invoiceId', label: 'Invoice ID' },
      { name: 'name', label: 'Title' },
      {
        name: 'branchId',
        label: 'Branch Name',
        type: 'dropdown',
        options: branches.map((branch) => ({
          value: branch.id,
          label: branch.branchName,
        })),
      },
      // {
      //   name: 'role',
      //   label: 'Role',
      //   type: 'dropdown',
      //   options: dropdownOptions.role,
      // },
      {
        name: 'receipt',
        label: 'Receipt To',
        type: 'dropdown',
        options: dropdownOptions.receiptTo,
      },
      { name: 'purpose', label: 'Purpose' },
      { name: 'creditAmount', label: 'Credit Amount' },
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
        name: 'fromAccount',
        label: 'Bank',
        type: 'dropdown',
        options: bankOptions,
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
        name: 'fromAccount',
        label: 'Bank',
        type: 'dropdown',
        options: bankOptions,
      },
      { name: 'amount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
    Cheque: [
      { name: 'chequeNumber', label: 'Check Number' },
      {
        name: 'fromAccount',
        label: 'Bank',
        type: 'dropdown',
        options: bankOptions,
      },
      { name: 'amount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
    Card: [
      { name: 'cardNumber', label: 'Card Number' },
      {
        name: 'fromAccount',
        label: 'Bank',
        type: 'dropdown',
        options: bankOptions,
      },
      { name: 'amount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
    EMI: [
      { name: 'amount', label: 'Amount' },
      { name: 'remainingAmount', label: 'Remaining Amount' },
    ],
  };
  const onSubmit = async (data) => {
    try {
      console.log('Form Data:', data);
      data.voucherType = selectedTab.toLowerCase();
      data.paymentType = selectedPaymentMode.toLowerCase();
      data.companyCode = initialAuthState.companyCode;
      data.unitCode = initialAuthState.unitCode;
      const response = await ApiService.post('/voucher/saveVoucher', data); // Adjust the endpoint URL as needed
      console.log('Response:', response);
      // Handle the response (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle the error (e.g., show an error message)
    }
  };
  const handlePaymentModeChange = (mode) => {
    const currentValues = getValues();
    setSelectedPaymentMode(mode);
    reset({
      ...currentValues,
      ...paymentModeFields[mode].reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
      }, {}),
    });
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
                      {field.options.map((option) => {
                        // Handle both string arrays and object arrays
                        if (typeof option === 'string') {
                          return (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          );
                        } else {
                          return (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          );
                        }
                      })}
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
            onClick={() => handlePaymentModeChange(mode)}
            type="button"
          >
            {mode}
          </button>
        ))}
      </div>

      <div>
        {paymentModeFields[selectedPaymentMode]?.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block font-semibold mb-2">{field.label}</label>
            {field.type === 'dropdown' ? (
              <Controller
                name={field.name}
                control={control}
                defaultValue={
                  field.options.length === 1 ? field.options[0].value : ''
                }
                render={({ field: controllerField }) => (
                  <select
                    {...controllerField}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
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
      {/* <h3 className="font-bold mb-2">Product Type</h3> */}
      {/* Product Type Section */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Product Type</label>
        <Controller
          name="productType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="">Select product type</option>
              {productTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          )}
        />
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

export default ReceiptForm;
