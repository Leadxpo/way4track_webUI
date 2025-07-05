import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generatePDF, { PurchaseOrderPDF } from '../../common/commonUtils';
import { MyPDF } from '../../common/commonUtils';
import { PDFDownloadLink, pdf, PDFViewer } from '@react-pdf/renderer';
import { TaxInvoicePDF } from '../../components/TaxInvoicePdf';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { InvoicePDF } from './invoicePDF';
import states from '../../mockData/state';

const EditInvoice = () => {
  const navigate = useNavigate();
  const [isGST, setIsGST] = useState(true);
  console.log(isGST, 'gst or tds');

  const location = useLocation();
  const invoiceDetails = location.state?.invoiceDetails;

  // Initial state for form
  const initialFormState = {
    id: '',
    clientId: '',
    client: '',
    clientNumber: '',
    email: '',
    clientAddress: '',
    buildingAddress: '',
    shippingAddress: '',
    taxableState: '',
    supplyState: '',
    estimateDate: '',
    expireDate: '',
    cgstPercentage: '',
    scstPercentage: '',
    includeTax: '',
    CGST: 0,
    SCST: 0,
    GSTORTDS: '',
    items: [
      {
        productId: '',
        name: '',
        quantity: '',
        rate: '',
        amount: '',
        hsnCode: '',
        description: '',
      },
    ],
    terms: '',
    totalAmount: 0,
    description: '',
    branchId: '',
    accountId: '',
  };
  // name: string; quantity: number; amount: number, costPerUnit: number, totalCost: number, hsnCode: string
  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      const itemAmount = parseFloat(item.totalCost) || 0; // Ensure amount is treated as a number
      return total + itemAmount;
    }, 0);
  };
  // Populate form state for edit mode
  const [formData, setFormData] = useState(initialFormState);
  const [serveProd, setServeProd] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState('');

  const changeServeProd = (index, e) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index].type = e.target.value;
    setFormData({ ...formData, products: updatedProducts });
  };

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchProducts();
    fetchServices();
    fetchEstimation();
  }, []);

  useEffect(() => {
    if (isGST) {
      setFormData((prevData) => ({
        ...prevData,
        GSTORTDS: formData.taxableState === formData.supplyState ? 'GST' : "IGST",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        GSTORTDS: 'TDS',
      }));
    }
  }, [isGST, formData.taxableState, formData.supplyState]);

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
      const res = await ApiService.post(
        '/productType/getProductTypeNamesDropDown'
      );
      console.log('++====', res.data);
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setProducts([]);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await ApiService.post(
        'ServiceType/getServiceTypeNamesDropDown'
      );
      console.log('++==== producttttttt yyyy', res.data);
      setServices(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setServices([]);
    }
  };

  const handleClientChange = (e) => {

    const selectedId = Number(e.target.value);
    const selectedClient = clients.find((client) => client.id === selectedId);

    if (!selectedClient) return;

    setFormData((prevData) => ({
      ...prevData,
      client: selectedId,
      clientName: selectedClient.name || '',
      clientNumber: selectedClient.phoneNumber || '',
      email: selectedClient.email || '',
      clientAddress: selectedClient.address || '',
      billingAddress: selectedClient.address || '',
      shippingAddress: selectedClient.address || '',
      clientId: selectedClient.clientId || '',
    }));

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'branchId') {
      setFormData((prevData) => ({
        ...prevData,
        branchId: value,
        accountId: '',
      }));

      const selected = branches.find((branch) => branch.id === parseInt(value));
      setSelectedBranch(selected);
      setSelectedAccountId('');
    } else if (name === 'accountId') {
      setFormData((prevData) => ({
        ...prevData,
        accountId: value,
      }));
      setSelectedAccountId(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle items dynamically
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleRateChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    updatedItems[index]['quantity'] = '';
    updatedItems[index]['amount'] = '';
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleProductItemChange = (index, e) => {
    const { name, value } = e.target;
    console.log(value);

    const selectedProduct = products.find(
      (product) => product.productType.trim() === value.trim()
    );

    if (!selectedProduct) {
      console.error('Selected product not found');
      return; // Prevents further execution if no product is found
    }

    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    updatedItems[index]['productId'] = selectedProduct.id;
    updatedItems[index]['rate'] = selectedProduct.price;
    updatedItems[index]['hsnCode'] = selectedProduct.hsnCode;

    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleService = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    updatedItems[index]['productId'] = null;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleProductItemQuantityChange = (index, e) => {
    const { name, value } = e.target;

    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    const productPrice = updatedItems[index]['costPerUnit']
      ? updatedItems[index]['costPerUnit']
      : 0;
    updatedItems[index]['totalCost'] = parseInt(value) * parseInt(productPrice);
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
        { name: '', quantity: '', rate: '', amount: '', hsnCode: '', description: "" },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleSave = async () => {
    const estimateDto = {
      // clientId: formData.clientNumber,
      id: invoiceDetails.invoice.id,
      clientId: formData.clientId,
      buildingAddress: formData.buildingAddress,
      shippingAddress: formData.shippingAddress,
      taxableState: formData.taxableState,
      supplyState: formData.supplyState,
      estimateDate: formData.estimateDate,
      expireDate: formData.expireDate,
      productOrService: formData.items.map((item) => item.name).join(', '),
      description: formData.description,
      convertToInvoice: true,
      totalAmount: formData.items.reduce(
        (total, item) => total + parseFloat(item.totalCost || 0),
        0
      ),
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      estimateId: formData.estimateId || undefined,
      invoiceId: formData.invoiceId || undefined,
      GSTORTDS: formData.GSTORTDS || undefined,
      SCST: formData.SCST || 0,
      CGST: formData.CGST || 0,
      tds: formData.tds,
      quantity: formData.items.reduce(
        (total, item) => total + parseInt(item.quantity, 10),
        0
      ),
      cgstPercentage: formData.cgstPercentage || 0,
      scstPercentage: formData.scstPercentage || 0,
      productDetails: formData.items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: parseInt(item.quantity, 10),
        totalCost: parseInt(item.totalCost, 10),
        costPerUnit: parseFloat(item.costPerUnit),
        type: item.type,
        hsnCode: item.hsnCode,
        description: item.description,
      })),
      branchId: formData.branchId,
      accountId: formData.accountId,
    };

    // Get Client Details
    const client = clients.find(
      (c) => c.id === (formData.id || estimateDto.id)
    );
    const branchDetails = branches.find(
      (branch) => branch.id === Number(estimateDto.branchId)
    );
    const pdfData = {
      ...estimateDto,
      clientName: client ? client.name : 'Unknown',
      clientGST: client ? client.gstNumber : '',
      branchDetails,
    };

    // Generate PDF as Binary (Blob → File)
    const generatePdf = async (data) => {
      const pdfBlob = await pdf(<InvoicePDF data={data} />).toBlob();
      return new File([pdfBlob], 'invoice.pdf', { type: 'application/pdf' });
    };

    try {



      const pdfFile = await generatePdf(pdfData);

      const cgst = (estimateDto.totalAmount * formData.cgstPercentage) / 100;
      const scst = (estimateDto.totalAmount * formData.scstPercentage) / 100;
      const includeTax = estimateDto.totalAmount + cgst + scst;
      // Create FormData to send binary data
      const formDataPayload = new FormData();

      formDataPayload.append('id', estimateDto.id);
      formDataPayload.append('clientId', estimateDto.clientId);
      formDataPayload.append('buildingAddress', estimateDto.buildingAddress);
      formDataPayload.append('shippingAddress', estimateDto.shippingAddress);
      formDataPayload.append('taxableState', estimateDto.taxableState);
      formDataPayload.append('supplyState', estimateDto.supplyState);
      formDataPayload.append('invoicePDF', pdfFile); // Attach PDF file
      formDataPayload.append('estimateDate', estimateDto.estimateDate);
      formDataPayload.append('expireDate', estimateDto.expireDate);
      formDataPayload.append('productOrService', serveProd);
      formDataPayload.append('description', estimateDto.description);
      formDataPayload.append('totalAmount', estimateDto.totalAmount);
      formDataPayload.append('companyCode', 'WAY4TRACK');
      formDataPayload.append('unitCode', 'WAY4');
      formDataPayload.append('convertToInvoice', true);
      formDataPayload.append('GSTORTDS', estimateDto.GSTORTDS || '');
      formDataPayload.append('CGST', cgst);
      formDataPayload.append('SCST', scst);
      formDataPayload.append('branchId', estimateDto.branchId);
      formDataPayload.append('accountId', estimateDto.accountId);
      formDataPayload.append('includeTax', includeTax);
      formDataPayload.append(
        'cgstPercentage',
        estimateDto.cgstPercentage || '0'
      );
      formDataPayload.append(
        'scstPercentage',
        estimateDto.scstPercentage || '0'
      );
      formDataPayload.append(
        'invoiceId',
        invoiceDetails.invoice.invoiceId
      );
      // Append Product Details as JSON String
      formDataPayload.append(
        'productDetails',
        JSON.stringify(estimateDto.productDetails)
      );

      console.log('--- FormData Debug Start ---');
      for (let pair of formDataPayload.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      console.log('--- FormData Debug End ---');

      // console.log('formDataPayload! estimate estimateeeee5',formDataPayload);
      // Send FormData with Binary PDF
      await ApiService.post(
        '/estimate/handleEstimateDetails',
        formDataPayload,
        {
          headers: { 'Content-Type': 'multipart/form-data' }, // Important for binary data
        }
      );
      alert('Estimate updated successfully!');
      navigate('/invoice');
    } catch (err) {
      console.error('Failed to save estimate:', err);
      alert('Failed to save estimate!', err);
    }
  };

  const fetchEstimation = async () => {

    try {
      const response = await ApiService.post('/estimate/getEstimateDetails', {
        estimateId: invoiceDetails.invoice.estimateId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      if (response.status) {
        const data = response.data[0];

        const CGST = parseFloat(data.CGST) || 0;
        const SCST = parseFloat(data.SCST) || 0;
        const totalAmount = parseFloat(data.totalAmount) || 0;

        const cgstPercentage = totalAmount
          ? Math.round((CGST * 100) / totalAmount)
          : 0;
        const scstPercentage = totalAmount
          ? Math.round((SCST * 100) / totalAmount)
          : 0;

        const matchedClient = clients.find((c) => c.clientId === data.clientId);

        setFormData({
          CGST,
          SCST,
          cgstPercentage,
          scstPercentage,
          totalAmount,
          buildingAddress: data.buildingAddress,
          shippingAddress: data.shippingAddress,
          taxableState: data.taxableState,
          supplyState: data.supplyState,
          clientAddress: data.clientAddress,
          clientId: data.clientId,
          client: matchedClient?.id || '',
          clientName: matchedClient?.name || '',
          clientNumber: data.clientPhoneNumber, 
          email: data.clientEmail,
          companyCode: data.companyCode,
          description: data.description,
          estimateDate: data.estimateDate,
          estimateId: data.estimateId,
          invoicePdfUrl: data.invoicePdfUrl,
          expireDate: data.expireDate,
          id: data.id,
          invoiceId: data.invoiceId,
          invoicePdfUrl: data.invoicePdfUrl,
          productOrService: data.productOrService,
          items: data.products,
          unitCode: data.unitCode,
          vendorId: data.vendorId,
          vendorName: data.vendorName,
          vendorPhoneNumber: data.vendorPhoneNumber,
          branchId: data.branchId,
          accountId: data.accountId,
        });
        if (data.GSTORTDS==="TDS") {
          setIsGST(false)
        }
      } else {
        console.error('Failed to fetch estimate details');
      }
    } catch (error) {
      console.error('Error fetching estimate details:', error);
    }
  };

  useEffect(() => {
    if (formData.branchId && branches.length > 0) {
      const branch = branches.find((b) => b.id === parseInt(formData.branchId));
      setSelectedBranch(branch || null);
    }

    if (formData.accountId) {
      setSelectedAccountId(formData.accountId);
    }
  }, [formData.branchId, formData.accountId, branches]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post('/branch/getBranchDetails');
        if (response.status) {
          setBranches(response.data);
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    if (clients.length > 0 && formData.clientId) {
      const matchedClient = clients.find((c) => c.clientId === formData.clientId);
      setFormData((prev) => ({
        ...prev,
        client: matchedClient?.id || '',
      }));
    }
  }, [clients, formData.clientId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl w-11/12 max-w-4xl p-8 shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Invoice</h1>
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
                  <option key={client.id} value={client.id}>
                    {client.name || `Client ${client.clientId}`}
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
                // onChange={handleInputChange}
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
                // onChange={handleInputChange}
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
                name="buildingAddress"
                value={formData.buildingAddress}
                onChange={handleInputChange}
                placeholder="Billing Address"
                className="w-full h-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Shipping Address
              </label>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                placeholder="Shipping Address"
                className="w-full h-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Branches
              </label>
              <select
                name="branchId"
                value={formData.branchId}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Branches</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
              {selectedBranch && selectedBranch.accounts.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-1">
                    Account
                  </label>
                  <select
                    name="accountId"
                    value={selectedAccountId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Account</option>
                    {selectedBranch.accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name} - {account.accountNumber}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between ">
              <div className="mb-auto">
                <label className="block text-sm font-semibold mb-1">
                  Estimate Date
                </label>
                <input
                  type="date"
                  name="estimateDate"
                  value={
                    formData.estimateDate
                      ? formData.estimateDate.split('T')[0]
                      : ''
                  }
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
                  value={formData.expireDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Taxable State
              </label>
              <select
                name="taxableState"
                value={formData.taxableState}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.gst_code} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">
                  Supply State
                </label>
                <select
                  name="supplyState"
                  value={formData.supplyState}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Account</option>
                  {states.map((state) => (
                    <option key={state.gst_code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
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
                <span className="col-span-2 font-semibold">Rate</span>
                <span className="col-span-2 font-semibold">Quantity</span>
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
                      value={item.type} // Bind value to state
                      onChange={(e) => changeServeProd(index, e)} // Update state correctly
                      className="col-span-2 p-2 border rounded-md w-full"
                    >
                      <option value="">Select Type</option>
                      <option value="service">Service</option>
                      <option value="product">Product</option>
                    </select>

                    {/* Product or Service Selection */}
                    {item.type === 'product' ? (
                      <select
                        name="name"
                        value={item.name}
                        onChange={(e) => handleProductItemChange(index, e)}
                        className="col-span-2 p-2 border rounded-md w-full"
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product?.id} value={product?.name}>
                            {product?.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        name="name"
                        value={item.name}
                        onChange={(e) => handleProductItemChange(index, e)}
                        className="col-span-2 p-2 border rounded-md w-full"
                      >
                        <option value="">Select Service</option>
                        {services.map((service) => (
                          <option key={service?.id} value={service?.name}>
                            {service?.name}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* Rate Input */}
                    <input
                      type="text"
                      name="costPerUnit"
                      value={item.costPerUnit}
                      onChange={(e) => handleRateChange(index, e)}
                      placeholder="Rate"
                      className="col-span-2 p-2 border rounded-md w-full"
                    />

                    <input
                      type="text"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        handleProductItemQuantityChange(index, e)
                      }
                      placeholder="Quantity"
                      className="col-span-2 p-2 border rounded-md w-full"
                    />

                    {/* Amount Input */}
                    <input
                      type="number"
                      name="totalCost"
                      value={item.totalCost}
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
                    <textarea
                      type="text"
                      name="description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder="description"
                      style={{width:500 }}
                      className="col-span-2 p-2 border rounded-md w-full"
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      style={{position:'relative',right:-450}}
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
            Total Estimate Amount : {formData?.totalAmount}
          </strong>

          <div className="flex items-center space-x-2">
            <span
              className={
                !isGST ? 'font-semibold text-blue-600' : 'text-gray-400'
              }
            >
              TDS Enabled
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                aria-label="Toggle between TDS and GST"
                checked={isGST}
                onChange={() => {
                  setIsGST(!isGST);
                  setFormData((prevData) => ({
                    ...prevData,
                    cgstPercentage: '',
                    scstPercentage: '',
                    CGST: '',
                    SCST: '',
                  }));
                }}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-600 relative">
                <div
                  className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-transform ${isGST ? 'translate-x-7' : ''
                    }`}
                ></div>
              </div>
            </label>
            <span className={isGST ? 'font-semibold' : 'text-gray-400'}>
              {formData.taxableState === formData.supplyState ? " GST Enabled" : "IGST Enable"}
            </span>
          </div>

          {isGST ? (
            <div>
              <label className="block text-sm font-semibold mb-1">CGST %</label>
              <input
                type="number"
                name="cgstPercentage"
                value={formData.cgstPercentage}
                onChange={handleInputChange}
                placeholder="CGST %"
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-700 mt-1">
                CGST Amount: ₹
                {(
                  (+formData.totalAmount * +formData.cgstPercentage) /
                  100
                ).toFixed(2)}
              </p>
              {formData.taxableState === formData.supplyState &&
                <>
                  <label className="block text-sm font-semibold mb-1">SGST %</label>
                  <input
                    type="number"
                    name="scstPercentage"
                    value={formData.scstPercentage}
                    onChange={handleInputChange}
                    placeholder="SGST %"
                    className="w-full p-2 border rounded-md"
                  />
                  <p className="text-sm text-gray-700 mt-1">
                    SGST Amount: ₹
                    {(
                      (+formData.totalAmount * +formData.scstPercentage) /
                      100
                    ).toFixed(2)}
                  </p>
                </>
              }
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold mb-1">TDS %</label>
              <input
                type="number"
                name="cgstPercentage"
                value={formData.cgstPercentage}
                onChange={handleInputChange}
                placeholder="TDS %"
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-700 mt-1">
                TDS Amount: ₹
                {(
                  (+formData.totalAmount * +formData.cgstPercentage) /
                  100
                ).toFixed(2)}
              </p>
            </div>
          )}
          <div>
            {isGST ? (
              <strong className="col-span-2 font-semibold">
                Total Estimate Amount (Include Tax) :{' '}
                {formData.totalAmount +
                  (formData.totalAmount * formData.cgstPercentage) / 100 +
                  (formData.totalAmount * formData.scstPercentage) / 100}
              </strong>
            ) : (
              <strong className="col-span-2 font-semibold">
                Total Estimate Amount (Include Tax) :{' '}
                {formData.totalAmount +
                  (formData.totalAmount * formData.cgstPercentage) / 100}
              </strong>
            )}
          </div>

          {/* Terms & Conditions */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Other Information / Terms & Conditions
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add Terms and Conditions"
              className="w-full p-2 border rounded-md"
              style={{ height: 300 }}
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

export default EditInvoice;
