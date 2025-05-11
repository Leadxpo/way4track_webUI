import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import Table from '../../components/Table';
import { formatString } from '../../common/commonUtils';
import * as XLSX from "xlsx";
import { FaDownload } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaFileDownload } from "react-icons/fa";

import { saveAs } from 'file-saver';


const WarehouseManagerHome = () => {
  const [requestsData, setRequestsData] = useState([]);
  const [filterRequestsData, setFilterRequestsData] = useState([]);
  const [productData, setProductsData] = useState([]);
  const [filterProductsData, setFilterProductsData] = useState([]);
  
  const [selectedProductBranch, setSelectedProductBranch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedBranch1, setSelectedBranch1] = useState('');

  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);

  const fetchBranches = async () => {
    console.log('hiiiiii');
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      console.log('hiiiiii22', response);
      if (response.status && Array.isArray(response.data)) {
        setBranches(response.data);
      } else {
        console.error('Failed to fetch branches:', response);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  console.log("tttt", selectedBranch);

  useEffect(() => {
    fetchBranches();
  }, []);


  const [userProfile, setUserProfile] = useState(null);



  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchResponse = await ApiService.post('/branch/getBranchNamesDropDown');
  
        if (branchResponse?.status && Array.isArray(branchResponse.data)) {
          setBranches(branchResponse.data);
        } else {
          console.error('Failed to fetch branches or invalid data format');
          setBranches([]);
        }
      } catch (error) {
        console.error('Error fetching branch names:', error);
        setBranches([]);
      }
    };
  
    fetchBranches(); // call the async function
  }, []);
  


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


        console.log("rrrrrr", response.data);
        if (response.status) {
          setRequestsData(response.data || []);
          setFilterRequestsData(response.data || []);
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
          '/products/productAssignDetails ',
          payload
        );
        console.log('API Response:???????', response);

        if (response.status && response.data) {
          setProductsData(response.data.
            branchDetails);
            setFilterProductsData(response.data.
              branchDetails);

          if (response.data.length > 0) {
            console.log("////??????", response.data)
            // setProductsData(response.data[0])
            // setSelectedBranch(response.data[0].branchName); // Auto-select first branch
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



  const handleRequestDownload = () => {
    const data = filterRequestsData.flatMap(item =>
      item.requests.map(req => ({
        Name: req.name,
        Location: item.location,
        Count: req.count
      }))
    );

    if (data.length === 0) {
      alert("No data available for download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requests");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "product_requests.xlsx");
  };

  const handleProductDownload = () => {
    const data =filterProductsData

    if (data.length === 0) {
      alert("No data available for download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requests");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "product_requests.xlsx");
  };





  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBranch(selectedValue);

    if (selectedValue === '') {
      // If nothing is selected, show all data or clear
      setFilterRequestsData(requestsData);
    } else {
      const filtered = requestsData.filter((item) => item.location === selectedValue);
      setFilterRequestsData(filtered);
    }
  };

  const handleProductSearch = (event) => {
    const selectedValue = event.target.value;
    setSelectedProductBranch(selectedValue);

    if (selectedValue === '') {
      // If nothing is selected, show all data or clear
      setFilterProductsData(productData);
    } else {
      const filtered = productData.filter((item) => item.branchName === selectedValue);
      setFilterProductsData(filtered);
    }
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

        <select
          id="branch"
          value={selectedBranch}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-96"
        >
          <option value="">--All Branches --</option>
          {branches.map((branch, index) => (
            <option key={branch.id} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>


        <button
          onClick={handleRequestDownload}
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
              <th className="p-3 text-left">Branch Name</th>
              <th className="p-3 text-left">Requested Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filterRequestsData.length > 0 ? (
              filterRequestsData.map((item, index) => (
                item.requests.map((req, i) => (
                  <tr key={`${index}-${i}`} className={(index + i) % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                    <td className="p-3">{req.name}</td>
                    <td className="p-3">{item.location}</td>
                    <td className="p-3">{req.count}</td>
                  </tr>
                ))
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
    <option key={index} value={branch.id}>
      {branch.branchName} ({branch.branchNumber})
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
          onClick={handleProductDownload}
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
              <th className="p-3 text-left">
                Assign Time
              </th>
              <th className="p-3 text-left">
              Present Stock
              </th>
              <th className="p-3 text-left">
              In Hand Stock
              </th>
              <th className="p-3 text-left">
              Branch Name
              </th>
              <td className="p-3 text-left">Status</td>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterProductsData.length > 0 ? (
              filterProductsData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="p-3">{String(index + 1).padStart(2, "0")}</td>
                  <td className="p-3">{item.productName}</td>
                  <td className="p-3">{item.
                    assignTime
                  }</td>
                  <td className="p-3">{item.presentStock
                  }</td>
                  <td className="p-3">{item.handStock}</td>
                  <td className="p-3">{item.branchName}</td>
                  <td className="p-3">{item.productStatus}</td>


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


    </div>
  );
};

export default WarehouseManagerHome;
