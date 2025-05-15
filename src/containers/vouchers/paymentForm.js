import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';

const PaymentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [ledger, setLedger] = useState([

  ]);

  const [pendingVouchers, setPendingVouchers] = useState([
  ]);

  const [bankAccount, setBankAccount] = useState([
  ]);

  const handleIdChange = (e) => {
    const value = e.target.value;

    if (paymentType === 'UPI') {
      setFormData((prev) => ({ ...prev, upiId: value }));
    } else if (paymentType === 'Cheque') {
      setFormData((prev) => ({ ...prev, checkNumber: value }));
    } else if (paymentType === 'Card') {
      setFormData((prev) => ({ ...prev, cardNumber: value }));
    }
  };

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
    {
      date: "",
      day: "",
      bankAccountNumber: "",
      voucherType: "PAYMENT",
      partyName: "",
      ledgerId: "",
      bankAmount: "",
      purpose: "",
      pendingInvoices: [{
        invoiceId: "",
        paidAmount: null,
        amount: null,
        reminigAmount: null
      }],
      upiId: "",
      checkNumber: "",
      cardNumber: "",
      amountPaid: null
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
  const [paymentType, setPaymentType] = useState('cash');
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


  const handleBranchClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddEntry = () => {
    setFormData((prevData) => ({
      ...prevData,

      pendingInvoices: [
        ...prevData.pendingInvoices,
        {
          invoiceId: "",
          paidAmount: null,
          amount: null,
          reminigAmount: null
        }
      ]
    }));
  };

  const handleRemoveEntry = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      pendingInvoices: prevData.pendingInvoices.filter((_, index) => index !== indexToRemove),
    }));
  };

  const totalPayableAmount = pendingVouchers?.reduce(
    (acc, cur) => acc + parseFloat(cur.amount || 0),
    0
  );

  const totalPaidAmount = formData.pendingInvoices.reduce((acc, item) => {
    return acc + (parseFloat(item.paidAmount) || 0);
  }, 0);


  // const handleEntryChange = (index, field, value) => {
  //   const updatedInvoices = [...formData.pendingInvoices];
  //   updatedInvoices[index][field] = value;

  //   const amount = parseFloat(updatedInvoices[index].amount) || 0;
  //   const paidAmount = parseFloat(updatedInvoices[index].paidAmount) || 0;

  //   updatedInvoices[index].reminigAmount = (amount - paidAmount).toFixed(2);

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     pendingInvoices: updatedInvoices,
  //   }));
  // };


  const handleEntryChange = (index, field, value) => {
    const updatedInvoices = [...formData.pendingInvoices];
    updatedInvoices[index][field] = value;

    // If user is entering invoiceId, auto-fill the amount
    if (field === "invoiceId") {
      const matchedInvoice = pendingVouchers.find(inv => inv.invoiceId === value);
      if (matchedInvoice) {
        updatedInvoices[index].amount = matchedInvoice.amount;
      } else {
        updatedInvoices[index].amount = ""; // reset if not found
      }
    }

    const amount = parseFloat(updatedInvoices[index].amount) || 0;
    const paidAmount = parseFloat(updatedInvoices[index].paidAmount) || 0;
    updatedInvoices[index].reminigAmount = (amount - paidAmount).toFixed(2);

    setFormData(prevData => ({
      ...prevData,
      pendingInvoices: updatedInvoices,
    }));
  };


  const handleItemClick = (item) => {
    navigate(`/forms/${item}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //   console.log("qqqqqqqq",formData)
    //   const payload = new FormData();

    //   payload.append('date', formData.date);
    //   payload.append('day', formData.day);
    //   payload.append('bankAccountNumber', formData.bankAccountNumber);
    //   payload.append('pendingInvoices', formData.pendingInvoices);
    //   payload.append('purpose', formData.purpose);

    //   payload.append('branchId',Number(localStorage.getItem("branchId")));
    //   payload.append('voucherType', formData.voucherType);
    //   payload.append('paymentType', paymentType.toLowerCase());
    // payload.append('upiId', formData.upiId);
    // payload.append('checkNumber', formData.checkNumber);
    // payload.append('cardNumber', formData.cardNumber);
    // payload.append('amountPaid', Number(formData.amountPaid));
    //   payload.append('companyCode', initialAuthState.companyCode);
    //   payload.append('unitCode', initialAuthState.unitCode);
    //   console.log("qqqqqqqqpayload",payload)

    const payloadObj = {
      generationDate: formData.date,
      day: formData.day,
      bankAccountNumber: formData.bankAccountNumber,
      pendingInvoices: formData.pendingInvoices.map((item) => ({
        ...item,
        invoiceId: item.invoiceId,
        paidAmount: Number(item.paidAmount),
        amount: Number(item.amount),
        reminigAmount: Number(item.reminigAmount),
      })),
      purpose: formData.purpose,
      branchId: Number(localStorage.getItem("branchId")),
      ledgerId:Number(formData.ledgerId),
      voucherType: formData.voucherType,
      paymentType: paymentType.toLowerCase(),
      upiId: formData.upiId,
      checkNumber: formData.checkNumber,
      cardNumber: formData.cardNumber,
      amountPaid: Number(formData.amountPaid),
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
    };

    try {
      const endpoint = '/voucher/saveVoucher';
      const response = await ApiService.post(endpoint, payloadObj, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status) {
        alert('Payment voucher created successfully!');
        navigate("/vouchers");
        // return response.data;
      } else {
        alert('Failed to create Payment voucher details.');
        return null;
      }
    } catch (error) {
      console.error('Error create Payment voucher details:', error);
      alert('An error occurred while create Payment voucher details.');
      return null;
    }
  };
  const handleLedgerChange = (e) => {
    const selectedId = Number(e.target.value); // Convert string to number
    const selectedLedger = ledger.find((ledger) => ledger.id === selectedId);
    if (selectedLedger) {
      setFormData((prev) => ({
        ...prev,
        partyName: selectedLedger.name,
        ledgerId: selectedLedger.id
      }));
    }
    console.log("formdata", formData)
    getPendingVouchers(selectedId);

  };

  // const handleBankChange = (e) => {
  //   const selectedAccountNumber = e.target.value;

  //   const selectedBank = bankAccount.find(
  //     (bank) => bank.accountNumber === selectedAccountNumber
  //   );

  //   if (selectedBank) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       bankAmount: selectedBank.totalAmount || "0.00",
  //       bankAccountNumber: selectedAccountNumber || "",
  //     }));
  //   }

  // };


  const handleBankChange = (e) => {
    const selectedAccountNumber = e.target.value;

    // If "Cash" is selected, reset bankAmount or treat as special case
    if (selectedAccountNumber === "cash") {
      setFormData((prev) => ({
        ...prev,
        bankAccountNumber: "cash"
      }));
      return;
    }

    // Find the selected bank account from list
    const selectedBank = bankAccount?.find(
      (bank) => bank.accountNumber === selectedAccountNumber
    );

    // Update formData with bankAmount if found
    if (selectedBank) {
      setFormData((prev) => ({
        ...prev,
        bankAccountNumber: selectedAccountNumber,
        bankAmount: selectedBank.totalAmount ?? "0.00",
      }));
    } else {
      // If not found, reset values
      setFormData((prev) => ({
        ...prev,
        bankAccountNumber: "",
        bankAmount: "0.00",
      }));
    }
  };




  const getPendingVouchers = async (selectedPartyName) => {
    try {
      const response = await ApiService.post('/voucher/getPendingVouchers', {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
        ledgerId: selectedPartyName, // Add this only if your API expects it
      });

      console.log("setPendingVouchers+++++++++", response);

      if (response.status) {
        setPendingVouchers(response.data);
      } else {
        console.error('Failed to fetch ledger data');
      }
    } catch (error) {
      console.error('Error fetching ledger data:', error);
    }
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
        console.log("fedgrfdtrgxfsdf", response)
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
  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await ApiService.post(
          '/account/getAccountsDetails'


        );
        console.log("setBankAccount22211111", response)
        if (response.status) {

          setBankAccount(response.data); // Set branches to state
        } else {
          console.error('Failed to fetch accounts');
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchBankAccounts();
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

        <select
          value={formData.bankAccountNumber}
          onChange={handleBankChange}
          name="bankAccountNumber"
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
          <option value="">Select Bank Name</option>
          <option value="cash">Cash</option>
          {bankAccount?.map((account) => (
            <option key={account.id} value={account.accountNumber}>
              {`${account.name} (${account.accountNumber})`}
            </option>
          ))}
        </select>

        <select
          value={formData.ledgerId}
          onChange={handleLedgerChange}
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
            <option key={party.id} value={party.id}>
              {party.name}
            </option>
          ))}
        </select>
      </div>
      <div className="border rounded-lg p-4">
        {pendingVouchers?.map((entry, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-[#f2f2f2] rounded-md px-4 py-3 mb-2"
          >
            <p className="font-semibold text-lg">
              Invoice ID : {entry.invoiceId}
            </p>
            <p className="font-semibold text-lg">
              Payable Amount : {parseFloat(entry.amount).toLocaleString('en-IN')}
            </p>
          </div>
        ))}

        {/* Total Amount Section */}
        <div className="flex justify-end mt-4">
          <p className="font-bold text-xl">
            Total Payable Amount: {totalPayableAmount?.toLocaleString('en-IN')}/-
          </p>
        </div>
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
        type="button"
          className="bg-green-600 text-white font-bold w-[30px] h-[30px]"
          style={{ borderRadius: '8px', marginBottom: '10px' }}
          onClick={handleAddEntry}
        >
          +
        </button>

        {formData?.pendingInvoices?.map((entry, index) => (
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
                value={entry.invoiceId}
                onChange={(e) =>
                  handleEntryChange(index, 'invoiceId', e.target.value)
                }
                className="w-1/4 border rounded p-2"
              />
              <input
                placeholder="Amount"
                value={entry.amount}
                name="amount"
                className="w-1/4 border rounded p-2"
                onChange={(e) =>
                  handleEntryChange(index, 'amount', e.target.value)
                }
              />
              <input
                placeholder="Paid Amount"
                value={entry.paidAmount}
                onChange={(e) =>
                  handleEntryChange(index, 'paidAmount', e.target.value)
                }
                className="w-1/4 border rounded p-2"
              />
              <input
                placeholder="Remaining Amount"
                value={entry.reminigAmount}
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

      <div className="mt-4 w-full border rounded p-2">
        <p className="mt-3 text-green-700 font-semibold italic text-lg">
          Total Paid Amount:{totalPaidAmount}/-
        </p>
        {/* Balance Text */}

        {totalPaidAmount <= formData.bankAmount ? (
          <p className="mt-3 text-green-700 font-semibold italic text-lg">
            Balance Amount : {formData.bankAmount - totalPaidAmount}/-
          </p>
        ) : (
          <p className="mt-3 text-red-700 font-semibold italic text-lg">
            Insufficient Bank Balance
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mt-4 w-full border rounded p-2">
        <label className="block mb-1 font-medium">Description:</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
          rows="3"
          placeholder="Enter description or notes..."
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
            {['Cash', 'UPI', 'Cheque', 'Card'].map((type) => (
              <button
                type="button"
                key={type}
                className={`px-4 py-2 rounded-md font-bold ${paymentType === type
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
                    placeholder={`${paymentType === 'UPI'
                      ? 'UPI ID'
                      : paymentType === 'Check'
                        ? 'Check ID'
                        : 'Card ID'
                      }`}
                    onChange={handleIdChange}
                    className="bg-gray-300 text-gray-700 p-3 rounded-md w-full h-14"
                    style={{ marginTop: '20px' }}
                  />
                </div>
              )}

            {/* Amount Field (visible for all) */}
            <div className="mb-3 ml-6 sm:ml-4 w-full max-w-md">
              <input
                type="number"
                onChange={handleInputChange}
                name="amountPaid"
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
