import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generatePDF, { PurchaseOrderPDF } from '../../common/commonUtils';
import { MyPDF } from '../../common/commonUtils';
import { PDFDownloadLink, pdf, PDFViewer } from '@react-pdf/renderer';
import { TaxInvoicePDF } from '../../components/TaxInvoicePdf';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { InvoicePDF } from './invoicePDF';
// import EstimatePDF from './EstimatePDF';

const AddEditInvoice = () => {
  const navigate = useNavigate();
  const [isGST, setIsGST] = useState(true);
  // Check if editing or creating
  // Initial state for form
  const initialFormState = {
    client: '',
    clientNumber: '',
    clientId: '',
    email: '',
    clientAddress: '',
    billingAddress: '',
    shippingAddress: '',
    estimateDate: '',
    expiryDate: '',
    cgstPercentage: '',
    scstPercentage: '',
    tdsPercentage: '',
    includeTax: '',
    CGST: '',
    SCST: '',
    GSTORTDS: isGST ? 'gst' : 'tds',
    items: [
      {
        productId: '',
        type: '',
        name: '',
        quantity: '',
        rate: '',
        amount: '',
        hsnCode: '',
      },
    ],
    terms: '',
    totalAmount: 0,
    branchId: '',
    accountId: '',
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
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  //   const [serveProd, setServeProd] = useState("");

  //   const changeServeProd = (index, e) => {
  //     setServeProd(e.target.value);

  //     setFormData((prevData) => ({
  //       ...prevData,
  //       items: prevData.items.map((item, i) =>
  //         i === index ? { ...item, productId: '',
  //         name: '',
  //         quantity: '',
  //         rate: '',
  //         amount: '',
  //         hsnCode: '',} : item
  //       ),
  //     }));
  // };

  const [serveProd, setServeProd] = useState(
    Array(formData.items.length).fill('')
  );

  const changeServeProd = (index, e) => {
    handleProductItemChange(index, e);
    const value = e.target.value;

    // Update serveProd for the specific row
    setServeProd((prev) => {
      const updatedServeProd = [...prev];
      updatedServeProd[index] = value;
      return updatedServeProd;
    });

    // Update only the productId and name for the specific row
    setFormData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item, i) =>
        i === index
          ? {
              ...item,
              productId: '',
              type: value,
              name: '',
              quantity: '',
              rate: '',
              amount: '',
              hsnCode: '',
            }
          : item
      ),
    }));
  };

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  console.log('++++++', products);
  useEffect(() => {
    fetchClients();
    fetchProducts();
    fetchServices();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await ApiService.post('/client/getClientDetails');
      console.log('hi ++++______ ++++++++++=====', res.data);
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
      console.log('++==== producttttttt yyyy', res.data);
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
    console.log(e.target.value, 'cliejbfhjebfjrhehjv');
    const selectedId = Number(e.target.value);
    const selectedClient = clients.find((client) => client.id === selectedId);

    if (!selectedClient) return;
    console.log(selectedClient, 'sssssssssssssssssssssssss');
    setFormData((prevData) => ({
      ...prevData,
      client: selectedId,
      clientName: selectedClient.name || '',
      clientNumber: selectedClient.phoneNumber || '',
      email: selectedClient.email || '',
      clientAddress: selectedClient.address || '',
      clientId: selectedClient.clientId || '',
    }));
    console.log(formData, 'formdatraaaaaaaaaaaaa');
  };

  // Handle field changes
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
    const type = formData.items[index]?.type;

    const updatedItems = [...formData.items];

    let selectedItem;

    if (type === 'product') {
      selectedItem = products.find(
        (product) => product.name.trim() === value.trim()
      );
    } else if (type === 'service') {
      selectedItem = services.find(
        (service) => service.name.trim() === value.trim()
      );
    }

    if (!selectedItem) {
      console.error('Selected item not found in', type);
      return;
    }

    updatedItems[index][name] = value;
    updatedItems[index]['productId'] = selectedItem.id;
    updatedItems[index]['productName'] = selectedItem.name;
    updatedItems[index['rate']] = selectedItem.price || 0;
    updatedItems[index]['hsnCode'] = selectedItem.hsnCode || '';
    updatedItems[index]['type'] = type;

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
        { name: '', type: '', quantity: '', rate: '', amount: '', hsnCode: '' },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleSave = async () => {
    const estimateDto = {
      clientId: formData.clientId,
      buildingAddress: formData.billingAddress,
      shippingAddress: formData.shippingAddress,
      estimateDate: formData.estimateDate,
      expireDate: formData.expiryDate,
      productOrService: formData.items.map((item) => item.name).join(', '),
      description: formData.terms,
      totalAmount: formData.items.reduce(
        (total, item) => total + parseFloat(item.amount || 0),
        0
      ),
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      convertToInvoice: true,
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
      tdsPercentage: formData.tdsPercentage || 0,
      cgstPercentage: formData.cgstPercentage || 0,
      scstPercentage: formData.scstPercentage || 0,
      // convertToInvoice: formData.convertToInvoice || false,
      productDetails: formData.items.map((item) => ({
        productId: item.productId,
        type: item.type,
        productName: item.name,
        quantity: parseInt(item.quantity, 10),
        totalCost: parseFloat(item.rate) * parseInt(item.quantity, 10),
        costPerUnit: parseFloat(item.rate),
        hsnCode: item.hsnCode,
      })),
      branchId: formData.branchId,
      accountId: formData.accountId,
    };

    // Get Client Details
    const client = clients.find((c) => c.id === estimateDto.clientId);
    const branchDetails = branches.find(
      (branch) => branch.id === Number(estimateDto.branchId)
    );
    console.log(estimateDto, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    // console.log(formData, 'ffffffffffffffffffffffffffff');
    // console.log(clients, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    console.log(client, 'clientnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
    const pdfData = {
      ...estimateDto,
      clientName: client ? client.name : 'Unknown',
      clientGST: client ? client.GSTNumber : '',
      branchDetails,
    };

    // Generate PDF as Binary (Blob → File)
    const generatePdf = async (data) => {
      const pdfBlob = await pdf(<InvoicePDF data={data} />).toBlob();
      return new File([pdfBlob], 'invoice.pdf', { type: 'application/pdf' });
    };

    console.log('pdfData pdfData pdfData', pdfData);
    try {
      const pdfFile = await generatePdf(pdfData); // Generate PDF File

      const cgst = (estimateDto.totalAmount * formData.cgstPercentage) / 100;
      const scst = (estimateDto.totalAmount * formData.scstPercentage) / 100;
      const includeTax = estimateDto.totalAmount + cgst + scst;
      console.log('acsdbttrdf : ', pdfFile);
      // Create FormData to send binary data
      const formDataPayload = new FormData();
      formDataPayload.append('estimatePdf', pdfFile); // Attach PDF file
      formDataPayload.append('clientId', (estimateDto.clientId));
      formDataPayload.append('buildingAddress', estimateDto.buildingAddress);
      formDataPayload.append('shippingAddress', estimateDto.shippingAddress);
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
      formDataPayload.append('tdsPercentage', estimateDto.tdsPercentage);

      formDataPayload.append(
        'cgstPercentage',
        estimateDto.cgstPercentage || '0'
      );
      formDataPayload.append(
        'scstPercentage',
        estimateDto.scstPercentage || '0'
      );
      // formDataPayload.append("convertToInvoice", estimateDto.convertToInvoice || "false");

      // Append Product Details as JSON String
      formDataPayload.append(
        'productDetails',
        JSON.stringify(estimateDto.productDetails)
      );

      // Send FormData with Binary PDF
      const response = await ApiService.post(
        '/estimate/handleEstimateDetails',
        formDataPayload,
        {
          headers: { 'Content-Type': 'multipart/form-data' }, // Important for binary data
        }
      );

      if (response.status) {
        console.log('Invoice saved successfully!');
        alert('Invoice saved successfully!');
        navigate('/invoice');
      } else {
        console.warn('Invoice save failed:', response.data);
        alert('Failed to save Invoice. Please try again.');
      }
    } catch (err) {
      console.error('Failed to save Invoice:', err);
      alert('Invoice saved successfully!', err);
    }
  };

  const gridData = {
    consigneeName: 'Nava Durga Stone Crusher',
    gstin: '37ACFPN5800Q1Z5',
    stateAddress: 'Andhra Pradesh',
    stateCode: '37',
    supplyPlace: 'Andhra Pradesh',
  };

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl w-11/12 max-w-4xl p-8 shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Invoice
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

                <span className="col-span-2 font-semibold">Rate</span>
                <span className="col-span-2 font-semibold">Quantity</span>
                <span className="col-span-2 font-semibold">Amount</span>
                <span className="col-span-2 font-semibold">HSN Code</span>
                <span className="col-span-1 font-semibold"></span>
              </div>

              {/* {formData.items &&
  formData.items.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-12 gap-2 items-center p-2 border-t"
    >
      <span className="col-span-1">{index + 1}</span>

      <select
        name="type"
        value={serveProd} 
        onChange={(e)=>changeServeProd(index,e)} 
        className="col-span-2 p-2 border rounded-md w-full"
      >
        <option value="">Select Type</option>
        <option value="service">Service</option>
        <option value="product">Product</option>
      </select>

      
      {serveProd === "product" ? (
        <select
          name="name"
          value={item.name}
          onChange={(e) => handleProductItemChange(index, e)}
          className="col-span-2 p-2 border rounded-md w-full"
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product?.id} value={product?.productType}>
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
        name="rate"
        value={item.rate}
        onChange={(e) => handleItemChange(index, e)}
        placeholder="Rate"
        className="col-span-2 p-2 border rounded-md w-full"
      />

<input
          type="text"
          name="quantity"
          value={item.quantity}
          onChange={(e) => handleProductItemQuantityChange(index, e)}
          placeholder="Quantity"
          className="col-span-2 p-2 border rounded-md w-full"
        />

 
      <input
        type="number"
        name="amount"
        value={item.amount}
        onChange={(e) => handleItemChange(index, e)}
        placeholder="Amount"
        className="col-span-2 p-2 border rounded-md w-full"
      />

      <input
        type="text"
        name="hsnCode"
        value={item.hsnCode}
        onChange={(e) => handleItemChange(index, e)}
        placeholder="HSN code"
        className="col-span-2 p-2 border rounded-md w-full"
      />

      <button
        type="button"
        onClick={() => removeItem(index)}
        className="bg-gray-100 rounded-md w-fit p-2"
      >
        -
      </button>
    </div>
  ))} */}

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
                      value={serveProd[index] || ''}
                      onChange={(e) => changeServeProd(index, e)}
                      className="col-span-2 p-2 border rounded-md w-full"
                    >
                      <option value="">Select Type</option>
                      <option value="service">Service</option>
                      <option value="product">Product</option>
                    </select>

                    {/* Product or Service Selection */}
                    {serveProd[index] === 'product' ? (
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
                      // <input
                      //   type="text"
                      //   name="name"
                      //   value={item.name}
                      //   onChange={(e) => handleService(index, e)}
                      //   placeholder="Service"
                      //   className="col-span-2 p-2 border rounded-md w-full"
                      // />
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
                      name="rate"
                      value={item.rate}
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

          <div className="flex items-center space-x-2">
            <span className={isGST ? 'text-gray-400' : 'font-semibold'}>
              TDS Enabled
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isGST}
                onChange={() => {
                  setIsGST(!isGST);
                  setFormData((prevData) => ({
                    ...prevData,
                    cgstPercentage: '',
                    scstPercentage: '',
                    tdsPercentage: '',
                    CGST: '',
                    SCST: '',
                  }));
                }}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-600 relative">
                <div
                  className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-transform ${
                    isGST ? 'translate-x-7' : ''
                  }`}
                ></div>
              </div>
            </label>
            <span className={isGST ? 'font-semibold' : 'text-gray-400'}>
              GST Enabled
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
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold mb-1">TDS %</label>
              <input
                type="number"
                name="tdsPercentage"
                value={formData.tdsPercentage}
                onChange={handleInputChange}
                placeholder="TDS %"
                className="w-full p-2 border rounded-md"
              />
              <p className="text-sm text-gray-700 mt-1">
                TDS Amount: ₹
                {(
                  (+formData.totalAmount * +formData.tdsPercentage) /
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
                  (formData.totalAmount * formData.tdsPercentage) / 100}
              </strong>
            )}
          </div>

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

export default AddEditInvoice;




// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { initialAuthState } from '../../services/ApiService';
// import ApiService from '../../services/ApiService';
// const AddEditInvoice = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Check if editing or creating
//   const isEditMode = location.state?.invoiceDetails
//     ? location.state?.isConvert
//       ? false
//       : true
//     : false;

//   useEffect(() => {
//     console.log(location.state);
//     if (location.state?.invoiceDetails) {
//       const { estimateData } = location.state.invoiceDetails;
//       console.log('estimateData estimateDataestimateData', estimateData);
//       setFormData({
//         SCST: estimateData.SCST,
//         CGST: estimateData.CGST,

//         client: estimateData.billTo.name,
//         clientNumber: estimateData.billTo.phone,
//         email: estimateData.billTo.email,
//         clientAddress: estimateData.billTo.address,
//         billingAddress: estimateData.billTo.address,
//         estimateDate: estimateData.estimateDetails.date.split('T')[0],
//         expiryDate: estimateData.estimateDetails.expiryDate,
//         cgstPercentage:
//           (estimateData.CGST * 100) / estimateData.estimateDetails.amount,
//         scstPercentage:
//           (estimateData.SCST * 100) / estimateData.estimateDetails.amount,
//         items: estimateData.products?.map((product) => ({
//           name: product.name,
//           qauntity: product.quantity,
//           rate: product.rate,
//           hsnCode: product.hsnCode,
//           amount: product.totalAmount,
//         })),
//         terms: estimateData.terms,
//       });
//     }
//   }, [location.state]);

//   // Initial state for form
//   const initialFormState = {
//     client: '',
//     clientNumber: '',
//     email: '',
//     clientAddress: '',
//     billingAddress: '',
//     estimateDate: '',
//     expiryDate: '',
//     items: [{ name: '', qauntity: '', rate: '', hsnCode: '', amount: '' }],
//     terms: '',
//   };

//   // Populate form state for edit mode
//   const [formData, setFormData] = useState(initialFormState);

//   const [totalAmount, setTotalAmount] = useState(0);
//   const [sgst, setSgst] = useState(0);
//   const [cgst, setCgst] = useState(0);
//   const [sgstPercentage, setSgstPercentage] = useState(9);
//   const [cgstPercentage, setCgstPercentage] = useState(9);
//   // Calculate total, SGST, and CGST
//   useEffect(() => {
//     const calculatedTotal = formData.items.reduce(
//       (acc, item) => acc + parseFloat(item.amount || 0),
//       0
//     );
//     setTotalAmount(calculatedTotal);
//     const calculatedSgst = (calculatedTotal * sgstPercentage) / 100;
//     const calculatedCgst = (calculatedTotal * cgstPercentage) / 100;
//     setSgst(calculatedSgst);
//     setCgst(calculatedCgst);
//   }, [formData.items, sgstPercentage, cgstPercentage]);

//   // Handle field changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle items dynamically
//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItems = [...formData.items];
//     updatedItems[index][name] = value;
//     setFormData((prevData) => ({ ...prevData, items: updatedItems }));
//   };

//   const addNewItem = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       items: [
//         ...prevData.items,
//         { name: '', qauntity: '', rate: '', hsnCode: '', amount: '' },
//       ],
//     }));
//   };

//   const handleSave = async () => {
//     const estimateDto = {
//       clientId: location.state.invoiceDetails.estimateData.billTo.clientId,
//       buildingAddress: formData.billingAddress,
//       estimateDate: formData.estimateDate,
//       expireDate: formData.expiryDate,
//       productOrService: formData.items.map((item) => item.name).join(', '),
//       description: formData.terms,
//       totalAmount: formData.items.reduce(
//         (total, item) => total + parseFloat(item.amount || 0),
//         0
//       ),
//       convertToInvoice: true,
//       companyCode: initialAuthState.companyCode, // Replace with actual company code
//       unitCode: initialAuthState.unitCode, // Replace with actual unit code
//       // estimateId: formData.estimateId || undefined,
//       // invoiceId: formData.invoiceId || undefined, // Optional based on the DTO
//       // GSTORTDS: formData.GSTORTDS || undefined, // Optional based on the DTO
//       SCST: sgst || 0, // Default or from formData
//       CGST: cgst || 0, // Default or from formData
//       // quantity: formData.items.reduce(
//       //   (total, item) => total + parseInt(item.quantity, 10),
//       //   0
//       // ),
//       // hsnCode: formData.items[0].hsnCode,
//       scstPercentage: sgstPercentage, // For temporary use
//       cgstPercentage: cgstPercentage, // For temporary use
//       productDetails: formData.items.map((item) => ({
//         productId: item.productId, // Assuming each item has a productId
//         productName: item.name,
//         quantity: parseInt(item.quantity, 10),
//         amount: parseFloat(item.rate) * parseInt(item.quantity, 10), // Total cost calculation
//         hsnCode: parseFloat(item.hsnCode), // Total cost calculation
//       })),
//     };

//     // invoicePDF
//     console.log(estimateDto);
//     console.log('date type', typeof estimateDto.estimateDate);
//     try {
//       await ApiService.post('/estimate/handleEstimateDetails', estimateDto);
//       console.log('Estimate saved:', estimateDto);
//       navigate('/estimate');
//     } catch (err) {
//       console.error('Failed to save estimate:', err);
//     }
//     navigate('/invoice');
//   };

//   const handleSaveAndSend = () => {
//     console.log('Saving and sending estimate:', formData);
//     // navigate('/invoice');
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <div className="bg-white rounded-xl w-11/12 max-w-4xl p-8 shadow-md">
//         {/* Title */}
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           {isEditMode ? 'Edit Invoice' : 'Create Invoice'}
//         </h1>

//         {/* Form */}
//         <form className="space-y-6">
//           {/* Client Info */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-semibold mb-1">Client</label>
//               <input
//                 type="text"
//                 name="client"
//                 value={formData.client}
//                 onChange={handleInputChange}
//                 placeholder="Client Name"
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-1">
//                 Client Number
//               </label>
//               <input
//                 type="text"
//                 name="clientNumber"
//                 value={formData.clientNumber}
//                 onChange={handleInputChange}
//                 placeholder="Client Number"
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-1">
//                 Email ID
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Email Address"
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//           </div>

//           {/* Addresses */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-semibold mb-1">
//                 Client Address
//               </label>
//               <textarea
//                 name="clientAddress"
//                 value={formData.clientAddress}
//                 onChange={handleInputChange}
//                 placeholder="Client Address"
//                 className="w-full h-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-1">
//                 Billing Address
//               </label>
//               <textarea
//                 name="billingAddress"
//                 value={formData.billingAddress}
//                 onChange={handleInputChange}
//                 placeholder="Billing Address"
//                 className="w-full h-full p-2 border rounded-md"
//               />
//             </div>
//             <div className="flex flex-col justify-between ">
//               <div className="mb-auto">
//                 <label className="block text-sm font-semibold mb-1">
//                   Created Date
//                 </label>
//                 <input
//                   type="date"
//                   name="estimateDate"
//                   value={formData.estimateDate}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>
//               <div className="mb-auto">
//                 <label className="block text-sm font-semibold mb-1">
//                   Due Date
//                 </label>
//                 <input
//                   type="date"
//                   name="expiryDate"
//                   value={formData.expiryDate}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Items */}
//           <div>
//             <label className="block text-sm font-semibold mb-1">Items</label>
//             <div className="border border-gray-300 rounded-md">
//               {/* Header Row */}
//               <div className="grid grid-cols-12 gap-2 bg-gray-100 p-2">
//                 <span className="col-span-1 font-semibold">#</span>
//                 <span className="col-span-2 font-semibold">Name</span>
//                 <span className="col-span-2 font-semibold">Quantity</span>
//                 <span className="col-span-2 font-semibold">Rate</span>
//                 <span className="col-span-2 font-semibold">HSN Code</span>
//                 <span className="col-span-2 font-semibold">Amount</span>
//               </div>

//               {/* Items Rows */}
//               {formData.items &&
//                 formData.items.map((item, index) => (
//                   <div
//                     key={index}
//                     className="grid grid-cols-12 gap-2 items-center p-2 border-t"
//                   >
//                     <span className="col-span-1">{index + 1}</span>
//                     <input
//                       type="text"
//                       name="name"
//                       value={item.name}
//                       // onChange={(e) => handleItemChange(index, e)}
//                       placeholder="Name"
//                       className="col-span-2 p-2 border rounded-md"
//                     />
//                     <input
//                       type="text"
//                       name="qauntity"
//                       value={item.qauntity}
//                       // onChange={(e) => handleItemChange(index, e)}
//                       placeholder="Quantity"
//                       className="col-span-2 p-2 border rounded-md"
//                     />
//                     <input
//                       type="number"
//                       name="rate"
//                       value={item.rate}
//                       // onChange={(e) => handleItemChange(index, e)}
//                       placeholder="Rate"
//                       className="col-span-2 p-2 border rounded-md"
//                     />
//                     <input
//                       type="number"
//                       name="hsnCode"
//                       value={item.hsnCode}
//                       // onChange={(e) => handleItemChange(index, e)}
//                       placeholder="HSN Code"
//                       className="col-span-2 p-2 border rounded-md"
//                     />
//                     <input
//                       type="number"
//                       name="amount"
//                       value={item.amount}
//                       // onChange={(e) => handleItemChange(index, e)}
//                       placeholder="Amount"
//                       className="col-span-2 p-2 border rounded-md"
//                     />
//                   </div>
//                 ))}
//               {/* <div className="flex justify-end p-2">
//                 <button
//                   type="button"
//                   onClick={addNewItem}
//                   className="text-blue-500 text-sm font-semibold mt-2 ml-2"
//                 >
//                   + Add Item
//                 </button>
//               </div> */}
//             </div>
//           </div>

//           <div className="border border-gray-300 rounded-md p-4">
//             <table className="w-full text-right">
//               {/* Total */}
//               <tr className="border-b">
//                 <td className="text-right py-2">Total</td>
//                 <td className="pr-4">₹{totalAmount.toFixed(2)}</td>
//               </tr>

//               {/* SGST Tax */}
//               <tr className="border-b">
//                 <td className="text-right py-2">
//                   SGST Tax{' '}
//                   <span>
//                     <input
//                       value={formData?.scstPercentage}
//                       className="w-16 text-center outline:none border rounded-md p-1 mx-2"
//                       placeholder="9%"
//                       // onChange={(e) => setSgstPercentage(e.target.value)}
//                     />
//                   </span>
//                   %
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={`₹${formData?.SCST?.toFixed(2)}`}
//                     readOnly
//                     className="bg-blue-50 text-right border rounded-md px-2 w-24"
//                   />
//                 </td>
//               </tr>

//               {/* CGST Tax */}
//               <tr className="border-b">
//                 <td className="text-right py-2">
//                   CGST Tax{' '}
//                   <span>
//                     <input
//                       value={formData?.cgstPercentage}
//                       className="w-16 text-center outline:none border rounded-md p-1 mx-2"
//                       placeholder="9%"
//                       // onChange={(e) => setCgstPercentage(e.target.value)}
//                     />
//                   </span>
//                   %
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={`₹${formData?.CGST?.toFixed(2)}`}
//                     readOnly
//                     className="bg-blue-50 text-right border rounded-md px-2 w-24"
//                   />
//                 </td>
//               </tr>

//               {/* Final Total */}
//               <tr className="border-b">
//                 <td className="text-right py-2 font-semibold">Final Total</td>
//                 <td className="pr-4 font-semibold">
//                   ₹{(totalAmount + formData?.SCST + formData?.CGST).toFixed(2)}
//                 </td>
//               </tr>
//             </table>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold mb-1">
//               Other Information / Terms & Conditions
//             </label>
//             <textarea
//               name="terms"
//               value={formData.terms}
//               onChange={handleInputChange}
//               placeholder="Add Terms and Conditions"
//               className="w-full p-2 border rounded-md"
//             />
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-4 mt-6">
//             <button
//               type="button"
//               onClick={handleSave}
//               className="py-2 px-4 text-white bg-blue-500 rounded-md"
//             >
//               Save
//             </button>
//             {/* <button
//               type="button"
//               onClick={handleSaveAndSend}
//               className="py-2 px-4 text-white bg-green-500 rounded-md"
//             >
//               Save Invoice
//             </button> */}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEditInvoice;
