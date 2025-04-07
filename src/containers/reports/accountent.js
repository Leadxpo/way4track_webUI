
import React, { useState, useEffect } from 'react';
import { FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ApiService, { initialAuthState } from '../../services/ApiService';
import * as XLSX from "xlsx";

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');


  const fetchBranchStockDetails = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };
      let response = await ApiService.post("/dashboards/getStockSummary", payload);
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching branch stock details:", error);
      setData([]);
    }
  };

  const fetchPayments = async (endpoint) => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
        branchName: localStorage.getItem('branchName'),
      };
      let response = await ApiService.post(endpoint, payload);
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setData([]);
    }
  };

  const handleOpenModal = (name) => {
    setSelectedStock(name);
    setIsModalOpen(true);
  };

  const dropdownOptions = ["Branch 1", "Branch 2", "Branch 3"]; // Replace with your actual branch names

  const handleSelect = (branch) => {
    setSelectedStock(branch);
    setIsDropdownOpen(false);
    fetchBranchStockDetails(branch); // Pass branch name if needed in your API
  };
  
  const handlePreview = () => {
    if (!data.length) {
      alert("No data available to preview.");
      return;
    }
    setPreviewData(data);
    setIsPreviewOpen(true);
  };

  const handleDownload = () => {
    if (!previewData.length) {
      alert("No data available to download.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(previewData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "Report.xlsx");
    setIsPreviewOpen(false);
  };



  const handleSearch = () => {
    console.log('Searching from:', fromDate, 'to:', toDate);
    // Call your API or filter data here
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Trial Balence</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Branch Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Balence Sheet</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Profit And Loss Account</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Stock Summary</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Returns</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Revarse Charge Supplies</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">TDS Reports</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">TCS Reports</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Balence Shoot</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Income Statement</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Cash Flow Statement</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Bank Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Account Receivable and Account Payable Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Fixed Asserts and Depreciation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Inventary Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Loan and Interest</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Invoice And Receipts</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>


      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Tax Decuments And Records</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>
      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">GST Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Payables</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Cash And Banks</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Ledger Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Purchase Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Journal Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Create Note Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Debit Note Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Get Report GSTRI ,GSTR 3B</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-center text-green-600 font-bold">{selectedStock}</h2>


            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg justify-between ">
      {/* From Date */}
      <div className="flex flex-col w-full">
       
        <input
          type="date"
          id="fromDate"
          className="border border-gray-300 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>

      {/* To Date */}
      <div className="flex flex-col w-full">
       
        <input
          type="date"
          id="toDate"
          className="border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col ">
      {/* Search Button */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md mt-2 sm:mt-6 "
        onClick={handleSearch}
      >
        Search
      </button>
      </div>
  
    </div>  


            <div className="relative mt-4">
              <div className="flex justify-between items-center bg-green-600 text-white p-3 rounded-md cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span>{selectedStock}</span>
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-gray-200 mt-1 rounded-md shadow-md">
                  {dropdownOptions.map((stock, index) => (
                    <p key={index} className="p-3 cursor-pointer hover:bg-gray-300" onClick={() => handleSelect(stock)}>
                      {stock}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <button className="w-64 bg-green-600 text-white py-2 rounded-md mt-4 block mx-auto" onClick={() => { handlePreview(); setIsModalOpen(false); }}>Submit</button>
          </div>
        </div>
      )}

      {isPreviewOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h4 className="text-xl font-semibold mb-4">Preview Data - {selectedStock}</h4>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={handleDownload}>Download Excel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
