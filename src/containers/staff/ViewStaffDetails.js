import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';

const ViewStaffDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [permissions, setPermissions] = useState({});
 
  useEffect(() => {
    const perms = getPermissions('staff');
    setPermissions(perms);
  }, [permissions]); // Include getStaffSearchDetails in the dependency array
 
  const [formData] = useState({
    personnelDetails: {
      id: state.staffDetails.id,
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
      drivingLicence: 'DL-123456789',
      address: '123, Main Street, NY',
      uanNumber: '100200300400',
      esicNumber: 'ESIC123456',
      bloodGroup: 'O+',
    },
    educationDetails: {
      id: state.staffDetails.id,
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
      id: state.staffDetails.id,
      staffId: state.staffDetails.staffId,
      accountNumber: '123456789012',
      bankName: 'ABC Bank',
      ifscCode: 'ABC12345',
      branchName: 'Downtown Branch',
      accountType: 'savings',
    },
    employerDetails: {
      id: state.staffDetails.id,
      staffId: state.staffDetails.staffId,
      branchName: 'Head Office',
      staffId: 'EMP12345',
      joiningDate: '2020-06-15',
      designation: 'Senior Developer',
      department: 'IT',
      monthlySalary: '90,000',
      officeEmail: 'john.doe@company.com',
      officePhoneNumber: '9876543210',
      bikeAllocation: 'Yes',
      bikeName: 'Yes',
      mobileAllocation: 'Yes',
      mobileBrand: '',
      terminationDate: '2021-01-01',
      resignationDate: '2021-01-01',
      finalSettlementDate: '2021-01-01',
      insuranceCompanyName: 'INS123456',
      insuranceNumber: 'INS123456',
      insuranceEligibilityDate: '2021-01-01',
      insuranceExpiryDate: '2026-01-01',
      password: 'securePass123',
      description: 'Senior Developer at IT Department',
    },
  });

  console.log(formData.employerDetails, 'employeers');

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
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
    }
    // useEffect(() => {
    //   fetchStaffDetails();
    // }, []);
  };
  return (
    <div className="m-6">
      <h3 className="text-2xl font-bold mb-6">Staff Details</h3>

      <DetailsCard
        title="Personnel Details"
        onEdit={() =>
          handleEdit('/edit-staff-personnel', formData.personnelDetails)
        }
      >
        {Object.entries(formData.personnelDetails).map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
          </p>
        ))}
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
        {Object.entries(formData.bankDetails).map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
          </p>
        ))}
      </DetailsCard>

      <DetailsCard
        title="Employer Details"
        onEdit={() =>
          handleEdit('/edit-staff-employer', formData.employerDetails)
        }
      >
        {Object.entries(formData.employerDetails).map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
          </p>
        ))}
      </DetailsCard>
    </div>
  );
};

const DetailsCard = ({ title, children, onEdit }) => (
  <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6">
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
      <h4 className="text-xl font-semibold">{title}</h4>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        onClick={onEdit}
      >
        <FaEdit /> Edit
      </button>
    </div>
    <div className="p-4 bg-gray-50 rounded-b-lg">{children}</div>
  </div>
);

export default ViewStaffDetails;
