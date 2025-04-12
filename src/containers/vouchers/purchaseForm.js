import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
const PurchaseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [ledger,setLedger] =useState([]);
  const [formData, setFormData] = useState(
    {date:null,
      day:"",
      partyName: "", 
      ledgerId:"",
      voucherType:"PURCHASE",
      supplierInvoiceNumber:"",
      supplierLocation:"",
      purchaseGst:"",
      amount:"",
      SGST:9,
    CGST: 9,
    TDS: null,
    IGST: null,
    TCS:null,
      productDetails:[{productName: "",
        quantity: null,
        rate: null,
        totalCost: null
       }],
       purpose:""

    }
  );
 

  const taxData = [
    { name: 'CGST', percent: '9%' },
    { name: 'SGST', percent: '9%'},
    { name: 'IGST', percent: '9%'},
    { name: 'TDS', percent: '18%'},
    { name: 'TCS', percent: '2%'},
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  console.log("formdata",formData)

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

  const handleTaxType = (e) => {
    const value = e.target.value;
    setSelectedTaxType(value);
  
    setFormData((prevData) => ({
      ...prevData,
      CGST: value === "CGST" ? 9 : null,
      SGST: value === "CGST" ? 9 : null,
      IGST: value === "IGST" ? 9 : null,
      TDS: value === "TDS" ? 18 : null,
      TCS: value === "TDS" ? 2 : null,
    }));
  };

  const handleRemoveEntry = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      productDetails: prevData.productDetails.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleEntryChange = (index, field, value) => {
    const updatedProductDetails = [...formData.productDetails];
    updatedProductDetails[index][field] = value;
  
    const quantity = updatedProductDetails[index].quantity || 0;
    const rate = updatedProductDetails[index].rate || 0;
    updatedProductDetails[index].totalCost = (quantity * rate).toFixed(2); // Keep it 2 decimals
  
    setFormData((prevData) => ({
      ...prevData,
      productDetails: updatedProductDetails,
    }));
  };

  const totalAmount = formData.productDetails.reduce((acc, item) => {
    return acc + (parseFloat(item.totalCost) || 0);
  }, 0);

  const handleItemClick = (item) => {
    navigate(`/forms/${item}`);
    // navigate('/receipt-form')
  };


  

      // Fetch branch data from API
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
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const payloadObject = {
      date: formData.date,
      day: formData.day,
      branchId: Number(localStorage.getItem("branchId")),
      ledgerId: Number(formData?.ledgerId),
      voucherType: formData.voucherType,
      invoiceId: formData.supplierInvoiceNumber,
      supplierLocation: formData.supplierLocation,
      voucherGST: formData.purchaseGst,
      amount:Number(
        selectedTaxType==="CGST" ? (
          totalAmount +
          ((totalAmount * (parseFloat(formData["CGST"]) || 0)) / 100) +
          ((totalAmount * (parseFloat(formData["SGST"]) || 0)) / 100)
        ) : selectedTaxType==="IGST" ? (
          totalAmount +
          ((totalAmount * (parseFloat(formData["IGST"]) || 0)) / 100)
        ) : selectedTaxType==="TDS" ? (
          totalAmount +
          ((totalAmount * (parseFloat(formData["TDS"]) || 0)) / 100) +
          ((totalAmount * (parseFloat(formData["TCS"]) || 0)) / 100)
        ) : (
          totalAmount
        ))
      ,
      productDetails: formData.productDetails.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        rate: Number(item.rate),
        totalCost: Number(item.totalCost),
      })),
      CGST:formData.CGST ,
      SGST:formData.SGST,
      IGST:formData.IGST,
      TDS:formData.TDS,
      TCS:formData.TCS,
      purpose: formData.purpose,
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode
    };
    

    try {
      const endpoint = '/voucher/saveVoucher';
      const response = await ApiService.post(endpoint, payloadObject, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status) {
        alert('Purchase voucher created successfully!');
        return response.data;
      } else {
        alert('Failed to create purchase voucher details.');
        return null;
      }
    } catch (error) {
      console.error('Error create purchase voucher details:', error);
      alert('An error occurred while create purchase voucher details.');
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
              {branchData?.map((item, index) => (
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

        <input
          type="text"
          value={formData?.voucherType}
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
          value={formData.supplierInvoiceNumber}
          name="supplierInvoiceNumber"
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

        <input
          type="text"
          placeholder="Supplier Location:"
          value={formData.supplierLocation}
          name="supplierLocation"
          // onChange={(e) => setDay(e.target.value)}
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

        <input
          type="text"
          placeholder="Purchase GST:"
          value={formData.purchaseGst}
          name="purchaseGst"
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

        {formData?.productDetails?.map((entry, index) => (
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
                placeholder="Name:"
                name="productName"
                value={entry.productName}
                onChange={(e) =>
                  handleEntryChange(index, 'productName', e.target.value)
                }
                className="w-1/4 border rounded p-2"
              />
                  <input
                  type="number"
                placeholder="Quantity:"
                name="quantity"
                value={entry.quantity}
                onChange={(e) =>
                  handleEntryChange(index, 'quantity', e.target.value)
                }
                className="w-1/4 border rounded p-2"
              />
             
              <input
              type="number"
                placeholder="Rate:"
                value={entry.rate}
                name="rate"
                onChange={(e) =>
                  handleEntryChange(index, 'rate', e.target.value)
                }
                className="w-1/4 border rounded p-2"
              />

<input  type="number"
                placeholder="Amount:"
                value={entry.totalCost}
                name="totalCost"
                
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
      <div>
              <p>Total Amount:{totalAmount}</p>
              </div>
      {/* Invoices */}
      <div className="space-y-4">
        {/* Dropdown at the top */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Select Tax Type:</label>
          <select
            value={selectedTaxType}
            onChange={handleTaxType}
            className="px-3 py-1 border rounded-md"
          >
            <option value="CGST">CGST</option>
            <option value="IGST">IGST</option>
            <option value="TDS">TDS</option>
          </select>
        </div>

        {/* Tax cards */}
        {filteredTaxData?.map((tax, index) => (
          <div
            key={tax.name}
            className="bg-gray-200 rounded-md px-4 py-3 flex justify-between items-center"
          >
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <span className="font-bold">{tax.name}</span>
                {/* <span className="font-semibold">{tax.percent}</span> */}
                <input
                type="number"
                placeholder={`${tax.name} Percentage:`}
                value={formData[tax.name]}
                name={tax.name}
                onChange={handleInputChange}
                className="w-1/4 border rounded p-2"
              />
                <span className="font-semibold">
  Amount: ₹{(totalAmount * (1 + parseFloat(formData[tax.name] || 0) / 100)).toFixed(2)}
</span>       
              </div>

            
            </div>
          </div>
        ))}
      </div>
      <div>
              </div>
              <div>
              <p>Total Amount (Including Tax) :{
  selectedTaxType==="CGST" ? (
    totalAmount +
    ((totalAmount * (parseFloat(formData["CGST"]) || 0)) / 100) +
    ((totalAmount * (parseFloat(formData["SGST"]) || 0)) / 100)
  ) : selectedTaxType==="IGST" ? (
    totalAmount +
    ((totalAmount * (parseFloat(formData["IGST"]) || 0)) / 100)
  ) : selectedTaxType==="TDS" ? (
    totalAmount +
    ((totalAmount * (parseFloat(formData["TDS"]) || 0)) / 100) +
    ((totalAmount * (parseFloat(formData["TCS"]) || 0)) / 100)
  ) : (
    totalAmount
  )
}</p>
              </div>
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

export default PurchaseForm;