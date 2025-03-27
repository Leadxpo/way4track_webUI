import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import * as XLSX from "xlsx";


const getColorClasses = (color) => {
  switch (color) {
    case 'blue':
      return { border: 'border-blue-700', bg: 'bg-blue-700' };
    case 'red':
      return { border: 'border-red-700', bg: 'bg-red-700' };
    case 'green':
      return { border: 'border-green-700', bg: 'bg-green-700' };
    case 'orange':
      return { border: 'border-orange-700', bg: 'bg-orange-700' };
    default:
      return { border: 'border-gray-700', bg: 'bg-gray-700' };
  }
};
const BranchManagerHome = () => {
  const [productDetailsByBranch, setProductDetailsByBranch] = useState([]);
  const [creditAndDebitPercentages, setCreditAndDebitPercentages] = useState([]);
  const [assertsCardData, setAssertsCardData] = useState([]);
  const [requestBranchWiseData, setRequestBranchWiseData] = useState([]);
  const [totalStaffDetails, setTotalStaffDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [activeTable, setActiveTable] = useState(null);

  
  const fetchProductDetailsByBranch = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };

      if (payload.role === 'Branch Manager') {
        payload.branch = localStorage.getItem('branchName');
      }

      let response;
      if (payload.branch) {
        response = await ApiService.post('/dashboards/getProductDetailsByBranch', payload);
      }

      if (response && response.status) {
        setProductDetailsByBranch(response.data || []);
      } else {
        alert(response?.message || 'Failed to fetch product details.');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      // alert('Failed to fetch product details.');
    }
  };

  // const fetchProductDetailsByBranch = async () => {
  //   try {
  //     const payload = {
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //       role: localStorage.getItem('role'),
  //     };
  //     if (payload.role === 'Branch Manager') {
  //       payload.branch = localStorage.getItem('branchName');
  //     }
  //     let response;
  //     if (payload.branchName) {
  //       response = await ApiService.post('/dashboards/getProductDetailsByBranch', payload);
  //     }
  //     if (response.status) {
  //       setProductDetailsByBranch(response.data || []);
  //     } else {
  //       alert(response.message || 'Failed to fetch ticket details.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching tickets data:', error);
  //     //alert('Failed to fetch tickets data.');
  //   }
  // };
  // // const branchProductData = productDetailsByBranch[0]; // Assuming only one branch in response
  // const totalQuantity = branchProductData?.products?.reduce(
  //   (sum, product) => sum + product.totalProducts,
  //   0
  // ) || 0;
  const fetchCreditAndDebitPercentages = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };
      if (payload.role === 'Branch Manager') {
        payload.branchName = localStorage.getItem('branchName');
      }
      let response;
      if (payload.branchName) {
        response = await ApiService.post('/dashboards/getLast30DaysCreditAndDebitPercentages', payload);
      }
      //  else {
      //   response = await ApiService.post('/dashboards/getLast30DaysCreditAndDebitPercentages', payload);
      // }
      if (response.status) {
        setCreditAndDebitPercentages(response.data || []);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      //alert('Failed to fetch tickets data.');
    }
  };
  const fetchAssertsCardData = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };
      if (payload.role === 'Branch Manager') {
        payload.branch = localStorage.getItem('branchName');
      }
      let response;
      if (payload.branchName) {
        response = await ApiService.post('/dashboards/assertsCardData', payload);
      }
      if (response.status) {
        setAssertsCardData(response.data || []);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      //alert('Failed to fetch tickets data.');
    }
  };
  const fetchRequestBranchWise = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };
      if (payload.role === 'Branch Manager') {
        payload.branchName = localStorage.getItem('branchName');
      }
      let response;
      if (payload.branchName) {
        response = await ApiService.post('/requests/getTodayRequestBranchWise', payload);
      }
      // Ensure response.data is always an array
      if (response?.status && Array.isArray(response.data)) {
        setRequestBranchWiseData(response.data);
      } else {
        setRequestBranchWiseData([]); // Prevent undefined
      }
    } catch (error) {
      console.error('Error fetching request data:', error);
      setRequestBranchWiseData([]); // Handle errors gracefully
    }
  };
  const TotalStaffDetails = async (staff_branchName) => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };
      if (payload.role === 'Branch Manager') {
        payload.branchName = localStorage.getItem('branchName');
      }
      let response;
      if (payload.branchName) {
        response = await ApiService.post('/dashboards/getTotalStaffDetails', payload);
      }
      if (response.status) {
        setTotalStaffDetails(response.data || []);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      //alert('Failed to fetch tickets data.');
    }
  };

  const branchProductData = productDetailsByBranch?.[0] ?? { products: [] };// Safe fallback if array is empty or undefined
  const totalQuantity = branchProductData?.products?.reduce(
    (sum, product) => sum + (product.totalProducts || 0),
    0
  ) ?? 0;

  // const branchData = creditAndDebitPercentages?.[0] || {};  
  useEffect(() => {
    fetchProductDetailsByBranch();
  }, []);
  const fetchData = async () => {
    await Promise.all([
      fetchCreditAndDebitPercentages(),
      fetchProductDetailsByBranch(),
      fetchAssertsCardData(),
      fetchRequestBranchWise(),
      TotalStaffDetails(),
    ]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const branchData = creditAndDebitPercentages?.[0] || {};

  const stats = [
    { label: "Total Payment", value: 500, color: "bg-red-300", textColor: "text-red-700" },
    { label: "Received Amount", value: 220, color: "bg-green-300", textColor: "text-green-700" },
    { label: "Pending Amount", value: 280, color: "bg-purple-300", textColor: "text-purple-700" }
  ];


  
  const data = [
    { id: "E-001", product: "Bike GPS Tracker", total: 564, inHand: "Praveen", remaining: 635 },
    { id: "E-002", product: "Bike GPS Tracker", total: 564, inHand: "Praveen", remaining: 635 },
    { id: "E-003", product: "Bike GPS Tracker", total: 564, inHand: "Praveen", remaining: 635 },
    { id: "E-004", product: "Bike GPS Tracker", total: 564, inHand: "Praveen", remaining: 635 }
  ];


  const statss = [
    {
      title: "Asserts",
      total: 70,
      details: [
        { label: "Office Asserts", value: 30 },
        { label: "Transport Asserts", value: 40 }
      ],
      color: "bg-green-600",
      borderColor: "border-green-400"
    },
    {
      title: "Staff",
      total: 64,
      details: [
        { label: "Technician", value: 20 },
        { label: "Non Technician", value: 34 },
        { label: "Sale Staff", value: 10 }
      ],
      color: "bg-red-600",
      borderColor: "border-red-400"
    }
  ];

  const employees = [
    {
      id: "E-001",
      name: "P. Chaitanya",
      designation: "CEO",
      branch: "Visakhapatnam",
      phone: "9911223344",
      status: "Present"
    },
    {
      id: "E-002",
      name: "P. Chaitanya",
      designation: "CEO",
      branch: "Visakhapatnam",
      phone: "9911223344",
      status: "Present"
    }
  ];


 // Filter data based on search query
 const filteredData = data.filter((row) =>
  row.product.toLowerCase().includes(search.toLowerCase())
);

// Function to Export to Excel
const handleDownloadExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  XLSX.writeFile(workbook, "Product_Data.xlsx");
};

  

const payments = [
  { id: "5837RH4T4T3", title: "Bike GPS Tracker", date: "09-06-2024", invoice: "5837RH4T4T3", amount: "50,000", status: "Successful" },
  { id: "5837RH4T4T3", title: "Bike GPS Tracker", date: "09-06-2024", invoice: "5837RH4T4T3", amount: "50,000", status: "Successful" },
  { id: "5837RH4T4T3", title: "Bike GPS Tracker", date: "26-02-2024", invoice: "5837RH4T4T3", amount: "50,000", status: "Pending" },
  { id: "5837RH4T4T3", title: "Bike GPS Tracker", date: "26-02-2024", invoice: "5837RH4T4T3", amount: "50,000", status: "Failed" },
  { id: "5837RH4T4T3", title: "Bike GPS Tracker", date: "09-06-2024", invoice: "5837RH4T4T3", amount: "50,000", status: "Successful" },
];

const filteredPayments = payments.filter(payment =>
  payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  payment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  payment.date.includes(searchTerm) ||
  payment.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
  payment.amount.includes(searchTerm) ||
  payment.status.toLowerCase().includes(searchTerm.toLowerCase())
);

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(payments);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
  XLSX.writeFile(workbook, "Payments.xlsx");
};



const toggleTable = (label) => {
  setActiveTable(activeTable === label ? null : label);
};




  return (
    <div className="p-6">
      {/* branch card Section */}
      <div className="flex justify-center mt-10 mb-6">
        <div
          className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          style={{ width: "80%" }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="absolute -top-6 left-4">
              <img
                src="/logo-square.png"
                alt="Branch Logo"
                className="w-14 h-14 rounded-md shadow-md bg-white"
              />
            </div>
            <span className="text-2xl font-semibold text-gray-800 mt-4">
              {branchData.branchName || "N/A"}
            </span>
          </div>
          <div className="space-y-4">
            <div className="text-green-600 flex items-center text-xl font-bold">
              <span>Credit Percentage:</span>
              <span className="ml-2">
                {branchData.creditPercentage !== undefined ? `${branchData.creditPercentage}%` : "N/A"}
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-6">
              <div
                className="bg-green-600 h-6 rounded-full"
                style={{ width: `${branchData.creditPercentage || 0}%` }}
              ></div>
            </div>
            <div className="text-red-500 flex items-center text-xl font-bold">
              <span>Debit Percentage:</span>
              <span className="ml-2">
                {branchData.debitPercentage !== undefined ? `${branchData.debitPercentage}%` : "N/A"}
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-6">
              <div
                className="bg-red-600 h-6 rounded-full"
                style={{ width: `${branchData.debitPercentage || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>


      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-md w-80 text-center cursor-pointer ${stat.color}`}
            onClick={() => toggleTable(stat.label)}
          >
            <div className="text-lg font-semibold">{stat.label}</div>
            <div className={`text-4xl font-bold ${stat.textColor} mt-2`}>{stat.value}</div>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              onClick={() => toggleTable(stat.label)}
            >
              {stat.label} Details
            </button>
          </div>
        ))}
      </div>


 {/* Payments Table - Visible only if showTable is true */}
 {activeTable === "Total Payment" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Total Payments</h2>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-red-300 text-white px-4 py-2 rounded">Download Excel</button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-red-300 text-white">
                <th className="p-2 border">Transaction ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Date of Payment</th>
                <th className="p-2 border">Invoice ID</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                  <td className="p-2 border text-center">{payment.id}</td>
                  <td className="p-2 border text-center">{payment.title}</td>
                  <td className="p-2 border text-center">{payment.date}</td>
                  <td className="p-2 border text-center">{payment.invoice}</td>
                  <td className="p-2 border text-center">{payment.amount}</td>
                  <td className="p-2 border text-center">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        payment.status === "Successful"
                          ? "bg-green-500"
                          : payment.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    

{/* Receved Payments Table */}
{activeTable === "Received Amount" && (
<div>
<h2 className="text-2xl font-bold mb-4">Received Payments</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-green-400 text-white px-4 py-2 rounded" onClick={exportToExcel}>
          Download Excel
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-green-400 text-white">
            <th className="p-2 border">Transaction ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Date of Payment</th>
            <th className="p-2 border">Invoice ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
              <td className="p-2 border text-center">{payment.id}</td>
              <td className="p-2 border text-center">{payment.title}</td>
              <td className="p-2 border text-center">{payment.date}</td>
              <td className="p-2 border text-center">{payment.invoice}</td>
              <td className="p-2 border text-center">{payment.amount}</td>
              <td className="p-2 border text-center">
                <span className={`px-2 py-1 rounded text-white ${
                  payment.status === "Successful" ? "bg-green-500" :
                  payment.status === "Pending" ? "bg-yellow-500" : "bg-red-500"
                }`}>
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
{/* Pending Amount */}
{activeTable === "Pending Amount" && (
<div>
<h2 className="text-2xl font-bold mb-4">Total Payments</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-violet-500 text-white px-4 py-2 rounded" onClick={exportToExcel}>
          Download Excel
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-violet-500 text-white">
            <th className="p-2 border">Transaction ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Date of Payment</th>
            <th className="p-2 border">Invoice ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
              <td className="p-2 border text-center">{payment.id}</td>
              <td className="p-2 border text-center">{payment.title}</td>
              <td className="p-2 border text-center">{payment.date}</td>
              <td className="p-2 border text-center">{payment.invoice}</td>
              <td className="p-2 border text-center">{payment.amount}</td>
              <td className="p-2 border text-center">
                <span className={`px-2 py-1 rounded text-white ${
                  payment.status === "Successful" ? "bg-green-500" :
                  payment.status === "Pending" ? "bg-yellow-500" : "bg-red-500"
                }`}>
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}





<div className=' flex  justify-between mt-10'>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search product..."
        className="border p-2 mb-4 w-96 rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Download Excel Button */}
      <div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Download Excel
        </button>
      </div>
      </div>

        {/* Table Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="py-3 px-4 text-left">NO.</th>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">In hand Products</th>
              <th className="py-3 px-4 text-left">Remaining Products</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} border-b`}>
                <td className="py-3 px-4">{row.id}</td>
                <td className="py-3 px-4">{row.product}</td>
                <td className="py-3 px-4">{row.total}</td>
                <td className="py-3 px-4">{row.inHand}</td>
                <td className="py-3 px-4">{row.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
 {/* Modal for Download Confirmation */}
 {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Confirm Download</h2>
            <p className="mb-4">Do you want to download the filtered data as an Excel file?</p>

            {/* Modal Actions */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  handleDownloadExcel();
                  setIsModalOpen(false);
                }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}








{/* Stat Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-10">
        {statss.map((stat, index) => (
          <div key={index} className={`rounded-lg shadow-md p-5 border ${stat.borderColor}`}>
            <div className={`text-white p-3 rounded-t-lg font-semibold text-xl ${stat.color}`}>
              {stat.title} <span className="float-right">Total : {stat.total}</span>
            </div>
            <div className="p-4">
              {stat.details.map((detail, i) => (
                <p key={i} className="text-gray-700 font-medium">
                  {detail.label} : {detail.value}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>




      <div className=' flex  justify-between mt-10'>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search product..."
        className="border p-2 mb-4 w-96 rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Download Excel Button */}
      <div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Download Excel
        </button>
      </div>
      </div>

 {/* Table */}
 <div className="bg-white p-4 rounded-lg shadow-md mt-2">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="py-3 px-4 text-left">Employ ID</th>
              <th className="py-3 px-4 text-left">Employ Name</th>
              <th className="py-3 px-4 text-left">Designation</th>
              <th className="py-3 px-4 text-left">Branch</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
              <th className="py-3 px-4 text-left">At ident</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} border-b`}>
                <td className="py-3 px-4">{emp.id}</td>
                <td className="py-3 px-4">{emp.name}</td>
                <td className="py-3 px-4">{emp.designation}</td>
                <td className="py-3 px-4">{emp.branch}</td>
                <td className="py-3 px-4">{emp.phone}</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{emp.status}</span>
                </td>
                <td className="py-3 px-4">
                  <BsThreeDotsVertical className="text-gray-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

</div>


    
      </div>
   
  )
};
export default BranchManagerHome;
