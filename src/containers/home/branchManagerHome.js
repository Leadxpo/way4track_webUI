import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import ApiService, { initialAuthState } from '../../services/ApiService';
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


const tableData = [
  {
    id: 1,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 223,
    value2: 346,
    status: 'Available',
  },
  {
    id: 2,
    product: 'Fuel Monitoring System',
    type: 'System',
    value1: 345,
    value2: 568,
    status: 'Available',
  },
  {
    id: 3,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 234,
    value2: 234,
    status: 'Out of stock',
  },
  {
    id: 4,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 345,
    value2: 345,
    status: 'Out of stock',
  },
  {
    id: 5,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 223,
    value2: 346,
    status: 'Available',
  },
  {
    id: 6,
    product: 'Fuel Monitoring System',
    type: 'System',
    value1: 345,
    value2: 568,
    status: 'Available',
  },
  {
    id: 7,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 234,
    value2: 234,
    status: 'Out of stock',
  },
  {
    id: 8,
    product: 'Fuel Monitoring System',
    type: 'System',
    value1: 278,
    value2: 400,
    status: 'Available',
  },
  {
    id: 9,
    product: 'Bike GPS Tracker',
    type: 'Tracker',
    value1: 300,
    value2: 320,
    status: 'Out of stock',
  },
  {
    id: 10,
    product: 'Fuel Monitoring System',
    type: 'System',
    value1: 500,
    value2: 600,
    status: 'Available',
  },
];

const requestsData = [
  {
    location: 'Products',
    color: 'blue',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
  {
    location: 'Staff',
    color: 'red',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
  {
    location: 'Asserts',
    color: 'green',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
];
const mockBranches = [
  {
    id: 1,
    branchName: 'Downtown Branch',
    creditPercentage: 75,
    debitPercentage: 40,
  },
];

const BranchManagerHome = () => {
  const [productDetailsByBranch, setProductDetailsByBranch] = useState(null);
  const [creditAndDebitPercentages, setCreditAndDebitPercentages] = useState(null);
  const [assertsCardData, setAssertsCardData] = useState(null);
  const [requestBranchWiseData, setRequestBranchWiseData] = useState(null);
  const [totalStaffDetails, setTotalStaffDetails] = useState(null);
  const [staff_id, setStaff_id] = useState("");
  const [branchName, setBranchName] = useState("");

  const fetchProductDetailsByBranch = async (staff_branchName) => {
    try {
      const response = await ApiService.post(
        '/dashboards/getProductDetailsByBranch',
        {
          branchName: staff_branchName,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        setProductDetailsByBranch(response.data.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      //alert('Failed to fetch tickets data.');
    }
  };

  const fetchCreditAndDebitPercentages = async (staff_branchName) => {
    try {
      const response = await ApiService.post(
        '/dashboards/getLast30DaysCreditAndDebitPercentages',
        {
          branchName: staff_branchName,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        setCreditAndDebitPercentages(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      //alert('Failed to fetch tickets data.');
    }
  };

  const fetchAssertsCardData = async (staff_branchName) => {
    try {
      const response = await ApiService.post(
        '/dashboards/assertsCardData ',
        {
          branchName: staff_branchName,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        setAssertsCardData(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      //alert('Failed to fetch tickets data.');
    }
  };

  const fetchRequestBranchWise = async (staff_branchName) => {
    try {
      const response = await ApiService.post(
        '/requests/getTodayRequestBranchWise ',
        {
          branchName: staff_branchName,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        setRequestBranchWiseData(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      //alert('Failed to fetch tickets data.');
    }
  };

  const TotalStaffDetails = async (staff_branchName) => {
    try {
      const response = await ApiService.post(
        '/dashboards/getTotalStaffDetails ',
        {
          branchName: staff_branchName,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        setTotalStaffDetails(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch ticket details.');
      }
    } catch (error) {
      console.error('Error fetching tickets data:', error);
      //alert('Failed to fetch tickets data.');
    }
  };

  useEffect(() => {
    const branchdata = async () => {
      const staffID = await localStorage.getItem("userId")
      try {
        const response = await ApiService.post(
          '/staff/getStaffDetailsById ',
          {
            staffId: staffID,
            companyCode: initialAuthState?.companyCode,
            unitCode: initialAuthState?.unitCode,
          }
        );
        console.log("StaffID : ", response);  
        if (response.status) {
          setStaff_id(response.data.staffId);
          setBranchName(response.data.branchName);
        } else {
          alert(response.data.message || 'Failed to fetch ticket details.');
        }
      } catch (error) {
        console.error('Error fetching tickets data:', error);
        //alert('Failed to fetch tickets data.');
      }
      fetchCreditAndDebitPercentages(branchName);
      fetchProductDetailsByBranch(branchName);
      fetchAssertsCardData(branchName);
      TotalStaffDetails(branchName);
    }

    branchdata()
  }, [])

  return (
    <div className="p-6">
      {/* branch card Section */}
        <div className="flex justify-center mt-10 mb-6">
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            style={{ width: '80%' }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="absolute -top-6 left-4">
                <img
                  src="/logo-square.png"
                  alt="Branch Logo"
                  className="w-14 h-14 rounded-md shadow-md bg-white"
                />
              </div>
              <span className="text-2xl font-semibold text-gray-800 mt-4">
                {creditAndDebitPercentages[0].branchName}
              </span>
            </div>

            <div className="space-y-4">
              <div className="text-green-600 flex items-center text-xl font-bold">
                <span>Credit Percentage:</span>
                <span className="ml-2">{creditAndDebitPercentages[0].creditPercentage}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-6">
                <div
                  className="bg-green-600 h-6 rounded-full"
                  style={{ width: `${creditAndDebitPercentages[0].creditPercentage}%` }}
                ></div>
              </div>

              <div className="text-red-500 flex items-center text-xl font-bold">
                <span>Debit Percentage:</span>
                <span className="ml-2">{creditAndDebitPercentages[0].debitPercentage}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-6">
                <div
                  className="bg-red-600 h-6 rounded-full"
                  style={{ width: `${creditAndDebitPercentages[0].debitPercentage}%` }}
                ></div>
              </div>
            </div>

          </div>
        </div>
      {/* cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {requestBranchWiseData.map((location) => {
          const { border, bg } = getColorClasses(location.color);
          return (
            <div
              key={location.location}
              className={`border-2 ${border} rounded-lg shadow-md`}
            >
              <h3
                className={`${bg} text-white font-semibold text-lg p-3 flex justify-between`}
              >
                <span>{location.location}</span>
                <span>Total: 100</span>
              </h3>

              {location.requests.map((req, index) => (
                <p key={index} className="text-sm font-medium ml-4 mt-4">
                  {req.name}: <span className="font-bold">{req.count}</span>
                </p>
              ))}
            </div>
          );
        })}
      </div>
      {/* <select className="h-12 block w-1/3 mt-6 border-gray-300 rounded-md shadow-sm border border-gray-500 px-1 focus:outline-none">
        <option value="" disabled>
          Select a Branch
        </option>
      </select> */}
      <div className="mt-6">
        <Table data={productDetailsByBranch[0].product} columns={Object.keys(tableData[0])} />
      </div>
    </div>
  );
};

export default BranchManagerHome;
