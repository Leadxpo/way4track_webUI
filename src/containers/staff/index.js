import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaList, FaTh, FaPlus, FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import Table from '../../components/Table';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
const Staff = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeData = location.state?.staffDetails || {};

  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [staffName, setStaffName] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [columns, setColumns] = useState([]);
  const [permissions, setPermissions] = useState({});

  const columnNames = [
    'Branch ID',
    'Branch Name',
    'Branch Number',
    'Branch Address',
    'Address Line 1',
    'Address Line 2',
    'City',
    'State',
    'Pincode',
    'Branch Opening',
    'Email',
    'Branch Photo',
    'Company Code',
    'Unit Code',
    'Latitude',
    'Longitude',
    'CIN',
    'GST',
    'ID',
    'Branch Name',
    'Staff ID',
    'Staff Name',
    'Designation',
    'Phone Number',
  ];
  // Fetch Staff Details using useCallback to memoize the function
  const getStaffSearchDetails = useCallback(async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getStaffSearchDetails',
        {
          staffId: staffId,
          branchName: selectedBranch,
          staffName: staffName,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        setProfiles(response.data || []);
        setColumns(response.data.length ? Object.keys(response.data[0]) : []);
      } else {
        alert(
          response.data.internalMessage || 'Failed to fetch staff details.'
        );
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      alert('Failed to fetch staff details.');
    }
  }, [staffId, selectedBranch, staffName]);

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

  const handleSearch = async () => {
    await getStaffSearchDetails();
  };
  // Initial API calls
  useEffect(() => {
    const perms = getPermissions('staff');
    setPermissions(perms);
    getStaffSearchDetails();
    fetchBranches();
  }, [getStaffSearchDetails]); // Include getStaffSearchDetails in the dependency array

  useEffect(() => {
    fetchBranches();
  }, []);
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

  return (
    <div className="m-2">
      {/* Header */}
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-semibold text-gray-800">Staff Details</h2>
         <div className="flex items-center space-x-4">
         {/* <button
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
          </button>*/}
          <button
            className={`flex items-center space-x-2 text-white px-4 py-2 rounded-md cursor-pointer ${permissions.add ? 'bg-green-700' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
            onClick={() => navigate('/add-staff')}
            // disabled={!permissions.add}
          >
            <FaPlus size={16} />
            <span>Add Staff</span>
          </button>
          {/* <button
            className={`flex items-center space-x-2 text-white px-4 py-2 rounded-md cursor-pointer ${permissions.add ? 'bg-green-700' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
            onClick={() => navigate('/show-staff')}
            disabled={!permissions.add}
          >
            <FaPlus size={16} />
            <span>show Staff</span>
          </button> */}
        </div> 
      </div>
      <div className="flex space-x-4 my-4">
        <input
          placeholder="Staff ID"
          onChange={(e) => setStaffId(e.target.value)}
          id="staffId"
          value={staffId}
          className="h-12 w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          placeholder="Staff Name"
          onChange={(e) => setStaffName(e.target.value)}
          id="staffName"
          value={staffName}
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
        <button
          onClick={handleSearch}
          className="h-12 w-full bg-green-700 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-500"
        >
          {/* <FaSearch className="mr-2" /> */}
          Search
        </button>
      </div>
      {/* Staff Table */}
      {/* {isGridView ? (
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
                    className={`block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 ${permissions.edit ? '' : ' cursor-not-allowed opacity-50'}`}
                    onClick={() => handleEdit(profile)}
                    disabled={!permissions.edit}
                  >
                    Edit
                  </button>
                  <button
                    className={`block w-full text-left text-red-500 px-2 py-1 text-sm hover:bg-gray-100 ${permissions.delete ? '' : ' cursor-not-allowed opacity-50'}`}
                    disabled={!permissions.delete}
                  >
                    Delete
                  </button>
                  <button
                    className={`block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 ${permissions.view ? '' : ' cursor-not-allowed opacity-50'}`}
                    onClick={() => handleMoreDetails(profile)}
                    disabled={!permissions.view}
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
                <h2 className="text-lg font-semibold">{profile.staffName}</h2>
                <p className="text-gray-500">{profile.designation}</p>
                <p className="text-gray-400">{profile.branch_name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : ( */}
      <Table
        columns={columns}
        columnNames={columnNames}
        onEdit={handleEdit}
        showDelete={true}
        showEdit={true}
        showDetails={true}
        onDetails={handleMoreDetails}
        data={Array.isArray(profiles) ? profiles : []}
      />
      {/* )}{' '} */}
    </div>
  );
};
export default Staff;
