import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generatePDF, { PurchaseOrderPDF } from '../../common/commonUtils';
import { MyPDF } from '../../common/commonUtils';
import { PDFDownloadLink, pdf, PDFViewer } from '@react-pdf/renderer';
import { TaxInvoicePDF } from '../../components/TaxInvoicePdf';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { InvoicePDF } from '../invoices/invoicePDF';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [isGST, setIsGST] = useState(true);
  console.log(isGST, 'gst or tds');

  const location = useLocation();
  const invoiceDetails = location.state?.invoiceDetails;
  console.log(invoiceDetails, 'invoice detailsssssssssssssss');
  // Initial state for form
  const initialFormState = {
    // id: '',
    clientId: invoiceDetails.estimateDto.clientId,
    client: '',
    clientNumber: '',
    email: '',
    clientAddress: '',
    buildingAddress: '',
    shippingAddress: '',
    estimateDate: invoiceDetails.estimateDto.estimateDate,
    expireDate: invoiceDetails.estimateDto.expireDate,

    cgstPercentage: '',
    scstPercentage: '',
    tdsPercentage: '',
    includeTax: '',
    CGST: 0,
    SCST: 0,
    GSTORTDS: isGST ? 'gst' : 'tds',
    items: invoiceDetails.estimateDto.productDetails.map((product) => ({
      productId: product.productId || '',
      name: product.productName || '',
      quantity: product.quantity || '',
      costPerUnit: product.amount || '',
      totalCost: product.amount || '',
      hsnCode: product.hsnCode || '',
      type: 'product',
    })),
    terms: '',
    totalAmount: invoiceDetails.estimateDto.totalAmount,
    description: '',
    branchId: invoiceDetails.estimateDto.branchId,
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

  console.log('++++++', products);

  useEffect(() => {
    console.log('Updated products:', products);
  }, [services]);

  useEffect(() => {
    fetchClients();
    fetchProducts();
    fetchServices();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await ApiService.post('/client/getClientDetails');
      console.log('hi ++++______ ++++++++++===== eeeee client', res.data);
      setClients(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setClients([]);
    }
  };
  const fetchProducts = async () => {
    try {
      // const res = await ApiService.post('/products/getAllproductDetails');
      const res = await ApiService.post(
        '/productType/getProductTypeNamesDropDown'
      );
      console.log('++====', res.data);
      setProducts(res.data);
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

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;

  //     if (name === 'branchId') {
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         branchId: value,
  //         accountId: '',
  //       }));

  //       const selected = branches.find((branch) => branch.id === parseInt(value));
  //       setSelectedBranch(selected);
  //       setSelectedAccountId('');
  //     } else if (name === 'accountId') {
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         accountId: value,
  //       }));
  //       setSelectedAccountId(value);
  //     } else {
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         [name]: value,
  //       }));
  //     }
  //   };

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
      const updatedForm = {
        ...formData,
        [name]: value,
      };

      setFormData(updatedForm);

      // Adjust rate if tax percentages change
      if (
        name === 'cgstPercentage' ||
        name === 'scstPercentage' ||
        name === 'tdsPercentage'
      ) {
        setTimeout(() => adjustRatesForTaxes(updatedForm), 0);
      }
    }
  };

  const adjustRatesForTaxes = (form) => {
    const {
      cgstPercentage = 0,
      scstPercentage = 0,
      tdsPercentage = 0,
      totalAmount = 0,
      items = [],
    } = form;

    const totalTaxPercent =
      parseFloat(cgstPercentage || 0) +
      parseFloat(scstPercentage || 0) +
      parseFloat(tdsPercentage || 0);

    const taxMultiplier = 1 + totalTaxPercent / 100;

    const updatedItems = items.map((item) => {
      const quantity = parseFloat(item.quantity || 1);
      const baseRate = totalAmount / (taxMultiplier * quantity);
      const amount = baseRate * quantity;

      return {
        ...item,
        costPerUnit: baseRate.toFixed(2),
        totalCost: amount.toFixed(2),
      };
    });

    setFormData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

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

    const quantity = parseInt(updatedItems[index]['quantity']) || 0;
    const rate = parseInt(value) || 0;

    updatedItems[index]['totalCost'] = quantity * rate;

    const totalProductsAmount = calculateTotal(updatedItems);

    setFormData((prevData) => ({
      ...prevData,
      totalAmount: totalProductsAmount,
      items: updatedItems,
    }));
  };

  const baseTotal = parseFloat(
    formData.items
      .reduce((sum, item) => {
        const qty = parseFloat(item.quantity) || 0;
        const rate = parseFloat(item.costPerUnit) || 0;
        return sum + qty * rate;
      }, 0)
      .toFixed(2)
  );

  const handleProductItemChange = (index, e) => {
    const { name, value } = e.target;
    console.log(value, name, 'product service names and values');

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
      // clientId: formData.clientNumber,
      //   id: invoiceDetails.invoice.id,
      clientId: formData.clientId,
      buildingAddress: formData.buildingAddress,
      shippingAddress: formData.shippingAddress,
      estimateDate: formData.estimateDate,
      expireDate: formData.expireDate,
      productOrService: formData.items.map((item) => item.name).join(', '),
      description: formData.description,
      totalAmount: formData.items.reduce(
        (total, item) => total + parseFloat(item.totalCost || 0),
        0
      ),
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      estimateId: formData.estimateId || undefined,
      invoiceId: formData.invoiceId || undefined,
      GSTORTDS: formData.GSTORTDS || undefined,
      //   GSTORTDS: 'GST',
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
      convertToInvoice: formData.convertToInvoice || false,
      productDetails: formData.items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: parseInt(item.quantity, 10),
        totalCost: parseInt(item.totalCost, 10),
        // totalCost: parseFloat(item.rate) * parseInt(item.quantity, 10),
        costPerUnit: parseFloat(item.costPerUnit),
        type: item.type,
        hsnCode: item.hsnCode,
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
      console.log('bfkuyewfliegfdkqilhfbvawefhbgelfhbrg', estimateDto);

      console.log('formDataPayload! invoice invoice');
      const pdfFile = await generatePdf(pdfData);
      console.log('formDataPayload! invoice invoice');
      const cgst = (estimateDto.totalAmount * formData.cgstPercentage) / 100;
      const scst = (estimateDto.totalAmount * formData.scstPercentage) / 100;
      const includeTax = estimateDto.totalAmount + cgst + scst;
      console.log('formDataPayload! invoice invoice');
      // Create FormData to send binary data
      const formDataPayload = new FormData();

      formDataPayload.append('id', estimateDto.id);
      formDataPayload.append('clientId', estimateDto.clientId);
      formDataPayload.append('buildingAddress', estimateDto.buildingAddress);
      formDataPayload.append('shippingAddress', estimateDto.shippingAddress);
      formDataPayload.append('estimatePdf', pdfFile); // Attach PDF file

      formDataPayload.append('estimateDate', estimateDto.estimateDate);
      formDataPayload.append('expireDate', estimateDto.expireDate);
      formDataPayload.append('productOrService', serveProd);
      formDataPayload.append('description', estimateDto.description);
      formDataPayload.append('totalAmount', estimateDto.totalAmount);
      formDataPayload.append('companyCode', 'WAY4TRACK');
      formDataPayload.append('unitCode', 'WAY4');
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
      formDataPayload.append('estimateId', invoiceDetails.invoice.estimateId);
      // formDataPayload.append("convertToInvoice", estimateDto.convertToInvoice || "false");

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

      console.log('Invoice saved successfully!');
      alert('Invoice updated successfully!');
      navigate('/invoice');
    } catch (err) {
      console.error('Failed to save Invoice:', err);
      alert('Failed to save Invoice!', err);
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

  console.log(formData, 'ownfienfi Form data exaplke');
  useEffect(() => {
    if (clients.length > 0 && formData.clientId) {
      const matchedClient = clients.find(
        (c) => c.clientId === formData.clientId
      );
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
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Estimates</h1>
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
                      name="costPerUnit"
                      value={item.costPerUnit}
                      readOnly
                      onChange={(e) => handleRateChange(index, e)}
                      placeholder="Rate"
                      className="col-span-2 p-2 border rounded-md w-full"
                    />

                    <input
                      type="text"
                      name="quantity"
                      value={item.quantity}
                      readOnly
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
                      readOnly
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
                    {/* <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="bg-gray-100 rounded-md w-fit p-2"
                    >
                      -
                    </button> */}
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

          <strong className="col-span-2 font-semibold">
            {/* Total Amount : {formData?.totalAmount} */}
            Total Amount : {baseTotal}
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
            <span
              className={
                isGST ? 'font-semibold text-blue-600' : 'text-gray-400'
              }
            >
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
            <strong className="col-span-2 font-semibold">
              Total Amount (Including Tax): ₹{formData.totalAmount}
            </strong>
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

export default CreateInvoice;
