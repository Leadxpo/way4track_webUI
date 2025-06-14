import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
const EditPurchaseForm = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [ledger, setLedger] = useState([]);
  const [errors, setErrors] = useState({ purchaseGst: '' });
  const [formData, setFormData] = useState({
    id: '',
    date: null,
    day: '',
    dueDate: null,
    partyName: '',
    ledgerId: '',
    voucherType: 'PURCHASE',
    supplierInvoiceNumber: '',
    supplierLocation: '',
    purchaseGst: '',
    amount: '',
    SGST: 0,
    CGST: 0,
    TDS: null,
    IGST: null,
    TCS: null,
    productDetails: [
      { productName: '', quantity: null, rate: null, totalCost: null },
    ],
    purpose: '',
  });

  const {
    branches,
    bankOptions,
    clients,
    staff,
    isEditMode,
    voucherToEdit: item,
  } = props;
  console.log(isEditMode, item, 'is edit');

  const taxData = [
    { name: 'CGST', percent: '0%' },
    { name: 'SGST', percent: '0%' },
    { name: 'IGST', percent: '0%' },
    { name: 'TDS', percent: '0%' },
    { name: 'TCS', percent: '0%' },
  ];

  useEffect(() => {
    if (isEditMode && item) {
      const date = item.generationDate?.substring(0, 10) || '';
      const day = date
        ? new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
        : '';
      setFormData({
        id: item.id,
        date: date,
        day: day,
        dueDate: item.dueDate?.substring(0, 10) || '',
        partyName: item.vendorName || '',
        ledgerId: item.ledgerId || '',
        voucherType: item.voucherType || 'PURCHASE',
        supplierInvoiceNumber: item.invoiceId || '',
        supplierLocation: item.supplierLocation || '',
        purchaseGst: item.GSTORTDS || '',
        amount: item.amount || '',
        SGST: item.SCST || 0,
        CGST: item.CGST || 0,
        TDS: item.TDS || '',
        IGST: item.IGST || '',
        TCS: item.TCS || '',
        productDetails: item.productDetails?.length
          ? item.productDetails
          : [{ productName: '', quantity: '', rate: '', totalCost: '' }],
        purpose: item.purpose || '',
      });
    }
  }, [isEditMode, item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for purchaseGst with validation
    if (name === 'purchaseGst') {
      if (value.length > 15) return;

      setFormData((prev) => ({ ...prev, [name]: value }));

      if (value.length !== 15 && value.length !== 0) {
        setErrors((prev) => ({
          ...prev,
          purchaseGst: 'GST number must be exactly 15 characters',
        }));
      } else {
        setErrors((prev) => ({ ...prev, purchaseGst: '' }));
      }
    } else {
      // General case: update any other form field, including tax inputs
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLedgerChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedLedger = ledger.find((ledger) => ledger.id === selectedId);
    if (selectedLedger) {
      setFormData((prev) => ({
        ...prev,
        partyName: selectedLedger.name,
        ledgerId: selectedLedger.id,
      }));
    }
    console.log('formdata', formData);
  };

  const handleDescription = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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

  const [gstData, setGstData] = useState(null);
  const [loading, setLoading] = useState(false);

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
        { productName: '', quantity: null, rate: null, totalCost: null },
      ],
    }));
  };

  const handleTaxType = (e) => {
    const value = e.target.value;
    setSelectedTaxType(value);

    setFormData((prevData) => ({
      ...prevData,
      CGST: value === 'CGST' ? 9 : null,
      SGST: value === 'CGST' ? 9 : null,
      IGST: value === 'IGST' ? 9 : null,
      TDS: value === 'TDS' ? 18 : null,
      TCS: value === 'TDS' ? 2 : null,
    }));
  };

  const handleRemoveEntry = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      productDetails: prevData.productDetails.filter(
        (_, index) => index !== indexToRemove
      ),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parseTaxValue = (val) => {
      return val === '' || val === undefined || val === null
        ? null
        : Number(val);
    };

    const CGST = parseTaxValue(formData.CGST);
    const SGST = parseTaxValue(formData.SGST);
    const IGST = parseTaxValue(formData.IGST);
    const TDS = parseTaxValue(formData.TDS);
    const TCS = parseTaxValue(formData.TCS);

    const calculatedAmount = Number(
      selectedTaxType === 'CGST'
        ? totalAmount +
            (totalAmount * (CGST || 0)) / 100 +
            (totalAmount * (SGST || 0)) / 100
        : selectedTaxType === 'IGST'
          ? totalAmount + (totalAmount * (IGST || 0)) / 100
          : selectedTaxType === 'TDS'
            ? totalAmount +
              (totalAmount * (TDS || 0)) / 100 +
              (totalAmount * (TCS || 0)) / 100
            : totalAmount
    );

    const payloadObject = {
      id: formData.id,
      generationDate: formData.date,
      day: formData.day,
      dueDate: formData.dueDate,
      branchId: Number(localStorage.getItem('branchId')),
      ledgerId: Number(formData?.ledgerId),
      voucherType: formData.voucherType,
      invoiceId: formData.supplierInvoiceNumber,
      supplierLocation: formData.supplierLocation,
      voucherGST: formData.purchaseGst,
      amount: calculatedAmount,
      productDetails: formData.productDetails.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        rate: Number(item.rate),
        totalCost: Number(item.totalCost),
      })),
      CGST: CGST,
      SGST: SGST,
      IGST: IGST,
      TDS: TDS,
      TCS: TCS,
      purpose: formData.purpose,
      pendingInvoices: {
        invoiceId: formData.supplierInvoiceNumber,
        paidAmount: 0,
        amount: calculatedAmount,
        reminigAmount: calculatedAmount,
      },
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
    };

    try {
      const endpoint = '/voucher/saveVoucher';
      const response = await ApiService.post(endpoint, payloadObject, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status) {
        alert('Purchase voucher updated successfully!');
        navigate('/vouchers');
        // return response.data;
      } else {
        alert('Failed to updated purchase voucher details.');
        return null;
      }
    } catch (error) {
      console.error('Error updated purchase voucher details:', error);
      alert('An error occurred while updated purchase voucher details.');
      return null;
    }
  };

  const handleFetchGSTData = async () => {
    const gstNumber = formData.purchaseGst;
    if (!gstNumber) {
      alert('Please enter a GST number');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.post(
        'https://appyflow.in/api/verifyGST',
        {
          key_secret: 'JqwMCeWBEDNCjxmEhUYSeMoluSB2',
          gstNo: gstNumber,
        }
      );

      console.log(response, 'response gst');

      setGstData(response);

      // if (response?.data) {
      //   setGstData(response.data);
      // } else {
      //   alert('No data found');
      //   setGstData(null);
      // }
    } catch (error) {
      console.error('GST Fetch Error:', error);
      alert('Error fetching GST data');
    } finally {
      setLoading(false);
    }
  };

  const handleDueDateChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      dueDate: value,
    }));
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
        <label
          htmlFor="dueDate"
          className="block text-sm mb-1 font-bold text-gray-800"
          style={{
            fontSize: '16px',
            fontWeight: '700',
          }}
        >
          Generation Date
        </label>
        <input
          type="date"
          value={formData.date}
          name="date"
          onChange={handleDateChange}
          className="w-full border p-2"
          style={{
            height: '45px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '16px',
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
        <label
          htmlFor="dueDate"
          className="block text-sm mb-1 font-bold text-gray-800"
          style={{
            fontSize: '16px',
            fontWeight: '700',
          }}
        >
          Due Date
        </label>
        {/* <label className="block text-sm mb-1 font-bold">Due Date</label> */}
        <input
          type="date"
          value={formData.dueDate}
          name="dueDate"
          onChange={handleDueDateChange}
          className="w-full border p-2"
          style={{
            height: '45px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '8px',
            borderWidth: '1px',
            borderColor: '#A2A2A2',
            fontSize: '16px',
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
          onChange={handleDescription}
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
          onChange={handleDescription}
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
        /> */}

        <div className="">
          <div className="relative z-[10]">
            <input
              type="text"
              placeholder="Purchase GST:"
              name="purchaseGst"
              value={formData.purchaseGst}
              onChange={handleInputChange}
              className="w-full border rounded-lg pr-36 pl-3 py-2 text-black text-lg font-medium border-gray-400 bg-white h-[45px]"
            />
            <button
              onClick={handleFetchGSTData}
              type="button"
              disabled={loading || formData.purchaseGst.length !== 15}
              className="absolute top-1 right-1 h-[37px] px-4 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? '...' : 'Get'}
            </button>
          </div>

          {errors.purchaseGst && (
            <p className="text-red-500 text-sm mt-1">{errors.purchaseGst}</p>
          )}

          {gstData && (
            <div className="mt-6 p-6 rounded-xl shadow-lg bg-white border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                GST Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-sm">
                <div>
                  <label className="font-semibold text-gray-600">
                    Company Name:
                  </label>
                  <p>{gstData.taxpayerInfo.tradeNam}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-600">
                    GST Number:
                  </label>
                  <p>{gstData.taxpayerInfo.gstin}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-600">
                    Type Of Company:
                  </label>
                  <p>{gstData.taxpayerInfo.dty}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-600">
                    Incorporate Type:
                  </label>
                  <p>{gstData.taxpayerInfo.ctb}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-600">Status:</label>
                  <p>{gstData.taxpayerInfo.sts}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-600">
                    Pan Number:
                  </label>
                  <p>{gstData.taxpayerInfo.panNo}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-gray-600">
                    Address:
                  </label>
                  <p className="leading-relaxed">
                    {gstData.taxpayerInfo.pradr.addr.bno &&
                      `${gstData.taxpayerInfo.pradr.addr.bno}, `}
                    {gstData.taxpayerInfo.pradr.addr.st &&
                      `${gstData.taxpayerInfo.pradr.addr.st}, `}
                    {gstData.taxpayerInfo.pradr.addr.loc &&
                      `${gstData.taxpayerInfo.pradr.addr.loc}, `}
                    {gstData.taxpayerInfo.pradr.addr.dst &&
                      `${gstData.taxpayerInfo.pradr.addr.dst}, `}
                    {gstData.taxpayerInfo.pradr.addr.stcd} -{' '}
                    {gstData.taxpayerInfo.pradr.addr.pncd}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', marginTop: '10px' }}>
                <label className="font-semibold text-gray-600">State:</label>
                <p>{gstData.taxpayerInfo.pradr.addr.stcd}</p>
              </div>
            </div>
          )}
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

              <input
                type="number"
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
                  Amount: ₹
                  {(
                    totalAmount *
                    (1 + parseFloat(formData[tax.name] || 0) / 100)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div></div>
      <div>
        <p>
          Total Amount (Including Tax) :
          {selectedTaxType === 'CGST'
            ? totalAmount +
              (totalAmount * (parseFloat(formData['CGST']) || 0)) / 100 +
              (totalAmount * (parseFloat(formData['SGST']) || 0)) / 100
            : selectedTaxType === 'IGST'
              ? totalAmount +
                (totalAmount * (parseFloat(formData['IGST']) || 0)) / 100
              : selectedTaxType === 'TDS'
                ? totalAmount +
                  (totalAmount * (parseFloat(formData['TDS']) || 0)) / 100 +
                  (totalAmount * (parseFloat(formData['TCS']) || 0)) / 100
                : totalAmount}
        </p>
      </div>
      <div className="mt-4 w-full border rounded p-2">
        <label className="block mb-1 font-medium">Description:</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleDescription}
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

export default EditPurchaseForm;
