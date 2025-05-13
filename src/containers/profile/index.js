import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

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
            <ProfileDetail label="Experience (Years)" value={`${profileData.beforeExperience||0} years`} />
          </div>
        </div>
      </div>
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
