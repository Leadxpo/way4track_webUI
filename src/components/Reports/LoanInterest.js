// import React, { useEffect, useState } from "react";
// import ApiService, { initialAuthState } from "../../services/ApiService";
// import * as XLSX from 'xlsx';

// const LoanInterestReport = ({ fromDate, toDate, selectedReport, onClose }) => {
//   const dummyData = {
//     loans: [
//       {
//         ledgerName: "ICICI Bank Loan",
//         groupName: "SECURED_LOANS",
//         debitAmount: 150000,
//         creditAmount: 50000,
//       },
//       {
//         ledgerName: "HDFC Overdraft",
//         groupName: "UNSECURED_LOANS",
//         debitAmount: 80000,
//         creditAmount: 40000,
//       },
//     ],
//     interest: [
//       {
//         ledgerName: "Interest on FD",
//         groupName: "Interest_Income",
//         debitAmount: 0,
//         creditAmount: 18000,
//       },
//       {
//         ledgerName: "Interest from Debtors",
//         groupName: "Interest_Income",
//         debitAmount: 0,
//         creditAmount: 25000,
//       },
//     ],
//   };

//   const [reportData, setReportData] = useState(dummyData);
//   const [loading, setLoading] = useState(false);

//   const handleDownload = () => {
//     const { loans = [], interest = [] } = reportData;

//     if (loans.length === 0 && interest.length === 0) {
//       alert("No data available to download.");
//       return;
//     }

//     const workbook = XLSX.utils.book_new();

//     // Sheet for Loans
//     if (loans.length > 0) {
//       const loanSheet = XLSX.utils.json_to_sheet(loans, {
//         header: ['ledgerName', 'groupName', 'debitAmount', 'creditAmount'],
//       });

//       const loanRange = XLSX.utils.decode_range(loanSheet['!ref']);
//       for (let R = 1; R <= loanRange.e.r; ++R) {
//         const debitCell = XLSX.utils.encode_cell({ c: 2, r: R });
//         const creditCell = XLSX.utils.encode_cell({ c: 3, r: R });
//         if (loanSheet[debitCell]) loanSheet[debitCell].z = '#,##0.00';
//         if (loanSheet[creditCell]) loanSheet[creditCell].z = '#,##0.00';
//       }

//       XLSX.utils.book_append_sheet(workbook, loanSheet, "Loans Report");
//     }

//     // Sheet for Interests
//     if (interest.length > 0) {
//       const interestSheet = XLSX.utils.json_to_sheet(interest, {
//         header: ['ledgerName', 'groupName', 'debitAmount', 'creditAmount'],
//       });

//       const interestRange = XLSX.utils.decode_range(interestSheet['!ref']);
//       for (let R = 1; R <= interestRange.e.r; ++R) {
//         const debitCell = XLSX.utils.encode_cell({ c: 2, r: R });
//         const creditCell = XLSX.utils.encode_cell({ c: 3, r: R });
//         if (interestSheet[debitCell]) interestSheet[debitCell].z = '#,##0.00';
//         if (interestSheet[creditCell]) interestSheet[creditCell].z = '#,##0.00';
//       }

//       XLSX.utils.book_append_sheet(workbook, interestSheet, "Interests Report");
//     }

//     XLSX.writeFile(workbook, "Loans_and_Interest_Report.xlsx");
//   };

//   useEffect(() => {
//     const fetchAssets = async () => {
//       setLoading(true);
//       try {
//         const response = await ApiService.post("/dashboards/getLoansAndInterestsForReport", {
//           companyCode: initialAuthState.companyCode,
//           unitCode: initialAuthState.unitCode,
//           fromDate,
//           toDate,
//           branchName: selectedReport,
//         });

//         if (response?.status && response.data?.asserts) {
//           setReportData(response.data.asserts);
//         } else {
//           console.error("No data received.");
//         }
//       } catch (error) {
//         console.error("Error fetching report data:", error);
//       }
//       setLoading(false);
//     };

//     fetchAssets();
//   }, [fromDate, toDate, selectedReport]);

//   const { loans = [], interest = [] } = reportData;

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
//           <h4 className="text-xl font-semibold mb-4">Loading...</h4>
//         </div>
//       </div>
//     );
//   }

//   if (loans.length === 0 && interest.length === 0) {
//     return (
//       <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
//           <h4 className="text-xl font-semibold mb-4">No Data Available</h4>
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const renderTable = (title, data) => (
//     <>
//       <h5 className="text-lg font-semibold mt-4 mb-2">{title}</h5>
//       <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg mb-4">
//         <table className="min-w-full border text-sm">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               {Object.keys(data[0]).map((key, index) => (
//                 <th key={index} className="p-2 text-left border capitalize">{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, rowIndex) => (
//               <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
//                 {Object.entries(row).map(([key, value], colIndex) => (
//                   <td key={colIndex} className="p-2 border">
//                     {value ?? ''}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
//         <h4 className="text-xl font-semibold mb-4">Loans and Interest Report Preview</h4>

//         {loans.length > 0 && renderTable("Loans", loans)}
//         {interest.length > 0 && renderTable("Interests", interest)}

//         <div className="flex justify-end mt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleDownload}
//             className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//           >
//             Download Excel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoanInterestReport;



import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from 'xlsx';

const LoanInterestReport = ({ fromDate, toDate, selectedReport, onClose }) => {
  const dummyData = {
    loans: [
      {
        ledgerName: "ICICI Bank Loan",
        groupName: "SECURED_LOANS",
        debitAmount: 150000,
        creditAmount: 50000,
      },
      {
        ledgerName: "HDFC Overdraft",
        groupName: "UNSECURED_LOANS",
        debitAmount: 80000,
        creditAmount: 40000,
      },
    ],
    interest: [
      {
        ledgerName: "Interest on FD",
        groupName: "Interest_Income",
        debitAmount: 0,
        creditAmount: 18000,
      },
      {
        ledgerName: "Interest from Debtors",
        groupName: "Interest_Income",
        debitAmount: 0,
        creditAmount: 25000,
      },
    ],
  };

  const [reportData, setReportData] = useState(dummyData);
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    const { loans = [], interest = [] } = reportData;

    if (loans.length === 0 && interest.length === 0) {
      alert("No data available to download.");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const combinedData = [];

    // Add Loans section
    if (loans.length > 0) {
      combinedData.push({ ledgerName: "Loans", groupName: "", debitAmount: "", creditAmount: "" });
      combinedData.push(...loans);
      combinedData.push({}); // spacer
    }

    // Add Interests section
    if (interest.length > 0) {
      combinedData.push({ ledgerName: "Interests", groupName: "", debitAmount: "", creditAmount: "" });
      combinedData.push(...interest);
    }

    const sheet = XLSX.utils.json_to_sheet(combinedData, {
      header: ['ledgerName', 'groupName', 'debitAmount', 'creditAmount'],
      skipHeader: false,
    });

    const sheetRange = XLSX.utils.decode_range(sheet['!ref']);
    for (let R = 1; R <= sheetRange.e.r; ++R) {
      const debitCell = XLSX.utils.encode_cell({ c: 2, r: R });
      const creditCell = XLSX.utils.encode_cell({ c: 3, r: R });
      if (sheet[debitCell] && typeof sheet[debitCell].v === 'number') sheet[debitCell].z = '#,##0.00';
      if (sheet[creditCell] && typeof sheet[creditCell].v === 'number') sheet[creditCell].z = '#,##0.00';
    }

    XLSX.utils.book_append_sheet(workbook, sheet, "Loan & Interest Report");
    XLSX.writeFile(workbook, "Loan_and_Interest_Report.xlsx");
  };

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const response = await ApiService.post("/dashboards/getLoansAndInterestsForReport", {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
          branchName: selectedReport,
        });

        if (response?.status && response.data?.asserts) {
          setReportData(response.data.asserts);
        } else {
          console.error("No data received.");
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
      setLoading(false);
    };

    fetchAssets();
  }, [fromDate, toDate, selectedReport]);

  const { loans = [], interest = [] } = reportData;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <h4 className="text-xl font-semibold mb-4">Loading...</h4>
        </div>
      </div>
    );
  }

  if (loans.length === 0 && interest.length === 0) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <h4 className="text-xl font-semibold mb-4">No Data Available</h4>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderTable = (title, data) => (
    <>
      <h5 className="text-lg font-semibold mt-4 mb-2">{title}</h5>
      <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg mb-4">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {Object.keys(data[0]).map((key, index) => (
                <th key={index} className="p-2 text-left border capitalize">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                {Object.entries(row).map(([key, value], colIndex) => (
                  <td key={colIndex} className="p-2 border">
                    {value ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <h4 className="text-xl font-semibold mb-4">Loans and Interest Report Preview</h4>

        {loans.length > 0 && renderTable("Loans", loans)}
        {interest.length > 0 && renderTable("Interests", interest)}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanInterestReport;
