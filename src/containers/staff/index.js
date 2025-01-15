import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaList, FaTh, FaPlus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import Table from '../../components/Table';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const Staff = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeData = location.state?.staffDetails || {};

  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [profiles, setProfiles] = useState([]);

  // Fetch Staff Details using useCallback to memoize the function
  const getStaffSearchDetails = useCallback(async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getStaffSearchDetails',
        {
          staffId: employeeData?.staffId,
          branchName: employeeData?.branchName,
          staffName: employeeData?.staffName,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        setProfiles(response.data || []);
      } else {
        alert(
          response.data.internalMessage || 'Failed to fetch staff details.'
        );
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      alert('Failed to fetch staff details.');
    }
  }, [
    employeeData?.staffId,
    employeeData?.branchName,
    employeeData?.staffName,
  ]);

  // Fetch Branch Names
  const fetchBranches = async () => {
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      if (response.status) {
        setBranches(response.data);
      } else {
        console.error('Failed to fetch branch names.');
      }
    } catch (error) {
      console.error('Error fetching branch names:', error);
    }
  };

  // Initial API calls
  useEffect(() => {
    getStaffSearchDetails();
    fetchBranches();
  }, [getStaffSearchDetails]); // Include getStaffSearchDetails in the dependency array

  // Handle branch selection
  const handleSelectChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  // Toggle dropdown menu
  const toggleMenu = (index) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  // Navigate to edit page
  const handleEdit = (profile) => {
    navigate('/edit-staff', { state: { staffDetails: profile } });
  };

  // Navigate to details page
  const handleMoreDetails = (profile) => {
    navigate('/staff-details', { state: { staffDetails: profile } });
  };

  const columns = [
    {
      title: 'Staff ID',
      dataIndex: 'staffId',
      key: 'staffId',
    },
    {
      title: 'Name',
      dataIndex: 'staffName',
      key: 'staffName',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Branch',
      dataIndex: 'branchName',
      key: 'branchName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, profile) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleEdit(profile)}
          >
            Edit
          </button>
          <button
            className="text-green-500 hover:underline"
            onClick={() => handleMoreDetails(profile)}
          >
            Details
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="m-2">
      {/* Header */}
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
          id="branchDropdown"
          value={selectedBranch}
          onChange={handleSelectChange}
          className="h-12 w-full block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none"
        >
          {branches.map((branch) => (
            <option key={branch.branchName} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>
        <button className="h-12 w-full bg-green-700 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-500">
          Search
        </button>
      </div>
      {/* Staff Table */}
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
        <Table columns={columns} data={profiles} />
      )}{' '}
    </div>
  );
};
export default Staff;
