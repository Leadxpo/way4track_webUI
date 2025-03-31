import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import Table from '../../components/Table';
import { formatString } from '../../common/commonUtils';
import * as XLSX from "xlsx";
import { FaDownload } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaFileDownload } from "react-icons/fa";




const WarehouseManagerHome = () => {
  const [requestsData, setRequestsData] = useState([]);
  const [productData, setProductsData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);
        
      
 

  const [userProfile, setUserProfile] = useState(null);

  const fetchAppointmentDetails = async (branchName = 'All') => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        staffId: localStorage.getItem('userId'),
      };
      const res = await ApiService.post('/staff/getStaffDetailsById', payload);

      if (res.status) {
        setUserProfile(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setUserProfile([]); // `setAppointments` should be removed if not declared.
    }
  };

  
  useEffect(() => {
    fetchAppointmentDetails();
  }, []);


  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await ApiService.post(
          '/requests/getRequestBranchWise',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          setRequestsData(response.data || []);
        } else {
          setRequestsData([]);
        }
      } catch (error) {
        console.error('Error fetching purchase order data:', error);
        alert('Failed to fetch purchase order data.');
      }
    };

    fetchRequestData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const payload = {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        };

        const response = await ApiService.post(
          '/dashboards/getProductDetailsBy',
          payload
        );
        console.log('API Response:', response);

        if (response.status && response.data) {
          setProductsData(response.data);
          if (response.data.length > 0) {
            setSelectedBranch(response.data[0].branchName); // Auto-select first branch
          }
        } else {
          setProductsData([]);
          alert('No data found');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        alert('Failed to fetch data. Please try again.');
      }
    };

    fetchProducts();
  }, []);

 

  



 

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet();
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Requests");
    XLSX.writeFile(wb, "requests.xlsx");
  };

const formatExcelData = (data) => {
  return data.map((item) => ({
    "Emp ID": item.staffId,
    "Name of the Employee": item.name,
    "Designation": item.designation,
    "Branch": item.branchName || "",
    "Contact Number": item.phoneNumber,
   
  }));
};


// // Filtered Staff Details (Case Insensitive)
// const filteredStaff = totalStaffDetails.filter((emp) =>
//   Object.values(emp).some((value) =>
//     String(value).toLowerCase().includes(search.toLowerCase())
//   )
// );



const handlePreview = () => {
  const filteredProducts = productData.filter((row) =>
    row.name && typeof row.name === "string" // Use 'name' instead of 'product' if filtering by employee name
      ? row.name.toLowerCase().includes(search.toLowerCase())
      : false
  );

  console.log("Filtered Data:", filteredProducts); // Debugging output

  const formattedData = formatExcelData(filteredProducts);

  if (formattedData.length === 0) {
    alert("No data available to preview.");
    return;
  }

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




  const handleChange = (event) => {
    setSelectedBranch(event.target.value);
    // onSelect(event.target.value);
  };




  return (
    <div className="p-6">
      {/* Profile Section */}
      {userProfile && (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
          <img
            src={userProfile.staffPhoto || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div className="w-full">
            <h2 className="text-xl font-semibold p-3 bg-gray-200 rounded-md m-2">
              Name: {userProfile.name}
            </h2>
            <p className="p-3 m-2 bg-gray-200 rounded-md">
              Phone number: {userProfile.phoneNumber}
            </p>
            <p className="p-3 m-2 bg-gray-200 rounded-md">
              Email: {userProfile.email}
            </p>
          </div>
        </div>
      )}



<h2 className="text-2xl font-bold mb-4 mt-10">Requests</h2>
      <div className="bg-white p-4 rounded-lg shadow-md mt-10">
        <label className="text-lg font-semibold">Branch Name :{requestsData.branchName}</label>

      </div>

      <div className="flex mt-10">
    
      {/* <label htmlFor="branch" className="block mb-2 font-medium">
        Select Branch:
      </label> */}
      <select
        id="branch"
        value={selectedBranch}
        onChange={handleChange}
        className="border rounded px-4 py-2 w-96"
      >
        <option value="">-- Select Branch --</option>
        {branches.map((branch, index) => (
          <option key={index} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    
        
  <button
    onClick={handlePreview}
    className="mt-4 ml-auto flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
  >
    <FaDownload className="mr-2" /> Download 
  </button>
</div>
<div className="mt-10 bg-white rounded-lg shadow-md overflow-hidden">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-green-600 text-white">
        <th className="p-3 text-left">Product Name</th>
        <th className="p-3 text-left">Requested Quantity</th>
      </tr>
    </thead>
    <tbody>
      {requestsData.length > 0 ? (
        requestsData.map((req, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>
            <td className="p-3">{req.product}</td>
            <td className="p-3">{req.quantity}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="2" className="p-5 text-center text-gray-500">
            Data is not available
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
     


      <div className="bg-white p-4 rounded-xl shadow-md mb-4 flex gap-4 mt-10">
      <select
        id="branch"
        value={selectedBranch}
        onChange={handleChange}
        className="border rounded px-4 py-2 w-96"
      >
        <option value="">-- Select Branch --</option>
        {branches.map((branch, index) => (
          <option key={index} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    
        <input type="date" placeholder="From" className="border p-2 rounded w-1/4" />
        <input type="date" placeholder="To" className="border p-2 rounded w-1/4" />
        <button
          onClick={downloadExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Search
        </button>
        
                   <button
                         onClick={handlePreview}
                         className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                       >
                         <FaFileDownload className="mr-2" />  Download
                       </button>

                   </div>
      
       {/* Table */}
<div className="overflow-x-auto mt-10">
  <table className="w-full bg-white rounded-xl shadow-md">
    <thead className="bg-green-600 text-white">
      <tr>
        <th className="p-3 text-left">NO.</th>
        <th className="p-3 text-left">Product</th>
        <th className="p-3 text-left">Total Quantity</th>
        <th className="p-3 text-left">Assigned</th>
        <th className="p-3 text-left">Remaining</th>
        <th className="p-3 text-left">Status</th>
        <th className="p-3 text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      {productData.length > 0 ? (
        productData.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
            <td className="p-3">{String(index + 1).padStart(2, "0")}</td>
            <td className="p-3">{item.product}</td>
            <td className="p-3">{item.total}</td>
            <td className="p-3">{item.assigned}</td>
            <td className="p-3">{item.remaining}</td>
            <td className={`p-3 ${item.status === "Out of stock" ? "text-red-500" : "text-green-600"}`}>
              {item.status}
            </td>
            <td className="p-3">
              <button className="p-2 text-gray-600 hover:text-gray-900">⋮</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="p-5 text-center text-gray-500">
            No data available
          </td>
        </tr>
      )}
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
  );
};

export default WarehouseManagerHome;
