import React, { useState, useEffect } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaList, FaTh, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Table from '../../components/Table';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const Staff = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [profiles, setProfiles] = useState([]); // State to store staff data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const columns = [
    'employeeId',
    'name',
    'designation',
    'branch',
    'phone',
    'attendance',
  ];

  // Fetch staff details from API
  const fetchStaffDetails = async () => {
    setLoading(true);
    try {
      const response = await ApiService.post(
        '/dashboards/getStaffSearchDetails',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      if (response && response.success) {
        setProfiles(response.data); // Assuming response.data contains staff details
      } else {
        throw new Error(response.message || 'Failed to fetch staff data');
      }
    } catch (err) {
      console.error('Error fetching staff details:', err);
      setError('Failed to fetch staff details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffDetails();
  }, []);

  const handleSelectChange = (e) => setSelectedBranch(e.target.value);

  const toggleMenu = (index) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const handleEdit = (profile) => {
    navigate('/edit-staff', { state: { staffDetails: profile } });
  };

  const handleMoreDetails = (profile) => {
    navigate('/staff-details', { state: { staffDetails: profile } });
  };

  const onEdit = (row) => {
    console.log('Edit clicked for row:', row);
  };

  const onDetails = (row) => {
    console.log('Details clicked for row:', row);
  };

  return (
    <div className="m-2">
      {/* Header with toggling view buttons */}
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-semibold text-gray-800">Staff Details</h2>
        <div className="flex items-center space-x-4">
          <button
            className={`p-2 cursor-pointer ${!isGridView && 'border border-black'}`}
            onClick={() => setIsGridView(false)}
          >
            <FaList size={18} />
          </button>
          <button
            className={`p-2 cursor-pointer ${isGridView && 'border border-black'}`}
            onClick={() => setIsGridView(true)}
          >
            <FaTh size={18} />
          </button>
          <button
            className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate('/payroll')}
          >
            <span>Payroll</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate('/add-staff')}
          >
            <FaPlus size={16} />
            <span>Add Staff</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex space-x-4 my-4">
        <input
          placeholder="Staff ID"
          className="h-12 w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          placeholder="Staff Name"
          className="h-12 w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <select
          value={selectedBranch}
          onChange={handleSelectChange}
          className="h-12 w-full block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="" disabled>
            Select Branch
          </option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Vishakapatnam">Vishakapatnam</option>
          <option value="Vijayawada">Vijayawada</option>
          <option value="Kakinada">Kakinada</option>
        </select>
        <button className="h-12 w-full bg-green-700 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-500">
          Search
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading staff data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Conditional Rendering for Grid and Table Views */}
      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-400"
            >
              <div
                className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                onClick={() => toggleMenu(index)}
              >
                <FaEllipsisVertical />
              </div>
              {menuOpenIndex === index && (
                <div className="absolute top-10 right-4 bg-white border border-gray-300 rounded-md shadow-md p-2 z-10">
                  <button
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                    onClick={() => handleEdit(profile)}
                  >
                    Edit
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-gray-100">
                    Delete
                  </button>
                  <button
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                    onClick={() => handleMoreDetails(profile)}
                  >
                    More Details
                  </button>
                </div>
              )}
              <img
                className="rounded-full mx-auto h-24 w-24 object-cover"
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt="Profile"
              />
              <div className="text-center mt-4">
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <p className="text-gray-500">{profile.designation}</p>
                <p className="text-gray-400">{profile.branch}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          data={profiles}
          onEdit={onEdit}
          onDetails={onDetails}
        />
      )}
    </div>
  );
};

export default Staff;
