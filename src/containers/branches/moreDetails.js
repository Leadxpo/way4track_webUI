import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { initialAuthState } from "../../services/ApiService";
import { FiMoreVertical } from "react-icons/fi";


const BranchDetails = () => {
  const [branchDetails, setBranchDetails] = useState({
    branchName: "",
    branchNumber: "",
    address: "",
    email: "",
    branchPhoto: "",
    city: "",
    state: "",
    phoneNumber: "",
    branchOpening: "",
    staff: [],
    asserts: [],
  });
  const [activeTab, setActiveTab] = useState("staff");

  const location = useLocation();
  const branchDetailsFromState = location.state?.branchDetails || {};

  useEffect(() => {
    const fetchBranchDetails = async () => {
      if (!branchDetailsFromState?.id) {
        alert("Branch ID is missing. Please select a valid branch.");
        return;
      }
    
      console.log("Fetching branch details for ID:", branchDetailsFromState.id);
    
      try {
        const response = await ApiService.post("/branch/getBranchDetailsById", {
          // id: branchDetailsFromState.id,
          // companyCode: initialAuthState.companyCode,
          // unitCode: initialAuthState.unitCode,
        });
    
        if (response?.status) {
          setBranchDetails(response.data);
        } else {
          console.warn("Branch not found:", response);
          alert(response.internalMessage || "Branch not found. It may have been deleted.");
        }
      } catch (error) {
        console.error("Error fetching branch details:", error);
        alert("Failed to fetch branch details. Please try again later.");
      }
    };
    

    fetchBranchDetails();
  }, [branchDetailsFromState.id]);


  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const bankData = [
    { no: 1, accountHolder: "John Doe", accountType: "Savings", accountNumber: "1234567890", gstNo: "GST12345", ifsc: "IFSC001", amount: "₹50,000" },
    { no: 2, accountHolder: "Jane Smith", accountType: "Current", accountNumber: "0987654321", gstNo: "GST67890", ifsc: "IFSC002", amount: "₹75,000" },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = bankData.filter(
      (item) =>
        item.accountNumber.includes(value) || item.accountHolder.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  const displayData = search ? filteredData : bankData;




  return (
    <div className="space-y-10 px-8 py-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
        
          src= "/logo-square.png"
          alt="Branch Logo"
          className="w-16 h-16 "
        />
        <h1 className="text-3xl font-bold text-green-600">
          {branchDetails.branchName || "Branch Details"}
        </h1>
      </div>

      {/* Branch Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <strong>Branch Name:</strong>
          <p>{branchDetails.branchName || "N/A"}</p>
        </div>
        <div>
          <strong>Branch Number:</strong>
          <p>{branchDetails.branchNumber || "N/A"}</p>
        </div>
        <div>
          <strong>Email:</strong>
          <p>{branchDetails.email || "N/A"}</p>
        </div>
        <div>
          <strong>Address:</strong>
          <p>{branchDetails.address || "N/A"}</p>
        </div>
        <div>
          <strong>City:</strong>
          <p>{branchDetails.city || "N/A"}</p>
        </div>
        <div>
          <strong>State:</strong>
          <p>{branchDetails.state || "N/A"}</p>
        </div>
        <div>
          <strong>Branch Opening:</strong>
          <p>{branchDetails.branchOpening || "N/A"}</p>
        </div>
      </div>

      <div className=" items-center mb-4 ">
      <strong>Branch Image</strong>
        <img
          src={branchDetails.branchPhoto || "default-branch.png"}
          alt="Branch Logo"
          className="w-50 h-50 py-4"
        />
       
      </div>


 {/* Staff */}
 <div>
  <h2 className="text-xl font-semibold mb-6">Branch Manager</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {branchDetails.staff.length > 0 ? (
      branchDetails.staff.map((staff, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200"
        >
          {/* Staff Image */}
          <img
            src={staff.staffPhoto || "default-staff.png"}
            alt={staff.name}
            className="rounded-full w-24 h-24 mx-auto mb-4"
          />

          {/* Staff Name */}
          <h3 className="text-lg font-semibold">{staff.name}</h3>

          {/* Designation */}
          <p className="text-gray-500 text-sm font-medium">{staff.designation}</p>

          {/* Branch Name */}
          <p className="text-gray-400 text-xs">{branchDetails.branchName}</p>

          {/* Buttons */}
          <div className="mt-4 flex justify-center gap-2">
            <button className="border border-gray-400 text-gray-700 px-4 py-1 rounded-lg text-sm hover:bg-gray-100">
              Message
            </button>
            <button className="border border-gray-400 text-gray-700 px-4 py-1 rounded-lg text-sm hover:bg-gray-100">
              View Profile
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No staff available for this branch.</p>
    )}
  </div>
</div>

<h2 className="text-xl font-semibold mb-4">Branch Assets</h2>

<div className="flex space-x-4 mb-4">
      {["staff", "bank", "assets"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2 text-sm w-96 h-12 font-semibold rounded-md shadow ${
            activeTab === tab ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>


{/* staff table */}
<table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Employ ID</th>
          <th className="px-4 py-2">Employ Name</th>
          <th className="px-4 py-2">Designation</th>
          <th className="px-4 py-2">Branch</th>
          <th className="px-4 py-2">Phone Number</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {  branchDetails.staff.map((staff, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
            <td className="px-4 py-2">{staff.id}</td>
            <td className="px-4 py-2">{staff.name}</td>
            <td className="px-4 py-2">{staff.designation}</td>
            <td className="px-4 py-2">{staff.branch}</td>
            <td className="px-4 py-2">{staff.phone}</td>
            <td className="px-4 py-2">
              <span className={`px-3 py-1 rounded-md ${staff.status === "Present" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                {staff.status}
              </span>
            </td>
            <td className="px-4 py-2 text-center">
              <FiMoreVertical className="text-gray-600 cursor-pointer" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>



    <div className="p-4">
      <input
        type="text"
        placeholder="Search by Account Number or Account Holder"
        value={search}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-4"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">No</th>
            <th className="border p-2">Account Holder</th>
            <th className="border p-2">Account Type</th>
            <th className="border p-2">Account Number</th>
            <th className="border p-2">GST NO</th>
            <th className="border p-2">IFSC CODE</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((item) => (
            <tr key={item.no} className="text-center border">
              <td className="border p-2">{item.no}</td>
              <td className="border p-2">{item.accountHolder}</td>
              <td className="border p-2">{item.accountType}</td>
              <td className="border p-2">{item.accountNumber}</td>
              <td className="border p-2">{item.gstNo}</td>
              <td className="border p-2">{item.ifsc}</td>
              <td className="border p-2">{item.amount}</td>
              <td className="border p-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
          {displayData.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>


    <div className="p-4">
      <input
        type="text"
        placeholder="Search by Account Number or Account Holder"
        value={search}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-4"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">No</th>
            <th className="border p-2">AssertsID</th>
            <th className="border p-2">Asserts Type</th>
            <th className="border p-2">Asserts Name</th>
            <th className="border p-2">Date Of Purchase</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          { branchDetails.asserts.map((item) => (
            <tr key={item.no} className="text-center border">
              <td className="border p-2">{item.no}</td>
              <td className="border p-2">{item.accountHolder}</td>
              <td className="border p-2">{item.accountType}</td>
              <td className="border p-2">{item.accountNumber}</td>
              <td className="border p-2">{item.gstNo}</td>
              <td className="border p-2">{item.ifsc}</td>
              <td className="border p-2">{item.amount}</td>
              <td className="border p-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
          {displayData.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

 {/* Assets */}
 <div>
        <h2 className="text-xl font-semibold mb-4">Branch Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchDetails.asserts.length > 0 ? (
            branchDetails.asserts.map((asset, index) => (
              <div key={index} className="p-4 border rounded-lg shadow">
                <p>
                  <strong>Asset Name:</strong> {asset.name || "N/A"}
                </p>
                <p>
                  <strong>Asset Amount:</strong> {asset.amount || "N/A"}
                </p>
                <p>
                  <strong>Asset Type:</strong> {asset.type || "N/A"}
                </p>
                {asset.photo && (
                  <img
                    src={asset.photo}
                    alt={asset.name || "Asset"}
                    className="w-full h-32 object-cover mt-2"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No assets available for this branch.</p>
          )}
        </div>
      </div>







      {/* Staff */}
      <div>
  <h2 className="text-xl font-semibold mb-6">Branch Staff</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {branchDetails.staff.length > 0 ? (
      branchDetails.staff.map((staff, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200"
        >
          {/* Staff Image */}
          <img
            src={staff.staffPhoto || "default-staff.png"}
            alt={staff.name}
            className="rounded-full w-24 h-24 mx-auto mb-4"
          />

          {/* Staff Name */}
          <h3 className="text-lg font-semibold">{staff.name}</h3>

          {/* Designation */}
          <p className="text-gray-500 text-sm font-medium">{staff.designation}</p>

          {/* Branch Name */}
          <p className="text-gray-400 text-xs">{branchDetails.branchName}</p>

          {/* Buttons */}
          <div className="mt-4 flex justify-center gap-2">
            <button className="border border-gray-400 text-gray-700 px-4 py-1 rounded-lg text-sm hover:bg-gray-100">
              Message
            </button>
            <button className="border border-gray-400 text-gray-700 px-4 py-1 rounded-lg text-sm hover:bg-gray-100">
              View Profile
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No staff available for this branch.</p>
    )}
  </div>
</div>

</div>
  );
};

export default BranchDetails;
