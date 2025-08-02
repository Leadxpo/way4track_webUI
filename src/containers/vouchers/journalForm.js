import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';

const JournalForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [ledger, setLedger] = useState([]);
  const [bankAccount, setBankAccount] = useState([]);
  const [pendingVouchers, setPendingVouchers] = useState([]);
  const handleDateChange = (e) => {
    const value = e.target.value;

    const dayName = new Date(value).toLocaleDateString('en-US', {
      weekday: 'long',
    });

    setFormData((prev) => ({
      ...prev,
      date: value,
      day: dayName,
    }));
  };

  const branchId = Number(localStorage.getItem('branchId'));

  const getPendingVouchers = async (selectedPartyName) => {
    try {
      const response = await ApiService.post('/voucher/getVoucherInvoices', {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
        ledgerId: selectedPartyName, // Add this only if your API expects it
      });

      if (response.status) {
        // filter  branch purchse
        setPendingVouchers(response.data);
      } else {
        console.error('Failed to fetch ledger data');
      }
    } catch (error) {
      console.error('Error fetching ledger data:', error);
    }
  };


  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await ApiService.post('/account/getAccountsDetails');
        localStorage.getItem('branchId');
        console.log('setBankAccount222', response);
        if (response.status) {
          const filteredAccounts = response.data.filter(
            (account) => account.branchId === branchId
          );
          setBankAccount(filteredAccounts);
        } else {
          console.error('Failed to fetch accounts');
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchBankAccounts();
  }, []);

  const handleLedgerChange = (e) => {
    const selectedId = Number(e.target.value); // Convert string to number

    const selectedLedger = ledger.find((ledger) => ledger.id === selectedId);

    if (selectedLedger) {
      setFormData((prev) => ({
        ...prev,
        partyName: selectedLedger.name,
        ledgerId: selectedLedger.id,
      }));
    }
    getPendingVouchers(selectedId);

  };

  useEffect(() => {
    const fetchLedgers = async () => {
      try {
        const response = await ApiService.post('/ledger/getLedgerDetails', {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        });
        console.log('fedgrfdtrgxfsdf', response);
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

  const [formData, setFormData] = useState({
    date: '',
    day: '',
    partyName: '',
    amount: '',
    purpose: '',
    ledgerId: '',
    invoiceId:'',
    voucherType: 'JOURNAL',
    upiId: '',
    checkNumber: '',
    cardNumber: '',
    amountPaid: null,
  });

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
  const [selected, setSelected] = useState('Debit');

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

  const handleItemClick = (item) => {
    navigate(`/forms/${item}`);
    // navigate('/receipt-form')
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      generationDate: formData.date,
      day: formData.day,
      branchId: Number(localStorage.getItem('branchId')),
      ledgerId: Number(formData?.ledgerId),
      voucherType: formData.voucherType,
      purpose: formData.purpose,
      amount: formData.amount,
      invoiceId: formData.invoiceId,
      journalType: selected,
      paymentType: paymentType.toLowerCase(),
      upiId: formData.upiId,
      checkNumber: formData.checkNumber,
      cardNumber: formData.cardNumber,
      amountPaid: Number(formData.amountPaid),
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode
    };
    
    try {
      const endpoint = '/voucher/saveVoucher';
      console.log("payload",payload)
      const response = await ApiService.post(endpoint, payload, {
        headers: {'Content-Type': 'application/json' },
      });

      if (response.status) {
        alert('Journal voucher created successfully!');
        navigate('/vouchers');
        // return response.data;
      } else {
        alert('Failed to create Journal voucher details.');
        return null;
      }
    } catch (error) {
      console.error('Error create Journal voucher details:', error);
      alert('An error occurred while create Journal voucher details.');
      return null;
    }
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
          Journal
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
              type="button"
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
          <div className="flex rounded-lg overflow-hidden w-max shadow-md">
            <button
              type="button"
              onClick={() => setSelected('Debit')}
              className={`px-6 py-2 font-bold transition ${selected === 'Debit'
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-700'
                }`}
            >
              Debit
            </button>
            <button
              type="button"
              onClick={() => setSelected('Credit')}
              className={`px-6 py-2 font-bold transition ${selected === 'Credit'
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-700'
                }`}
            >
              Credit
            </button>
          </div>

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
                {entry.voucherType} -
              </p>
              <p className="font-semibold text-lg">
                Invoice ID : {entry.invoiceId}
              </p>
             
              <p className="font-semibold text-lg">
                Payable Amt :
                  { entry.amount ||0}
              </p>
              <p className="font-semibold text-lg">
              Reminig Amt :  {
                  entry.reminigAmount ||0 }
              </p>
            </div>
          ))}

        </div>
        <input
          placeholder="Invoice ID"
          value={formData.invoiceId}
          name="invoiceId"
          style={{
            height: '45px',width:'100%',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '20px',
            fontWeight: '500',
          }}
          onChange={(e) =>
            handleInputChange(e)
          }
          className="w-1/4 border rounded p-2"
        />

        <input
          type="text"
          placeholder="Amount:"
          value={formData.amount}
          name="amount"
          onChange={handleInputChange}
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
              paymentType === 'Cheque' ||
              paymentType === 'Card') && (
                <div
                  className="mb-3 ml-6 sm:ml-4 w-full max-w-md"
                  style={{ marginLeft: '0px' }}
                >
                  <input
                    type="text"
                    placeholder={`${paymentType === 'UPI'
                      ? 'UPI ID'
                      : paymentType === 'Cheque'
                        ? 'Cheque ID'
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

export default JournalForm;
