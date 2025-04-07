import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

const PurchaseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const taxData = [
    { name: 'CGST', percent: '9%', amount: '10,5000' },
    { name: 'SGST', percent: '9%', amount: '10,5000' },
    { name: 'IGST', percent: '9%', amount: '10,5000' },
    { name: 'TDS', percent: '18%', amount: '10,5000' },
    { name: 'TCS', percent: '2%', amount: '10,5000' },
  ];

  const branchData = [
    'Purchase',
    'Payments',
    'Sale',
    'Receipts',
    'Journals',
    'Contra',
    'DebitNote',
    'CreditNote',
  ];

  const [invoices, setInvoices] = useState([
    { id: '73HFUEY63', amount: 100000 },
    { id: '73HFUEY63', amount: 30000 },
    { id: '73HFUEY63', amount: 20000 },
  ]);

  const [entries, setEntries] = useState([
    { invoice: '', amount: '', paid: '', remaining: '' },
  ]);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [bank, setBank] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [partyName, setPartyName] = useState('');
  const [purchaseLedger, setPurchaseLedger] = useState('');
  const [supplierInvoice, setSupplierInvoice] = useState('');
  const [supplierLocation, setSupplierLocation] = useState('');
  const [purchaseGST, setPurchaseGST] = useState('');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedTaxType, setSelectedTaxType] = useState('CGST');

  const filteredTaxData = taxData.filter((tax) => {
    if (selectedTaxType === 'CGST') {
      return tax.name === 'CGST' || tax.name === 'SGST';
    } else if (selectedTaxType === 'IGST') {
      return tax.name === 'IGST';
    } else if (selectedTaxType === 'TDS') {
      return tax.name === 'TDS' || tax.name === 'TCS';
    }
    return true;
  });

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const balanceAmount = 20000;

  const handleBranchClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      { invoice: '', amount: '', paid: '', remaining: '' },
    ]);
  };

  const handleRemoveEntry = (indexToRemove) => {
    setEntries((prevEntries) =>
      prevEntries.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const handleItemClick = (item) => {
    navigate(`/forms/${item}`);
    // navigate('/receipt-form')
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      date,
      day,
      bank,
      partyName: 'Customer',
      invoices,
      entries,
      amount,
      balanceAmount,
      description,
      paymentMode,
    };

    console.log('Form Data to Submit:', formData);

    // Here you can POST the data to an API:
    // fetch('/api/submit-purchase', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch(err => console.error(err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      style={{ paddingLeft: '50px', paddingRight: '50px' }}
    >
      <div
        style={{
          height: '60px',
          backgroundColor: '#12A651',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={() => handleBranchClick()}
      >
        <h2
          className="text-xl font-bold bg-green-600 text-white py-2 px-4 rounded-t"
          style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '600' }}
        >
          Purchase
        </h2>
      </div>

      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '50%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* <h2>{selectedBranch} - Details</h2> */}
            <ul>
              {branchData.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(item)}
                  style={{
                    marginBottom: '15px',
                    marginLeft: '20px',
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={handleClosePopup}
              style={{
                backgroundColor: '#12A651',
                color: '#FFFFFF',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
                marginLeft: '20px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {/* <label className="block">Date:</label> */}
        <input
          type="date"
          placeholder="Date:"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            height: '45px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '20px',
            fontWeight: '500',
          }}
        />

        {/* <label className="block">Day:</label> */}
        <input
          type="text"
          placeholder="Day:"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            height: '45px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '20px',
            fontWeight: '500',
          }}
        />

        <input
          type="text"
          placeholder="Party Name:"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            height: '45px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '20px',
            fontWeight: '500',
          }}
        />

        <input
          type="text"
          placeholder="Purchase Ledger:"
          value={partyName}
          onChange={(e) => setDay(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            height: '45px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '20px',
            fontWeight: '500',
          }}
        />

        <input
          type="text"
          placeholder="Supplier Invoice Number:"
          value={partyName}
          onChange={(e) => setDay(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            height: '45px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '20px',
            fontWeight: '500',
          }}
        />

        <input
          type="text"
          placeholder="Supplier Location:"
          value={partyName}
          onChange={(e) => setDay(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            height: '45px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '20px',
            fontWeight: '500',
          }}
        />

        <input
          type="text"
          placeholder="Purchase GST:"
          value={partyName}
          onChange={(e) => setDay(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            height: '45px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '20px',
            fontWeight: '500',
          }}
        />
      </div>

      {/* Entries */}
      <div
        className="mt-4"
        style={{
          backgroundColor: '#FFFFFF',
          padding: '20px',
          borderColor: '#A2A2A2',
          borderRadius: '8px',
          borderWidth: '2px',
        }}
      >
        <button
          className="bg-green-600 text-white font-bold w-[30px] h-[30px]"
          style={{ borderRadius: '8px', marginBottom: '10px' }}
          onClick={handleAddEntry}
        >
          +
        </button>

        {entries.map((entry, index) => (
          <div
            key={index}
            className="flex items-center mb-2"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Input Fields */}
            <div
              className="flex flex-1 gap-2"
              style={{
                backgroundColor: '#D9D9D9',
                padding: '20px',
                borderRadius: '6px',
              }}
            >
              <input
                placeholder="Invoice #"
                value={entry.invoice}
                onChange={(e) =>
                  handleEntryChange(index, 'invoice', e.target.value)
                }
                className="w-1/4 border rounded p-2"
              />
              <input
                placeholder="Amount"
                value={entry.amount}
                onChange={(e) =>
                  handleEntryChange(index, 'amount', e.target.value)
                }
                className="w-1/4 border rounded p-2"
              />
              <input
                placeholder="Paid Amount"
                value={entry.paid}
                onChange={(e) =>
                  handleEntryChange(index, 'paid', e.target.value)
                }
                className="w-1/4 border rounded p-2"
              />
              <input
                placeholder="Remaining Amount"
                value={entry.remaining}
                onChange={(e) =>
                  handleEntryChange(index, 'remaining', e.target.value)
                }
                className="w-1/4 border rounded p-2"
              />
            </div>

            {/* Button - always reserve space */}
            <div
              className="w-[30px] flex justify-center items-center ml-2"
              style={{
                backgroundColor: '#D9D9D9',
                borderRadius: '6px',
              }}
            >
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveEntry(index)}
                  className="text-red-600 font-bold text-xl px-2"
                  style={{
                    color: '#000000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  −
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invoices */}
      <div className="space-y-4">
        {/* Dropdown at the top */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Select Tax Type:</label>
          <select
            value={selectedTaxType}
            onChange={(e) => setSelectedTaxType(e.target.value)}
            className="px-3 py-1 border rounded-md"
          >
            <option value="CGST">CGST</option>
            <option value="IGST">IGST</option>
            <option value="TDS">TDS</option>
          </select>
        </div>

        {/* Tax cards */}
        {filteredTaxData.map((tax, index) => (
          <div
            key={tax.name}
            className="bg-gray-200 rounded-md px-4 py-3 flex justify-between items-center"
          >
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <span className="font-bold">{tax.name}</span>
                <span className="font-semibold">{tax.percent}</span>
                <span className="font-semibold">Amount: {tax.amount}</span>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="ml-4 text-gray-700"
                >
                  {openIndex === index ? '▲' : '▼'}
                </button>
              </div>

              {openIndex === index && (
                <div className="mt-3 text-sm text-gray-600 border-t pt-2">
                  {/* Dropdown content */}
                  <p>More details about {tax.name}...</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Amount Section */}
      {/* <div className="mt-4">
        <label className="block">Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded p-2"
        />
        <div className="text-blue-600 mt-1">
          Balance Amount: ₹{balanceAmount.toLocaleString()}/-
        </div>
      </div> */}

      {/* Description */}
      <div className="mt-4 w-full border rounded p-2">
        <label className="block">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=""
          rows="3"
        />
      </div>

      {/* Payment Mode */}
      <div
        className="mt-2 font-bold cursor-pointer flex items-center justify-between p-2 border border-gray-300 rounded-md bg-gray-100"
        onClick={() => setShowPaymentPopup(!showPaymentPopup)}
        style={{marginBottom: "30px",height: "50px"}}
      >
        Payment Mode : 
        <span className="text-xs ml-2">{showPaymentPopup ? '▾' : '▸'}</span>
      </div>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="border border-gray-300 rounded-lg p-4 mt-2 bg-white">
          <p className="font-bold mb-2">Select Payment Type</p>

          {/* Payment Options */}
          <div className="flex gap-2 mb-4">
            {['Cash', 'UPI', 'Check', 'Card'].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-md font-bold ${
                  paymentType === type
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
                style={{ height: '60px', width: '180px' }}
                onClick={() => setPaymentType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Conditional Fields */}
          <div
            className="space-y-3"
            style={{
              display: 'flex',

              alignItems: 'center',
            }}
          >
            {(paymentType === 'UPI' ||
              paymentType === 'Check' ||
              paymentType === 'Card') && (
              <div
                className="mb-3 ml-6 sm:ml-4 w-full max-w-md"
                style={{ marginLeft: '0px' }}
              >
                {/* <label className="block mb-1">
                  {paymentType === 'UPI'
                    ? 'UPI ID'
                    : paymentType === 'Check'
                      ? 'Check ID'
                      : 'Card ID'}
                </label> */}
                <input
                  type="text"
                  placeholder={`${
                    paymentType === 'UPI'
                      ? 'UPI ID'
                      : paymentType === 'Check'
                        ? 'Check ID'
                        : 'Card ID'
                  }`}
                  className="bg-gray-300 text-gray-700 p-3 rounded-md w-full h-14"
                  style={{ marginTop: '20px' }}
                />
              </div>
            )}

            {/* Amount Field (visible for all) */}
            <div className="mb-3 ml-6 sm:ml-4 w-full max-w-md">
              <input
                type="text"
                placeholder="Enter Amount"
                className="bg-gray-300 text-gray-700 p-3 rounded-md w-full h-14"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Submit Button */}
    </form>
  );
};

export default PurchaseForm;

// import React, { useEffect, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import ApiService, { initialAuthState } from '../../services/ApiService';
// import { useNavigate } from 'react-router';

// const PurchaseForm = ({ branches, bankOptions, staffs }) => {
//   const { control, handleSubmit, setValue, getValues, reset } = useForm();
//   const [selectedTab, setSelectedTab] = useState('Purchase');
//   const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'Card', 'EMI'];
//   const productTypes = [
//     { value: 'service', label: 'Service' },
//     { value: 'product', label: 'Product' },
//     { value: 'sales', label: 'Sales' },
//     { value: 'expanses', label: 'Expanses' },
//     { value: 'salaries', label: 'Salaries' },
//   ];

//   const staff = [
//     { value: 'manager', label: 'Manager' },
//     { value: 'supervisor', label: 'Supervisor' },
//     { value: 'cashier', label: 'Cashier' },
//     { value: 'receptionist', label: 'Receptionist' },
//   ];

//   const dropdownOptions = {
//     // role: ['Manager', 'Accountant', 'Staff'],
//     receiptTo: ['Client', 'Vendor'],
//     amountGoingTo: ['Account A', 'Account B', 'Account C'],
//     bankFrom: ['Bank A', 'Bank B', 'Bank C'],
//     bankTo: ['Bank X', 'Bank Y', 'Bank Z'],
//     branches: ['001', '002'],
//   };
//   const formFieldsByTab = {
//     Purchase: [
//       { name: 'name', label: 'Title', type: 'dropdown', options: staff },
//       { name: 'purpose', label: 'Purpose', type: 'dropdown', options: staff },
//       {
//         name: 'staffId',
//         label: 'Transform By',
//         type: 'dropdown',
//         options: staff,
//       },
//       {
//         name: 'fromAccount',
//         label: 'Amount Going To',
//         type: 'dropdown',
//         options: bankOptions,
//       },
//     ],
//   };

//   const paymentModeFields = {
//     Cash: [
//       { name: 'amount', label: 'Amount' },
//       { name: 'remainingAmount', label: 'Remaining Amount' },
//     ],
//     UPI: [
//       { name: 'upiId', label: 'UPI ID' },
//       {
//         name: 'fromAccount',
//         label: 'Bank',
//         type: 'dropdown',
//         options: bankOptions,
//       },
//       { name: 'amount', label: 'Amount' },
//       { name: 'remainingAmount', label: 'Remaining Amount' },
//     ],
//     Bank: [
//       {
//         name: 'bankName',
//         label: 'Bank Name',
//       },
//       {
//         name: 'branch',
//         label: 'Branch Name',
//       },
//       {
//         name: 'ifscCode',
//         label: 'IFSC',
//       },
//       {
//         name: 'fromAccount',
//         label: 'Bank',
//         type: 'dropdown',
//         options: bankOptions,
//       },
//       { name: 'amount', label: 'Amount' },
//       { name: 'remainingAmount', label: 'Remaining Amount' },
//     ],
//     Cheque: [
//       { name: 'chequeNumber', label: 'Check Number' },
//       {
//         name: 'fromAccount',
//         label: 'Bank',
//         type: 'dropdown',
//         options: bankOptions,
//       },
//       { name: 'amount', label: 'Amount' },
//       { name: 'remainingAmount', label: 'Remaining Amount' },
//     ],
//     Card: [
//       { name: 'cardNumber', label: 'Card Number' },
//       {
//         name: 'fromAccount',
//         label: 'Bank',
//         type: 'dropdown',
//         options: bankOptions,
//       },
//       { name: 'amount', label: 'Amount' },
//       { name: 'remainingAmount', label: 'Remaining Amount' },
//     ],
//     EMI: [
//       { name: 'amount', label: 'Amount' },
//       { name: 'remainingAmount', label: 'Remaining Amount' },
//     ],
//   };

//   const getRelevantFields = (mode) => {
//     return paymentModeFields[mode].map((field) => field.name);
//   };

//   const fetchProducts = async () => {
//     try {
//       const res = await ApiService.post('/products/getAllproductDetails');
//       setProducts(res.data || []);
//     } catch (err) {
//       console.error('Failed to fetch client details:', err);
//       setProducts([]);
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   const onSubmit = async (data) => {
//     try {
//       const relevantFields = getRelevantFields(selectedPaymentMode);
//       const filteredData = Object.keys(data)
//         .filter(
//           (key) =>
//             relevantFields.includes(key) ||
//             formFieldsByTab[selectedTab].some((field) => field.name === key)
//         )
//         .reduce((obj, key) => {
//           obj[key] = data[key];
//           return obj;
//         }, {});
//       const payload = {
//         ...filteredData,
//         voucherType: selectedTab.toLowerCase(),
//         paymentType: selectedPaymentMode.toLowerCase(),
//         companyCode: initialAuthState.companyCode,
//         unitCode: initialAuthState.unitCode,
//         branchId: parseInt(data.branchId, 10),
//         toAccount: data.toAccount,
//         amount: calculateTotalAmount(),
//         quantity: getTotalQuantity(),
//         productDetails: rows.map((row) => ({
//           productId: row.productId,
//           productName: row.productName,
//           quantity: row.quantity,
//           amount: row.amount,
//           price: row.price,
//         })),
//       };

//       // const payload = {
//       //   ...filteredData,
//       //   voucherType: selectedTab.toLowerCase(),
//       //   paymentType: selectedPaymentMode.toLowerCase(),
//       //   companyCode: initialAuthState.companyCode,
//       //   unitCode: initialAuthState.unitCode,
//       //   branchId: parseInt(data.branchId, 10),
//       //   // role: data.role,
//       //   toAccount: data.toAccount,
//       //   amount: calculateTotalAmount(),
//       //   quantity: getTotalQuantity(),
//       // };
//       console.log('Payload:', payload);
//       const response = await ApiService.post('/voucher/saveVoucher', payload);
//       navigate('/vouchers');
//       console.log('Response:', response);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   };

//   const [rows, setRows] = useState([
//     {
//       id: 1,
//       productId: '',
//       productName: '',
//       quantity: '',
//       amount: 0,
//       totalCost: 0,
//     },
//   ]);

//   const handleProductItemChange = async (id, e) => {
//     const { value } = e.target;
//     console.log(value);
//     const selectedProduct = products.find(
//       (product) => product.id === Number(value)
//     );

//     if (!selectedProduct) return;

//     const updatedRows = rows.map((row) => {
//       if (row.id === id) {
//         return {
//           ...row,
//           productId: selectedProduct.id,
//           productName: selectedProduct.productName,
//           quantity: 1, // Default 1
//           amount: selectedProduct.price || 0, // Get totalCost from backend
//           price: selectedProduct.price || 0, // Set amount as totalCost initially
//         };
//       }
//       return row;
//     });
//     setRows(updatedRows);
//   };

//   const getTotalQuantity = () => {
//     return rows.reduce((total, item) => {
//       // Convert quantity to number and add to the total
//       const quantity = parseFloat(item.quantity) || 0;
//       return total + quantity;
//     }, 0);
//   };

//   const handlePaymentModeChange = (mode) => {
//     const currentValues = getValues();
//     setSelectedPaymentMode(mode);
//     reset({
//       ...currentValues,
//       ...paymentModeFields[mode].reduce((acc, field) => {
//         acc[field.name] = '';
//         return acc;
//       }, {}),
//     });
//   };

//   const handlePurchaseItemsInputChange = (id, field, value) => {
//     const updatedRows = rows.map((row) => {
//       if (row.id === id) {
//         let updatedValue =
//           field === 'quantity'
//             ? parseFloat(value) || 0
//             : parseFloat(value) || 0;
//         let newAmount =
//           field === 'quantity' ? updatedValue * (row.price || 0) : row.amount;

//         return {
//           ...row,
//           [field]: updatedValue,
//           amount: newAmount, // Ensure amount updates based on quantity change
//         };
//       }
//       return row;
//     });
//     setRows(updatedRows);
//   };

//   // Calculate total amount
//   const calculateTotalAmount = () => {
//     return rows.reduce((acc, row) => acc + parseFloat(row.amount || 0), 0);
//   };

//   // Add a new row
//   const addRow = () => {
//     setRows([
//       ...rows,
//       {
//         id: rows.length + 1,
//         productId: '',
//         productName: '',
//         quantity: '',
//         amount: 0,
//         totalCost: 0,
//       },
//     ]);
//   };

//   // Remove the last row (ensure at least one row remains)
//   const removeRow = () => {
//     if (rows.length > 1) {
//       setRows(rows.slice(0, -1));
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {formFieldsByTab[selectedTab]?.map((field) => (
//           <Controller
//             key={field.name}
//             name={field.name}
//             control={control}
//             defaultValue={
//               field.type === 'dropdown' && field.options?.length === 1
//                 ? field.options[0].value
//                 : ''
//             }
//             render={({ field: controllerField }) => {
//               switch (field.type) {
//                 case 'dropdown':
//                   return (
//                     <div className="mb-4">
//                       <label className="block font-semibold mb-2">
//                         {field.label}
//                       </label>
//                       <select
//                         {...controllerField}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                       >
//                         {(field.options || []).map((option) => {
//                           if (typeof option === 'string') {
//                             return (
//                               <option key={option} value={option}>
//                                 {option}
//                               </option>
//                             );
//                           } else {
//                             return (
//                               <option key={option.value} value={option.value}>
//                                 {option.label}
//                               </option>
//                             );
//                           }
//                         })}
//                       </select>
//                     </div>
//                   );
//                 default:
//                   return (
//                     <div className="mb-4">
//                       <label className="block font-semibold mb-2">
//                         {field.label}
//                       </label>
//                       <input
//                         {...controllerField}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                       />
//                     </div>
//                   );
//               }
//             }}
//           />
//         ))}
//         {selectedTab === 'Purchase' && (
//           <div className="pt-2">
//             {/* Dynamic Input Rows */}
//             <div className="space-y-4 border rounded-md p-4 bg-gray-50">
//               {rows.map((row) => (
//                 <div key={row.id} className="flex items-center space-x-4">
//                   <select
//                     name="productId"
//                     value={row.productId}
//                     onChange={(e) => handleProductItemChange(row.id, e)}
//                     className="w-full p-2 border rounded-md"
//                   >
//                     <option value="">Select Product</option>
//                     {products.map((product) => (
//                       <option key={product.id} value={product.id}>
//                         {product.productName}
//                       </option>
//                     ))}
//                   </select>

//                   <input
//                     type="number"
//                     placeholder="Quantity"
//                     value={row.quantity}
//                     onChange={(e) =>
//                       handlePurchaseItemsInputChange(
//                         row.id,
//                         'quantity',
//                         e.target.value
//                       )
//                     }
//                     className="p-2 border rounded-md w-1/3"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Rate"
//                     value={row.price}
//                     onChange={(e) =>
//                       handlePurchaseItemsInputChange(
//                         row.id,
//                         'amount',
//                         e.target.value
//                       )
//                     }
//                     className="p-2 border rounded-md w-1/3"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Amount"
//                     value={row.amount}
//                     onChange={(e) =>
//                       handlePurchaseItemsInputChange(
//                         row.id,
//                         'amount',
//                         e.target.value
//                       )
//                     }
//                     className="p-2 border rounded-md w-1/3"
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-4 py-2">
//               <button
//                 type="button"
//                 onClick={addRow}
//                 className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
//               >
//                 +
//               </button>
//               <button
//                 type="button"
//                 onClick={removeRow}
//                 className={`bg-gray-300 text-white py-2 px-4 rounded-md ${rows.length === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
//                 disabled={rows.length === 1}
//               >
//                 -
//               </button>
//             </div>

//             {/* Total Amount */}
//             <div className="text-right font-bold text-lg mt-4">
//               Total Amount: {calculateTotalAmount().toLocaleString('en-IN')} /-
//             </div>
//           </div>
//         )}
//         <h3 className="font-bold mb-2">Payment Mode</h3>
//         <div className="flex space-x-2 mb-4">
//           {PAYMENT_MODES.map((mode) => (
//             <button
//               key={mode}
//               className={`px-4 py-2 rounded ${selectedPaymentMode === mode ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//               onClick={() => handlePaymentModeChange(mode)}
//               type="button"
//             >
//               {mode}
//             </button>
//           ))}
//         </div>

//         <div>
//           {paymentModeFields[selectedPaymentMode]?.map((field) => (
//             <div key={field.name} className="mb-4">
//               <label className="block font-semibold mb-2">{field.label}</label>
//               {field.type === 'dropdown' ? (
//                 <Controller
//                   name={field.name}
//                   control={control}
//                   defaultValue={
//                     field.options.length === 1 ? field.options[0].value : ''
//                   }
//                   render={({ field: controllerField }) => (
//                     <select
//                       {...controllerField}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     >
//                       {field.options.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 />
//               ) : (
//                 <Controller
//                   name={field.name}
//                   control={control}
//                   defaultValue=""
//                   render={({ field: controllerField }) => (
//                     <input
//                       {...controllerField}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   )}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="mb-4">
//           <label className="block font-semibold mb-2">
//             Select Product Type
//           </label>
//           <Controller
//             name="productType"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <select
//                 {...field}
//                 className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 focus:outline-none"
//               >
//                 <option value="">Select product type</option>
//                 {productTypes.map((type) => (
//                   <option key={type.value} value={type.value}>
//                     {type.label}
//                   </option>
//                 ))}
//               </select>
//             )}
//           />
//         </div>

//         <button
//           type="submit"
//           variant="contained"
//           color="primary"
//           className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PurchaseForm;
