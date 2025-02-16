import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import Table from '../../components/Table';
import { formatString } from '../../common/commonUtils';

// Color Mapping Function
const getColorClasses = (color) => {
  switch (color) {
    case 'blue':
      return { border: 'border-blue-700', bg: 'bg-blue-700' };
    case 'red':
      return { border: 'border-red-700', bg: 'bg-red-700' };
    case 'green':
      return { border: 'border-green-700', bg: 'bg-green-700' };
    case 'orange':
      return { border: 'border-orange-700', bg: 'bg-orange-700' };
    default:
      return { border: 'border-gray-700', bg: 'bg-gray-700' };
  }
};

const WarehouseManagerHome = () => {
  const [requestsData, setRequestsData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  // const [columns, setColumns] = useState([]);

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = () => {
      const userProfileData = localStorage.getItem('userProfile');
      if (userProfileData) {
        try {
          const parsedData = JSON.parse(userProfileData);
          setUserProfile(parsedData);
        } catch (error) {
          console.error('Error parsing user profile data:', error);
          setUserProfile(null);  // Set to null or handle accordingly
        }
      } else {
        setUserProfile(null);  // Set to null if no data in localStorage
      }
    };


    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchPurchaseOrderData = async () => {
      try {
        const response = await ApiService.post('/requests/getTodayRequestBranchWise', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          setRequestsData(response.data || []);
        } else {
          setRequestsData([]);
        }
      } catch (error) {
        console.error('Error fetching purchase order data:', error);
        alert('Failed to fetch purchase order data.');
      }
    };

    fetchPurchaseOrderData();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const payload = {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        };

        const response = await ApiService.post('dashboards/getProductDetailsByBranch', payload);
        console.log("API Response:", response);

        if (response.status && response.data) {
          setTableData(response.data);
          if (response.data.length > 0) {
            setSelectedBranch(response.data[0].branchName); // Auto-select first branch
          }
        } else {
          setTableData([]);
          alert('No data found');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        alert('Failed to fetch data. Please try again.');
      }
    };

    fetchTickets();
  }, []);

  const selectedBranchData = tableData.find(ticket => ticket.branchName === selectedBranch);



  // Function to generate table columns dynamically based on the product data
  const generateColumns = (data) => {
    if (data.length === 0) return [];

    const sampleProduct = data[0].products[0];  // Using the first product to define columns
    const productColumns = Object.keys(sampleProduct).map((key) => ({
      title: formatString(key),  // Using formatString to make the key human-readable
      dataIndex: key,
      key,
    }));

    // Add custom columns if needed
    return productColumns;
  };

  return (
    <div className="p-6">
      {/* Profile Section */}
      {userProfile && (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
          <img
            src={userProfile.profilePicPath || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div className="w-full">
            <h2 className="text-xl font-semibold p-3 bg-gray-200 rounded-md m-2">
              Name: {userProfile.name}
            </h2>
            <p className="p-3 m-2 bg-gray-200 rounded-md">
              Phone number: {userProfile.phoneNumber}
            </p>
            <p className="p-3 m-2 bg-gray-200 rounded-md">
              Email: {userProfile.email}
            </p>
          </div>
        </div>
      )}

      {/* Requests Section */}
      <h2 className="text-2xl font-bold mt-8">Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {requestsData.map((location) => {
          const { border, bg } = getColorClasses(location.color);
          return (
            <div
              key={location.location}
              className={`border-2 ${border} rounded-lg shadow-md`}
            >
              {location.requests.map((req, index) => (
                <p key={index} className="text-sm font-medium ml-4 mt-4">
                  {req.name}: <span className="font-bold">{req.count}</span>
                </p>
              ))}
              <h3 className={`${bg} text-white font-semibold text-lg mt-4 p-3`}>
                {location.location}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Branch Selection */}
      {/* <select
        className="h-12 block w-1/3 mt-6 border-gray-300 rounded-md shadow-sm border border-gray-500 px-1 focus:outline-none"
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
      >
        <option value="" disabled>Select a Branch</option>
        {requestsData.map((branch, index) => (
          <option key={index} value={branch.branchName}>
            {branch.branchName}
          </option>
        ))}
      </select> */}

      {/* Table Section */}
      <div className="mt-6">
        {tableData.length > 0 && (
          <div className="mt-4">
            <label className="block text-gray-700">Select Branch:</label>
            <select
              className="border p-2 w-full md:w-64 rounded-md"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              {tableData.map((branch) => (
                <option key={branch.branchName} value={branch.branchName}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Get the products of the selected branch */}
        {selectedBranchData && selectedBranchData.products.length > 0 ? (
          <Table columns={Object.keys(selectedBranchData.products[0] || {})} data={selectedBranchData.products} />
        ) : (
          <p className="text-gray-600 mt-4">No products available for this branch.</p>
        )}
      </div>

    </div>
  );
};

export default WarehouseManagerHome;


