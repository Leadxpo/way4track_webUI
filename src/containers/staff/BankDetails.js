import React, { useState, useEffect } from 'react';

const BankDetails = ({ setBankDetails }) => {
  const [data, setData] = useState({
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    accountBranch: '',
    accountType: '',
  });

  const [errors, setErrors] = useState({});

  const validate = (fieldName, value) => {
    let error = '';

    if (value.trim() === '') {
      error = `${fieldName} is required.`;
    }

    // Account Number validation (only digits)
    if (fieldName === 'accountNumber' && value && !/^\d+$/.test(value)) {
      error = 'Account number must be numeric.';
    }

    // IFSC Code validation (format: ABCD0123456)
    if (
      fieldName === 'ifscCode' &&
      value &&
      !/[A-Z]{4}0[A-Z0-9]{6}/.test(value)
    ) {
      error = 'Please enter a valid IFSC code.';
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    // Validate the field and set the error if needed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  useEffect(() => setBankDetails(data), [data, setBankDetails]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
      <h3 className="text-3xl font-semibold mb-6 text-center">Bank Details</h3>
      <div className="space-y-6">
        {['accountNumber', 'bankName', 'ifscCode', 'accountBranch'].map(
          (field) => (
            <div key={field} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                name={field}
                value={data[field]}
                onChange={handleChange}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim()}`}
                className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none text-gray-700"
              />
              {errors[field] && (
                <span className="text-red-500 text-sm mt-2">
                  {errors[field]}
                </span>
              )}
            </div>
          )
        )}

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Account Type</label>
          <select
            name="accountType"
            value={data.accountType}
            onChange={handleChange}
            className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none text-gray-700"
          >
            <option value="">Select Account Type</option>
            {['savings', 'current'].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.accountType && (
            <span className="text-red-500 text-sm mt-2">
              {errors.accountType}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
