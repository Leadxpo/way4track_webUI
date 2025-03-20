import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaSearch, FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

const BranchList = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchBranch, setSearchBranch] = useState("");
  const [searchEmployee, setSearchEmployee] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    const fetchBranchStaff = async () => {
      try {
        const response = await ApiService.post('/dashboards/getBranchStaffDetails', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
  
        if (response.status && Array.isArray(response.data.data)) {
          setBranchesData(response.data.data);
          console.log(response.data.data, "Branch Data");
        } else {
          setBranchesData([]);
        }
      } catch (error) {
        console.error('Error fetching branch staff:', error);
        alert('Failed to fetch branch staff data.');
      }
    };
  
    fetchBranchStaff();
  }, []);
  

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await ApiService.post('/dashboards/getStaff', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });

        if (response.status && Array.isArray(response.data)) {
          setEmployees(response.data);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        alert('Failed to fetch employee data.');
      }
    };

    fetchEmployees();
  }, []);

  const downloadExcel = (data, filename) => {
    if (data.length === 0) {
      alert("No data available to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, filename);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const filteredBranches = branchesData.filter((emp) =>
    emp.staffId?.toString().includes(searchBranch) || 
    emp.staffName?.toLowerCase().includes(searchBranch.toLowerCase())
  );
console.log(filteredBranches,"{{{{{{{{{{{{{{")
  const filteredEmployees = employees.filter((emp) =>
    (selectedBranch === "" || emp.branchName === selectedBranch) &&
    (searchEmployee === "" || emp.staffId.toString().includes(searchEmployee))
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Branch Staff Table */}
      <h3 className="text-2xl font-semibold my-4"> Staff</h3>
      <div className="flex justify-between items-center bg-white p-4 rounded-lg">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-96">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Branch Staff..."
            value={searchBranch}
            onChange={(e) => setSearchBranch(e.target.value)}
            className="outline-none bg-transparent w-full"
          />
        </div>

        <button
          onClick={() => downloadExcel(branchesData, "Branch_Staff")}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          <FaFileDownload className="mr-2" /> Download Excel
        </button>
      </div>

      <div className="overflow-x-auto mt-4 mb-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">Staff ID</th>
              <th className="px-4 py-2 border">Staff Name</th>
              <th className="px-4 py-2 border">Designation</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((staff) => (
              <tr key={staff.staffId} className="text-gray-800 text-center border-b">
                <td className="px-4 py-2 border">{staff.staffId}</td>
                <td className="px-4 py-2 border">{staff.staffName}</td>
                <td className="px-4 py-2 border">{staff.designation}</td>
                <td className="px-4 py-2 border">{staff.phoneNumber}</td>
                <td className="px-4 py-2 border">{staff.email}</td>
                <td className="px-4 py-2 border">₹{staff.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Employees Table */}
      <h3 className="text-2xl font-semibold my-4">Branch Staff</h3>
      <div className="flex justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Staff ID"
          className="p-3 border rounded-lg w-1/3"
          value={searchEmployee}
          onChange={(e) => setSearchEmployee(e.target.value)}
        />
        Branch
        <div className="relative w-1/3">
          <select
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            <option value="Visakhapatnam">Visakhapatnam</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>

        <button
          onClick={() => downloadExcel(employees, "Employees")}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          <FaFileDownload className="mr-2" /> Download Excel
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {["NO.", "Employ Name", "Designation", "Branch", "Phone Number", "Joining Date", "Salary"].map((head, index) => (
                <th key={index} className="p-3 text-left">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBranches.map((emp, index) => (
              <tr key={emp.staffId} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                <td className="p-3">{emp.staffId}</td>
                <td className="p-3">{emp.staffName}</td>
                <td className="p-3">{emp.designation}</td>
                <td className="p-3">{emp.branchName}</td>
                <td className="p-3">{emp.phoneNumber}</td>
                <td className="p-3">{emp.joiningDate}</td>
                <td className="p-3">{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchList;
