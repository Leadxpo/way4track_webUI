import React, { useState ,useEffect} from 'react';
import { FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ApiService, { initialAuthState } from '../../services/ApiService';
import * as XLSX from 'xlsx';

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [isBranchPreviewOpen, setIsBranchPreviewOpen] = useState(false);
  const [isPaymentPreviewOpen, setIsPaymentPreviewOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dropdata, setDropData] = useState([]);

  const fetchBranchStockDetails = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        status: 'assigned',
      };
      let response = await ApiService.post('/products/getStockSummary', payload);
      setData(response?.data || []);
    } catch (error) {
      console.error('Error fetching branch stock details:', error?.response?.data || error.message);
      setData([]);
    }
  };
const fetchPayments = async (selectedStocks) => {
  try {
    const payload = {
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      role: localStorage.getItem('role'),
      branchName: localStorage.getItem('branchName'),
    };
    let response = await ApiService.post('/technician/getBackendSupportWorkAllocation', payload);
    const allData = response?.data || [];

    let filtered = [];
    if (selectedStocks === 'Pending Payments') {
      filtered = allData.filter(item => {
        console.log("rrr",item.workStatus === 'activate' && item.paymentStatus === 'PENDING')
        return(item.workStatus === 'activate' && item.paymentStatus === 'PENDING')});
    } else if (selectedStocks === 'Received Payments') {
            console.log("rrr",selectedStocks)
      filtered = allData.filter(item => item.workStatus === 'activate' && item.paymentStatus === 'COMPLETED');
    }

    setData(filtered);
    console.log("============>", data);
  } catch (error) {
    console.error('Error fetching payments:', error);
    setData([]);
  }
};

  const handleOpenModal = name => {
    setSelectedStock(name);
    setIsModalOpen(true);
  };

 const fetchBranchDropDown = async () => {
      try {
        const payload = {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        };
        const response = await ApiService.post("/branch/getBranchNamesDropDown", payload);
        setDropData(response?.data || []);
      } catch (error) {
        console.error("Error fetching branch stock details:", error);
        setDropData([]);
      }
    };
  
    useEffect(() => {
      fetchBranchDropDown();
    }, []);
  



  const dropdownOptions =
    selectedStock === 'Payment Stock'
      ? ['Received Payments', 'Pending Payments']
      : dropdata.map(item => item.branchName); // Adjust key if necessary

  const handleSelect = (stock) => {
    setSelectedStock(stock);
    setIsDropdownOpen(false);
    if (stock === 'Received Payments' || stock === 'Pending Payments') {
      fetchPayments(stock);
    } else {
      fetchBranchStockDetails();
    }
  };

  const handlePreview = () => {
    if (!data.length) {
      alert('No data available to preview.');
      return;
    }
    setPreviewData(data);
    if (selectedStock.includes('Payments')) {
      setIsPaymentPreviewOpen(true);
    } else {
      setIsBranchPreviewOpen(true);
    }
  };

  const handleDownload = () => {
    if (!previewData.length) {
      alert('No data available to download.');
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(previewData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Report.xlsx');
    setIsBranchPreviewOpen(false);
    setIsPaymentPreviewOpen(false);
  };

  const handleSearch = () => {
    console.log('Search from', fromDate, 'to', toDate);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Branch Stock</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal('Branch Stock')} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Payment Stock</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal('Payment Stock')} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-center text-green-600 font-bold">{selectedStock}</h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg justify-between">
              <input
                type="date"
                className="border border-gray-300 w-full rounded-md px-3 py-2 text-sm"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
              />
              <input
                type="date"
                className="border border-gray-300 w-full rounded-md px-3 py-2 text-sm"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSearch}>
                Search
              </button>
            </div>

            <div className="relative mt-4">
              <div
                className="flex justify-between items-center bg-green-600 text-white p-3 rounded-md cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedStock}</span>
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-gray-200 mt-1 rounded-md shadow-md z-10">
                  {dropdownOptions.map((stock, index) => (
                    <p
                      key={index}
                      className="p-3 cursor-pointer hover:bg-gray-300"
                      onClick={() => handleSelect(stock)}
                    >
                      {stock}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <button
              className="w-64 bg-green-600 text-white py-2 rounded-md mt-4 block mx-auto"
              onClick={() => {
                handlePreview();
                setIsModalOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {isBranchPreviewOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg max-w-6xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setIsBranchPreviewOpen(false)}
            >
              ✕
            </button>
            <h4 className="text-xl font-semibold mb-4">Preview Data - Branch Stock</h4>

            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto mb-4">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="border px-4 py-2">Product Name</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Location</th>
                    <th className="border px-4 py-2">Product Type</th>
                    <th className="border px-4 py-2">Branch Name</th>
                    <th className="border px-4 py-2">Assign Stock</th>
                    <th className="border px-4 py-2">Install Stock</th>
                    <th className="border px-4 py-2">In Hand Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2">{item.productDescription || '-'}</td>
                      <td className="border px-4 py-2">{item.location}</td>
                      <td className="border px-4 py-2">{item.productType}</td>
                      <td className="border px-4 py-2">{item.branchName}</td>
                      <td className="border px-4 py-2">{item.inAssignStock}</td>
                      <td className="border px-4 py-2">{item.installStock}</td>
                      <td className="border px-4 py-2">{item.inHandStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleDownload}>
              Download Excel
            </button>
          </div>
        </div>
      )}

{isPaymentPreviewOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
        onClick={() => setIsPaymentPreviewOpen(false)}
      >
        ✕
      </button>
      <h4 className="text-xl font-semibold mb-4">Preview Data - Payments</h4>

      {/* Table to show Payments data */}
     <div className="overflow-x-auto max-h-[70vh] overflow-y-auto mb-4">
  <table className="min-w-full border border-gray-300">
    <thead className="bg-green-600 text-white">
      <tr>
        <th className="border px-4 py-2">Work ID</th>
        <th className="border px-4 py-2">Technician Name</th>
        <th className="border px-4 py-2">Payment Status</th>
        <th className="border px-4 py-2">Assigned Amount</th>
        <th className="border px-4 py-2">Received Amount</th>
        <th className="border px-4 py-2">IMEI Number</th>
        <th className="border px-4 py-2">Vehicle Number</th>
        <th className="border px-4 py-2">Client Name</th>
        <th className="border px-4 py-2">Branch Name</th>
        <th className="border px-4 py-2">Installation Address</th>
      </tr>
    </thead>
    <tbody>
      {previewData.map((item, index) => (
        <tr key={index} className="text-center">
          <td className="border px-4 py-2">{item.id}</td>
          <td className="border px-4 py-2">{item.staffName}</td>
          <td className="border px-4 py-2">{item.paymentStatus}</td>
          <td className="border px-4 py-2">{item.amount}</td>
          <td className="border px-4 py-2">{item.paidAmount || "—"}</td>
          <td className="border px-4 py-2">{item.imeiNumber}</td>
          <td className="border px-4 py-2">{item.vehicleNumber}</td>
          <td className="border px-4 py-2">{item.clientName}</td>
          <td className="border px-4 py-2">{item.branchName}</td>
          <td className="border px-4 py-2">{item.installationAddress}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleDownload}>
        Download Excel
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Reports;
