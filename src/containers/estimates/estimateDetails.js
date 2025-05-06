import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { useCallback } from 'react';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { useEffect } from 'react';
const EstimateDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const estimateID = location.state.estimateDetails.estimate.estimateNumber;
  const [estimateData, setEstimateData] = useState({
    company: {},
    estimateDetails: {},
    billTo: {},
    products: [],
    terms: '',
  });
  const [estimate, setEstimate] = useState([]);

  const getEstimateIDData = useCallback(async () => {
    try {
      const response = await ApiService.post('/estimate/getEstimateDetails', {
        estimateId: estimateID,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      console.log('hiiiiiii iiiii');
      if (response.status) {
        console.log(response.data, 'Response Data 0000000'); // Log data to verify it
        const estimateData = response.data[0]; // Access the first element of the array
        setEstimateData({
          company: {
            logo: 'path/to/logo.png', // Replace with actual logo path
            name: 'Company Name', // Replace with actual company name
            address: estimateData.clientAddress,
            gstin: 'GSTIN', // Replace with actual GSTIN
            cin: 'CIN', // Replace with actual CIN
          },
          estimateDetails: {
            number: estimateData.estimateId,
            date: estimateData.estimateDate,
            expiryDate: estimateData.expireDate,
            amount: estimateData.totalAmount,
          },
          billTo: {
            clientId: estimateData.clientId,
            name: estimateData.clientName,
            phone: estimateData.clientPhoneNumber,
            email: estimateData.clientEmail,
            address: estimateData.clientAddress,
          },
          products: estimateData.products.map((product, index) => ({
            id: index + 1,
            name: product.name,
            // description: product.description || '',
            amount: product.amount,
            quantity: product.quantity,
            rate: product.costPerUnit,
            totalAmount: product.totalCost,
            hsnCode: product.hsnCode,
          })),
          terms: estimateData.description,
          estimatePdfUrl: estimateData.estimatePdfUrl,
          SCST: estimateData.SCST,
          CGST: estimateData.CGST,
        });
      } else {
        alert(response.data.message || 'Failed to fetch estimate details.');
      }
    } catch (error) {
      console.error('Error fetching estimate details:', error);
      alert('Failed to fetch estimate details.');
    }
  }, [estimateID]);

  useEffect(() => {
    if (estimateID) {
      getEstimateIDData();
    }
  }, []);

  const handleConvertInvoice = () => {
    navigate('/add-invoice', {
      state: { invoiceDetails: { estimateData }, isConvert: true },
    });
  };
  const getEstimatesForReport = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getEstimatesForReport',
        {
          estimateId: estimateData?.estimateDetails?.number,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      console.log('estimation pdf', response.data);

      const pdfUrl = response.data.estimate_estimatePdfUrl;

      if (pdfUrl) {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Estimate_Report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('No PDF available for this estimate.');
      }

      setEstimate(response.data);
    } catch (e) {
      console.error('Error fetching estimate:', e);
      alert('Failed to fetch estimate data. Please try again.');
    }
  };
  return (
    <div>
      <div className="flex justify-end mb-4 pr-8">
        <button
          className="bg-orange-500 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-600 transition-all"
          onClick={handleConvertInvoice}
        >
          Convert Invoice
        </button>
      </div>

      <div className="p-8 max-w-4xl mx-auto shadow-md rounded-md bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {/* Logo and Company Details */}
          <div className="">
            {/* <img
            src={estimateData.company.logo}
            alt="Company Logo"
            className="w-16 h-16 object-contain"
          /> */}
            {/* <div>
            <h1 className="text-xl font-bold">
              {estimateData.company?.name || ''}
            </h1>
          </div> */}
          </div>

          {/* Estimate Title and Number */}
          <div className="text-right">
            <h2 className="text-2xl font-semibold">ESTIMATE</h2>
            <p className="text-lg">#{estimateData?.estimateDetails?.number}</p>
          </div>
        </div>

        {/* Address and Dates */}
        <div className="flex justify-between mb-6">
          {/* Address - 60% Width */}
          <div className="w-2/3 mr-4">
            <p className="text-gray-600">{estimateData?.company?.address}</p>
            <p className="text-gray-600">
              <strong>GSTIN:</strong> {estimateData?.company?.gstin} |{' '}
              <strong>CIN:</strong> {estimateData?.company?.cin}
            </p>
          </div>

          {/* Dates and Amount - 40% Width */}
          <div className="w-1/3 text-sm">
            <div className="flex">
              <span className="w-32 text-gray-600">Estimate Date:</span>
              <span className="text-gray-600">
                {estimateData?.estimateDetails?.date}
              </span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-600">Expiry Date:</span>
              <span className="text-gray-600">
                {estimateData?.estimateDetails?.expiryDate}
              </span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-600">Amount:</span>
              <span className="text-black font-bold">
                {estimateData?.estimateDetails?.amount}
              </span>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-6">
          <p className="text-gray-600">Bill To:</p>
          <p className="font-bold">{estimateData?.billTo?.name}</p>
          <p className="font-bold">{estimateData?.billTo?.phone}</p>
          <p className="font-bold">{estimateData?.billTo?.email}</p>
          <p>{estimateData.billTo.address}</p>
        </div>

        {/* Product Table */}
        <table className="w-full rounded-md mb-6">
          <thead className="rounded-md">
            <tr className="bg-gray-200 rounded-md">
              <th className=" px-4 py-2 text-left">#</th>
              <th className=" px-4 py-2 text-left">Product / Service</th>
              <th className=" px-4 py-2 text-center">quantity</th>
              <th className=" px-4 py-2 text-center">Rate</th>
              <th className=" px-4 py-2 text-center">Amount</th>
              {/* <th className=" px-4 py-2 text-center">Action</th> */}
            </tr>
          </thead>
          <tbody className="rounded-md">
            {estimateData?.products.map((product) => (
              <tr key={product.id}>
                <td className=" px-4 py-2">{product.id}</td>
                <td className=" px-4 py-2">{product.name}</td>
                <td className=" px-4 py-2 text-center">{product.quantity}</td>
                <td className=" px-4 py-2 text-center">{product.rate}</td>
                <td className=" px-4 py-2 text-center">
                  {product.totalAmount}
                </td>
                {/* <td className="px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
                    onClick={() =>
                      navigate('/create-work-allocation', {
                        state: {
                          logo: 'path/to/logo.png', // Replace with actual logo path
                          name: estimateData.name, // Company name
                          address: estimateData.address,
                          gstin: estimateData.gstin,
                          cin: estimateData.cin, // CIN number
                          number: estimateData.estimateId,
                          date: estimateData.estimateDate,
                          expiryDate: estimateData.expireDate,
                          amount: estimateData.totalAmount,
                          clientId: estimateData.clientId,
                          phone: estimateData.phone,
                          email: estimateData.email,
                          terms: estimateData.terms,
                          estimatePdfUrl: estimateData.estimatePdfUrl,
                          product: product, // Ensure 'product' is defined
                        },
                      })
                    }
                  >
                    Work Allocation
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Terms and Conditions */}
        <div className="text-black-600 mb-6">
          <p>
            <span className="font-bold">Description: </span>
            {estimateData.terms}
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => window.open(estimateData.estimatePdfUrl, '_blank')}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimateDetails;
