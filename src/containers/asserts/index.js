import { FaList, FaTh, FaPlus, FaSearch,FaDownload } from 'react-icons/fa';
import DropdownCard from '../../components/DropdownCard';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import AssertCard from './assertCard';
import hasPermission from '../../common/permission'
import * as XLSX from 'xlsx';

const Asserts = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProducts, setFilterProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  var permission = localStorage.getItem("userPermissions");
  const [assetCounts, setAssetCounts] = useState({
    totalAsserts: 0,
    officeAsserts: 0,
    transportAsserts: 0,
  });
  const [assertType, setAssertType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const location = useLocation();
  const assetDetailsFromState = location.state?.assetsData || {};

  const downloadAssets=()=>{
    let filename =  "Assert_output.xlsx";

    const worksheet = XLSX.utils.json_to_sheet(filterProducts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'assert');
    XLSX.writeFile(workbook, filename);

  }

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
        const {
          groupedBranches, 
          totalAsserts,
          officeAsserts,
          transportAsserts,
        } = res.data;

        setBranches([
          { branchName: 'All' },
          ...groupedBranches?.map((b) => ({ branchName: b.branchName })),
        ]);
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
          setFilterProducts(response.data || []);
          console.log(response.data, 'assets');
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching subDealer details data:', error);
        alert('Failed to fetch subDealer details data.');
      }
    };
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (response.status) {
          setBranches(response.data); // Set branches to state
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
    getAllAssertDetails();
  }, []);

  useEffect(() => {
    getAssertDataByDate();
  }, []);

  const handleMoreDetails = (assetDetails) => {
    console.log(assetDetails, 'Navigating with this asset data');
    navigate('/asset-details', { state: { assetDetails } });
  };

  const getAssertDataByDate = useCallback(async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getAssertDataByDate',
        {
          fromDate: dateFrom,
          toDate: dateTo,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
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
    await getAssertDataByDate();
  };

  const handleAssertSearch = () => {
    const filtered = products.filter((product) => {
      const searchTermLower = searchTerm.toLowerCase();
      const assertTypeLower = assertType;
  
      return (
        (!searchTerm || product?.assertsName?.toLowerCase().includes(searchTermLower) || 
         String(product?.id).includes(searchTerm)) && 
        
        (!assertType || product?.assetType?.toLowerCase().includes(assertTypeLower) || 
         String(product?.assetType).toLowerCase().includes(assertTypeLower)) &&
        
        (!selectedBranch || product?.branchId?.branchName && String(product?.branchId?.branchName) === selectedBranch)
      );
    });

    setFilterProducts(filtered);
  };

  const truncateString = (str) =>
    str.length <= 80 ? str : str.slice(0, 80) + '...';
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center py-4 mx-6">
        {/* Left: Staff Details Heading */}
        <h2
          className="text-2xl font-semibold text-gray-800"
          style={{ fontSize: '17px', fontWeight: '500' }}
        >
          Assets
        </h2>
        <div className="flex justify-between items-center">
          <button
            onClick={() => downloadAssets()}
            className="bg-green-700 text-white px-4 py-2 mx-5 rounded-md flex items-center gap-2 hover:bg-green-800 transition duration-200"
          >
            <FaDownload className="text-white" />
            Download Assert Excel Sheet
          </button>
        </div>
        {/* Right: Icons and Add Staff Button */}
        <div className="flex items-center space-x-4">
          {/* Add Assert Button */}
          {hasPermission(permission, "assets", "add") &&
            <button
              className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg flex items-center shadow-lg"
              style={{
                backgroundColor: '#FFF504',
                borderRadius: '25px',
                fontSize: '15px',
                fontWeight: '500',
              }}
              onClick={() => navigate('/add-asset')}
            >
              <span className="text-black mr-2">➕</span> Add Asset
            </button>
          }
        </div>
      </div>
      {isGridView && (
        <div className="flex justify-between mx-6">
          <DropdownCard
            bgColor="green"
            title="Office Assets"
            assertType={'office asset'}
            count={assetCounts.officeAsserts}
            branches={branches}
            setAssertType={setAssertType}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
          <DropdownCard
            bgColor="purple"
            title="Transport Assets"
            assertType={'transport asset'}
            count={assetCounts.transportAsserts}
            branches={branches}
            setAssertType={setAssertType}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
        </div>
      )}
      <div style={{ display: 'flex', marginLeft: '30px' }}>
        <input
          type="text"
          placeholder="Search By Name:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 block w-1/2 border border-gray-500 px-2 rounded"
          style={{ height: '47px' }}
        />
        <button className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center ml-2" onClick={handleAssertSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="p-6 grid grid-cols-3 gap-6">
        {filterProducts?.map((asset, index) => (
          <AssertCard key={index} asset={asset} permission={permission} />
        ))}
      </div>

    </div>
  );
};

export default Asserts;
