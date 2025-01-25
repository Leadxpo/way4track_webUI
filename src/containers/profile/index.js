import React, { useState } from 'react';

const ProfileSettings = () => {
  // Mock data for the profile
  const [profileData, setProfileData] = useState({
    name: 'V Ravi Krishna',
    number: '+91 94457 82342',
    staffId: 'Way4Track001',
    designation: 'CEO',
    branch: 'Vizag',
    dob: '06/06/1996',
    email: 'ravi@way4track@gmail.com',
    aadhar: '**** **** ****',
    address:
      '21-27, Double road, Viman Nagar, Kakani Nagar, Visakhapatnam, Andhra Pradesh 530009',
  });

  // Handler for editing fields
  const handleEdit = (key) => {
    console.log(`Editing ${key}`);
    // Add functionality to make fields editable if needed
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <button className="border px-4 py-2 rounded">Change Photo</button>
            <button className="text-red-500 ml-2">Remove</button>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-6">
          {Object.entries(profileData).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4"
            >
              <div className="w-full">
                <label className="block font-semibold text-gray-700 capitalize mb-1">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={value}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-200 focus:outline-none"
                  />
                  <button
                    onClick={() => handleEdit(key)}
                    className="ml-2 border px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connected Accounts Section */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold mb-2">Connected Accounts</h2>
          <p className="text-gray-600 mb-4">
            Manage the social media accounts connected to your profile for easy
            login.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="./Google.png" alt="Google" className="w-6 h-6" />
              <span className="text-gray-800">Google</span>
            </div>
            <p>Connected</p>
            <button className="bg-gray-100 p-2 rounded-md">Disconnect</button>
          </div>
        </div>

        {/* Password Section */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold mb-2">Password</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 mb-4 flex-1">
              Update your password through the button below. You will be
              redirected to a new page and must follow the instructions.
            </p>
            <button
              className="ml-4 border py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 transition text-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              Set New Password
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 mb-4">
              Receive newsletters, promotions, and news from Way4Track Company.
            </p>

            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
