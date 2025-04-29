import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { FaPlus, FaFileExcel } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { FaFileDownload } from "react-icons/fa";
import { useNavigate } from 'react-router';

const SubDealerDetails = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const subDealerDetailsFromState = location.state?.subDealerDetails || {};
  console.log("==========Idddddd====+++++", subDealerDetailsFromState)

  const [subDealerStaffDetailsData, setSubDealerStaffDetailsData] = useState([]);
  const [subDealer, setSubDealer] = useState({});
  const [subDealerDetails, setSubDealerDetails] = useState([]);
  const [subDealerDetailsData, setSubDealerDetailsData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [searchTotal, setSearchTotal] = useState("");
  const [searchReceved, setSearchReceved] = useState("");
  const [searchPending, setSearchPending] = useState("");
  const [activeTable, setActiveTable] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [totalPayments, setTotalPayments] = useState([]);
  const [receivedPayments, setReceivedPayments] = useState([]);
  const [pendingAmount, setPendingAmount] = useState([]);
  const [requestBranchWiseData, setRequestBranchWiseData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [works, setWorks] = useState([]);



  useEffect(() => {
    const fetchSubDealerDetails = async () => {
      try {
        const response = await ApiService.post(
          '/subdealer/getSubDealerDetails',
          {
            subDealerId: subDealer.id,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          const subDealer = response.data?.[0];
          setSubDealerDetails({
            ...subDealer,
            name: subDealer.name,
            subDealerPhoneNumber: subDealer.subDealerPhoneNumber,
            emailId: subDealer.emailId,
            alternatePhoneNumber: subDealer.alternatePhoneNumber,
            aadharNumber: subDealer.aadharNumber,
            gstNumber: subDealer.gstNumber,
            address: subDealer.address,
            subDealerPhoto: subDealer.subDealerPhoto,
            branchName: subDealer.branchName,
          });
        } else {
          setSubDealerDetails({});
        }
      } catch (error) {
        console.error('Error fetching branch details:', error);
        alert('Failed to fetch branch details.');
      }
    };
    fetchSubDealerDetails();
  }, [subDealerDetailsFromState.SubDealerId]);

  // useEffect(() => {
  //   const fetchSubDealerDetailsData = async () => {
  //     try {
  //       const response = await ApiService.post(
  //         '/dashboards/getDetailSubDealerData',
  //         {
  //           subDealerId: subDealerDetailsFromState.SubDealerId,
  //           companyCode: initialAuthState.companyCode,
  //           unitCode: initialAuthState.unitCode,
  //         }
  //       );
  //       console.log(response.data);
  //       if (response.status) {
  //         // Ensure subDealer details data is an array
  //         setSubDealerDetailsData([...response.data] || []);
  //       } else {
  //         setSubDealerDetailsData([]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching subDealer details data:', error);
  //       //alert('Failed to fetch subDealer details data.');
  //     }
  //   };
  //   fetchSubDealerDetailsData();
  // }, [subDealerDetailsFromState.SubDealerId]);

  useEffect(() => {
    const fetchSubDealers = async () => {
      try {
        const response = await ApiService.post('/subdealer/getSubDealerDetailById', {
          subDealerId: subDealerDetailsFromState.SubDealerId,

          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode
        });
        if (response.status) {
          console.log("kk", response.data)
          setSubDealer(

            {
              name: response.data.name,
              subDealerPhoneNumber: response.data.subDealerPhoneNumber,
              alternatePhoneNumber: response.data.alternatePhoneNumber,
              gstNumber: response.data.gstNumber,
              startingDate: response.data.startingDate,
              emailId: response.data.emailId,
              password: response.data.password,
              aadharNumber: response.data.aadharNumber,
              address: response.data.address,
              branchId: response.data.branchId,
              id: response.data.id
            }
          )
          //   s(response.data);
        } else {
          console.error('Failed to fetch SubDealers');
        }
      } catch (error) {
        console.error('Error fetching SubDealers:', error);
      }
    };

    fetchSubDealers();
  }, [location.state?.subDealerDetailsFromState]);

  useEffect(() => {
    const getProductsPhotos = async () => {
      try {
        const response = await ApiService.post(
          '/dashboards/getProductsPhotos',
          {
            subDealerId: subDealerDetailsFromState.SubDealerId,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          // Ensure vendor details data is an array
          setPhotoData(response.data || []);
        } else {
          setPhotoData([]);
        }
      } catch (error) {
        console.error('Error fetching vendor details data:', error);
        alert('Failed to fetch vendor details data.');
      }
    };
    getProductsPhotos();
  }, [subDealerDetailsFromState.SubDealerId]);


  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await ApiService.post(
          '/dashboards/getProductsAssignmentSummaryBySubDealer',
          {
            subDealerId: subDealerDetailsFromState.SubDealerId,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          // Ensure vendor details data is an array
          setProductData(response.data || []);
        } else {
          setProductData([]);
        }
      } catch (error) {
        console.error('Error fetching vendor details data:', error);
        alert('Failed to fetch vendor details data.');
      }
    };
    getProductsData();
  }, [subDealerDetailsFromState.SubDealerId]);




  useEffect(() => {
    const getWorks = async () => {
      try {
        const response = await ApiService.post(
          '/technician/getBackendSupportWorkAllocation',
          {
            subDealerId: subDealerDetailsFromState.SubDealerId,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          // Ensure vendor details data is an array
          setWorks(response.data || []);
        } else {
          setWorks([]);
        }
      } catch (error) {
        console.error('Error fetching vendor details data:', error);
        alert('Failed to fetch vendor details data.');
      }
    };
    getWorks();
  }, [subDealerDetailsFromState.SubDealerId]);







  const paymentStatus = [
    {
      label: "Staff Details",
      color: "bg-red-300",
      textColor: "text-red-700",
    },
    {
      label: "Product Details",
      color: "bg-green-300",
      textColor: "text-green-700",
    },
    {
      label: "Work Details",
      color: "bg-purple-300",
      textColor: "text-purple-700",
    },
  ];


  const toggleTable = (label) => {
    setActiveTable(activeTable === label ? null : label);
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
  const filteredPayments = Array.isArray(productData)
    ? productData.filter((payment) =>
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
  const filteredPendingAmount = Array.isArray(works)
    ? works.filter((payment) =>
      payment?.technicianName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];


  const fetchSubDealerStaffDetailsData = async () => {
    try {
      const response = await ApiService.post(
        '/subDealerStaff/getSubDealerStaffDetails',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      if (response.status) {
        const data = response.data || [];
        //  console.log("rrrr ggggg wwwww",data);
        //   const filteredData = data
        //     .filter(item => item.subDealerId && item.subDealerId.id === subDealerDetailsFromState.SubDealerId)
        //     .map(({ subDealerId, ...rest }) => rest);
        console.log("hhhhh", data);
        setSubDealerStaffDetailsData(data);
        // setPreviewData(filteredData);
      } else {
        setSubDealerStaffDetailsData([]);
      }
    } catch (error) {
      console.error('Error fetching subDealer details data:', error);
    }
  };


  useEffect(() => {

    fetchSubDealerStaffDetailsData();
  }, [subDealerDetailsFromState.SubDealerId]);





  return (
    <div className="p-6 space-y-8">
      {/* SubDealer Information */}
      <p className="font-bold text-xl">Sub Dealer ID</p>
      <div className="flex items-start space-x-28 bg-white p-6 rounded-lg shadow-md">
        <img
          src={subDealer.subDealerPhoto}
          alt="subDealer"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-5">
          <p className="text-gray-800  font-bold text-xl">
            Sub Dealer Name : {subDealer.name}
          </p>
          <p className="text-gray-800 font-semibold">
            Phone number : {subDealer.subDealerPhoneNumber
            }
          </p>
          <p className="text-gray-800 font-semibold">Email : {subDealer.
            emailId
          }</p>
          <p className="text-gray-800 font-semibold">
            SubDealer Branch : {subDealer.branchName
            }
          </p>
          <p className="text-gray-800 font-semibold">
            Date of Birth : {subDealer.dob}
          </p>

          <p className="text-gray-800 font-semibold">
            Gst Number : {subDealer.gstNumber}
          </p>

          <p className="text-gray-800 font-semibold">Address : {subDealer.
            address}</p>
        </div>
      </div>


      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold"></h1>
        <button
          className="bg-yellow-400 text-black px-5 py-2  rounded-full shadow-md flex items-center gap-2 hover:bg-yellow-500"
          onClick={() => navigate('/add-subdeler-staff', { state: { subDealerId: subDealer.id } })}


        >
          <FaPlus /> Create Sub Dealer Staff
        </button>
      </div>


      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 mt-10">
        {paymentStatus.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl shadow-md w-full sm:w-80 text-center cursor-pointer ${stat.color}`}
            onClick={() => toggleTable(stat.label)}
          >
            <button
              className="mt-2 px-4 py-1.5 text-black rounded-lg font-bold hover:bg-blue-100"
              onClick={() => toggleTable(stat.label)}
            >
              {stat.label}
            </button>
            <div className={`text-3xl font-bold ${stat.textColor} mt-4`}>{stat.value}</div>
          </div>
        ))}
      </div>



      {/* Payments Table - Visible only if showTable is true */}
      {activeTable === "Staff Details" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-red-400">Staff Details</h2>
          {/* <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded w-1/3"
              value={searchTotal}
              onChange={(e) => setSearchTotal(e.target.value)}
            />
          
                   <button
                     onClick={handlePaymentsPreview}
                     className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                   >
                     <FaFileDownload className="mr-2" /> Preview & Download
                   </button>
          </div> */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-red-300 text-white">
                <th className="p-2 border">Staff Id</th>
                <th className="p-2 border">Staff Name</th>
                <th className="p-2 border">Phone Number</th>

                <th className="p-2 border">email</th>
                <th className="p-2 border">Address</th>
              </tr>
            </thead>
            <tbody>
              {subDealerStaffDetailsData?.map((staff, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                  <td className="p-2 border text-center">{staff.staffId}</td>
                  <td className="p-2 border text-center">{staff.name}</td>
                  <td className="p-2 border text-center">{staff.phoneNumber}</td>
                  <td className="p-2 border text-center">{staff.email}</td>
                  <td className="p-2 border text-center">{staff.address}</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {/* Receved Payments Table */}
      {activeTable === "Product Details" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-400">Product Details</h2>
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
                <th className="p-2 border">product Id</th>
                <th className="p-2 border">product Name</th>
                {/* <th className="p-2 border">Date of Payment</th>
            <th className="p-2 border">Invoice ID</th> */}
                <th className="p-2 border">Present Stock</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
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
      {activeTable === "Work Details" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-violet-500">Work Details</h2>
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
              {filteredPendingAmount.map((payment, index) => (
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
  );
};

export default SubDealerDetails;
