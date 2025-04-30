import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generatePDF, { PurchaseOrderPDF } from '../../common/commonUtils';
import { MyPDF } from '../../common/commonUtils';
import { PDFDownloadLink, pdf, PDFViewer } from '@react-pdf/renderer';
import { TaxInvoicePDF } from '../../components/TaxInvoicePdf';
import ApiService, { initialAuthState } from '../../services/ApiService';
import {EstimatePDF} from './EstimatePDF';

const EditEstimate = () => {
  const navigate = useNavigate();
  const [isGST, setIsGST] = useState(true);
  
    const location = useLocation();
  const estimateDetails = location.state?.estimateDetails;
  console.log("rdddd cccc xxx ",estimateDetails.estimate.estimateNumber);
  // Initial state for form
  const initialFormState = {
    clientId:"",
    clientPhoneNumber:"",
    clientEmail:"",
    clientAddress: '',
    buildingAddress: '',
    estimateDate: '',
    expireDate
: '',
    

    cgstPercentage:'',
    scstPercentage:'',
    tdsPercentage:'',
    includeTax:'',
    CGST:0,
    SCST:0,
    GSTORTDS:isGST?'gst':'tds',
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
  
  const changeServeProd = (index, e) => { 
    setServeProd(e.target.value);
    
    setFormData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item, i) =>
        i === index ? { ...item, productId: '',
        name: '',
        quantity: '',
        rate: '',
        amount: '',
        hsnCode: '',} : item
      ),
    }));
};

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
      console.log("hi ++++______ ++++++++++===== eeeee client",res.data);
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
      (client) => client.clientId === e.target.value
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
  console.log(value);

  const selectedProduct = products.find(
    (product) => product.productType.trim() === value.trim()
  );

  if (!selectedProduct) {
    console.error("Selected product not found");
    return; // Prevents further execution if no product is found
  }

  const updatedItems = [...formData.items];
  updatedItems[index][name] = value;
  updatedItems[index]["productId"] = selectedProduct.id;
  updatedItems[index]["rate"] = selectedProduct.price;
  updatedItems[index]["hsnCode"] = selectedProduct.hsnCode;

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
      tds:formData.tds,
      quantity: formData.items.reduce(
        (total, item) => total + parseInt(item.quantity, 10),
        0
      ),
      tdsPercentage:formData.tdsPercentage||0,
      cgstPercentage: formData.cgstPercentage || 0,
      scstPercentage: formData.scstPercentage || 0,
      convertToInvoice: formData.convertToInvoice || false,
      productDetails: formData.items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: parseInt(item.quantity, 10),
        totalCost: parseFloat(item.rate) * parseInt(item.quantity, 10),
        costPerUnit: parseFloat(item.rate),
        hsnCode: item.hsnCode,
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
      console.log("formDataPayload! estimate estimateeeee2");
      const pdfFile = await generatePdf(pdfData); 
      console.log("formDataPayload! estimate estimateeeee3");
      const cgst = (estimateDto.totalAmount * formData.cgstPercentage) / 100;
      const scst=(estimateDto.totalAmount * formData.scstPercentage) /100;
      const includeTax=estimateDto.totalAmount+cgst+scst
      console.log("formDataPayload! estimate estimateeeee4");
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
      formDataPayload.append("GSTORTDS", estimateDto.GSTORTDS || "");
      formDataPayload.append("CGST", cgst);
      formDataPayload.append("SCST",  scst);
      formDataPayload.append("includeTax",  includeTax);
      formDataPayload.append("tdsPercentage", estimateDto.tdsPercentage);
      
      formDataPayload.append("cgstPercentage", estimateDto.cgstPercentage || "0");
      formDataPayload.append("scstPercentage", estimateDto.scstPercentage || "0");
      formDataPayload.append("estimateId", estimateDetails.estimate.estimateNumber);
      // formDataPayload.append("convertToInvoice", estimateDto.convertToInvoice || "false");
  
      // Append Product Details as JSON String
      formDataPayload.append("productDetails", JSON.stringify(estimateDto.productDetails));
      console.log("formDataPayload! estimate estimateeeee5");
      // Send FormData with Binary PDF
      await ApiService.post("/estimate/handleEstimateDetails", formDataPayload, {
        headers: { "Content-Type": "multipart/form-data" }, // Important for binary data
      });
       
      console.log("Estimate saved successfully!");
      alert("Estimate updated successfully!")
      navigate("/estimate");
    } catch (err) {
      console.error("Failed to save estimate:", err);
      alert("Failed to save estimate!",err);
    }
  };


  const fetchEstimation = async () => {
    try {
      const response = await ApiService.post(
        '/estimate/getEstimateDetails',{estimateId:estimateDetails.estimate.estimateNumber,
   companyCode:initialAuthState.companyCode,
unitCode:initialAuthState.unitCode}
      );
      if (response.status) {
        console.log("jjjjjj kkk lll",response.data);
        setFormData(response.data[0]);
        setFormData(prev => ({
          ...prev,
          CGST: response.data[0].CGST,
          SCST: response.data[0].SCST,
          
buildingAddress
: response.data[0].
buildingAddress
,
          clientAddress: response.data[0].clientAddress,
          clientEmail: response.data[0].clientEmail,
          clientId: response.data[0].clientId,
          clientName: response.data[0].clientName,
          clientPhoneNumber: response.data[0].clientPhoneNumber,
          companyCode: response.data[0].companyCode,
          description: response.data[0].description,
          estimateDate: response.data[0].estimateDate,
          estimateId: response.data[0].estimateId,
          estimatePdfUrl: response.data[0].estimatePdfUrl,
          expireDate: response.data[0].expireDate,

          CGST:response.data[0].CGST,
          SCST:response.data[0].SCST,
          id: response.data[0].id,
          invoiceId: response.data[0].invoiceId,
          invoicePdfUrl: response.data[0].invoicePdfUrl,
          productOrService: response.data[0].productOrService,
          products: response.data[0].products,
          
          unitCode: response.data[0].unitCode,
          vendorId: response.data[0].vendorId,
          vendorName: response.data[0].vendorName,
          vendorPhoneNumber: response.data[0].vendorPhoneNumber,

          totalAmount: response.data[0].totalAmount,
        }));
        
      } else {
        console.error('Failed to fetch branches');
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  useEffect(() => {
    fetchEstimation();
  }, []);
  


  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl w-11/12 max-w-4xl p-8 shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Edit Estimates
        </h1>
        {/* Form */}
        <form className="space-y-6">
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Client</label>
              <select
                name="client"
                value={formData.clientId
                }
                onChange={handleClientChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.clientId
                  }>
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
                value={formData.clientPhoneNumber}
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
                value={formData.clientEmail
                }
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
                name="billingAddress"
                value={formData.buildingAddress}
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
                  value={formData.estimateDate ? formData.estimateDate.split('T')[0] : ''}
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
                  value={formData.expireDate
                  }
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
        value={serveProd} // Bind value to state
        onChange={(e)=>changeServeProd(index,e)} // Update state correctly
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

      {/* Rate Input */}
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
            Total Estimate Amount : {formData?.totalAmount}
          </strong>




       <div className="flex items-center space-x-2">
      <span className={isGST ? "text-gray-400" : "font-semibold"}>TDS Enabled</span>
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
              isGST ? "translate-x-7" : ""
            }`}
          ></div>
        </div>
      </label>
      <span className={isGST ? "font-semibold" : "text-gray-400"}>GST Enabled</span>
    </div>
{isGST?
    <div>
              <label className="block text-sm font-semibold mb-1">
                CGST %
              </label>
              <input
                type="number"
                name="cgstPercentage"
                value={formData.cgstPercentage}
                onChange={handleInputChange}
                placeholder="CGST %"
                className="w-full p-2 border rounded-md"
              />

<label className="block text-sm font-semibold mb-1">
                SGST %
              </label>
              <input
                type="number"
                name="scstPercentage"
                value={formData.scstPercentage}
                onChange={handleInputChange}
                placeholder="SGST %"
                className="w-full p-2 border rounded-md"
              />
            </div>:

<div>
<label className="block text-sm font-semibold mb-1">
  TDS %
</label>
<input
                type="number"
                name="tdsPercentage"
                value={formData.tdsPercentage}
                onChange={handleInputChange}
                placeholder="TDS %"
                className="w-full p-2 border rounded-md"
              />
</div>
            }

<div>
          <strong className="col-span-2 font-semibold">
  Total Estimate Amount (Include Tax) : {formData.totalAmount +
    (formData.totalAmount * formData.cgstPercentage) / 100 +
    (formData.totalAmount * formData.scstPercentage) / 100}
</strong></div>

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

export default EditEstimate;

