import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const payload = {
          staffId: localStorage.getItem('userId'),
          password: localStorage.getItem('password'),
          designation: localStorage.getItem('role'),
          companyCode: localStorage.getItem('companyCode'),
          unitCode: localStorage.getItem('unitCode'),
        };

        const response = await ApiService.post('/login/ProfileDetails', payload);

        if (response && response.status) {
          setProfileData(response.data?.data || []);
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

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-6">
        {profileData.length === 0 ? (
          <div className="text-gray-500">No profile data available.</div>
        ) : (
          profileData.map((staff) => (
            <div key={staff.id} className="space-y-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <img
                  src={staff.staffPhoto || '/default-avatar.png'}
                  alt={staff.name || 'Profile'}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>

              <div>
                {Object.entries(staff).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <label className="block font-semibold">{key}:</label>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
