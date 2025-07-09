
import React, { useState, useEffect } from 'react';
import { FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ApiService, { initialAuthState } from '../../services/ApiService';
import * as XLSX from "xlsx";
import BalanceSheet from '../../components/Reports/BalanceSheet';
import ProfitLoss from '../../components/Reports/ProfitLoss';
import LedgerRegister from '../../components/Reports/LedgerReports';
import PurchaseRegister from '../../components/Reports/PurcheseRegister';
import JournalRegister from '../../components/Reports/JournalRegister';
import CreditNoteRegister from '../../components/Reports/CreditNoteRegister';
import DebitNoteRegister from '../../components/Reports/DebitNoteRegister';
import GstriReport from '../../components/Reports/GstriReport';
import PayableReport from '../../components/Reports/PayableReport';
import CashBankReport from '../../components/Reports/CashBankReport';
import CashFlowReport from '../../components/Reports/CashFlowStatement';
import FixedAssetReport from '../../components/Reports/FixedAssertReport';
import IncomeStatementReport from '../../components/Reports/IncomeStatement';
import LoanInterestReport from '../../components/Reports/LoanInterest';
import SaleReturn from '../../components/Reports/SaleReturn';
import TcsReport from '../../components/Reports/TcsReport';
import TdsReport from '../../components/Reports/Tds';
import TrailBalance from '../../components/Reports/TrailBalance';

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedReport, setSelectedReport] = useState("Select Branch");
  const [selectedStock, setSelectedStock] = useState('');
  const [tdsReport, setTdsReport] = useState([]);
  const [trialBalance, setTrialBalance] = useState([]);

  if (tdsReport) {
    console.log("---====+++", tdsReport);
  }

  const fetchBranchDropDown = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };
      const response = await ApiService.post("/branch/getBranchNamesDropDown", payload);
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching branch stock details:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchBranchDropDown();
  }, []);

  const handleOpenModal = (name) => {
    setSelectedStock(name);
    console.log("name111111repeort name", name)
    setIsModalOpen(true);
  };

  const handleSelect = (branchName) => {
    setSelectedReport(branchName);
    console.log("branchName", branchName);
    setIsDropdownOpen(false);
  };


  const handlePreview = () => {
    if (!data.length) {
      alert("No data available to preview.");
      return;
    }

    if (selectedStock === "tds") {
      setPreviewData(tdsReport);
    }

    if (selectedStock === "trialbalance") {
      setPreviewData(trialBalance);
    }

    if (selectedStock === "BalanceSheet") {
      setPreviewData();
    }

    if (selectedStock === "ProfitLoss") {
      setPreviewData();
    }

    if (selectedStock === "LedgerRegister") {
      setPreviewData();
    }

    if (selectedStock === "PurchaseRegister") {
      setPreviewData();
    }

    if (selectedStock === "JournalRegister") {
      setPreviewData();
    }

    if (selectedStock === "CreditNoteRegister") {
      setPreviewData();
    }

    if (selectedStock === "DebitNoteRegister") {
      setPreviewData();
    }

    if (selectedStock === "GstriReport") {
      setPreviewData();
    }


    setIsPreviewOpen(true);
  };


  const handleSearch = () => {
    console.log('Searching from:', fromDate, 'to:', toDate);
    // Call your API or filter data here
  };

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Trial Balance</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("trialbalance")} />
      </div>

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Balance Sheet</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("BalanceSheet")} />
      </div>

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Profit And Loss Account</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("ProfitLoss")} />
      </div>

      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Stock Summary</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}

      {/* <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Returns</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("salereturn")} />
      </div> */}

      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}

      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Revarse Charge Supplies</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}

      {/* <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">TDS Reports</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("tdsreport")} />
      </div>

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">TCS Reports</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("tcsreport")} />
      </div> */}

      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Balence Shoot</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Income Statement</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("incomestatement")} />
      </div>

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Cash Flow Statement</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("cashflowreport")} />
      </div>

      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Bank Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}

      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Account Receivable and Account Payable Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}

      <div className="flex justify-between items-center p-4 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Fixed Assets and Depreciation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("fixedassetreport")} />
      </div>

      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Inventary Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}

      {/* <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Loan and Interest</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("loaninterestreport")} />
      </div> */}

      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Invoice And Receipts</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}


      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Tax Decuments And Records</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}
      {/* <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">GST Reconciliation</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div> */}

      {/* <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Payables</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("PayableReport")} />
      </div>

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Cash And Banks</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>*/}

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Ledger Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("LedgerRegister")} />
      </div>

       <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Purchase Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("PurchaseRegister")} />
      </div>

      {/* <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Journal Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("JournalRegister")} />
      </div>

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Credit Note Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("CreditNoteRegister")} />
      </div>

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Debit Note Register</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("DebitNoteRegister")} />
      </div>

      <div className="flex justify-between items-center px-4 py-2 my-2 border bg-green-600">
        <p className="text-xl text-white font-bold">Get Report GSTRI ,GSTR 3B</p>
        <FaDownload className="text-xl text-white cursor-pointer" onClick={() => handleOpenModal("GstriReport")} />
      </div> */}




      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-center text-green-600 font-bold">{selectedReport}</h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg justify-between">
              {/* From Date */}
              <div className="flex flex-col w-full">
                <input
                  type="date"
                  className="border border-gray-300 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              {/* To Date */}
              <div className="flex flex-col w-full">
                <input
                  type="date"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              {/* Search Button */}
              <div className="flex flex-col">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md mt-2 sm:mt-6"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Branch Dropdown */}
            <div className="relative mt-4">
              <div
                className="flex justify-between items-center bg-green-600 text-white p-3 rounded-md cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedReport}</span>
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-gray-200 mt-1 rounded-md shadow-md max-h-60 overflow-y-auto">
                  {data.map((branch, index) => (
                    <p
                      key={index}
                      className="p-3 cursor-pointer hover:bg-gray-300"
                      onClick={() => handleSelect(branch.branchName)}
                    >
                      {branch.branchName}
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




      {isPreviewOpen && (
        selectedStock === "BalanceSheet" ? (
          <BalanceSheet
            fromDate={fromDate}
            toDate={toDate}
            selectedReport={selectedReport}
            onClose={() => setIsPreviewOpen(false)}
          />
        ) : selectedStock === "ProfitLoss" ? (
          <ProfitLoss
            fromDate={fromDate}
            toDate={toDate}
            selectedReport={selectedReport}
            onClose={() => setIsPreviewOpen(false)}
          />
        ) : selectedStock === "LedgerRegister" ? (
          <LedgerRegister
            fromDate={fromDate}
            toDate={toDate}
            selectedReport={selectedReport}
            onClose={() => setIsPreviewOpen(false)}
          />
        ) : selectedStock === "PurchaseRegister" ? (
          <PurchaseRegister
            fromDate={fromDate}
            toDate={toDate}
            selectedReport={selectedReport}
            onClose={() => setIsPreviewOpen(false)}
          />
        ) :
          selectedStock === "JournalRegister" ? (
            <JournalRegister
              fromDate={fromDate}
              toDate={toDate}
              selectedReport={selectedReport}
              onClose={() => setIsPreviewOpen(false)}
            />
          ) :
            selectedStock === "CreditNoteRegister" ? (
              <CreditNoteRegister
                fromDate={fromDate}
                toDate={toDate}
                selectedReport={selectedReport}
                onClose={() => setIsPreviewOpen(false)}
              />
            ) :
              selectedStock === "DebitNoteRegister" ? (
                <DebitNoteRegister
                  fromDate={fromDate}
                  toDate={toDate}
                  selectedReport={selectedReport}
                  onClose={() => setIsPreviewOpen(false)}
                />
              ) :
                selectedStock === "GstriReport" ? (
                  <GstriReport
                    fromDate={fromDate}
                    toDate={toDate}
                    selectedReport={selectedReport}
                    onClose={() => setIsPreviewOpen(false)}
                  />
                ) :
                  selectedStock === "PayableReport" ? (
                    <PayableReport
                      fromDate={fromDate}
                      toDate={toDate}
                      selectedReport={selectedReport}
                      onClose={() => setIsPreviewOpen(false)}
                    />
                  ) :



                    selectedStock === "trialbalance" ? (
                      <TrailBalance
                        fromDate={fromDate}
                        toDate={toDate}
                        selectedReport={selectedReport}
                        onClose={() => setIsPreviewOpen(false)}
                      />
                    ) : selectedStock === "salereturn" ? (
                      <SaleReturn
                        fromDate={fromDate}
                        toDate={toDate}
                        selectedReport={selectedReport}
                        onClose={() => setIsPreviewOpen(false)}
                      />
                    ) : selectedStock === "tdsreport" ? (
                      <TdsReport
                        fromDate={fromDate}
                        toDate={toDate}
                        selectedReport={selectedReport}
                        onClose={() => setIsPreviewOpen(false)}
                      />
                    ) : selectedStock === "tcsreport" ? (
                      <TcsReport
                        fromDate={fromDate}
                        toDate={toDate}
                        selectedReport={selectedReport}
                        onClose={() => setIsPreviewOpen(false)}
                      />
                    ) :
                      selectedStock === "incomestatement" ? (
                        <IncomeStatementReport
                          fromDate={fromDate}
                          toDate={toDate}
                          selectedReport={selectedReport}
                          onClose={() => setIsPreviewOpen(false)}
                        />
                      ) :
                        selectedStock === "cashflowreport" ? (
                          <CashFlowReport
                            fromDate={fromDate}
                            toDate={toDate}
                            selectedReport={selectedReport}
                            onClose={() => setIsPreviewOpen(false)}
                          />
                        ) :
                          selectedStock === "fixedassetreport" ? (
                            <FixedAssetReport
                              fromDate={fromDate}
                              toDate={toDate}
                              selectedReport={selectedReport}
                              onClose={() => setIsPreviewOpen(false)}
                            />
                          ) :
                            selectedStock === "loaninterestreport" ? (
                              <LoanInterestReport
                                fromDate={fromDate}
                                toDate={toDate}
                                selectedReport={selectedReport}
                                onClose={() => setIsPreviewOpen(false)}
                              />
                            ) :
                              selectedStock === "cashbankreport" ? (
                                <CashBankReport
                                  fromDate={fromDate}
                                  toDate={toDate}
                                  selectedReport={selectedReport}
                                  onClose={() => setIsPreviewOpen(false)}
                                />
                              ) :
                                null
      )}
    </div>
  );
};

export default Reports;
