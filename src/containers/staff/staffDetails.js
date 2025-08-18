import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaPencilAlt } from 'react-icons/fa';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StaffDetailsPDF from './StaffDetailsPDF';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { getPermissions } from '../../common/commonUtils';

const StaffDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [staffPhoto, setStaffPhoto] = useState('');
  const [otp, setOtp] = useState('');
  const userId = localStorage.getItem('userId');
  const [permissions, setPermissions] = useState({});
  const role = localStorage.getItem('role');
  const [formData, setFormData] = useState({
    personnelDetails: {
      id: state?.staffDetails?.id,
      staffId: state?.staffDetails?.staffId || '',
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
      UANNumber: '100200300400',
      ESICNumber: 'ESIC123456',
      bloodGroup: 'O+',
    },
    educationDetails: {
      id: state?.staffDetails?.id,
      staffId: state?.staffDetails?.staffId,
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
      id: state?.staffDetails?.id,
      staffId: state?.staffDetails?.staffId,
      accountNumber: '123456789012',
      bankName: 'ABC Bank',
      ifscCode: 'ABC12345',
      accountBranch: 'Downtown Branch',
      accountType: 'savings',
    },
    employerDetails: {
      id: state?.staffDetails?.id,
      staffId: state?.staffDetails?.staffId,
      branch: 'Head Office',
      staffId: 'EMP12345',
      joiningDate: '2020-06-15',
      designation: 'Senior Developer',
      department: 'IT',
      monthlySalary: '90,000',
      officeEmail: 'john.doe@company.com',
      officePhoneNumber: '9876543210',
      mailAllocation: 'Yes',
      bikeAllocation: 'Yes',
      bikeName: '',
      mobileAllocation: 'Yes',
      mobileBrand: '',
      terminationDate: '2021-01-01',
      resignationDate: '2021-01-01',
      finalSettlementDate: '2021-01-01',
      finalSettlementAmt: '2021-01-01',
      insuranceCompanyName: '',
      insuranceNumber: 'INS123456',
      insuranceNumber: 'INS123456',
      insuranceEligibilityDate: '2021-01-01',
      insuranceExpiryDate: '2026-01-01',
      // password: 'securePass123',
      description: 'Senior Developer at IT Department',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [editedPassword, setEditedPassword] = useState(
    formData.employerDetails.password
  );
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [isTermenationModalOpen, setIsTermenationModalOpen] = useState(false);
  const [terminationData, setTerminationData] = useState({
    id: formData?.personnelDetails?.id || "",
    terminationDate: "",
    finalSettlementAmt: "",
    staffStatus: "INACTIVE",
  });

  const [isResignationModalOpen, setIsResignationModalOpen] = useState(false);
  const [resignationData, setResignationData] = useState({
    id: state?.staffDetails?.id,
    resignationDate: '',
    finalSettlementAmt: '',
    staffStatus: 'INACTIVE'
  });

  useEffect(() => {
    const perms = getPermissions('staff');
    setPermissions(perms);
  }, [permissions]); // Include getStaffSearchDetails in the dependency array

  const handlePasswordChangeSubmit = () => {
    // Add validation if needed
    setIsPasswordModalOpen(false);
    setIsOtpModalOpen(true);
  };

  const handleEdit = (path, data) => {
    navigate(path, { state: { data } });
  };

  const fetchStaffDetails = async () => {
    try {
      const response = await ApiService.post('/staff/getStaffDetailsById', {
        staffId: state.staffDetails['Staff ID'],
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      console.log('API Response:staff photo++', response);

      if (response.errorCode === 200) {
        const staff = response.data;
        setStaffPhoto(staff.staffPhoto);
        setFormData({
          personnelDetails: {
            id: staff.id,
            staffId: staff.staffId || '',
            staffPhoto: staff?.staffPhoto,
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
            // uanNumber: staff.uanNumber || '',
            // esicNumber: staff.esicNumber || '',
            'UAN Number': (staff.uanNumber || '').toUpperCase(),
            'ESIC Number': (staff.esicNumber || '').toUpperCase(),
            bloodGroup: staff.bloodGroup || '',
          },
          educationDetails: {
            id: staff.id,
            qualifications: staff.qualifications || [],
            experience: staff.experienceDetails || [],
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
            mailAllocation: staff.mailAllocation || '',
            officeEmail: staff.officeEmail || '',
            officePhoneNumber: staff.officePhoneNumber || '',
            bikeAllocation: staff.bikeAllocation || '',
            bikeName: staff.bikeName || '',
            bikeNumber: staff.bikeNumber || '',
            mobileAllocation: staff.mobileAllocation || '',
            drivingLicence: staff.drivingLicence || '',
            drivingLicenceNumber: staff.drivingLicenceNumber || '',
            officePhoneNumber: staff.officePhoneNumber || '',
            mobileBrand: staff.mobileBrand || '',
            terminationDate: staff.terminationDate || '',
            resignationDate: staff.resignationDate || '',
            finalSettlementDate: staff.finalSettlementDate || '',
            finalSettlementAmt: staff.finalSettlementAmt || '',
            insuranceCompanyName: staff.insuranceCompanyName || '',
            insuranceNumber: staff.insuranceNumber || '',
            insuranceEligibilityDate: staff.insuranceEligibilityDate || '',
            insuranceExpiryDate: staff.insuranceExpiryDate || '',
            // password: staff.password || '',
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

  const handleSendOtp = async () => {
    try {
      const response = await ApiService.post('/otp/send-otp', {
        staffId: userId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      console.log('API Response', response);

      if (response.status) {
        const staff = response.data.data;

        alert('OTP sent successfully');
        setIsConfirmModalOpen(false);
        setIsOtpModalOpen(true);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await ApiService.post('/otp/verify-otp', {
        staffId: userId,
        otp: otp,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      console.log('API Response', response);

      if (response.errorCode === 200) {
        const staff = response.data;

        alert('OTP verified successfully');
        setIsPasswordModalOpen(true);
        setIsOtpModalOpen(false);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      alert('Failed to fetch staff details.');
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6 p-3">
      <div>
        <img
          src={staffPhoto || 'logo-square.png'}
          alt={staffPhoto}
          className="rounded-full w-24 h-24 mx-auto mb-4"
        />
      </div>
      <div className='flex'>
        <button className="bg-red-500 text-white m-4 bold px-4 py-2 rounded-lg hover:bg-red-800 flex items-center gap-2" onClick={() => (setIsTermenationModalOpen(true))}>
          Termination
        </button>
        <button className="bg-red-500 text-white m-4 bold px-4 py-2 rounded-lg hover:bg-red-300 flex items-center gap-2" onClick={() => (setIsResignationModalOpen(true))}>
          Resignation
        </button>
      </div>
      <DetailsCard
        title="Personnel Details"
        onEdit={() =>
          handleEdit('/edit-staff-personnel', formData.personnelDetails)
        }
        permissions={permissions}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {Object.entries(formData.personnelDetails).map(([key, value]) => (
            <div key={key} className="flex">
              <strong className="text-gray-700 mr-2" style={{ textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </strong>
              <span>{value ? value : "N/A"}</span>
            </div>
          ))}
        </div>
      </DetailsCard>

      <DetailsCard
        title="Education Details"
        onEdit={() =>
          handleEdit('/edit-staff-education', formData.educationDetails)
        }
        permissions={permissions}
      >
        {formData.educationDetails.qualifications.map((qual, index) => (
          <p key={index}>
            <strong>Qualification:</strong> {qual.qualificationName},{' '}
            <strong>Marks/CGPA:</strong> {qual.marksOrCgpa}
          </p>
        ))}
      </DetailsCard>

      <DetailsCard
        title="Previous Experience"
        onEdit={() =>
          handleEdit('/edit-staff-education', formData.educationDetails)
        }
        permissions={permissions}
      >
        {formData.educationDetails.experience.map((exp, index) => (
          <p key={index}>
            <strong>Company Name:</strong> {exp.previousCompany},{' '}
            <strong>Designation:</strong> {exp.previous_designation},{' '}
            <strong>Experience:</strong> {exp.total_experience},{' '}
            <strong>Salary:</strong> {exp.previous_salary}
          </p>
        ))}
      </DetailsCard>

      <DetailsCard
        title="Bank Details"
        onEdit={() => handleEdit('/edit-staff-bank', formData.bankDetails)}
        permissions={permissions}
      >
        <div className="grid grid-cols-1 gap-y-2">
          {Object.entries(formData.bankDetails).map(([key, value]) => (
            <div key={key} className="flex">
              <strong className="text-gray-700 mr-2" style={{ textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </strong>
              <span>{value ? value : "N/A"}</span>
            </div>
          ))}
        </div>
      </DetailsCard>

      <DetailsCard
        title="Employer Details"
        onEdit={() =>
          handleEdit('/edit-staff-employer', formData.employerDetails)
        }
        permissions={permissions}
      >
        <div className="flex flex-col gap-y-3">
          {Object.entries(formData.employerDetails).map(([key, value]) => {
            if (
              key === 'bikeNumber' &&
              formData.employerDetails.bikeAllocation !== 'Yes'
            )
              return null;

            if (
              key === 'officeEmail' &&
              formData.employerDetails.mailAllocation !== 'Yes'
            )
              return null;

            if (
              key === 'drivingLicenceNumber' &&
              formData.employerDetails.drivingLicence !== 'Yes'
            )
              return null;

            // Skip officePhone and mobileBrand if mobileAllocation is not 'Yes'
            if (
              (key === 'officePhone' || key === 'mobileBrand') &&
              formData.employerDetails.mobileAllocation !== 'Yes'
            )
              return null;

            return (
              <div key={key} className="items-center p-2 rounded">
                <strong className="text-gray-700 mr-2 min-w-[160px]" style={{ textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </strong>
                <span>{value ? value : "N/A"}</span>
              </div>
            );
          })}

          {isConfirmModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Change</h2>
                <p className="mb-4 text-gray-700">
                  Are you sure you want to change the password?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsConfirmModalOpen(false)}
                    className="px-4 py-1 rounded bg-gray-300 text-sm"
                  >
                    No
                  </button>
                  <button
                    // onClick={() => {
                    //   setIsConfirmModalOpen(false);
                    //   setIsOtpModalOpen(true);
                    // }}
                    onClick={handleSendOtp}
                    className="px-4 py-1 rounded bg-blue-600 text-white text-sm"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Password Change Modal */}
          {isPasswordModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="border w-full p-2 mb-3 rounded"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="border w-full p-2 mb-3 rounded"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="border w-full p-2 mb-4 rounded"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="text-sm px-4 py-1 rounded bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    // onClick={handlePasswordChangeSubmit}
                    className="text-sm px-4 py-1 rounded bg-blue-600 text-white"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* OTP Modal */}
          {isOtpModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm">
                {/* <h2 className="text-lg font-semibold mb-4">Enter OTP</h2> */}
                <p className="text-lg font-semibold mb-4">
                  OTP sent successfully !
                </p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="border w-full p-2 mb-4 rounded"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsOtpModalOpen(false)}
                    className="text-sm px-4 py-1 rounded bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    // onClick={() => {
                    //   setIsPasswordModalOpen(true);
                    //   setIsOtpModalOpen(false);
                    // }}
                    onClick={handleVerifyOtp}
                    className="text-sm px-4 py-1 rounded bg-green-600 text-white"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>
          )}
          {isTermenationModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm">
                {/* <h2 className="text-lg font-semibold mb-4">Enter OTP</h2> */}
                <p className="text-lg font-semibold mb-4">
                  Termination Form
                </p>
                <label className='my-1'>Termination Date</label>
                <input
                  type="date"
                  placeholder="Termination Date"
                  className="border w-full p-2 mb-4 rounded"
                  value={terminationData.terminationDate}
                  onChange={(e) =>
                    setTerminationData((prev) => ({
                      ...prev,
                      terminationDate: e.target.value,
                    }))
                  }
                />
                <label className='my-1'>Final Settlement Amount</label>
                <input
                  type="text"
                  placeholder="FinalSettlement Amount"
                  className="border w-full p-2 mb-4 rounded"
                  value={terminationData.finalSettlementAmt}
                  onChange={(e) =>
                    setTerminationData((prev) => ({
                      ...prev,
                      finalSettlementAmt: e.target.value,
                    }))
                  } />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsTermenationModalOpen(false)}
                    className="text-sm px-4 py-1 rounded bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const  payload={
                        id: formData.personnelDetails.id,
                        terminationDate: terminationData.terminationDate,
                        finalSettlementAmt:  terminationData.finalSettlementAmt,
                        staffStatus: "INACTIVE"
                    }
                      try {
                        const endpoint = '/staff/handleStaffDetails';
                        const response = await ApiService.post(endpoint, payload, {
                          headers: { 'Content-Type': 'application/json' },
                        });

                        if (response.status) {
                          alert('Employer details updated successfully!');
                          setIsTermenationModalOpen(false)
                          fetchStaffDetails()
                          return response.data;
                        } else {
                          alert('Failed to update employer details.');
                          return null;
                        }
                      } catch (error) {
                        console.error('Error updating employer details:', error);
                        alert('An error occurred while updating employer details.');
                        return null;
                      }
                    }}

                    className="text-sm px-4 py-1 rounded bg-green-600 text-white"
                  >
                    Terminate
                  </button>
                </div>
              </div>
            </div>
          )}
          {isResignationModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm">
                {/* <h2 className="text-lg font-semibold mb-4">Enter OTP</h2> */}
                <p className="text-lg font-semibold mb-4">
                  Retmination Form
                </p>
                <label className='my-1'>Resignation Date</label>
                <input
                  type="date"
                  placeholder="Resignation Date"
                  className="border w-full p-2 mb-4 rounded"
                  value={resignationData.resignationDate}
                  onChange={(e) =>
                    setResignationData((prev) => ({
                      ...prev,
                      resignationDate: e.target.value,
                    }))
                  }
                />
                <label className='my-1'>Final Settlement Amount</label>
                <input
                  type="text"
                  placeholder="FinalSettlement Amount"
                  className="border w-full p-2 mb-4 rounded"
                  value={resignationData.finalSettlementAmt}
                  onChange={(e) =>
                    setResignationData((prev) => ({
                      ...prev,
                      finalSettlementAmt: e.target.value,
                    }))
                  } />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsResignationModalOpen(false)}
                    className="text-sm px-4 py-1 rounded bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const  payload={
                        id: formData.personnelDetails.id,
                        terminationDate: resignationData.resignationDate,
                        finalSettlementAmt:  resignationData.finalSettlementAmt,
                        staffStatus: "INACTIVE"
                    }
                      try {
                        const endpoint = '/staff/handleStaffDetails';
                        const response = await ApiService.post(endpoint, payload, {
                          headers: { 'Content-Type': 'application/json' },
                        });

                        if (response.status) {
                          alert('Employer details updated successfully!');
                          setIsResignationModalOpen(false)
                          fetchStaffDetails()
                          return response.data;
                        } else {
                          alert('Failed to update employer details.');
                          return null;
                        }
                      } catch (error) {
                        console.error('Error updating employer details:', error);
                        alert('An error occurred while updating employer details.');
                        return null;
                      }
                    }}

                    className="text-sm px-4 py-1 rounded bg-green-600 text-white"
                  >
                    Resignation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DetailsCard>
    </div>
  );
};

const DetailsCard = ({ title, children, onEdit, permissions }) => (
  <>
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded-t-lg">
      <h4 className="text-xl font-bold">{title}</h4>
      {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2" onClick={onEdit}>
        <FaEdit /> Edit
      </button> */}
      {permissions.edit && <button
        className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 flex flex-col items-center gap-1 border border-gray-300 shadow"
        onClick={onEdit}
      >
        <FaPencilAlt className="text-black" />
        <span className="flex items-center gap-2">Edit</span>
      </button>
      }    </div>
    <div className="p-4 bg-gray-50 rounded-b-lg">{children}</div>
  </>
);

export default StaffDetails;
