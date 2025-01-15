import { FaList, FaTh, FaPlus, FaSearch } from 'react-icons/fa';
import DropdownCard from '../../components/DropdownCard';
import TableWithDateFilter from '../tablesDateFilter';
import Table from '../../components/Table';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const Asserts = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([{ branchName: 'All' }]);
  const [isGridView, setIsGridView] = useState(true);
  const [products, setProducts] = useState([])
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [filteredData, setFilteredData] = useState([])
  const [assetCounts, setAssetCounts] = useState({
    totalAsserts: 0,
    officeAsserts: 0,
    transportAsserts: 0,
  });
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const location = useLocation();
  const assetDetailsFromState = location.state?.assetDetails || {};
  // Fetch data for branches and asset counts
  const fetchData = async (branchName) => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };
      if (branchName && branchName !== 'All') {
        payload.branch = branchName;
      }

      const res = await ApiService.post('/dashboards/assertsCardData', payload);
      if (res.status) {
        const { groupedBranches, totalAsserts, officeAsserts, transportAsserts } = res.data;

        setBranches([{ branchName: 'All' }, ...groupedBranches.map((b) => ({ branchName: b.branchName }))]);
        setAssetCounts({
          totalAsserts,
          officeAsserts,
          transportAsserts,
        });
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    fetchData(selectedBranch);
  }, [selectedBranch]);

  useEffect(() => {
    const getAllAssertDetails = async () => {
      try {
        const response = await ApiService.post('/asserts/getAllAssertDetails', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          // Ensure subDealer details data is an array
          setProducts(response.data || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching subDealer details data:', error);
        alert('Failed to fetch subDealer details data.');
      }
    };
    getAllAssertDetails();
  }, []);
  useEffect(() => {
    getAssertDataByDate();
  }, []);
  
  const getAssertDataByDate = useCallback(async () => {
    try {
      const response = await ApiService.post('/dashboards/getAssertDataByDate', {
        fromDate: assetDetailsFromState?.purchaseDate,
        toDate: assetDetailsFromState?.purchaseDate,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        console.log(response.data, "Response Data");  // Log data to verify it
        setFilteredData(response.data); // Assuming the structure is as expected
      } else {
        alert(response.data.message || 'Failed to fetch vendor details.');
      }
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      alert('Failed to fetch vendor details.');
    }
  }, [assetDetailsFromState?.fromDate, assetDetailsFromState?.toDate]);
  // Populate columns and data based on the type


  const handleSearch = async () => {
    await getAssertDataByDate()
  };
  const truncateString = (str) =>
    str.length <= 80 ? str : str.slice(0, 80) + '...';
  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-4">
        {/* Left: Staff Details Heading */}
        <h2 className="text-2xl font-semibold text-gray-800">Asserts</h2>

        {/* Right: Icons and Add Staff Button */}
        <div className="flex items-center space-x-4">
          {/* List View Icon */}
          <button
            className={`p-2 cursor-pointer ${!isGridView && 'border border-black'}`}
            onClick={() => setIsGridView(false)}
          >
            <FaList size={18} />
          </button>

          {/* Grid View Icon */}
          <button
            className={`p-2 cursor-pointer ${isGridView && 'border border-black'}`}
            onClick={() => setIsGridView(true)}
          >
            <FaTh size={18} />
          </button>
          {/* Add Assert Button */}
          <button
            className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate('/add-asset')}
          >
            <span>Add Assert</span>
          </button>
        </div>
      </div>
      {isGridView && (
        <div className="flex justify-between mx-6">
          <DropdownCard
            bgColor="red"
            title="Total Asserts"
            count={assetCounts.totalAsserts}
            branches={branches}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
          <DropdownCard
            bgColor="green"
            title="Office Asserts"
            count={assetCounts.officeAsserts}
            branches={branches}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
          <DropdownCard
            bgColor="purple"
            title="Transport Asserts"
            count={assetCounts.transportAsserts}
            branches={branches}
            selectedBranch={setSelectedBranch}
          />
        </div>
      )}

      {isGridView ? (
        <div
          className={
            'mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'
          }
        >
          {products.map((profile, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-4 w-full max-w-lg"
            >
              {/* Image Section */}
              <div className="flex-shrink-0">
                {/* Display Asset Photo */}
                {profile.assetPhoto ? (
                  <img
                    src={`https://your-image-server-url/${profile.assetPhoto}`}  // Update with correct image URL
                    alt={profile.assertsName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="flex-grow space-y-2">
                <h2 className="text-2xl font-bold text-black">{profile.assertsName}</h2>
                <p className="text-gray-500">
                  {profile.branchId ? profile.branchId.branchName : 'Branch not available'}
                </p>
                <p className="text-red-500 font-medium"> {profile.voucherId ? profile.voucherId.paymentType : 'paymentType not available'}</p>
                <h3 className="text-2xl font-bold text-black mt-2">{profile.voucherId ? profile.voucherId.amount : 'amount not available'}</h3>
              </div>

              {/* Button Section */}
              <div className="absolute bottom-4 right-4">
                <button
                  className="text-gray-400 rounded-md px-1 py-1 border border-gray-300 hover:bg-gray-200"
                  onClick={() => navigate('/asset-details')}
                >
                  More Details
                </button>
              </div>
            </div>
          ))}

        </div>
      ) : (
        <div>
          {/* Filters Row */}
          <div className="flex mb-4">
            <div className="flex-grow mr-2">
              <input
                type="date"
                id="dateFrom"
                value={dateFrom}
                placeholder="From"
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
                style={{ paddingLeft: '8px' }}
              />
            </div>

            <div className="flex-grow mx-2">
              <input
                type="date"
                id="dateTo"
                value={dateTo}
                placeholder="To"
                onChange={(e) => setDateTo(e.target.value)}
                className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
                style={{ paddingLeft: '8px' }}
              />
            </div>

            <button
              onClick={handleSearch}
              className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
          <Table
            columns={Object.keys(filteredData[0])}
            data={filteredData}
            onDetails={() => { }}
            showEdit={false}
            showDelete={false}
            showDetails={true}
            editText="Edit"
            deleteText="Delete"
            detailsText="More Details"
          />
        </div>
      )}
    </div>
  );
};

export default Asserts;
