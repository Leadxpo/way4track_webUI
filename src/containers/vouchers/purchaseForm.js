import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useNavigate } from 'react-router';

const PurchaseForm = ({ branches, bankOptions, staff }) => {
  const { control, handleSubmit, setValue, getValues, reset } = useForm();
  const [selectedTab, setSelectedTab] = useState('Purchase');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'Card', 'EMI'];
  const productTypes = [
    { value: 'service', label: 'Service' },
    { value: 'product', label: 'Product' },
    { value: 'sales', label: 'Sales' },
    { value: 'expanses', label: 'Expanses' },
    { value: 'salaries', label: 'Salaries' },
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
    Purchase: [
      { name: 'name', label: 'Title' },
      { name: 'purpose', label: 'Purpose' },
      {
        name: 'staffId',
        label: 'Transform By',
        type: 'dropdown',
        options: staff,
      },
      {
        name: 'fromAccount',
        label: 'Amount Going To',
        type: 'dropdown',
        options: bankOptions,
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

  const getRelevantFields = (mode) => {
    return paymentModeFields[mode].map((field) => field.name);
  };

  const fetchProducts = async () => {
    try {
      const res = await ApiService.post('/products/getAllproductDetails');
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setProducts([]);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
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
        toAccount: data.toAccount,
        amount: calculateTotalAmount(),
        quantity: getTotalQuantity(),
        productDetails: rows.map(row => ({
          productId: row.productId,
          productName: row.productName,
          quantity: row.quantity,
          amount: row.amount,
          price: row.price,
        })),
      };

      // const payload = {
      //   ...filteredData,
      //   voucherType: selectedTab.toLowerCase(),
      //   paymentType: selectedPaymentMode.toLowerCase(),
      //   companyCode: initialAuthState.companyCode,
      //   unitCode: initialAuthState.unitCode,
      //   branchId: parseInt(data.branchId, 10),
      //   // role: data.role,
      //   toAccount: data.toAccount,
      //   amount: calculateTotalAmount(),
      //   quantity: getTotalQuantity(),
      // };
      console.log('Payload:', payload);
      const response = await ApiService.post('/voucher/saveVoucher', payload);
      navigate('/vouchers');
      console.log('Response:', response);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const [rows, setRows] = useState([
    {
      id: 1,
      productId: '',
      productName: '',
      quantity: '',
      amount: 0,
      totalCost: 0,
    },
  ]);

  const handleProductItemChange = async (id, e) => {
    const { value } = e.target;
    console.log(value);
    const selectedProduct = products.find(
      (product) => product.id === Number(value)
    );

    if (!selectedProduct) return;

    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          productId: selectedProduct.id,
          productName: selectedProduct.productName,
          quantity: 1, // Default 1
          amount: selectedProduct.price || 0, // Get totalCost from backend
          price: selectedProduct.price || 0, // Set amount as totalCost initially
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const getTotalQuantity = () => {
    return rows.reduce((total, item) => {
      // Convert quantity to number and add to the total
      const quantity = parseFloat(item.quantity) || 0;
      return total + quantity;
    }, 0);
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

  const handlePurchaseItemsInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        let updatedValue =
          field === 'quantity'
            ? parseFloat(value) || 0
            : parseFloat(value) || 0;
        let newAmount =
          field === 'quantity' ? updatedValue * (row.price || 0) : row.amount;

        return {
          ...row,
          [field]: updatedValue,
          amount: newAmount, // Ensure amount updates based on quantity change
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    return rows.reduce((acc, row) => acc + parseFloat(row.amount || 0), 0);
  };

  // Add a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        productId: '',
        productName: '',
        quantity: '',
        amount: 0,
        totalCost: 0,
      },
    ]);
  };

  // Remove the last row (ensure at least one row remains)
  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  return (
    <div>
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
        {selectedTab === 'Purchase' && (
          <div className="pt-2">
            {/* Dynamic Input Rows */}
            <div className="space-y-4 border rounded-md p-4 bg-gray-50">
              {rows.map((row) => (
                <div key={row.id} className="flex items-center space-x-4">
                  <select
                    name="productId"
                    value={row.productId}
                    onChange={(e) => handleProductItemChange(row.id, e)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.productName}
                      </option>
                    ))}
                  </select>

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
                    placeholder="Rate"
                    value={row.price}
                    onChange={(e) =>
                      handlePurchaseItemsInputChange(
                        row.id,
                        'amount',
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
                type="button"
                onClick={addRow}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                +
              </button>
              <button
                type="button"
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
          <label className="block font-semibold mb-2">
            Select Product Type
          </label>
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
    </div>
  );
};

export default PurchaseForm;
