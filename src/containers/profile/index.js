import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Edit } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [editedPassword, setEditedPassword] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [role, setRole] = useState(true)


  const handlePasswordChangeSubmit = async () => {
    try {
      const response = await ApiService.post('/otp/change-password', {
        staffId: profileData.staffId,
        otp: otp,
        newPassword:passwordData.newPassword,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      console.log('API Response', response);

      if (response.status) {
        setIsPasswordModalOpen(false)
        localStorage.clear();       // clear role, token, etc.
        // setRole(null);              // reset role
        // setIsLoggedIn(false);       // switch UI back to Login
        navigate("/login", { replace: true });  // ensure redirect
        alert('password changed successfully');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP.');
    }
    setIsPasswordModalOpen(false);
   
  };

  const handleSendOtp = async () => {
    try {
      const response = await ApiService.post('/otp/send-otp', {
        staffId: profileData.staffId,
        phoneNumber: profileData.phoneNumber,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      if (response.status) {
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
        staffId: profileData.staffId,
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const payload = {
          staffId: localStorage.getItem('userId'),
          password: localStorage.getItem('password'),
          designation: localStorage.getItem('role'),
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        };

        const response = await ApiService.post('/login/ProfileDetails', payload);

        if (response && response.status) {
          setProfileData(response.data?.data || null);
        } else {
          setError(response?.internalMessage || 'Failed to fetch profile details.');
        }
      } catch (err) {
        setError('Error fetching profile details.');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profileData) {
    return <div className="text-gray-500 text-center">No profile data available.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8">
        <div className="flex flex-col items-center">
          <img
            src={profileData.staffPhoto || '/default-avatar.png'}
            // alt={profileData.name || 'Profile'}
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          <h2 className="text-2xl font-semibold mt-4">{profileData.name}</h2>
          <p className="text-gray-600">{profileData.designation}</p>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileDetail label="Staff ID" value={profileData.staffId} />
            <ProfileDetail label="Phone Number" value={profileData.phoneNumber} />
            <ProfileDetail label="Email" value={profileData.email} />
            <ProfileDetail label="Date of Birth" value={profileData.dob} />
            <ProfileDetail label="Aadhar Number" value={profileData.aadharNumber} />
            <ProfileDetail label="Address" value={profileData.address} />
            <ProfileDetail label="Joining Date" value={profileData.joiningDate} />
            <ProfileDetail label="Basic Salary" value={profileData.monthlySalary} />
            <ProfileDetail label="Experience (Years)" value={`${profileData.beforeExperience || 0} years`} />
            <div className="relative w-full bg-gray-100 rounded-lg p-3 shadow-sm">
              <label className="block text-gray-700 font-semibold">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your Password"
                value={profileData.password}
                className="mt-1 block w-full p-2 bg-gray-100 rounded-md focus:outline-none"
                required
              />
              <span
                className="absolute inset-y-0 mb-4 top-14 right-10 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} style={{ alignSelf: 'center' }}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
              <span
                className="absolute inset-y-0 mb-4 top-14 right-2 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setIsConfirmModalOpen(true)} style={{ alignSelf: 'center' }}
              >
                <Edit size={20} />
              </span>
            </div>

          </div>
        </div>
      </div>
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
            <label>Old Password</label>
            <input
              type="text"
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
            <label>new Password</label>
            <input
              type="text"
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
            <label>Confirm Password</label>

            <input
              type="text"
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
                onClick={handlePasswordChangeSubmit}
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
    </div>
  );
};

// Reusable Profile Detail Component
const ProfileDetail = ({ label, value }) => (
  <div className="bg-gray-100 rounded-lg p-3 shadow-sm">
    <label className="block text-gray-700 font-semibold">{label}</label>
    <p className="text-gray-900">{value || 'N/A'}</p>
  </div>
);

export default ProfileSettings;
