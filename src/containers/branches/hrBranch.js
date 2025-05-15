import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaSearch, FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import ConvertPDF from '../../components/convertPDF';
import { useNavigate } from 'react-router';


const BranchList = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedBranchStaff, setSelectedBranchStaff] = useState("");
  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  const navigate=useNavigate();


  useEffect(() => {
    const fetchBranchStaff = async () => {
      try {
        const response = await ApiService.post('/staff/getStaffDetails', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });

        if (response.status && Array.isArray(response.data)) {
          const staffData = response.data.map((staff) => ({
            staffId: staff.staffId?.trim() || "",
            name: staff.name?.trim() || "",
            dob: staff.dob || "",
            gender: staff.gender || "",
            location: staff.location?.trim() || "",
            phoneNumber: staff.phoneNumber?.trim() || "",
            alternateNumber: staff.alternateNumber?.trim() || "",
            email: staff.email?.trim() || "",
            aadharNumber: staff.aadharNumber?.trim() || "",
            panCardNumber: staff.panCardNumber?.trim() || "",
            drivingLicence: staff.drivingLicence?.trim() || "",
            drivingLicenceNumber: staff.drivingLicenceNumber?.trim() || "",
            address: staff.address?.trim() || "",
            uanNumber: staff.uanNumber?.trim() || "",
            esicNumber: staff.esicNumber?.trim() || "",
            joiningDate: staff.joiningDate?.trim() || "",
            bloodGroup: staff.bloodGroup?.trim() || "",
            bankName: staff.bankName?.trim() || "",
            accountNumber: staff.accountNumber?.trim() || "",
            ifscCode: staff.ifscCode?.trim() || "",
            branchName: staff.branchName?.trim() || "",
            department: staff.department?.trim() || "",
            monthlySalary: staff.monthlySalary || "",
            salaryDate: staff.salaryDate || "",
            bikeAllocation: staff.bikeAllocation || "",
            bikeNumber: staff.bikeNumber?.trim() || "",
            mobileAllocation: staff.mobileAllocation || "",
            mobileBrand: staff.mobileBrand?.trim() || "",
            mobileNumber: staff.mobileNumber?.trim() || "",
            designation: staff.designation?.trim() || "",
            // experience: staff?.totalExperience || "",
            // ✅ Fixed Qualifications Mapping
            qualifications: JSON.stringify(staff.qualifications),

          }));
          setBranchesData(staffData);
          console.log(staffData, "Branch Data");
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
        const response = await ApiService.post("/dashboards/getStaff", {
          companyCode: initialAuthState?.companyCode, // Ensure initialAuthState is defined
          unitCode: initialAuthState?.unitCode,
        });

        if (response.status && Array.isArray(response.data)) {
          console.log("res  hhhjjll",response.data);
          const staffData = response.data.map((staff) => ({
            staffId: staff.staffId?.trim() || "",
            name: staff.name?.trim() || "",
            dob: staff.dob || "",
            gender: staff.gender || "",
            location: staff.location?.trim() || "",
            phoneNumber: staff.phoneNumber?.trim() || "",
            alternateNumber: staff.alternateNumber?.trim() || "",
            email: staff.email?.trim() || "",
            aadharNumber: staff.aadharNumber?.trim() || "",
            panCardNumber: staff.panCardNumber?.trim() || "",
            drivingLicence: staff.drivingLicence?.trim() || "",
            drivingLicenceNumber: staff.drivingLicenceNumber?.trim() || "",
            address: staff.address?.trim() || "",
            uanNumber: staff.uanNumber?.trim() || "",
            esicNumber: staff.esicNumber?.trim() || "",
            bloodGroup: staff.bloodGroup?.trim() || "",
            bankName: staff.bankName?.trim() || "",
            accountNumber: staff.accountNumber?.trim() || "",
            ifscCode: staff.ifscCode?.trim() || "",
            branchName: staff.branchName || "",
            department: staff.department?.trim() || "",
            monthlySalary: staff.monthlySalary || "",
            salaryDate: staff.salaryDate || "",
            bikeAllocation: staff.bikeAllocation || "",
            bikeNumber: staff.bikeNumber?.trim() || "",
            mobileAllocation: staff.mobileAllocation || "",
            mobileBrand: staff.mobileBrand?.trim() || "",
            mobileNumber: staff.mobileNumber?.trim() || "",
            designation: staff.designation?.trim() || "",
            experience: staff?.totalExperience || "",

            // ✅ Fixed Qualifications Mapping
            qualifications: JSON.stringify(staff.qualifications),
            //     ? staff.qualifications.map((rec) => ({
            //         marksOrCgpa: rec.marksOrCgpa || "",
            //         qualificationName: rec.qualificationName || "",
            //       }))
            //     : [],
          }));

          setEmployees(staffData);
          console.log("Processed Employee Data:", staffData);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employee data.");
      }
    };

    fetchEmployees();
  }, []);


  const formatExcelData = (data) => {
    console.log("dddddd",data);
    return data.map((item) => ({
      "Emp ID": item.staffId,
      "Name of the Employee": item.name,
      "Designation": item.designation,
      "Branch": item.branchName || "",
      "Date of Birth": item.dob,
      "Aadhar Number": item.aadharNumber,
      "Pan Number": item.panCardNumber || "",
      "Contact Number": item.phoneNumber,
      "Alternative Contact Number": item.alternateNumber || "",
      "Email ID": item.email,
      "Address": item.address,
      "Gender": item.gender,
      "Joining Date": item.joiningDate,
      "Present Salary": item.monthlySalary || "",
      "Total Experience": item.totalExperience || "",
      "Previous Experience": item.beforeExperience || "",
      "Previous Salary": item.previousSalary || "",
      "Previous Company": item.previousCompany || "",
      "Previous Designation": item.previousDesignation || "",
      "Bank Name": item.bankName || "",
      "Account Number": item.accountNumber || "",
      "Account Type": item.accountType || "",
      "IFSC Code": item.ifscCode || "",
      "Branch Name": item.branchName || "",
      "Official Email ID": item.officeEmail || "",
      "Official Contact Number": item.officePhoneNumber || "",
      "UAN Number": item.uanNumber || "",
      "ESIC Number": item.esicNumber || "",
      "Insurance Number": item.insuranceNumber || "",
      "Status": item.staffStatus || ""
    }));
  };


  const handlePreview = () => {
    const filteredData = branchesData.filter(branch => branch.branchName &&
      !selectedBranch || branch.branchName.trim().toLowerCase() === selectedBranch.trim().toLowerCase()
    );

    const formattedData = formatExcelData(filteredData);

    if (formattedData.length === 0) {
      alert("No data available to preview.");
      return;
    }

    setPreviewData(formattedData);
    setIsPreviewOpen(true);
  };

  const handlePreview1 = () => {
    const filteredEmployees = employees.filter(emp =>
      !selectedStaff || emp.staffId.toLowerCase().includes(selectedStaff.toLowerCase())
    );
   console.log("jjjj",filteredEmployees);
    const formattedData = formatExcelData(filteredEmployees);

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

  const rrr = (qualificationData) => {
    console.log("qualificationData:", qualificationData)
    if (!Array.isArray(qualificationData)) {
      console.error("Invalid data: qualificationData should be an array");
      return "";
    }

    const formattedString = qualificationData
      .map((q) => `${q.qualificationName} (${q.marksOrCgpa})`)
      .join(",  ");

    return formattedString;
  }

  const downloadExcel = () => {
    const formattedData = employees.map((emp) => ({
      Staff_ID: emp.staffId,
      Name: emp.name,
      Designation: emp.designation,
      Branch: emp.branchName,
      Phone: emp.phoneNumber,
      Joining_Date: emp.joiningDate,
      Salary: emp.monthlySalary,

      // ✅ Fixed Qualifications Mapping for Excel
      Qualifications: rrr(JSON.parse(emp.qualifications)),
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");

    XLSX.writeFile(wb, "Employee_Data.xlsx");
  };


  const uniqueBranches = [...new Set(branchesData.map(emp => emp.branchName?.trim()))]
    .filter(branch => branch);

  // Filter staff based on selected branch and search input
  const filteredStaff = branchesData.filter(staff =>
    (selectedBranch ? staff.branchName === selectedBranch : true) &&
    (selectedBranchStaff ? staff.staffId.includes(selectedBranchStaff) : true)
  );

  const filteredEmployees = employees.filter(emp =>
    !selectedStaff || (emp.staffId && emp.staffId.toLowerCase().includes(selectedStaff.trim().toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h3 className="text-2xl font-semibold my-4">Branch Staff</h3>
      <button
          onClick={()=>navigate("/branches")}
          className="flex items-center bg-blue-500 text-white px-4 py-2 my-2 rounded-lg shadow hover:bg-blue-600"
        >
        
           Branch List
        </button>
      <div className="flex justify-between gap-4 mb-4">
        {/* Branch Selection Dropdown */}
        <select
          className="p-3 border rounded-lg w-1/3"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value.trim())}
        >
          <option value="">All Branches</option>
          {uniqueBranches.map(branch => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        {/* Search Input for Staff ID */}
        <input
          type="text"
          placeholder="Search by Staff ID"
          className="p-3 border rounded-lg w-1/3"
          value={selectedBranchStaff}
          onChange={(e) => setSelectedBranchStaff(e.target.value.trim())}
        />

        <button
          onClick={handlePreview}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          <FaFileDownload className="mr-2" /> Preview & Download
        </button>
      </div>



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


      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {[ "Employee ID", "Employee Name", "Designation", "Branch", "Phone Number", "Joining Date", "Salary", "Pdf"].map((head, index) => (
                <th key={index} className="p-3 text-left">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length > 0 ? (
              Array.isArray(filteredStaff) &&
  [...filteredStaff]
    .sort((a, b) =>
      String(a.staffId).localeCompare(String(b.staffId))
    ).map((staff, index) => (
                <tr key={staff.staffId} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                  {/* <td className="p-3">{index + 1}</td> */}
                  <td className="p-3">{staff.staffId}</td>
                  <td className="p-3">{staff.name}</td>
                  <td className="p-3">{staff.designation}</td>
                  <td className="p-3">{staff.branchName}</td>
                  <td className="p-3">{staff.phoneNumber}</td>
                 
                  <td className="p-2">{staff.joiningDate.split('-').reverse().join('-')}</td>
                 
                  <td className="p-3">{staff.monthlySalary}</td>
                  <td className="px-4 py-2 border">
                    <FaFileDownload
                      className="text-blue-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents event bubbling
                        document.getElementById(`download-pdf-${staff.staffId}`).click();
                      }}
                    />
                    <ConvertPDF staff={staff} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">No matching staff found.</td>
              </tr>
            )}
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

        <button
          onClick={handlePreview1}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          <FaFileDownload className="mr-2" /> Preview & Download
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
            {Array.isArray(filteredEmployees) &&
  [...filteredEmployees]
    .sort((a, b) =>
      String(a.staffId).localeCompare(String(b.staffId))
    ).map((emp) => (
              <tr key={emp.staffId} className="text-gray-800 text-center border-b">
                <td className="px-4 py-2 border">{emp.staffId}</td>
                <td className="px-4 py-2 border">{emp.name}</td>
                <td className="px-4 py-2 border">{emp.designation}</td>
                <td className="px-4 py-2 border">{emp.phoneNumber}</td>
                <td className="px-4 py-2 border">{emp.email}</td>
                <td className="px-4 py-2 border">{emp.monthlySalary}</td>
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
    </div>
  );


};


export default BranchList;