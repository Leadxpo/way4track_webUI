import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generatePDF, { PurchaseOrderPDF } from '../../common/commonUtils';
import { MyPDF } from '../../common/commonUtils';
import { PDFDownloadLink, pdf, PDFViewer } from '@react-pdf/renderer';
import { TaxInvoicePDF } from '../../components/TaxInvoicePdf';
import ApiService, { initialAuthState } from '../../services/ApiService';
import EstimatePDF from './EstimatePDF';

const AddEstimate = () => {
  const navigate = useNavigate();
  const [isGST, setIsGST] = useState(true);
  // Check if editing or creating
  // Initial state for form
  const initialFormState = {
    client: '',
    clientNumber: '',
    email: '',
    clientAddress: '',
    billingAddress: '',
    estimateDate: '',
    expiryDate: '',
    items: [
      {
        productId: '',
        name: '',
        quantity: '',
        rate: '',
        amount: '',
        hsnCode: '',
      }
    ],
    terms: '',
    totalAmount: 0,
  };
  // name: string; quantity: number; amount: number, costPerUnit: number, totalCost: number, hsnCode: string
  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      const itemAmount = parseFloat(item.amount) || 0; // Ensure amount is treated as a number
      return total + itemAmount;
    }, 0);
  };
  // Populate form state for edit mode
  const [formData, setFormData] = useState(initialFormState);
  const [serveProd, setServeProd] = useState("");


  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  console.log("++++++",products)
  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await ApiService.post('/client/getClientDetails');
      setClients(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setClients([]);
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await ApiService.post('/products/getAllproductDetails');
      console.log("++====",res.data)
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setProducts([]);
    }
  };

  const handleClientChange = (e) => {
    const selectedClient = clients.find(
      (client) => client.name === e.target.value
    );
    setFormData((prevData) => ({
      ...prevData,
      client: selectedClient.name,
      clientNumber: selectedClient.clientId,
      email: selectedClient.email,
      clientAddress: selectedClient.address,
    }));


  };

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

  const handleProductItemChange = (index, e) => {
    const { name, value } = e.target;
    // const selectedProduct1 = products.find((product) => product.productType === value);
    const selectedProduct = products.find((product) => {
      return product.productType === e.target.value;
    });
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    updatedItems[index]['productId'] = selectedProduct.id;
    updatedItems[index]['rate'] = selectedProduct.price;
    updatedItems[index]['hsnCode'] = selectedProduct.hsnCode;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleService = (index, e) => {
    const { name, value } = e.target;
    // const selectedProduct1 = products.find((product) => product.productType === value);
    const selectedProduct = products.find((product) => {
      return product.productType === e.target.value;
    });
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    updatedItems[index]['productId'] = null;
    updatedItems[index]['rate'] = selectedProduct.rate;
    updatedItems[index]['hsnCode'] = selectedProduct.hsnCode;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleProductItemQuantityChange = (index, e) => {
    const { name, value } = e.target;

    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    const productPrice = updatedItems[index]['rate']
      ? updatedItems[index]['rate']
      : 0;
    updatedItems[index]['amount'] = parseInt(value) * parseInt(productPrice);
    const totalProductsAmount = calculateTotal(updatedItems);
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: totalProductsAmount,
      items: updatedItems,
    }));
  };

  const addNewItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { name: '', quantity: '', rate: '', amount: '', hsnCode: '' },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleSave = async () => {
    const estimateDto = {
      clientId: formData.clientNumber,
      buildingAddress: formData.billingAddress,
      estimateDate: formData.estimateDate,
      expireDate: formData.expiryDate,
      productOrService: formData.items.map((item) => item.name).join(", "),
      description: formData.terms,
      totalAmount: formData.items.reduce(
        (total, item) => total + parseFloat(item.amount || 0),
        0
      ),
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      estimateId: formData.estimateId || undefined,
      invoiceId: formData.invoiceId || undefined,
      GSTORTDS: formData.GSTORTDS || undefined,
      SCST: formData.SCST || 0,
      CGST: formData.CGST || 0,
      quantity: formData.items.reduce(
        (total, item) => total + parseInt(item.quantity, 10),
        0
      ),
      cgstPercentage: formData.cgstPercentage || 0,
      scstPercentage: formData.scstPercentage || 0,
      convertToInvoice: formData.convertToInvoice || false,
      productDetails: formData.items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: parseInt(item.quantity, 10),
        totalCost: parseFloat(item.rate) * parseInt(item.quantity, 10),
        costPerUnit: parseFloat(item.rate),
        hsnCode: parseFloat(item.hsnCode),
      })),
    };
  
    // Get Client Details
    const client = clients.find((c) => c.id === (formData.id || estimateDto.id));
    const pdfData = {
      ...estimateDto,
      clientName: client ? client.name : "Unknown",
      clientGST: client ? client.gstNumber : "",
    };
  
    // Generate PDF as Binary (Blob → File)
    const generatePdf = async (data) => {
      const pdfBlob = await pdf(<EstimatePDF data={data} />).toBlob();
      return new File([pdfBlob], "estimate.pdf", { type: "application/pdf" });
    };
  
    try {
      const pdfFile = await generatePdf(pdfData); // Generate PDF File
  console.log("acsdbttrdf : ",pdfFile)
      // Create FormData to send binary data
      const formDataPayload = new FormData();
      formDataPayload.append("estimatePdf", pdfFile); // Attach PDF file
      formDataPayload.append("clientId", estimateDto.clientId);
      formDataPayload.append("buildingAddress", estimateDto.buildingAddress);
      formDataPayload.append("estimateDate", estimateDto.estimateDate);
      formDataPayload.append("expireDate", estimateDto.expireDate);
      formDataPayload.append("productOrService", serveProd);
      formDataPayload.append("description", estimateDto.description);
      formDataPayload.append("totalAmount", estimateDto.totalAmount);
      formDataPayload.append("companyCode","WAY4TRACK" );
      formDataPayload.append("unitCode","WAY4" );
      // formDataPayload.append("GSTORTDS", estimateDto.GSTORTDS || "");
      // formDataPayload.append("SCST", estimateDto.SCST || "0");
      // formDataPayload.append("CGST", estimateDto.CGST || "0");
      // formDataPayload.append("cgstPercentage", estimateDto.cgstPercentage || "0");
      // formDataPayload.append("scstPercentage", estimateDto.scstPercentage || "0");
      // formDataPayload.append("convertToInvoice", estimateDto.convertToInvoice || "false");
  
      // Append Product Details as JSON String
      formDataPayload.append("productDetails", JSON.stringify(estimateDto.productDetails));
  
      // Send FormData with Binary PDF
      await ApiService.post("/estimate/handleEstimateDetails", formDataPayload, {
        headers: { "Content-Type": "multipart/form-data" }, // Important for binary data
      });
  
      console.log("Estimate saved successfully!");
    } catch (err) {
      console.error("Failed to save estimate:", err);
    }
  };
  
  


  const gridData = {
    consigneeName: 'Nava Durga Stone Crusher',
    gstin: '37ACFPN5800Q1Z5',
    stateAddress: 'Andhra Pradesh',
    stateCode: '37',
    supplyPlace: 'Andhra Pradesh',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl w-11/12 max-w-4xl p-8 shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Estimates qq
        </h1>
        {/* Form */}
        <form className="space-y-6">
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Client</label>
              <select
                name="client"
                value={formData.client}
                onChange={handleClientChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
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
                readOnly
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
                  Estimate Date
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
                  Expiry Date
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
                <span className="col-span-2 font-semibold">Type</span>
                <span className="col-span-2 font-semibold">Name</span>
                <span className="col-span-2 font-semibold">Quantity</span>
                <span className="col-span-2 font-semibold">Rate</span>
                <span className="col-span-2 font-semibold">Amount</span>
                <span className="col-span-2 font-semibold">HSN Code</span>
                <span className="col-span-1 font-semibold"></span>
              </div>

                {/* Items Rows */}
{formData.items &&
  formData.items.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-12 gap-2 items-center p-2 border-t"
    >
      <span className="col-span-1">{index + 1}</span>

      {/* Type Selection */}
      <select
        name="type"
        value={serveProd} // Bind value to state
        onChange={(e) => setServeProd(e.target.value)} // Update state correctly
        className="col-span-2 p-2 border rounded-md w-full"
      >
        <option value="">Select Type</option>
        <option value="service">Service</option>
        <option value="product">Product</option>
      </select>

      {/* Product or Service Selection */}
      {serveProd === "product" ? (
        <select
          name="name"
          value={item.name}
          onChange={(e) => handleProductItemChange(index, e)}
          className="col-span-2 p-2 border rounded-md w-full"
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product?.id} value={product?.productName}>
              {product?.productType}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={(e) => handleService(index, e)}
          placeholder="Service"
          className="col-span-2 p-2 border rounded-md w-full"
        />
      )}

<input
          type="text"
          name="quantity"
          value={item.quantity}
          onChange={(e) => handleProductItemQuantityChange(index, e)}
          placeholder="Quantity"
          className="col-span-2 p-2 border rounded-md w-full"
        />

      {/* Rate Input */}
      <input
        type="text"
        name="rate"
        value={item.rate}
        onChange={(e) => handleItemChange(index, e)}
        placeholder="Rate"
        className="col-span-2 p-2 border rounded-md w-full"
      />

      {/* Amount Input */}
      <input
        type="number"
        name="amount"
        value={item.amount}
        onChange={(e) => handleItemChange(index, e)}
        placeholder="Amount"
        className="col-span-2 p-2 border rounded-md w-full"
      />

      {/* HSN Code Input */}
      <input
        type="text"
        name="hsnCode"
        value={item.hsnCode}
        onChange={(e) => handleItemChange(index, e)}
        placeholder="HSN code"
        className="col-span-2 p-2 border rounded-md w-full"
      />

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => removeItem(index)}
        className="bg-gray-100 rounded-md w-fit p-2"
      >
        -
      </button>
    </div>
  ))}

              <div className="flex justify-end p-2">
                <button
                  type="button"
                  onClick={addNewItem}
                  className="text-blue-500 text-sm font-semibold mt-2 ml-2"
                >
                  + Add Item
                </button>
              </div>
            </div>
          </div>
          <strong className="col-span-2 font-semibold">
            Total Estimate Amount : {formData.totalAmount}
          </strong>


          <label>
        <input
          type="checkbox"
          checked={isGST}
          onChange={() => setIsGST(!isGST)}
        />
        {isGST ? "GST Enabled" : "TDS Enabled"}
      </label>
          {/* Terms & Conditions */}
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

          {/* Buttons */}
          <div className="flex space-x-4 justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEstimate;
