// import React, { useState, useEffect } from 'react';
// import { FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import ApiService, { initialAuthState } from '../../services/ApiService';
// import * as XLSX from "xlsx";

// const Reports = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedStock, setSelectedStock] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [pendingAmount, setPendingAmount] = useState({});
//   const [receivedPayments, setReceivedPayments] = useState({});
//   const [branchStockDetails, setBranchStockDetails] = useState([]); // Placeholder for missing variable
//   const [previewData, setPreviewData] = useState([]);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [search, setSearch] = useState(""); // Placeholder for missing search term

//   useEffect(() => {
//     fetchBranchStockDetails();
//     ReceivedPayments();
//     PendingAmount();

    
//   }, []);

//   const fetchBranchStockDetails = async () => {
//     try {
//       const payload = {
//         companyCode: initialAuthState.companyCode,
//         unitCode: initialAuthState.unitCode,
//       };
//       let response = await ApiService.post("/dashboards/getStockSummary", payload);
  
//       // Ensure response.data is always an array
//       if (response?.status && Array.isArray(response.data)) {
//         setBranchStockDetails(response.data);
//       } else {
//         setBranchStockDetails([]); // Prevent undefined
//       }
//     } catch (error) {
//       console.error("Error fetching branch stock details:", error);
//       setBranchStockDetails([]); // Handle errors gracefully
//     }
//   };
  
//   useEffect(() => {
//     fetchBranchStockDetails();
//   }, []);
  
  
 
//  // Received Payments
 
//  const ReceivedPayments = async () => {
//    try {
//      const payload = {
//        companyCode: initialAuthState.companyCode,
//        unitCode: initialAuthState.unitCode,
//        role: localStorage.getItem('role'),
//      };
//      if (payload.role === 'Branch Manager') {
//        payload.branchName = localStorage.getItem('branchName');
//      }
//      let response;
//      if (payload.branchName) {
//        response = await ApiService.post("/technician/getSucessPaymentsForTable", payload);
//      }
//      // Ensure response.data is always an array
//      if (response?.status && Array.isArray(response.data)) {
//        setReceivedPayments(response.data);
//      } else {
//        setReceivedPayments([]); // Prevent undefined
//      }
//    } catch (error) {
//      console.error('Error fetching received payments:', error);
//      setReceivedPayments([]); // Handle errors gracefully
//    }
//  };
 
//  useEffect(() => {
//    ReceivedPayments();
//  }, []);
 
 
 
//  // Pending Amount
 
//  const PendingAmount = async () => {
//    try {
//      const payload = {
//        companyCode: initialAuthState.companyCode,
//        unitCode: initialAuthState.unitCode,
//        role: localStorage.getItem('role'),
//      };
//      if (payload.role === 'Branch Manager') {
//        payload.branchName = localStorage.getItem('branchName');
//      }
//      let response;
//      if (payload.branchName) {
//        response = await ApiService.post("/technician/getPendingPaymentsForTable", payload);
//      }
//      // Ensure response.data is always an array
//      if (response?.status && Array.isArray(response.data)) {
//        setPendingAmount(response.data);
//      } else {
//        setPendingAmount([]); // Prevent undefined
//      }
//    } catch (error) {
//      console.error('Error fetching pending amount data:', error);
//      setPendingAmount([]); // Handle errors gracefully
//    }
//  };
 
//  useEffect(() => {
//    PendingAmount();
//  }, []);
 
 
 
 
//   const handleOpenModal = (name) => {
//     setSelectedStock(name);
//     setIsModalOpen(true);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const dropdownOptions =
//     selectedStock === "Payment Stock"
//       ? ["Received Payments", "Pending Payments"]
//       : ["Branch Stock", "In hand Stock", "Installed Stock"];

//   const handleSelect = (stock) => {
//     setSelectedStock(stock);
//     setIsDropdownOpen(false);
//   };

//   const handleDownload = () => {
//     if (!previewData || previewData.length === 0) {
//       alert("No data available to download.");
//       return;
//     }

//     try {
//       const worksheet = XLSX.utils.json_to_sheet(previewData);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Branch_Staff");
//       XLSX.writeFile(workbook, "Filtered_Branch_Staff.xlsx");
//       setIsPreviewOpen(false);
//     } catch (error) {
//       console.error("Error generating Excel file:", error);
//       alert("Failed to generate the Excel file. Please try again.");
//     }
//   };

//   const formatExcelData = (data) => {
//     return data.map((item) => ({
//       "Emp ID": item.staffId,
//       "Name of the Employee": item.name,
//       "Designation": item.designation,
//       "Branch": item.branchName || "",
//       "Contact Number": item.phoneNumber,
//     }));
//   };

//   const handlePreview = () => {
//     console.log("Payments Stock:", pendingAmount);
  
//     if (!pendingAmount || !Array.isArray(pendingAmount.employees)) {
//       console.error("paymentsStock.employees is not an array:", pendingAmount.employees);
//       alert("Error: Data is not in the correct format.");
//       return;
//     }
  
//     const filteredData = pendingAmount.employees.filter((row) =>
//       row.name && typeof row.name === "string"
//         ? row.name.toLowerCase().includes(search.toLowerCase())
//         : false
//     );
  
//     console.log("Filtered Data:", filteredData);
  
//     const formattedData = formatExcelData(filteredData);
  
//     if (formattedData.length === 0) {
//       alert("No data available to preview.");
//       return;
//     }
  
//     setPreviewData(formattedData);
//     setIsPreviewOpen(true);
//   };
  

//   return (
//     <div>
//       {/* Branch Stock */}
//       <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-green-600 bg-green-600">
//         <p className="text-xl text-white font-bold">Branch Stock</p>
//         <FaDownload
//           className="text-xl text-red-500 cursor-pointer"
//           onClick={() => handleOpenModal("Branch Stock")}
//         />
//       </div>

//       {/* Payment Stock */}
//       <div className="flex justify-between items-center shadow-lg rounded-md p-4 my-8 border border-green-600 bg-green-600">
//         <p className="text-xl text-white font-bold">Payment Stock</p>
//         <FaDownload
//           className="text-xl text-red-500 cursor-pointer"
//           onClick={() => handleOpenModal("Payment Stock")}
//         />
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-md shadow-lg w-1/2 h-96 flex flex-col">
//             <h2 className="text-center text-green-600 text-lg font-bold">{selectedStock}</h2>

//             {/* Dropdown */}
//             <div className="relative mt-4">
//               <div
//                 className="flex justify-between items-center bg-green-600 text-white font-bold p-3 rounded-md cursor-pointer"
//                 onClick={toggleDropdown}
//               >
//                 <span>{selectedStock}</span>
//                 {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
//               </div>

//               {isDropdownOpen && (
//                 <div className="absolute top-full left-0 w-full bg-gray-200 mt-1 rounded-md shadow-md">
//                   {dropdownOptions.map((stock, index) => (
//                     <p key={index} className="p-3 cursor-pointer hover:bg-gray-300" onClick={() => handleSelect(stock)}>
//                       {stock}
//                     </p>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="flex-grow"></div>
// <button
//   className="w-64 bg-green-600 text-white font-bold py-2 rounded-md mt-4 self-center"
//   onClick={() => {
//     handlePreview(); 
//     setIsModalOpen(false);
//   }}
// >
//   Submit
// </button>

//           </div>
//         </div>
//       )}

//       {/* Preview Modal */}
//       {isPreviewOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
//             <h4 className="text-xl font-semibold mb-4">Preview Data - {selectedStock}</h4>
//             <button onClick={handleDownload} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//               Download Excel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reports;




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

  const dropdownOptions =
    selectedStock === "Payment Stock"
      ? ["Received Payments", "Pending Payments"]
      : ["Branch Stock", "In hand Stock", "Installed Stock"];

  const handleSelect = (stock) => {
    setSelectedStock(stock);
    setIsDropdownOpen(false);

    if (stock === "Received Payments") fetchPayments("/technician/getSucessPaymentsForTable");
    else if (stock === "Pending Payments") fetchPayments("/technician/getPendingPaymentsForTable");
    else fetchBranchStockDetails();
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

  return (
    <div>
      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Branch Stock</p>
        <FaDownload className="text-xl text-red-500 cursor-pointer" onClick={() => handleOpenModal("Branch Stock")} />
      </div>

      <div className="flex justify-between items-center p-4 my-8 border bg-green-600">
        <p className="text-xl text-white font-bold">Payment Stock</p>
        <FaDownload className="text-xl text-red-500 cursor-pointer" onClick={() => handleOpenModal("Payment Stock")} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-center text-green-600 font-bold">{selectedStock}</h2>
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
