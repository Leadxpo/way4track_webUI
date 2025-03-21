import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaSearch, FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
          console.log("==============",response.data.data)
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


  const downloadStaffPDF = async (staff) => {
    if (!staff) {
      alert("No staff details available.");
      return;
    }
  
    const doc = new jsPDF();
    doc.text("Staff Details Report", 20, 10);
  
    const tableData = [
      ["Staff ID", staff.staffId],
      ["Name", staff.name],
      ["Phone Number", staff.phoneNumber],
      ["Email", staff.email],
      ["Address", staff.address],
      ["Date of Birth", staff.dob],
      ["Aadhar Number", staff.aadharNumber],
      ["PAN Card Number", staff.panCardNumber],
      ["Bank Name", staff.bankName],
      ["Branch Name", staff.branchName],
      ["Account Number", staff.accountNumber],
      ["Account Type", staff.accountType],
      ["IFSC Code", staff.ifscCode],
      ["Joining Date", staff.joiningDate],
      ["Previous Company", staff.previousCompany],
      ["Previous Designation", staff.previousDesignation],
      ["Previous Salary", staff.previousSalary],
      ["Total Experience", staff.totalExperience],
      ["Before Experience", staff.beforeExperience],
      ["Basic Salary", staff.monthlySalary],
      ["Salary Date", staff.salaryDate],
      ["Designation", staff.designation],
      ["Department", staff.department ?? "N/A"],
      ["Gender", staff.gender],
      ["Blood Group", staff.bloodGroup],
      ["Driving Licence", staff.drivingLicence],
      ["Driving Licence Number", staff.drivingLicenceNumber],
      ["Bike Allocation", staff.bikeAllocation],
      ["Bike Number", staff.bikeNumber],
      ["ESIC Number", staff.esicNumber],
      ["UAN Number", staff.uanNumber],
      ["Insurance Number", staff.insuranceNumber],
      ["Insurance Eligibility Date", staff.insuranceEligibilityDate],
      ["Insurance Expiry Date", staff.insuranceExpiryDate],
      ["Latitude", staff.latitude],
      ["Longitude", staff.longitude],
      ["Location", staff.location],
      ["Mobile Allocation", staff.mobileAllocation],
      ["Mobile Brand", staff.mobileBrand],
      ["IMEI Number", staff.imeiNumber ?? "N/A"],
      ["Alternate Phone", staff.alternateNumber],
      ["Resignation Date", staff.resignationDate ?? "N/A"],
      ["Final Settlement Date", staff.finalSettlementDate ?? "N/A"],
      ["Termination Date", staff.terminationDate ?? "N/A"],
      ["Status", staff.status ?? "N/A"],
    ];
  
    let startY = 20;
  
    if (staff.staffPhoto) {
      try {
        const response = await fetch(staff.staffPhoto);
        const blob = await response.blob();
        const reader = new FileReader();
  
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64Image = reader.result;
          doc.addImage(base64Image, "JPEG", 150, 10, 40, 40);
  
          // Adjust start position for the table after adding image
          doc.autoTable({
            head: [["Field", "Value"]],
            body: tableData,
            startY: 60,
          });
  
          doc.save(`Staff_${staff.staffId}.pdf`);
        };
        return;
      } catch (error) {
        console.error("Error loading image:", error);
      }
    }
  
    // If no image, generate table normally
    doc.autoTable({
      head: [["Field", "Value"]],
      body: tableData,
      startY,
    });
  
    doc.save(`Staff_${staff.staffId}.pdf`);
  };
  

  const downloadStaffPDF1 = async (staff) => {
    if (!staff) {
      alert("No staff details available.");
      return;
    }
  
    const doc = new jsPDF();
    doc.text("Staff Details Report", 20, 10);
  
    const tableData = [
      ["Staff ID", staff.staffId],
      ["Name", staff.name],
      ["Phone Number", staff.phoneNumber],
      ["Email", staff.email],
      ["Address", staff.address],
      ["Date of Birth", staff.dob],
      ["Aadhar Number", staff.aadharNumber],
      ["PAN Card Number", staff.panCardNumber],
      ["Bank Name", staff.bankName],
      ["Branch Name", staff.branchName],
      ["Account Number", staff.accountNumber],
      ["Account Type", staff.accountType],
      ["IFSC Code", staff.ifscCode],
      ["Joining Date", staff.joiningDate],
      ["Previous Company", staff.previousCompany],
      ["Previous Designation", staff.previousDesignation],
      ["Previous Salary", staff.previousSalary],
      ["Total Experience", staff.totalExperience],
      ["Before Experience", staff.beforeExperience],
      ["Basic Salary", staff.monthlySalary],
      ["Salary Date", staff.salaryDate],
      ["Designation", staff.designation],
      ["Department", staff.department ?? "N/A"],
      ["Gender", staff.gender],
      ["Blood Group", staff.bloodGroup],
      ["Driving Licence", staff.drivingLicence],
      ["Driving Licence Number", staff.drivingLicenceNumber],
      ["Bike Allocation", staff.bikeAllocation],
      ["Bike Number", staff.bikeNumber],
      ["ESIC Number", staff.esicNumber],
      ["UAN Number", staff.uanNumber],
      ["Insurance Number", staff.insuranceNumber],
      ["Insurance Eligibility Date", staff.insuranceEligibilityDate],
      ["Insurance Expiry Date", staff.insuranceExpiryDate],
      ["Latitude", staff.latitude],
      ["Longitude", staff.longitude],
      ["Location", staff.location],
      ["Mobile Allocation", staff.mobileAllocation],
      ["Mobile Brand", staff.mobileBrand],
      ["IMEI Number", staff.imeiNumber ?? "N/A"],
      ["Alternate Phone", staff.alternateNumber],
      ["Resignation Date", staff.resignationDate ?? "N/A"],
      ["Final Settlement Date", staff.finalSettlementDate ?? "N/A"],
      ["Termination Date", staff.terminationDate ?? "N/A"],
      ["Status", staff.status ?? "N/A"],
    ];
  
    let startY = 20;
  
    if (staff.staffPhoto) {
      try {
        const response = await fetch(staff.staffPhoto);
        const blob = await response.blob();
        const reader = new FileReader();
  
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64Image = reader.result;
          doc.addImage(base64Image, "JPEG", 150, 10, 40, 40);
  
          // Adjust start position for the table after adding image
          doc.autoTable({
            head: [["Field", "Value"]],
            body: tableData,
            startY: 60,
          });
  
          doc.save(`Staff_${staff.staffId}.pdf`);
        };
        return;
      } catch (error) {
        console.error("Error loading image:", error);
      }
    }
  
    // If no image, generate table normally
    doc.autoTable({
      head: [["Field", "Value"]],
      body: tableData,
      startY,
    });
  
    doc.save(`Staff_${staff.staffId}.pdf`);
  };

  const downloadExcel = (data, filename) => {
    if (data.length === 0) {
      alert("No data available to download.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, filename);
    XLSX.writeFile(workbook, {filename}.xlsx);
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
              {["NO.", "Employ Name", "Designation", "Branch", "Phone Number", "Joining Date", "Salary","Pdf"].map((head, index) => (
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
    onClick={() => downloadStaffPDF(emp)} 
  />
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
    onClick={() => downloadStaffPDF1(staff)} 
  />
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