import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';
const AddEditInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if editing or creating
  const isEditMode = location.state?.invoiceDetails
    ? location.state?.isConvert
      ? false
      : true
    : false;

  useEffect(() => {
    console.log(location.state);
    if (location.state?.invoiceDetails) {
      const { estimateData } = location.state.invoiceDetails;
      console.log("estimateData estimateDataestimateData",estimateData)
      setFormData({
        
        SCST:estimateData.SCST,
        CGST:estimateData.CGST,

        client: estimateData.billTo.name,
        clientNumber: estimateData.billTo.phone,
        email: estimateData.billTo.email,
        clientAddress: estimateData.billTo.address,
        billingAddress: estimateData.billTo.address,
        estimateDate: estimateData.estimateDetails.date.split('T')[0],
        expiryDate: estimateData.estimateDetails.expiryDate,
        cgstPercentage:(estimateData.CGST * 100) / estimateData.estimateDetails.amount,
        scstPercentage:(estimateData.SCST * 100) / estimateData.estimateDetails.amount,
        items: estimateData.products.map((product) => ({
          name: product.name,
          qauntity: product.quantity,
          rate: product.rate,
          hsnCode: product.hsnCode,
          amount: product.totalAmount,
        })),
        terms: estimateData.terms,
      });
    }
  }, [location.state]);

  // Initial state for form
  const initialFormState = {
    client: '',
    clientNumber: '',
    email: '',
    clientAddress: '',
    billingAddress: '',
    estimateDate: '',
    expiryDate: '',
    items: [{ name: '', qauntity: '', rate: '', hsnCode: '', amount: '' }],
    terms: '',
  };

  // Populate form state for edit mode
  const [formData, setFormData] = useState(initialFormState);

  const [totalAmount, setTotalAmount] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgstPercentage, setSgstPercentage] = useState(9);
  const [cgstPercentage, setCgstPercentage] = useState(9);
  // Calculate total, SGST, and CGST
  useEffect(() => {
    const calculatedTotal = formData.items.reduce(
      (acc, item) => acc + parseFloat(item.amount || 0),
      0
    );
    setTotalAmount(calculatedTotal);
    const calculatedSgst = (calculatedTotal * sgstPercentage) / 100;
    const calculatedCgst = (calculatedTotal * cgstPercentage) / 100;
    setSgst(calculatedSgst);
    setCgst(calculatedCgst);
  }, [formData.items, sgstPercentage, cgstPercentage]);

  // Handle field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle items dynamically
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const addNewItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { name: '', qauntity: '', rate: '', hsnCode: '', amount: '' },
      ],
    }));
  };

  const handleSave = async () => {
    const estimateDto = {
      clientId: location.state.invoiceDetails.estimateData.billTo.clientId,
      buildingAddress: formData.billingAddress,
      estimateDate: formData.estimateDate,
      expireDate: formData.expiryDate,
      productOrService: formData.items.map((item) => item.name).join(', '),
      description: formData.terms,
      totalAmount: formData.items.reduce(
        (total, item) => total + parseFloat(item.amount || 0),
        0
      ),
      convertToInvoice: true,
      companyCode: initialAuthState.companyCode, // Replace with actual company code
      unitCode: initialAuthState.unitCode, // Replace with actual unit code
      // estimateId: formData.estimateId || undefined,
      // invoiceId: formData.invoiceId || undefined, // Optional based on the DTO
      // GSTORTDS: formData.GSTORTDS || undefined, // Optional based on the DTO
      SCST: sgst || 0, // Default or from formData
      CGST: cgst || 0, // Default or from formData
      // quantity: formData.items.reduce(
      //   (total, item) => total + parseInt(item.quantity, 10),
      //   0
      // ),
      // hsnCode: formData.items[0].hsnCode,
      scstPercentage: sgstPercentage, // For temporary use
      cgstPercentage: cgstPercentage, // For temporary use
      productDetails: formData.items.map((item) => ({
        productId: item.productId, // Assuming each item has a productId
        productName: item.name,
        quantity: parseInt(item.quantity, 10),
        amount: parseFloat(item.rate) * parseInt(item.quantity, 10), // Total cost calculation
        hsnCode: parseFloat(item.hsnCode), // Total cost calculation
      })),
    };

    
    // invoicePDF
    console.log(estimateDto);
    console.log('date type', typeof estimateDto.estimateDate);
    try {
      await ApiService.post('/estimate/handleEstimateDetails', estimateDto);
      console.log('Estimate saved:', estimateDto);
      navigate('/estimate');
    } catch (err) {
      console.error('Failed to save estimate:', err);
    }
    navigate('/invoice');
  };

  const handleSaveAndSend = () => {
    console.log('Saving and sending estimate:', formData);
    // navigate('/invoice');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl w-11/12 max-w-4xl p-8 shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? 'Edit Invoice' : 'Create Invoice'}
        </h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Client</label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                placeholder="Client Name"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Client Number
              </label>
              <input
                type="text"
                name="clientNumber"
                value={formData.clientNumber}
                onChange={handleInputChange}
                placeholder="Client Number"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Client Address
              </label>
              <textarea
                name="clientAddress"
                value={formData.clientAddress}
                onChange={handleInputChange}
                placeholder="Client Address"
                className="w-full h-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Billing Address
              </label>
              <textarea
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                placeholder="Billing Address"
                className="w-full h-full p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between ">
              <div className="mb-auto">
                <label className="block text-sm font-semibold mb-1">
                  Created Date
                </label>
                <input
                  type="date"
                  name="estimateDate"
                  value={formData.estimateDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-auto">
                <label className="block text-sm font-semibold mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <label className="block text-sm font-semibold mb-1">Items</label>
            <div className="border border-gray-300 rounded-md">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-2 bg-gray-100 p-2">
                <span className="col-span-1 font-semibold">#</span>
                <span className="col-span-2 font-semibold">Name</span>
                <span className="col-span-2 font-semibold">Quantity</span>
                <span className="col-span-2 font-semibold">Rate</span>
                <span className="col-span-2 font-semibold">HSN Code</span>
                <span className="col-span-2 font-semibold">Amount</span>
              </div>

              {/* Items Rows */}
              {formData.items &&
                formData.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-2 items-center p-2 border-t"
                  >
                    <span className="col-span-1">{index + 1}</span>
                    <input
                      type="text"
                      name="name"
                      value={item.name}
                      // onChange={(e) => handleItemChange(index, e)}
                      placeholder="Name"
                      className="col-span-2 p-2 border rounded-md"
                    />
                    <input
                      type="text"
                      name="qauntity"
                      value={item.qauntity}
                      // onChange={(e) => handleItemChange(index, e)}
                      placeholder="Quantity"
                      className="col-span-2 p-2 border rounded-md"
                    />
                    <input
                      type="number"
                      name="rate"
                      value={item.rate}
                      // onChange={(e) => handleItemChange(index, e)}
                      placeholder="Rate"
                      className="col-span-2 p-2 border rounded-md"
                    />
                    <input
                      type="number"
                      name="hsnCode"
                      value={item.hsnCode}
                      // onChange={(e) => handleItemChange(index, e)}
                      placeholder="HSN Code"
                      className="col-span-2 p-2 border rounded-md"
                    />
                    <input
                      type="number"
                      name="amount"
                      value={item.amount}
                      // onChange={(e) => handleItemChange(index, e)}
                      placeholder="Amount"
                      className="col-span-2 p-2 border rounded-md"
                    />
                  </div>
                ))}
              {/* <div className="flex justify-end p-2">
                <button
                  type="button"
                  onClick={addNewItem}
                  className="text-blue-500 text-sm font-semibold mt-2 ml-2"
                >
                  + Add Item
                </button>
              </div> */}
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-4">
            <table className="w-full text-right">
              {/* Total */}
              <tr className="border-b">
                <td className="text-right py-2">Total</td>
                <td className="pr-4">₹{totalAmount.toFixed(2)}</td>
              </tr>

              {/* SGST Tax */}
              <tr className="border-b">
                <td className="text-right py-2">
                  SGST Tax{' '}
                  <span>
                    <input
                      value={formData?.scstPercentage}
                      className="w-16 text-center outline:none border rounded-md p-1 mx-2"
                      placeholder="9%"
                      // onChange={(e) => setSgstPercentage(e.target.value)}
                    />
                  </span>
                  %
                </td>
                <td>
                  <input
                    type="text"
                    value={`₹${formData?.SCST?.toFixed(2)}`}
                    readOnly
                    className="bg-blue-50 text-right border rounded-md px-2 w-24"
                  />
                </td>
              </tr>

              {/* CGST Tax */}
              <tr className="border-b">
                <td className="text-right py-2">
                  CGST Tax{' '}
                  <span>
                    <input
                      value={formData?.cgstPercentage}
                      className="w-16 text-center outline:none border rounded-md p-1 mx-2"
                      placeholder="9%"
                      // onChange={(e) => setCgstPercentage(e.target.value)}
                    />
                  </span>
                  %
                </td>
                <td>
                  <input
                    type="text"
                    value={`₹${formData?.CGST?.toFixed(2)}`}
                    readOnly
                    className="bg-blue-50 text-right border rounded-md px-2 w-24"
                  />
                </td>
              </tr>

              {/* Final Total */}
              <tr className="border-b">
                <td className="text-right py-2 font-semibold">Final Total</td>
                <td className="pr-4 font-semibold">
                  ₹{(totalAmount + formData?.SCST + formData?.CGST).toFixed(2)}
                </td>
              </tr>
            </table>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Other Information / Terms & Conditions
            </label>
            <textarea
              name="terms"
              value={formData.terms}
              onChange={handleInputChange}
              placeholder="Add Terms and Conditions"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-6">
            {/* <button
              type="button"
              onClick={handleSave}
              className="py-2 px-4 text-white bg-blue-500 rounded-md"
            >
              Save
            </button> */}
            <button
              type="button"
              onClick={handleSaveAndSend}
              className="py-2 px-4 text-white bg-green-500 rounded-md"
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditInvoice;
