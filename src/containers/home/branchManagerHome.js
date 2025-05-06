import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useNavigate } from 'react-router';

import { BsThreeDotsVertical } from "react-icons/bs";
import * as XLSX from "xlsx";
import { FaFileDownload } from "react-icons/fa";




const BranchManagerHome = () => {
  const navigate = useNavigate();


  const [workStatus, setWorkStatus] = useState({
    installedPercentage: 0,
    pendingPercentage: 0,
  });
  const [paymentData, setPaymentData] = useState({
    totalPayment: 0,
    totalPendingPayment: 0,
    totalSuccessPayment: 0,
  });

  const [requestBranchWiseData, setRequestBranchWiseData] = useState([]);
  const [totalStaffDetails, setTotalStaffDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [searchTotal, setSearchTotal] = useState("");
  const [searchReceved, setSearchReceved] = useState("");
  const [searchPending, setSearchPending] = useState("");
  const [activeTable, setActiveTable] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [totalPayments, setTotalPayments] = useState([]);
  const [receivedPayments, setReceivedPayments] = useState([]);
  const [pendingAmount, setPendingAmount] = useState([]);
  const [assertsData, setAssertsData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [branches, setBranches] = useState([]);




  const getBranchDetailsById = async (branchId) => {
    try {
      const response = await ApiService.post("/branch/getBranchDetailsById", { id: branchId });
  
      if (response?.status && response.data) {
        setBranches(response.data);  // ✅ Correct use of setState
        console.log("===============>",response.data)
        return response.data;
      } else {
        alert(response?.message || "Failed to fetch branch details.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching branch details:", error);
      return null;
    }
  };
  
  useEffect(() => {
    getBranchDetailsById();
  }, []);



  useEffect(() => {
    fetchPaymentStatus();
  }, []);

  const fetchPaymentStatus = async () => {
    try {
      const payload = {
        companyCode: localStorage.getItem("companyCode"),
        unitCode: localStorage.getItem("unitCode"),
        role: localStorage.getItem("role"),
      };

      if (payload.role === "Branch Manager") {
        payload.branchName = localStorage.getItem("branchName");
      }

      let response;
      if (payload.branch) {
        response = await ApiService.post(
          "/technician/getPaymentStatusPayments",
          payload
        );
      }

      if (response?.status) {
        setPaymentData({
          totalPayment: response.data?.totalPayment || 0,
          totalPendingPayment: response.data?.totalPendingPayment || 0,
          totalSuccessPayment: response.data?.totalSuccessPayment || 0,
        });
      } else {
        alert(response?.message || "Failed to fetch payment details.");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  const paymentStatus = [
    {
      label: "Total Payment",
      value: paymentData.totalPayment,
      color: "bg-red-300",
      textColor: "text-red-700",
    },
    {
      label: "Received Amount",
      value: paymentData.totalSuccessPayment,
      color: "bg-green-300",
      textColor: "text-green-700",
    },
    {
      label: "Pending Amount",
      value: paymentData.totalPendingPayment,
      color: "bg-purple-300",
      textColor: "text-purple-700",
    },
  ];


  useEffect(() => {
    fetchWorkStatusPercentages();
  }, []);

  const fetchWorkStatusPercentages = async () => {
    try {
      const payload = {
        companyCode: localStorage.getItem("companyCode"),
        unitCode: localStorage.getItem("unitCode"),
        // role: localStorage.getItem("role"),
      };

      if (payload.role === "Branch Manager") {
        payload.branchName = localStorage.getItem("branchName");
      }

      let response;
      if (payload.branchName) {
        response = await ApiService.post(
          "/work-allocations/getTotalPendingAndCompletedPercentage",
          payload
        );
      }

      if (response?.status) {
        setWorkStatus({
          installedPercentage: response.data?.creditPercentage || 0,
          pendingPercentage: response.data?.debitPercentage || 0,
        });
      } else {
        alert(response.data?.message || "Failed to fetch work status data.");
      }
    } catch (error) {
      console.error("Error fetching work status data:", error);
    }
  };




  // Fetch Asserts Data
  const fetchAssertsCardData = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem("role"),
      };
      if (payload.role === "Branch Manager") {
        payload.branch = localStorage.getItem("branchName");
      }
      let response;
      if (payload.branch) {
        response = await ApiService.post("/dashboards/assertsCardData", payload);
      }
      if (response.status) {
        setAssertsData(response.data || []);
      } else {
        alert(response.data.message || "Failed to fetch asserts details.");
      }
    } catch (error) {
      console.error("Error fetching asserts data:", error);
    }
  };


  const response = {
    data: {
      groupedBranches: [],
      officeAsserts: 0,
      transportAsserts: 0,
      totalAsserts: 0,
    },
  };





  // Fetch Staff Data
  const fetchStaffData = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem("role"),
      };
      if (payload.role === "Branch Manager") {
        payload.branchName = localStorage.getItem("branchName");
      }
      let response;
      if (payload.branchName) {
        response = await ApiService.post("/dashboards/getTotalStaffDetails", payload);
      }
      if (response?.status) {
        setStaffData(Array.isArray(response.data.result) ? response.data.result : []);
        console.log("total staff Card Details", response.data.result)
      } else {
        alert(response.data.message || "Failed to fetch staff details.");
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  useEffect(() => {
    fetchAssertsCardData();
    fetchStaffData();
  }, []);






  // Total Payments

  const TotalPayments = async () => {
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
        response = await ApiService.post("/technician/getAllPaymentsForTable", payload);
      }
      // Ensure response.data is always an array
      if (response?.status && Array.isArray(response.data)) {
        setTotalPayments(response.data);
        console.log("get all payments",response.data)
      } else {
        setTotalPayments([]); // Prevent undefined
      }
    } catch (error) {
      console.error('Error fetching request data:', error);
      setRequestBranchWiseData([]); // Handle errors gracefully
    }
  };

  useEffect(() => {
    TotalPayments();
  }, []);

  // Filtering payments based on search query
  const filteredTotalPayments = Array.isArray(totalPayments)
    ? totalPayments.filter((payment) =>
      payment?.technicianName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];


  // Received Payments

  const ReceivedPayments = async () => {
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
        response = await ApiService.post("/technician/getSucessPaymentsForTable", payload);
      }
      // Ensure response.data is always an array
      if (response?.status && Array.isArray(response.data)) {
        setReceivedPayments(response.data);
      } else {
        setReceivedPayments([]); // Prevent undefined
      }
    } catch (error) {
      console.error('Error fetching received payments:', error);
      setReceivedPayments([]); // Handle errors gracefully
    }
  };

  useEffect(() => {
    ReceivedPayments();
  }, []);

  // Filtering received payments based on search query
  const filteredPayments = Array.isArray(receivedPayments)
    ? receivedPayments.filter((payment) =>
      payment?.technicianName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];


  // Pending Amount

  const PendingAmount = async () => {
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
        response = await ApiService.post("/technician/getPendingPaymentsForTable", payload);
      }
      // Ensure response.data is always an array
      if (response?.status && Array.isArray(response.data)) {
        setPendingAmount(response.data);
      } else {
        setPendingAmount([]); // Prevent undefined
      }
    } catch (error) {
      console.error('Error fetching pending amount data:', error);
      setPendingAmount([]); // Handle errors gracefully
    }
  };

  useEffect(() => {
    PendingAmount();
  }, []);

  // Filtering pending amounts based on search query
  const filteredPendingAmount = Array.isArray(pendingAmount)
    ? pendingAmount.filter((payment) =>
      payment?.technicianName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];






  // product Details

  useEffect(() => {
    fetchWarehouseProducts();
  }, []);

  const fetchWarehouseProducts = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem("role"),
      };
      if (payload.role === "Branch Manager") {
        payload.branchName = localStorage.getItem("branchName");
      }

      let response;
      if (payload.branchName) {
        response = await ApiService.post("/dashboards/getWareHouseProductDetailsByBranch", payload);
      }

      if (response?.status) {
        setWarehouseProducts(Array.isArray(response.data) ? response.data : []);
        console.log("Warehouse Products:", response.data);
      } else {
        alert(response.data.message || "Failed to fetch warehouse products.");
      }
    } catch (error) {
      console.error("Error fetching warehouse products:", error);
    }
  };

  const filteredProducts = Array.isArray(warehouseProducts)
    ? warehouseProducts.filter((product) =>
      product?.productName && searchTerm
        ? product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
    : [];


  const handleProductsPreview = () => {
    console.log("Total Product Details:", warehouseProducts); // Debugging output

    const filteredProducts = Array.isArray(warehouseProducts)
      ? warehouseProducts.filter((product) =>
        product.productName &&
        typeof product.productName === "string" &&
        product.productName.toLowerCase().includes(search.toLowerCase())
      )
      : [];

    console.log("Filtered Data (Preview):", filteredProducts); // Debugging output

    if (filteredProducts.length === 0) {
      alert("No product data available to preview.");
      return;
    }

    const formattedData = formatProductExcelData(filteredProducts);
    setPreviewData(formattedData);
    setIsPreviewOpen(true);
  };

  // Function to format product data for Excel export
  const formatProductExcelData = (data) => {
    return data.map((item) => ({
      "Product ID": item.productId,
      "Product Name": item.productName,
      "Total": (item.inHandStock + item.presentStock) || 0,
      "In Hand": item.inHandStock || 0,
      "Remaining": item.presentStock || 0,
    }));
  };






  // Get all staff Data


  useEffect(() => {
    TotalStaffDetails();
  }, []);

  const TotalStaffDetails = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem("role"),
      };
      if (payload.role === "Branch Manager") {
        payload.branchName = localStorage.getItem("branchName");
      }
      let response;
      if (payload.branchName) {
        response = await ApiService.post("/dashboards/getTotalStaffDetails", payload);
      }
      if (response?.status) {
        // Ensure data is always an array
        setTotalStaffDetails(Array.isArray(response.data.staff) ? response.data.staff : []);

        console.log("total staff details", response.data.staff)
      } else {
        alert(response.data.message || "Failed to fetch staff details.");
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };


  // Filtered Staff Details (Case Insensitive)
  const filteredStaff = totalStaffDetails.filter((emp) =>
    Object.values(emp).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );


  const toggleTable = (label) => {
    setActiveTable(activeTable === label ? null : label);
  };


  const formatExcelData = (data) => {
    return data.map((item) => ({
      "Emp ID": item.staffId,
      "Name of the Employee": item.staffName,
      "Designation": item.staffDesignation,
      "Branch": item.branchName || "",
      "Contact Number": item.phoneNumber,

    }));
  };

  const handlePreview = () => {
    console.log("Total Staff Details:", totalStaffDetails); // Debugging output

    const filteredStaff = totalStaffDetails.filter((row) =>
      row.staffName && typeof row.staffName === "string"
        ? row.staffName.toLowerCase().includes(search.toLowerCase())
        : false
    );

    console.log("Filtered Data (Preview):", filteredStaff); // Debugging output

    if (filteredStaff.length === 0) {
      alert("No data available to preview.");
      return;
    }

    const formattedData = formatExcelData(filteredStaff);
    setPreviewData(formattedData);
    setIsPreviewOpen(true);
  };



  const handleDownload = () => {
    if (!previewData || previewData.length === 0) {
      alert("No data available to download.");
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(previewData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Branch_Staff");
      XLSX.writeFile(workbook, "Filtered_Branch_Staff.xlsx");

      setIsPreviewOpen(false); // Close modal after download
    } catch (error) {
      console.error("Error generating Excel file:", error);
      alert("Failed to generate the Excel file. Please try again.");
    }
  };


  // privews payments

  // Total Payments Data Export
  const formatPaymentsExcelData = (data) => {
    return data.map((item) => ({
      "Payment ID": item.paymentId,
      "Employee ID": item.staffId,
      "Employee Name": item.staffName,
      "Total Payments": item.totalPayments || 0,
    }));
  };

  // Received Amount Data Export
  const formatReceivedExcelData = (data) => {
    return data.map((item) => ({
      "Receipt ID": item.receiptId,
      "Employee ID": item.staffId,
      "Employee Name": item.staffName,
      "Received Amount": item.receivedAmount || 0,
    }));
  };

  // Pending Amount Data Export
  const formatPendingExcelData = (data) => {
    return data.map((item) => ({
      "Employee ID": item.staffId,
      "Employee Name": item.staffName,
      "Pending Amount": (item.totalPayments - item.receivedAmount) || 0, // Calculated field
    }));
  };


  // Handle Payments Preview
  const handlePaymentsPreview = () => {
    if (filteredTotalPayments.length === 0) {
      alert("No payment data available to preview.");
      return;
    }

    const formattedData = formatPaymentsExcelData(filteredTotalPayments);
    setPreviewData(formattedData);
    setIsPreviewOpen(true);
  };

  // Handle Received Amount Preview
  const handleReceivedPreview = () => {
    if (filteredPayments.length === 0) {
      alert("No received amount data available to preview.");
      return;
    }

    const formattedData = formatReceivedExcelData(filteredPayments);
    setPreviewData(formattedData);
    setIsPreviewOpen(true);
  };

  // Handle Pending Amount Preview
  const handlePendingPreview = () => {
    if (filteredPendingAmount.length === 0) {
      alert("No pending amount data available to preview.");
      return;
    }

    const formattedData = formatPendingExcelData(filteredPendingAmount);
    setPreviewData(formattedData);
    setIsPreviewOpen(true);
  };



  const handleEdit = (branchDetails) => {
    navigate('/edit-branch', { state: { branchDetails } });
  };



  const handleMoreDetails = (branchDetails) => {
    console.log(branchDetails, "Navigating with this asset data");
    navigate('/branch-details', { state: { branchDetails } });
  };


  return (
    <div className="p-6">
      <div className="flex justify-center mt-10">
        <div
          className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          style={{ width: "100%" }}
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
              {localStorage.getItem("branchName") || "Branch"}
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-green-600 flex items-center text-xl font-bold">
              <span>Installed Work Percentage:</span>
              <span className="ml-2">{workStatus.installedPercentage}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-6">
              <div
                className="bg-green-600 h-6 rounded-full"
                style={{ width: `${workStatus.installedPercentage}%` }}
              ></div>
            </div>

            <div className="text-red-500 flex items-center text-xl font-bold">
              <span>Pending Work Percentage:</span>
              <span className="ml-2">{workStatus.pendingPercentage}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-6">
              <div
                className="bg-red-600 h-6 rounded-full"
                style={{ width: `${workStatus.pendingPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">

            <button className="text-gray-600 rounded-md px-3 py-2 border border-gray-300 hover:bg-gray-200"
              onClick={() => handleEdit(branches)}
            >
              Edit
            </button>

            <button className="text-gray-600 rounded-md px-3 py-2 border border-gray-300 hover:bg-gray-200"
              onClick={() => handleMoreDetails(branches)}
            >
              More Details
            </button>
          </div>
        </div>
      </div>






   {/* Stats Section */}
<div className="w-full sm:w-[95%] md:w-[90%] lg:w-[90%] xl:w-[85%] mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 mt-10">
    {paymentStatus.map((stat, index) => (
      <div
        key={index}
        className={`p-6 rounded-xl shadow-md w-full text-center cursor-pointer ${stat.color}`}
        onClick={() => toggleTable(stat.label)}
      >
        <button
          className="mt-5 px-6 py-2 text-black rounded-lg font-bold hover:bg-blue-100"
          onClick={() => toggleTable(stat.label)}
        >
          {stat.label}
        </button>
        <div className={`text-4xl font-bold ${stat.textColor} mt-10`}>{stat.value}</div>
      </div>
    ))}
  </div>
</div>



      {/* Payments Table - Visible only if showTable is true */}
      {activeTable === "Total Payment" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-red-400">Total Payments</h2>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded w-1/3"
              value={searchTotal}
              onChange={(e) => setSearchTotal(e.target.value)}
            />
            {/* Preview & Download Button */}
            <button
              onClick={handlePaymentsPreview}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            >
              <FaFileDownload className="mr-2" /> Preview & Download
            </button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-red-300 text-white">
                <th className="p-2 border">Staff Id</th>
                <th className="p-2 border">Staff Name</th>
                {/* <th className="p-2 border">Date of Payment</th>
                <th className="p-2 border">Invoice ID</th> */}
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredTotalPayments]
                .sort((a, b) => String(a.staffId).localeCompare(String(b.staffId))).map((payment, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                    <td className="p-2 border text-center">{payment.staffId}</td>
                    <td className="p-2 border text-center">{payment.staffName}</td>
                    {/* <td className="p-2 border text-center">{payment.date}</td>
                  <td className="p-2 border text-center">{payment.invoice}</td> */}
                    <td className="p-2 border text-center">{payment.totalPayment}</td>
                    <td className="p-2 border text-center">
                      <span
                        className={`px-2 py-1 rounded text-white ${payment.status === "COMPLETE"
                          ? "bg-green-500"
                          : payment.status === "PENDING"
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
          <h2 className="text-2xl font-bold mb-4 text-green-400">Received Amount</h2>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded w-1/3"
              value={searchReceved}
              onChange={(e) => setSearchReceved(e.target.value)}
            />
            {/* Preview & Download Button */}
            <button
              onClick={handleReceivedPreview}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            >
              <FaFileDownload className="mr-2" /> Preview & Download
            </button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-400 text-white">
                <th className="p-2 border">Staff Id</th>
                <th className="p-2 border">Staff Name</th>
                {/* <th className="p-2 border">Date of Payment</th>
            <th className="p-2 border">Invoice ID</th> */}
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredPayments]
                .sort((a, b) => String(a.staffId).localeCompare(String(b.staffId))).map((payment, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                    <td className="p-2 border text-center">{payment.staffId}</td>
                    <td className="p-2 border text-center">{payment.staffName}</td>
                    {/* <td className="p-2 border text-center">{payment.date}</td>
              <td className="p-2 border text-center">{payment.invoice}</td> */}
                    <td className="p-2 border text-center">{payment.totalPayment}</td>
                    <td className="p-2 border text-center">
                      <span className={`px-2 py-1 rounded text-white ${payment.status === "COMPLETE" ? "bg-green-500" :
                        payment.status === "PENDING" ? "bg-yellow-500" : "bg-red-500"
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
          <h2 className="text-2xl font-bold mb-4 text-violet-500">Pending Amount</h2>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded w-1/3"
              value={searchPending}
              onChange={(e) => setSearchPending(e.target.value)}
            />
            {/* Preview & Download Button */}
            <button
              onClick={handlePendingPreview}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            >
              <FaFileDownload className="mr-2" /> Preview & Download
            </button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-violet-500 text-white">
                <th className="p-2 border">Staff Id</th>
                <th className="p-2 border">Staff Name</th>
                {/* <th className="p-2 border">Date of Payment</th>
            <th className="p-2 border">Invoice ID</th> */}
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredPendingAmount]
                .sort((a, b) => String(a.staffId).localeCompare(String(b.staffId))).map((payment, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                    <td className="p-2 border text-center">{payment.staffId}</td>
                    <td className="p-2 border text-center">{payment.staffName}</td>
                    {/* <td className="p-2 border text-center">{payment.invoice}</td> */}
                    <td className="p-2 border text-center">{payment.totalPayment}</td>
                    {/* <td className="p-2 border text-center">{payment.paymentStatus}</td> */}
                    <td className="p-2 border text-center">
                      <span className={`px-2 py-1 rounded text-white ${payment.status === "COMPLETED" ? "bg-green-500" :
                        payment.status === "PENDING" ? "bg-yellow-500" : "bg-red-500"
                        }`}>
                      </span>
                    </td>
                    {payment.status}
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Preview & Download Button */}
        <button
          onClick={handleProductsPreview}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          <FaFileDownload className="mr-2" /> Preview & Download
        </button>
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((row, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} border-b`}>
                  <td className="py-3 px-4">{row.productId}</td>
                  <td className="py-3 px-4">{row.productName}</td>
                  <td className="py-3 px-4">{row.inHandStock + row.presentStock}</td>
                  <td className="py-3 px-4">{row.inHandStock}</td>
                  <td className="py-3 px-4">{row.presentStock}</td>
                </tr>

              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-5 px-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>




      <div className="flex justify-between gap-6 p-6 mt-10 bg-white shadow-lg rounded-lg ">

        {/* Asserts Card */}
        <div className="flex-1 p-6 bg-white  rounded-lg border border-gray-300">
          {/* Card Header - Total Asserts */}
          <h2 className="text-xl font-bold text-center text-green-600 border-b pb-2">
            Total Asserts: {response.data.totalAsserts}
          </h2>

          {/* Card Body - Office & Transport Asserts */}
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center bg-blue-100 p-4 rounded-md border border-blue-400">
              <span className="text-blue-600 font-semibold">Office Asserts</span>
              <span className="text-blue-600 font-bold text-lg">{response.data.officeAsserts}</span>
            </div>

            <div className="flex justify-between items-center bg-yellow-100 p-4 rounded-md border border-yellow-400">
              <span className="text-yellow-600 font-semibold">Transport Asserts</span>
              <span className="text-yellow-600 font-bold text-lg">{response.data.transportAsserts}</span>
            </div>
          </div>
        </div>

        {/* Staff Card */}
        <div className="flex-1 p-6 bg-white  rounded-lg border border-gray-300">
          {/* Card Header - Total Staff */}
          <h2 className="text-xl font-bold text-center text-red-600 border-b pb-2">
            Total Staff: {staffData.totalStaff}
          </h2>

          {/* Card Body - Staff Categories */}
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center bg-blue-100 p-4 rounded-md border border-blue-400">
              <span className="text-blue-600 font-semibold">Technicians</span>
              <span className="text-blue-600 font-bold text-lg">{staffData.totalTechnicians}</span>
            </div>

            <div className="flex justify-between items-center bg-yellow-100 p-4 rounded-md border border-yellow-400">
              <span className="text-yellow-600 font-semibold">Non Technicians</span>
              <span className="text-yellow-600 font-bold text-lg">{staffData.totalNonTechnicians}</span>
            </div>

            <div className="flex justify-between items-center bg-green-100 p-4 rounded-md border border-green-400">
              <span className="text-green-600 font-semibold">Sales Staff</span>
              <span className="text-green-600 font-bold text-lg">{staffData.salesStaff}</span>
            </div>
          </div>
        </div>

      </div>








      {/* Stat Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-10">
        {stats.map((stat, index) => (
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
      </div> */}




      <div className=' flex  justify-between mt-10'>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Employee Id..."
          className="border p-2 mb-4 w-96 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Preview & Download Button */}
        <div>
          <button
            onClick={handlePreview}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            <FaFileDownload className="mr-2" /> Preview & Download
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="py-3 px-4 text-left">Employ ID</th>
              <th className="py-3 px-4 text-left">Employ Name</th>
              <th className="py-3 px-4 text-left">Designation</th>
              <th className="py-3 px-4 text-left">Branch</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
              {/* <th className="py-3 px-4 text-left">At ident</th> */}
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredStaff]
              .sort((a, b) => String(a.staffId).localeCompare(String(b.staffId))).map((emp, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"
                    } border-b`}
                >
                  <td className="py-3 px-4">{emp.staffId}</td>
                  <td className="py-3 px-4">{emp.staffName}</td>
                  <td className="py-3 px-4">{emp.staffDesignation}</td>
                  <td className="py-3 px-4">{emp.branchName}</td>
                  <td className="py-3 px-4">{emp.phoneNumber}</td>
                  {/* <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {emp.status}
                  </span>
                </td> */}
                  <td className="py-3 px-4">
                    <BsThreeDotsVertical className="text-gray-600 cursor-pointer" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>



      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h4 className="text-xl font-semibold mb-4">Preview Data</h4>
            <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg">
              <table className="min-w-full border">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    {Object.keys(previewData[0]).map((key, index) => (
                      <th key={index} className="p-2 text-left border">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="p-2 border">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsPreviewOpen(false)}
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
      )}




    </div>
  )
};
export default BranchManagerHome;
