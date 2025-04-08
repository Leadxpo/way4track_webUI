import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';

const PaymentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
    const { selectedBranch } = location.state || {};

    console.log("Selected Branch Object:jjj", selectedBranch);
const [ledger,setLedger] =useState([
   
  ]);

  const handleDateChange = (e) => {
    const value = e.target.value;
  
    const dayName = new Date(value).toLocaleDateString("en-US", {
      weekday: "long",
    });
  
    setFormData((prev) => ({
      ...prev,
      date: value,
      day: dayName, 
    }));
  };

    const [formData, setFormData] = useState(
      {date:"",
        day:"",
        partyName: "", //clientId
        voucherType:"PURCHASE",
        supplierInvoiceNumber:"",
        supplierLocation:"",
        purchaseGst:"",
        productDetails:[{productName: "",
          quantity: null,
          rate: null,
          totalCost: null,
         }],
         purpose:""
        // invoices,
        // entries,
        // amount,
        // balanceAmount,
        // description,
        // paymentMode,
  
      }
    );

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
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
    setFormData((prevData) => ({
      ...prevData,
      productDetails: [
        ...prevData.productDetails,
        { productName: "", quantity: null, rate: null, totalCost: null }
      ]
    }));
  };

  const handleRemoveEntry = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      productDetails: prevData.productDetails.filter((_, index) => index !== indexToRemove),
    }));
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

 
  };

        useEffect(() => {
          const fetchLedgers = async () => {
            try {
              const response = await ApiService.post(
                '/ledger/getLedgerDetails', {
                          companyCode: initialAuthState?.companyCode,
                          unitCode: initialAuthState?.unitCode,
                        }
              );
              console.log("fedgrfdtrgxfsdf",response)
              if (response.status) {
                setLedger(response.data); // Set branches to state
              } else {
                console.error('Failed to fetch branches');
              }
            } catch (error) {
              console.error('Error fetching branches:', error);
            }
          };
      
          fetchLedgers();
        }, []);

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
          Payment
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
          value={formData.date}
          name="date"

          onChange={handleDateChange}
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


          name="day"
          value={formData.day}
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
          placeholder="Bank Account:"
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

<select
        value={formData.partyName}
        onChange={handleInputChange}
        name="partyName"
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
      >
        <option value="">Select Party Name</option>
        {ledger?.map((party) => (
          <option key={party.clientId} value={party.name}>
            {party.name}
          </option>
        ))}
      </select>
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
                placeholder="Invoice ID"
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
            <div>
              <p>Balance Amount: 20000/-</p>
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
        style={{ marginBottom: '30px', height: '50px' }}
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

export default PaymentForm;
