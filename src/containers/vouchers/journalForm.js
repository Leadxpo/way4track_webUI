import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useNavigate } from 'react-router';

const JournalForm = ({ branches, bankOptions, clients }) => {
  const { control, handleSubmit, setValue, getValues, reset } = useForm();
  const [selectedTab, setSelectedTab] = useState('Journal');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
  const navigate = useNavigate();
  const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'Card'];
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
    Journal: [
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
      { name: 'purpose', label: 'Purpose' },
      {
        name: 'toAccount',
        label: 'Amount Giving To',
        type: 'dropdown',
        options: bankOptions,
      },
      {
        name: 'fromAccount',
        label: 'From Request To',
        type: 'dropdown',
        options: bankOptions,
      },
      { name: 'amount', label: 'Amount' },
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
        name: 'ifscCode',
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
        name: 'fromAccountank',
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

  const getRelevantFields = (mode) => {
    return paymentModeFields[mode].map((field) => field.name);
  };

  const onSubmit = async (data) => {
    try {
      const relevantFields = getRelevantFields(selectedPaymentMode);
      const filteredData = Object.keys(data)
        .filter(
          (key) =>
            relevantFields.includes(key) ||
            formFieldsByTab[selectedTab].some((field) => field.name === key)
        )
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});

      const payload = {
        ...filteredData,
        voucherType: selectedTab.toLowerCase(),
        paymentType: selectedPaymentMode.toLowerCase(),
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        branchId: parseInt(data.branchId, 10),
        // role: data.role,
        toAccount: data.toAccount,
      };
      console.log('Payload:', payload);
      const response = await ApiService.post('/voucher/saveVoucher', payload);
      navigate('/vouchers');
      console.log('Response:', response);
    } catch (error) {
      console.error('Error submitting data:', error);
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
      {formFieldsByTab[selectedTab]?.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          defaultValue={
            field.type === 'dropdown' && field.options.length === 1
              ? field.options[0].value
              : ''
          }
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

export default JournalForm;
