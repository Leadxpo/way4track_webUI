import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaSearch, FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import ConvertPDF from '../../components/convertPDF';


const BranchList = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [staffDetails, setStaffDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBranchStaff, setSelectedBranchStaff] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");




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


  useEffect(() => {
    const fetchStaffDetails = async () => {
      if (!selectedStaff) return;

      setIsLoading(true);
      try {
        const response = await ApiService.post("/staff/getStaffDetailsById", {
          staffId: selectedStaff,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });

        if (response.status) {
          setStaffDetails(response.data.data);
          console.log("==============", response.data.data)
        }
      } catch (error) {
        console.error("Error fetching staff details:", error);
        alert("Failed to fetch staff details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffDetails();
  }, [selectedStaff]);


 
  const downloadExcel = (data, filename) => {
    if (!data || data.length === 0) {
      alert("No data available to download.");
      return;
    }
    
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, filename);
  
      // Corrected the filename syntax
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    } catch (error) {
      console.error("Error generating Excel file:", error);
      alert("Failed to generate the Excel file. Please try again.");
    }
  };
  

  const filteredBranches = branchesData.filter(branch => !selectedBranch || branch.branchName === selectedBranch);

  const filteredStaff = filteredBranches.flatMap(branch =>
    [...(branch.nonTechnicalStaff || []), ...(branch.technicalStaff || []), ...(branch.salesStaff || [])]
  ).filter(emp =>
    (!selectedBranchStaff || emp.staffId.toString().includes(selectedBranchStaff))
  );


  const filteredEmployees = employees.filter(emp =>
    !selectedStaff || emp.staffId.toLowerCase().includes(selectedStaff.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h3 className="text-2xl font-semibold my-4">Branch Staff</h3>
      <div className="flex justify-between gap-4 mb-4">
        <select className="p-3 border rounded-lg w-1/3" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">All Branches</option>
          {branchesData.map(branch => (
            <option key={branch.branchName} value={branch.branchName}>{branch.branchName}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by Staff ID"
          className="p-3 border rounded-lg w-1/3"
          value={selectedBranchStaff}
          onChange={(e) => setSelectedBranchStaff(e.target.value)}
        />

        <button onClick={() => downloadExcel(filteredStaff, "Filtered_Branch_Staff")} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          <FaFileDownload className="mr-2" /> Download Excel
        </button>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {["NO.", "Employ Name", "Designation", "Branch", "Phone Number", "Joining Date", "Salary", "Pdf"].map((head, index) => (
                <th key={index} className="p-3 text-left">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((emp, index) => (
              <tr key={emp.staffId} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                <td className="p-3">{emp.staffId}</td>
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.designation}</td>
                <td className="p-3">{emp.branchName}</td>
                <td className="p-3">{emp.phoneNumber}</td>
                <td className="p-3">{emp.joiningDate}</td>
                <td className="p-3">{emp.monthlySalary}</td>
                <td className="px-4 py-2 border">
                  <FaFileDownload
                    className="text-blue-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents event bubbling if inside a list
                      document.getElementById(`download-pdf-${emp.staffId}`).click();
                    }}
                  />
                  <ConvertPDF staff={emp} />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-semibold my-4">Employees</h3>
      <div className="flex justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Staff ID"
          className="p-3 border rounded-lg w-1/3"
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
        />

        <button onClick={() => downloadExcel(filteredEmployees, "Filtered_Employees")} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
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
              <th className="px-4 py-2 border">Pdf</th>

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
                <td className="px-4 py-2 border">
                  <FaFileDownload
                    className="text-blue-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents event bubbling if inside a list
                      document.getElementById(`download-pdf-${staff.staffId}`).click();
                    }}
                  />
                  <ConvertPDF  staff={staff} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};


export default BranchList;