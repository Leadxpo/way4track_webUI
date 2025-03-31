import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaPencilAlt, FaPrint } from 'react-icons/fa';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StaffDetailsPDF from './StaffDetailsPDF';

const StaffDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log('staff details');

  const [formData, setFormData] = useState({
    personnelDetails: {
      id:state.staffDetails.id,
      staffId: state.staffDetails.staffId,
      name: 'John Doe',
      dob: '1990-01-01',
      gender: 'Male',
      location: 'New York',
      phoneNumber: '1234567890',
      alternateNumber: '0987654321',
      email: 'johndoe@example.com',
      aadharNumber: '1234-5678-9012',
      panCardNumber: 'ABCDE1234F',
      drivingLicenceNumber: 'DL-123456789',
      drivingLicence: 'Yes',
      address: '123, Main Street, NY',
      uanNumber: '100200300400',
      esicNumber: 'ESIC123456',
      bloodGroup: 'O+',
    },
    educationDetails: {
      id:state.staffDetails.id,
      staffId: state.staffDetails.staffId,
      qualifications: [
        { qualificationName: 'B.Tech', marksOrCgpa: '8.5 CGPA', file: null },
      ],
      experience: [
        {
          previousCompany: 'XYZ Corp',
          previous_designation: 'Software Engineer',
          total_experience: '5 years',
          previous_salary: '$80,000',
          letter: 'experienceLetter',
          uploadLetters: null,
        },
      ],
    },
    bankDetails: {
      id:state.staffDetails.id,
      staffId: state.staffDetails.staffId,
      accountNumber: '123456789012',
      bankName: 'ABC Bank',
      ifscCode: 'ABC12345',
      accountBranch: 'Downtown Branch',
      accountType: 'savings',
    },
    employerDetails: {
      id:state.staffDetails.id,
      staffId: state.staffDetails.staffId,
      branch: 'Head Office',
      staffId: 'EMP12345',
      joiningDate: '2020-06-15',
      designation: 'Senior Developer',
      department: 'IT',
      monthlySalary: '90,000',
      officeEmail: 'john.doe@company.com',
      officePhoneNumber: '9876543210',
      bikeAllocation: 'Yes',
      mobileAllocation: 'Yes',
      terminationDate: '2021-01-01',
      resignationDate: '2021-01-01',
      finalSettlementDate: '2021-01-01',
      insuranceNumber: 'INS123456',
      insuranceEligibilityDate: '2021-01-01',
      insuranceExpiryDate: '2026-01-01',
      password: 'securePass123',
      description: 'Senior Developer at IT Department',
    },
  });

  
  console.log(formData.employerDetails,"employeers")

  const handleEdit = (path, data) => {
    navigate(path, { state: { data } });
  };

  const fetchStaffDetails = async () => {
    try {
      const response = await ApiService.post('/staff/getStaffDetailsById', {
        staffId: state.staffDetails.staffId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      console.log('API Response:', response);

      if (response.errorCode === 200) {
        const staff = response.data;

        setFormData({
          personnelDetails: {
            id: staff.id,
            staffId: staff.staffId || '',
            name: staff.name || '',
            dob: staff.dob || '',
            gender: staff.gender || '',
            location: staff.location || '',
            phoneNumber: staff.phoneNumber || '',
            alternateNumber: staff.alternateNumber || '',
            email: staff.email || '',
            drivingLicenceNumber: staff.drivingLicenceNumber || '',
            aadharNumber: staff.aadharNumber || '',
            panCardNumber: staff.panCardNumber || '',
            drivingLicence: staff.drivingLicence || '',
            address: staff.address || '',
            uanNumber: staff.uanNumber || '',
            esicNumber: staff.esicNumber || '',
            bloodGroup: staff.bloodGroup || '',
          },
          educationDetails: {
            id: staff.id,
            qualifications: staff.qualifications || [],
            experience: staff.experience || [],
          },
          bankDetails: {
            id: staff.id,
            accountNumber: staff.accountNumber || '',
            bankName: staff.bankName || '',
            ifscCode: staff.ifscCode || '',
            accountBranch: staff.accountBranch || '',
            accountType: staff.accountType || '',
          },
          employerDetails: {
            id: staff.id,
            branchName: staff.branchName || '',
            joiningDate: staff.joiningDate || '',
            designation: staff.designation || '',
            department: staff.department || '',
            monthlySalary: staff.monthlySalary || '',
            officeEmail: staff.officeEmail || '',
            officePhoneNumber: staff.officePhoneNumber || '',
            bikeAllocation: staff.bikeAllocation || '',
            mobileAllocation: staff.mobileAllocation || '',
            terminationDate: staff.terminationDate || '',
            resignationDate: staff.resignationDate || '',
            finalSettlementDate: staff.finalSettlementDate || '',
            insuranceNumber: staff.insuranceNumber || '',
            insuranceEligibilityDate: staff.insuranceEligibilityDate || '',
            insuranceExpiryDate: staff.insuranceExpiryDate || '',
            password: staff.password || '',
            description: staff.description || '',
          },
        });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      alert('Failed to fetch staff details.');
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

        {/* <PDFDownloadLink
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
    </PDFDownloadLink> */}
      </div>

      <DetailsCard
        title="Personnel Details"
        onEdit={() =>
          handleEdit('/edit-staff-personnel', formData.personnelDetails)
        }
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {Object.entries(formData.personnelDetails).map(([key, value]) => (
            <div key={key} className="flex">
              <strong className="text-gray-700 mr-2">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </DetailsCard>

      <DetailsCard
        title="Education Details"
        onEdit={() =>
          handleEdit('/edit-staff-education', formData.educationDetails)
        }
      >
        {formData.educationDetails.qualifications.map((qual, index) => (
          <p key={index}>
            <strong>Qualification:</strong> {qual.qualificationName},{' '}
            <strong>Marks/CGPA:</strong> {qual.marksOrCgpa}
          </p>
        ))}
      </DetailsCard>

      <DetailsCard
        title="Bank Details"
        onEdit={() => handleEdit('/edit-staff-bank', formData.bankDetails)}
      >
        <div className="grid grid-cols-1 gap-y-2">
          {Object.entries(formData.bankDetails).map(([key, value]) => (
            <div key={key} className="flex">
              <strong className="text-gray-700 mr-2">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </DetailsCard>

      <DetailsCard
        title="Employer Details"
        onEdit={() =>
          handleEdit('/edit-staff-employer', formData.employerDetails)
        }
      >
        <div className="flex flex-col gap-y-3">
          {Object.entries(formData.employerDetails).map(([key, value]) => (
            <div key={key} className="flex">
              <strong className="text-gray-700 mr-2">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </DetailsCard>
    </div>
  );
};

const DetailsCard = ({ title, children, onEdit }) => (
  <>
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded-t-lg">
      <h4 className="text-xl font-bold">{title}</h4>
      {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2" onClick={onEdit}>
        <FaEdit /> Edit
      </button> */}
      <button
        className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 flex flex-col items-center gap-1 border border-gray-300 shadow"
        onClick={onEdit}
      >
        <FaPencilAlt className="text-black" />
        <span className="flex items-center gap-2">Edit</span>
      </button>
    </div>
    <div className="p-4 bg-gray-50 rounded-b-lg">{children}</div>
  </>
);

export default StaffDetails;
