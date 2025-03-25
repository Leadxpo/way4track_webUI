// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import ApiService from '../../services/ApiService';
// import { initialAuthState } from '../../services/ApiService';

// const StaffDetails = () => {
//   const location = useLocation();
//   const employeeData = location.state?.staffDetails || {};
//   console.log(location.state.staffDetails)
//   const [staffDetails, setStaffDetails] = useState({});
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch staff details when the component loads
//   useEffect(() => {
//     const fetchStaffDetails = async () => {
//       try {
//         const response = await ApiService.post('/staff/getStaffDetailsById', {
//           staffId: employeeData.staffId,
//           companyCode: initialAuthState.companyCode,
//           unitCode: initialAuthState.unitCode,
//         });

//         console.log("qwwwwww", response);
//         if (response.status) {
//           const staff = response.data;
//           setStaffDetails({
//             name: staff.name,
//             phoneNumber: staff.phoneNumber,
//             address: staff.address,
//             email: staff.email,
//             staffPhoto: staff.staffPhoto,
//             dob: staff.dob,
//             aadharNumber: staff.aadharNumber,
//             joiningDate: staff.joiningDate,
//             basicSalary: staff.basicSalary,
//             branchName: staff.branchName,
//             designation: staff.designation,
//             staffId: staff.staffId,
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching staff details:', error);
//         alert('Failed to fetch staff details.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchStaffDetails();
//   }, [employeeData.staffId]);

//   const DetailItem = ({ label, value }) => (
//     <div className="border-b pb-2">
//       <p className="text-sm font-semibold text-gray-600">{label}</p>
//       <p className="text-lg font-medium">{value || "N/A"}</p>
//     </div>
//   );

//   // Fetch attendance details when a date is selected
//   useEffect(() => {
//     if (!selectedDate) return;

//     const fetchAttendanceData = async () => {
//       try {
//         const response = await ApiService.post(
//           '/dashboards/staffAttendanceDetails',
//           {
//             staffId: employeeData.staffId,
//             date: selectedDate,
//             companyCode: initialAuthState.companyCode,
//             unitCode: initialAuthState.unitCode,
//           }
//         );
//         if (response.status) {
//           setAttendanceData(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching attendance details:', error);
//         alert('Failed to fetch attendance details.');
//       }
//     };

//     fetchAttendanceData();
//   }, [selectedDate, employeeData.staffId]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
//         {isLoading ? (
//           <p className="text-center text-lg font-semibold">
//             Loading staff details...
//           </p>
//         ) : (
//           <>
//             {/* Photo Section */}
//             <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
//               {/* Profile Picture */}
//               <div className="flex flex-col items-center space-y-4 mb-6">
//                 <img
//                   src={staffDetails.staffPhoto}
//                   alt="Employee"
//                   className="w-32 h-32 rounded-full object-cover shadow-md"
//                 />
//                 <h2 className="text-xl font-semibold">{staffDetails.name}</h2>
//               </div>

//               {/* Staff Details */}
//               <div className="space-y-4 text-gray-700">
//                 <DetailItem label="Staff ID" value={staffDetails.staffId} />
//                 <DetailItem label="Designation" value={staffDetails.designation} />
//                 <DetailItem label="Phone Number" value={staffDetails.phoneNumber} />
//                 <DetailItem label="Branch" value={staffDetails.branchName} />
//                 <DetailItem label="Date of Birth" value={staffDetails.dob} />
//                 <DetailItem label="Email" value={staffDetails.email} />
//                 <DetailItem label="Aadhar Number" value={staffDetails.aadharNumber} />
//                 <DetailItem label="Address" value={staffDetails.address} />
//                 <DetailItem label="Joining Date" value={staffDetails.joiningDate} />
//                 <DetailItem label="Experience (Years)" value={staffDetails.beforeExperience} />
//                 <DetailItem label="Basic Salary" value={`₹${staffDetails.basicSalary}`} />
//               </div>
//             </div>

//             {/* Date Picker */}
//             <div className="mt-6">
//               <h2 className="text-lg font-semibold text-center mb-4">
//                 Select Date for Attendance
//               </h2>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 dateFormat="yyyy-MM-dd"
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholderText="Select a date"
//               />
//             </div>

//             {/* Attendance Table */}
//             {selectedDate && (
//               <div className="w-full overflow-auto border border-gray-300 rounded-md mt-6">
//                 <div className="p-4 text-center font-semibold text-lg border-b border-gray-300 min-w-full">
//                   Monthly Attendance Summary For{' '}
//                   {selectedDate.toLocaleString('default', { month: 'long' })}{' '}
//                   {selectedDate.getFullYear()}
//                 </div>
//                 <div className="table w-full border-collapse">
//                   <div className="table-header-group bg-gray-100 border-b border-gray-300">
//                     <div className="table-row border-b border-gray-300">
//                       <div className="table-cell p-2 border-r border-gray-300 text-center font-semibold">
//                         Day
//                       </div>
//                       {Array.from({ length: 30 }, (_, i) => (
//                         <div
//                           key={i}
//                           className="table-cell p-2 border-r border-gray-300 text-center font-semibold"
//                         >
//                           {i + 1}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="table-row-group">
//                     {/* In Time Row */}
//                     <div className="table-row border-b border-gray-300">
//                       <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
//                         In
//                       </div>
//                       {Array.from({ length: 30 }, (_, i) => (
//                         <div
//                           key={i}
//                           className="table-cell p-1 border-r border-gray-300 text-center"
//                         >

//                           {Array.isArray(attendanceData[i]?.inTime) && attendanceData[i].inTime.length > 0
//                             ? new Date(attendanceData[i].inTime[0]).toLocaleTimeString()
//                             : 'No Data'}

//                         </div>
//                       ))}
//                     </div>

//                     {/* Out Time Row */}
//                     <div className="table-row border-b border-gray-300">
//                       <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
//                         Out
//                       </div>
//                       {Array.from({ length: 30 }, (_, i) => (
//                         <div
//                           key={i}
//                           className="table-cell p-1 border-r border-gray-300 text-center"
//                         >
//                           {Array.isArray(attendanceData[i]?.outTime) && attendanceData[i].outTime.length > 0
//                             ? new Date(attendanceData[i].outTime[0]).toLocaleTimeString()
//                             : 'No Data'}

//                         </div>
//                       ))}
//                     </div>

//                     {/* Total Hours Row */}
//                     <div className="table-row border-b border-gray-300">
//                       <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
//                         Total Hrs
//                       </div>
//                       {Array.from({ length: 30 }, (_, i) => (
//                         <div
//                           key={i}
//                           className="table-cell p-1 border-r border-gray-300 text-center"
//                         >
//                           {attendanceData[i]?.totalHours > 0
//                             ? attendanceData[i].totalHours
//                             : 'No Data'}
//                         </div>
//                       ))}
//                     </div>

//                     {/* Status Row */}
//                     <div className="table-row border-b border-gray-300">
//                       <div className="table-cell p-1 border-r border-gray-300 text-center font-semibold">
//                         Status
//                       </div>
//                       {Array.from({ length: 30 }, (_, i) => (
//                         <div
//                           key={i}
//                           className="table-cell p-1 border-r border-gray-300 text-center"
//                         >
//                           {attendanceData[i]?.status
//                             ? attendanceData[i].status
//                             : 'Absent'}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );


// };

// export default StaffDetails;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaPencilAlt, FaPrint } from "react-icons/fa";
import ApiService, { initialAuthState } from "../../services/ApiService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import StaffDetailsPDF from "./StaffDetailsPDF";

const StaffDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    personnelDetails: {
      staffId: state.staffDetails.staffId,
      name: "John Doe",
      dob: "1990-01-01",
      gender: "Male",
      location: "New York",
      phoneNumber: "1234567890",
      alternateNumber: "0987654321",
      email: "johndoe@example.com",
      aadharNumber: "1234-5678-9012",
      panCardNumber: "ABCDE1234F",
      drivingLicence: "DL-123456789",
      address: "123, Main Street, NY",
      uanNumber: "100200300400",
      esicNumber: "ESIC123456",
      bloodGroup: "O+",
    },
    educationDetails: {
      staffId: state.staffDetails.staffId,
      qualifications: [{ qualificationName: "B.Tech", marksOrCgpa: "8.5 CGPA", file: null }],
      experience: [{
        previousCompany: "XYZ Corp",
        previous_designation: "Software Engineer",
        total_experience: "5 years",
        previous_salary: "$80,000",
        letter: "experienceLetter",
        uploadLetters: null,
      }],
    },
    bankDetails: {
      staffId: state.staffDetails.staffId,
      accountNumber: "123456789012",
      bankName: "ABC Bank",
      ifscCode: "ABC12345",
      branchName: "Downtown Branch",
      accountType: "savings",
    },
    employerDetails: {
      staffId: state.staffDetails.staffId,
      branch: "Head Office",
      staffId: "EMP12345",
      joiningDate: "2020-06-15",
      designation: "Senior Developer",
      department: "IT",
      monthlySalary: "90,000",
      officeEmail: "john.doe@company.com",
      officePhoneNumber: "9876543210",
      bikeAllocation: "Yes",
      mobileAllocation: "Yes",
      terminationDate: "2021-01-01",
      resignationDate: "2021-01-01",
      finalSettlementDate: "2021-01-01",
      insuranceNumber: "INS123456",
      insuranceEligibilityDate: "2021-01-01",
      insuranceExpiryDate: "2026-01-01",
      password: "securePass123",
      description: "Senior Developer at IT Department",
    },
  });

  const handleEdit = (path, data) => {
    navigate(path, { state: { data } });
  };

  const fetchStaffDetails = async () => {
    try {
      const response = await ApiService.post("/staff/getStaffDetailsById", {
        staffId: state.staffDetails.staffId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      console.log("API Response:", response);

      if (response.errorCode === 200) {
        const staff = response.data;

        setFormData({
          personnelDetails: {
            name: staff.name || "",
            dob: staff.dob || "",
            gender: staff.gender || "",
            location: staff.location || "",
            phoneNumber: staff.phoneNumber || "",
            alternateNumber: staff.alternateNumber || "",
            email: staff.email || "",
            aadharNumber: staff.aadharNumber || "",
            panCardNumber: staff.panCardNumber || "",
            drivingLicence: staff.drivingLicence || "",
            address: staff.address || "",
            uanNumber: staff.uanNumber || "",
            esicNumber: staff.esicNumber || "",
            bloodGroup: staff.bloodGroup || "",
          },
          educationDetails: {
            qualifications: staff.qualifications || [],
            experience: staff.experience || [],
          },
          bankDetails: {
            accountNumber: staff.accountNumber || "",
            bankName: staff.bankName || "",
            ifscCode: staff.ifscCode || "",
            branchName: staff.branchName || "",
            accountType: staff.accountType || "",
          },
          employerDetails: {
            branch: staff.branchName || "",
            joiningDate: staff.joiningDate || "",
            designation: staff.designation || "",
            department: staff.department || "",
            monthlySalary: staff.monthlySalary || "",
            officeEmail: staff.officeEmail || "",
            officePhoneNumber: staff.officePhoneNumber || "",
            bikeAllocation: staff.bikeAllocation || "",
            mobileAllocation: staff.mobileAllocation || "",
            terminationDate: staff.terminationDate || "",
            resignationDate: staff.resignationDate || "",
            finalSettlementDate: staff.finalSettlementDate || "",
            insuranceNumber: staff.insuranceNumber || "",
            insuranceEligibilityDate: staff.insuranceEligibilityDate || "",
            insuranceExpiryDate: staff.insuranceExpiryDate || "",
            password: staff.password || "",
            description: staff.description || "",
          },
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching staff details:", error);
      alert("Failed to fetch staff details.");
    }
  };
  useEffect(() => {



    fetchStaffDetails();
  }, [state?.staffDetails?.staffId]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6 p-3">
  <div className="flex justify-between items-center mb-6">
    {/* Left: Profile Image & Name */}
    <div className="flex items-center gap-4">
      {/* <img
        src={""}
        alt="Employee"
        className="w-16 h-16 rounded-full object-cover shadow-md"
      />
      <h3 className="text-2xl font-bold">name</h3> */}
    </div>

    {/* Right: Print Button */}

    <PDFDownloadLink
      document={<StaffDetailsPDF staff={formData} />}
      fileName="Staff_Details.pdf"
    >
      {({ loading }) => (
        <button
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2 border border-gray-300 shadow"
        >
          <FaPrint className="text-green-500" />
          {loading ? "Generating..." : "Print"}
        </button>
      )}
    </PDFDownloadLink>
 </div>

<DetailsCard title="Personnel Details" onEdit={() => handleEdit("/edit-staff-personnel", formData.personnelDetails)}>
  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
    {Object.entries(formData.personnelDetails).map(([key, value]) => (
      <div key={key} className="flex">
        <strong className="text-gray-700 mr-2">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>
        <span>{value}</span>
      </div>
    ))}
  </div>
</DetailsCard>



      <DetailsCard title="Education Details" onEdit={() => handleEdit("/edit-staff-education", formData.educationDetails)}>
        {formData.educationDetails.qualifications.map((qual, index) => (
          <p key={index}><strong>Qualification:</strong> {qual.qualificationName}, <strong>Marks/CGPA:</strong> {qual.marksOrCgpa}</p>
        ))}
      </DetailsCard>

      <DetailsCard title="Bank Details" onEdit={() => handleEdit("/edit-staff-bank", formData.bankDetails)}>
  <div className="grid grid-cols-1 gap-y-2">
    {Object.entries(formData.bankDetails).map(([key, value]) => (
      <div key={key} className="flex">
        <strong className="text-gray-700 mr-2">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>
        <span>{value}</span>
      </div>
    ))}
  </div>
</DetailsCard>


<DetailsCard title="Employer Details" onEdit={() => handleEdit("/edit-staff-employer", formData.employerDetails)}>
  <div className="flex flex-col gap-y-3">
    {Object.entries(formData.employerDetails).map(([key, value]) => (
      <div key={key} className="flex">
        <strong className="text-gray-700 mr-2">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>
        <span>{value}</span>
      </div>
    ))}
  </div>
</DetailsCard>

    </div>
  );
};

const DetailsCard = ({ title, children, onEdit }) => (<>
  <div className="flex justify-between items-center bg-gray-100 p-2 rounded-t-lg">
    <h4 className="text-xl font-bold">{title}</h4>
    {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2" onClick={onEdit}>
        <FaEdit /> Edit
      </button> */}
    {/* <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 flex flex-col items-center gap-1 border border-gray-300 shadow" onClick={onEdit}>
      <FaPencilAlt className="text-black" />
      <span className="flex items-center gap-2">
        Edit
      </span>
    </button> */}
  </div>
  <div className="p-4 bg-gray-50 rounded-b-lg">{children}</div>
</>);

export default StaffDetails;
