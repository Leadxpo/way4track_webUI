// import React, { useState } from "react";
// import { FaEdit } from "react-icons/fa";

// const ViewStaffDetails = ({ onEdit }) => {
//   const [formData, setFormData] = useState({
//     personnelDetails: {
//       name: "John Doe",
//       dob: "1990-01-01",
//       gender: "Male",
//       location: "New York",
//       phoneNumber: "1234567890",
//       alternateNumber: "0987654321",
//       email: "johndoe@example.com",
//       aadharNumber: "1234-5678-9012",
//       panCardNumber: "ABCDE1234F",
//       drivingLicence: "DL-123456789",
//       address: "123, Main Street, NY",
//       uanNumber: "100200300400",
//       esicNumber: "ESIC123456",
//       bloodGroup: "O+",
//     },
//     educationDetails: {
//       qualifications: [{ qualificationName: "B.Tech", marksOrCgpa: "8.5 CGPA", file: null }],
//       experience: [{
//         previousCompany: "XYZ Corp",
//         previous_designation: "Software Engineer",
//         total_experience: "5 years",
//         previous_salary: "$80,000",
//         letter: "experienceLetter",
//         uploadLetters: null,
//       }],
//     },
//     bankDetails: {
//       accountNumber: "123456789012",
//       bankName: "ABC Bank",
//       ifscCode: "ABC12345",
//       branchName: "Downtown Branch",
//       accountType: "Savings",
//     },
//     employerDetails: {
//       branch: "Head Office",
//       staffId: "EMP12345",
//       joiningDate: "2020-06-15",
//       designation: "Senior Developer",
//       department: "IT",
//       monthlySalary: "$90,000",
//       officeEmail: "john.doe@company.com",
//       officePhoneNumber: "9876543210",
//       bikeAllocation: "Yes",
//       mobileAllocation: "Yes",
//       terminationDate: "",
//       resignationDate: "",
//       finalSettlementDate: "",
//       insuranceNumber: "INS123456",
//       insuranceEligibilityDate: "2021-01-01",
//       insuranceExpiryDate: "2026-01-01",
//       password: "securePass123",
//       description: "Senior Developer at IT Department",
//     },
//   });

//   return (
//     <div className="m-6">
//       <h3 className="text-2xl font-bold mb-6">Staff Details</h3>

//       <DetailsCard title="Personnel Details" onEdit={() => onEdit(formData.personnelDetails)}>
//         {Object.entries(formData.personnelDetails).map(([key, value]) => (
//           <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</p>
//         ))}
//       </DetailsCard>

//       <DetailsCard title="Education Details" onEdit={() => onEdit(formData.educationDetails)}>
//         {formData.educationDetails.qualifications.map((qual, index) => (
//           <p key={index}><strong>Qualification:</strong> {qual.qualificationName}, <strong>Marks/CGPA:</strong> {qual.marksOrCgpa}</p>
//         ))}
//       </DetailsCard>

//       <DetailsCard title="Experience Details" onEdit={() => onEdit(formData.educationDetails.experience)}>
//         {formData.educationDetails.experience.map((exp, index) => (
//           <p key={index}><strong>Previous Company:</strong> {exp.previousCompany}, <strong>Designation:</strong> {exp.previous_designation}, <strong>Total Experience:</strong> {exp.total_experience}, <strong>Previous Salary:</strong> {exp.previous_salary}</p>
//         ))}
//       </DetailsCard>

//       <DetailsCard title="Bank Details" onEdit={() => onEdit(formData.bankDetails)}>
//         {Object.entries(formData.bankDetails).map(([key, value]) => (
//           <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</p>
//         ))}
//       </DetailsCard>

//       <DetailsCard title="Employer Details" onEdit={() => onEdit(formData.employerDetails)}>
//         {Object.entries(formData.employerDetails).map(([key, value]) => (
//           <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</p>
//         ))}
//       </DetailsCard>
//     </div>
//   );
// };

// const DetailsCard = ({ title, children, onEdit }) => (
//   <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6">
//     <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
//       <h4 className="text-xl font-semibold">{title}</h4>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2" onClick={onEdit}>
//         <FaEdit /> Edit
//       </button>
//     </div>
//     <div className="p-4 bg-gray-50 rounded-b-lg">{children}</div>
//   </div>
// );

//    "/edit-staff-personnel"
//           "/edit-staff-education"
//          "/edit-staff-bank" 
//           "/edit-staff-employer" 

// export default ViewStaffDetails;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import ApiService from "../../services/ApiService";

const ViewStaffDetails = () => {
  const navigate = useNavigate();

  const [formData] = useState({
    personnelDetails: {
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
      accountNumber: "123456789012",
      bankName: "ABC Bank",
      ifscCode: "ABC12345",
      accountBranch: "Downtown Branch",
      accountType: "savings",
    },
    employerDetails: {
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

  // const fetchStaffDetails = async () => {
  //   // if (!location.state?.staffDetails) return;
  //   try {
  //     const response = await ApiService.post('/staff/getStaffDetailsById', {
  //       staffId: location.state?.staffDetails.staffId,
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //     });
  //     if (!response.status) {
  //       throw new Error('Staff not found');
  //     }
  //     if (response.status) {
  //       const fetchedData = response.data; // Extract the first staff object

  //       // Map API response fields to formData structure
  //       const updatedFormData = {
  //         id: fetchedData.id || null,
  //         name: fetchedData.name || '',
  //         phoneNumber: fetchedData.phoneNumber || '',
  //         staffId: fetchedData.staffId || '',
  //         designation: fetchedData.designation || '',
  //         branch: fetchedData.branchName || '',
  //         dob: fetchedData.dob || '',
  //         email: fetchedData.email || '',
  //         aadharNumber: fetchedData.aadharNumber || '',
  //         address: fetchedData.address || '',
  //         companyCode:
  //           fetchedData.companyCode || initialAuthState.companyCode,
  //         unitCode: fetchedData.unitCode || initialAuthState.unitCode,
  //         joiningDate: fetchedData.joiningDate || '',
  //         attendance: fetchedData.attendance || '',
  //         basicSalary: fetchedData.basicSalary || '',
  //         beforeExperience: fetchedData.beforeExperience || 0,
  //         password: '', // Leave password empty for security reasons
  //         photo: fetchedData.staffPhoto || null,
  //       };

  //       setFormData(updatedFormData);
  //       setImage(fetchedData.staffPhoto || '');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

      // useEffect(() => {
      //   fetchStaffDetails();
      // }, []);

  return (
    <div className="m-6">
      <h3 className="text-2xl font-bold mb-6">Staff Details</h3>

      <DetailsCard title="Personnel Details" onEdit={() => handleEdit("/edit-staff-personnel", formData.personnelDetails)}>
        {Object.entries(formData.personnelDetails).map(([key, value]) => (
          <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</p>
        ))}
      </DetailsCard>

      <DetailsCard title="Education Details" onEdit={() => handleEdit("/edit-staff-education", formData.educationDetails)}>
        {formData.educationDetails.qualifications.map((qual, index) => (
          <p key={index}><strong>Qualification:</strong> {qual.qualificationName}, <strong>Marks/CGPA:</strong> {qual.marksOrCgpa}</p>
        ))}
      </DetailsCard>

      <DetailsCard title="Bank Details" onEdit={() => handleEdit("/edit-staff-bank", formData.bankDetails)}>
        {Object.entries(formData.bankDetails).map(([key, value]) => (
          <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</p>
        ))}
      </DetailsCard>

      <DetailsCard title="Employer Details" onEdit={() => handleEdit("/edit-staff-employer", formData.employerDetails)}>
        {Object.entries(formData.employerDetails).map(([key, value]) => (
          <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</p>
        ))}
      </DetailsCard>
    </div>
  );
};

const DetailsCard = ({ title, children, onEdit }) => (
  <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6">
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
      <h4 className="text-xl font-semibold">{title}</h4>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2" onClick={onEdit}>
        <FaEdit /> Edit
      </button>
    </div>
    <div className="p-4 bg-gray-50 rounded-b-lg">{children}</div>
  </div>
);

export default ViewStaffDetails;

