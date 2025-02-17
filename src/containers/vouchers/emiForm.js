import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useNavigate } from 'react-router';

const EmiForm = ({ branches, bankOptions }) => {
  const { control, handleSubmit, setValue, getValues, reset } = useForm();
  const [selectedTab, setSelectedTab] = useState('InitialDownload');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
  const [selectedEmiTo, setSelectedEmiTo] = useState('');
  const [dynamicOptions, setDynamicOptions] = useState([]);
  const navigate = useNavigate();
  const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'Card', 'EMI'];
  const dropdownOptions = {
    role: ['Manager', 'Accountant', 'Staff'],
    receiptTo: ['Client', 'Vendor'],
    amountGoingTo: ['Account A', 'Account B', 'Account C'],
    bankFrom: ['Bank A', 'Bank B', 'Bank C'],
    bankTo: ['Bank X', 'Bank Y', 'Bank Z'],
    branches: ['001', '002'],
  };
  const formFieldsByTab = {
    InitialDownload: [
      { name: 'name', label: 'Name' },
      { name: 'purpose', label: 'Purpose' },
      { name: 'amount', label: 'Amount' },
      { name: 'initialPayment', label: 'Initial Payment' },
      {
        name: 'emiTo',
        label: 'EMI Paid To',
        type: 'dropdown',
        options: ['Client', 'Sub-Dealer', 'Vendor'],
      },
      { name: 'monthlyPayment', label: 'Monthly Payment' },
      { name: 'numberOfEmi', label: 'Number Of EMI' },
    ],
    EMIAmount: [
      { name: 'voucherId', label: 'Voucher ID' },
      { name: 'amountPaid', label: 'Amount Paid' },
      {
        name: 'emiTo',
        label: 'EMI Paid To',
        type: 'dropdown',
        options: ['Client', 'Sub-Dealer', 'Vendor'],
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
        name: 'bankAccountNumber',
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
        options: bankOptions,
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
            (formFieldsByTab[selectedTab] &&
              formFieldsByTab[selectedTab].some((field) => field.name === key))
        )
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});

      const payload = {
        ...filteredData,
        voucherType: 'emi',
        paymentType: selectedPaymentMode.toLowerCase(),
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        //branchId: data.branchId ? parseInt(data.branchId, 10) : null,
        role: data.role,
        toAccount: data.toAccount,
      };

      if (selectedEmiTo === 'Client') {
        payload.clientId = Number(data.dynamicSelection);
      } else if (selectedEmiTo === 'Vendor') {
        payload.vendorId = Number(data.dynamicSelection);
      } else if (selectedEmiTo === 'Sub-Dealer') {
        payload.subDealerId = Number(data.dynamicSelection);
      }

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

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    reset();
  };

  const handleEmiToChange = async (value) => {
    setSelectedEmiTo(value);
    setDynamicOptions([]);
    setValue('dynamicSelection', '');

    try {
      let response;
      if (value === 'Client') {
        response = await ApiService.post('/client/getClientNamesDropDown');
        setDynamicOptions(response.data || []);
      } else if (value === 'Vendor') {
        response = await ApiService.post('/vendor/getVendorNamesDropDown');
        const modifiedData = response.data.map((item) => ({
          ...item,
          vendorName: item.name,
          name: undefined,
        }));
        setDynamicOptions(modifiedData);
      } else if (value === 'Sub-Dealer') {
        response = await ApiService.post(
          '/subdealer/getSubDealerNamesDropDown'
        );
        setDynamicOptions(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded ${selectedTab === 'InitialDownload' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('InitialDownload')}
        >
          Initial Downpayment
        </button>
        <button
          className={`px-4 py-2 ml-2 rounded ${selectedTab === 'EMIAmount' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('EMIAmount')}
        >
          EMI Amount
        </button>
      </div>
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
                        onChange={(e) => {
                          controllerField.onChange(e);
                          if (field.name === 'emiTo') {
                            handleEmiToChange(e.target.value);
                          }
                        }}
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

        {selectedEmiTo && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              {selectedEmiTo} Selection
            </label>
            <Controller
              name="dynamicSelection"
              control={control}
              defaultValue=""
              render={({ field: controllerField }) => (
                <select
                  {...controllerField}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {dynamicOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name || option.vendorName}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        )}

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

        <button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmiForm;
