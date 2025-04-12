import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';

const CreditNoteForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [bankAccount,setBankAccount] =useState([
     
    ]);

  const [ledger,setLedger] =useState([]);
  const { selectedBranch } = location?.state || {};
  console.log("+++++===== selectedBranch purchase",selectedBranch)
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

    const [formData, setFormData] = useState(
      {date:"",
        day:"",
        partyName: "",
        ledgerId:"",
        bankAccountNumber:"",
        saleId:"",
        amount:"",
        voucherType:"CREDITNOTE",
        purpose:""
  
      }
    );

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [bank, setBank] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [partyName, setPartyName] = useState('');

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentType, setPaymentType] = useState('');
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

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const balanceAmount = 20000;

  const handleBranchClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          console.error('Failed to fetch ledger');
        }
      } catch (error) {
        console.error('Error fetching ledger:', error);
      }
    };

    fetchLedgers();
  }, []);

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

  const handleItemClick = (item) => {
    navigate(`/forms/${item}`);
    // navigate('/receipt-form')
  };

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await ApiService.post(
          '/account/getAccountsDetails'
                    
                  
        );
        console.log("setBankAccount222",response)
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

   const handleSubmit = async (e) => {
     e.preventDefault(); 
     const payload = new FormData();
 
     payload.append('date', formData.date);
     payload.append('day', formData.day);
     payload.append('ledgerId', Number(formData.ledgerId));
     payload.append('branchId', Number(localStorage.getItem("branchId")));
     payload.append('bankAccountNumber', formData.bankAccountNumber);
     payload.append('saleId', formData.saleId);
     payload.append('amount', formData.amount);
     payload.append('voucherType', formData.voucherType);
     payload.append('purpose', formData.purpose);

     payload.append('companyCode', initialAuthState.companyCode);
     payload.append('unitCode', initialAuthState.unitCode);
     
 
     try {
       const endpoint = '/voucher/saveVoucher';
       const response = await ApiService.post(endpoint, payload, {
         headers: { 'Content-Type': 'multipart/form-data' },
       });
 
       if (response.status) {
         alert('Credit note voucher created successfully!');
         return response.data;
       } else {
         alert('Failed to create Credit note voucher details.');
         return null;
       }
     } catch (error) {
       console.error('Error create Credit note voucher details:', error);
       alert('An error occurred while create Credit note voucher details.');
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
          Credit
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

        {/* <input
          type="text"
          name="partyName"
          placeholder="Party Name"
          value={formData.partyName}
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
        /> */}

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

<select
        value={formData.bankAccountNumber}
        onChange={handleInputChange}
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
        {bankAccount?.map((account) => (
          <option key={account.id} value={account.accountNumber}>
            {`${account.name} (${account.accountNumber})`}
          </option>
        ))}
      </select>

        <input
          type="text"
          name="saleId"
          placeholder="Sale ID:"
          value={formData.saleId}
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

        {/* <input
          type="text"
          placeholder="Name of the Product:"
          name="productName"
          value={formData.productName}
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
        /> */}

        {/* <input
          type="text"
          placeholder="Quantity:"
          name="quantity"
          value={formData.quantity}
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
        /> */}

        {/* <input
          type="text"
          placeholder="Rate:"
          name="rate"
          value={formData.rate}
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
        /> */}

        <input
          type="text"
          placeholder="Amount:"
          name="amount"
          value={formData.amount}
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



      {/* {showPaymentPopup && (
        <div className="border border-gray-300 rounded-lg p-4 mt-2 bg-white">

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

            <div className="mb-3 ml-6 sm:ml-4 w-full max-w-md">
              <input
                type="text"
                placeholder="Enter Amount"
                className="bg-gray-300 text-gray-700 p-3 rounded-md w-full h-14"
              />
            </div>
          </div>
          
        </div>
      )} */}

      {/* Submit Button */}

      <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700"
            >
              Submit
            </button>
          </div>
    </form>
  );
};

export default CreditNoteForm;
