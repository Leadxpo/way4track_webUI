import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import Table from '../../components/Table';
const HrHome = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [totals, setTotals] = useState({
    totalBranches: 0,
    totalTechnicians: 0,
    totalNonTechnicians: 0,
    totalSales: 0,
  });

  useEffect(() => {
    fetchStaffDetails();
  }, []);

  const fetchStaffDetails = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getTotalStaffDetails',
        {
          compoanyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      if (response.status) {
        response.data = {
          result: [
            {
              branchName: 'Central Office',
              totalStaff: '2',
              totalTechnicians: '0',
              totalSales: '0',
              totalNonTechnicians: '2',
            },
            {
              branchName: 'Downtown Branch',
              totalStaff: '2',
              totalTechnicians: '0',
              totalSales: '0',
              totalNonTechnicians: '2',
            },
            {
              branchName: null,
              totalStaff: '10',
              totalTechnicians: '0',
              totalSales: '0',
              totalNonTechnicians: '10',
            },
            {
              branchName: 'vishakapatnam',
              totalStaff: '3',
              totalTechnicians: '0',
              totalSales: '0',
              totalNonTechnicians: '3',
            },
          ],
          staff: [
            {
              staffId: 'SF-00001',
              staffName: 'Ramesh',
              staffDesignation: 'CEO',
              branchName: 'Central Office',
              branchManagerName: 'John Doe',
              branchManagerPhoneNumber: '123454567890',
            },
            {
              staffId: 'SF-00002',
              staffName: 'Jane Smith',
              staffDesignation: 'Warehouse Manager',
              branchName: 'Downtown Branch',
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00005',
              staffName: 'John Doe',
              staffDesignation: 'Branch Manager',
              branchName: 'Central Office',
              branchManagerName: 'John Doe',
              branchManagerPhoneNumber: '123454567890',
            },
            {
              staffId: 'SF-00006',
              staffName: 'Teja',
              staffDesignation: 'CEO',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00007',
              staffName: 'oi',
              staffDesignation: 'HR',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00008',
              staffName: 'ddxdd',
              staffDesignation: 'Call Center',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00009',
              staffName: 'sdf',
              staffDesignation: 'CEO',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00010',
              staffName: 'rameshTunagana',
              staffDesignation: 'Accountant',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00011',
              staffName: 'rams',
              staffDesignation: 'Accountant',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00012',
              staffName: 'rams',
              staffDesignation: 'Accountant',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00013',
              staffName: 'rams',
              staffDesignation: 'Accountant',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00014',
              staffName: 'rams',
              staffDesignation: 'Accountant',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00015',
              staffName: 'rams',
              staffDesignation: 'Accountant',
              branchName: null,
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00016',
              staffName: 'man',
              staffDesignation: 'Accountant',
              branchName: 'Downtown Branch',
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00017',
              staffName: 'prabhas',
              staffDesignation: 'Sub Dealer',
              branchName: 'vishakapatnam',
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00018',
              staffName: 'aruna',
              staffDesignation: 'CEO',
              branchName: 'vishakapatnam',
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
            {
              staffId: 'SF-00019',
              staffName: 'aruna kola',
              staffDesignation: 'CEO',
              branchName: 'vishakapatnam',
              branchManagerName: null,
              branchManagerPhoneNumber: null,
            },
          ],
        };
        const branchData = response.data.result;
        const staffData = response.data.staff;

        // Process totals
        const totalBranches = branchData.reduce(
          (total, branch) => total + parseInt(branch.totalStaff || 0, 10),
          0
        );

        const totalTechnicians = branchData.reduce(
          (sum, b) => sum + parseInt(b.totalTechnicians || 0),
          0
        );
        const totalNonTechnicians = branchData.reduce(
          (sum, b) => sum + parseInt(b.totalNonTechnicians || 0),
          0
        );
        const totalSales = branchData.reduce(
          (sum, b) => sum + parseInt(b.totalSales || 0),
          0
        );

        // Process branches
        const processedBranches = branchData.map((branch) => {
          const branchStaff = staffData.filter(
            (s) => s.branchName === branch.branchName
          );
          return {
            name: branch.branchName || 'Unknown',
            managerName:
              branchStaff.length > 0
                ? branchStaff[0].branchManagerName || 'N/A'
                : 'N/A',
            managerPhone:
              branchStaff.length > 0
                ? branchStaff[0].branchManagerPhoneNumber || 'N/A'
                : 'N/A',
            staff: {
              technicities: parseInt(branch.totalTechnicians || 0),
              nonTechnicities: parseInt(branch.totalNonTechnicians || 0),
              sales: parseInt(branch.totalSales || 0),
              total: parseInt(branch.totalStaff || 0),
            },
          };
        });

        setBranches(processedBranches);
        setSelectedBranch(processedBranches[0] || null);
        setTotals({
          totalBranches,
          totalTechnicians,
          totalNonTechnicians,
          totalSales,
        });
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
    }
  };

  const getHiringSearchDetails = async () => {
    try {
      const response = await ApiService.post('/hiring/getHiringSearchDetails', {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      console.log(response);
      if (response.status) {
        console.log(response.data, 'Response Data'); // Log data to verify it
        setFilteredData(response.data); // Assuming the structure is as expected
      } else {
        alert(response.data.message || 'Failed to fetch client details.');
      }
    } catch (error) {
      console.error('Error fetching client details:', error);
      alert('Failed to fetch client details.');
    }
  };

  return (
    <div>
      <div className="flex justify-between mx-6">
        <div className="bg-red-300 rounded-2xl shadow-lg p-6 w-80 mr-4">
          <p className="p-2 text-xl font-semibold mb-1 bg-white rounded-md">
            Total Branches
          </p>
          <div className="text-6xl font-bold mt-4 text-white">
            {totals.totalBranches}
          </div>
        </div>
        <div className="bg-green-300 rounded-2xl shadow-lg p-6 w-80 mr-4">
          <p className="p-2 text-xl font-semibold mb-1 bg-white rounded-md">
            Technicians
          </p>
          <div className="text-6xl font-bold mt-4 text-white">
            {totals.totalTechnicians}
          </div>
        </div>
        <div className="bg-purple-300 rounded-2xl shadow-lg p-6 w-80 mr-4">
          <p className="p-2 text-xl font-semibold mb-1 bg-white rounded-md">
            Non Technicians
          </p>
          <div className="text-6xl font-bold mt-4 text-white">
            {totals.totalNonTechnicians}
          </div>
        </div>
        <div className="bg-blue-300 rounded-2xl shadow-lg p-6 w-80 mr-4">
          <p className="p-2 text-xl font-semibold mb-1 bg-white rounded-md">
            Sales
          </p>
          <div className="text-6xl font-bold mt-4 text-white">
            {totals.totalSales}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex space-x-4">
          {branches.map((branch, index) => (
            <button
              key={index}
              onClick={() => setSelectedBranch(branch)}
              className={`px-4 py-2 rounded-lg shadow-md font-semibold ${
                selectedBranch?.name === branch.name
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {branch.name}
            </button>
          ))}
        </div>

        {selectedBranch && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-green-600 text-white p-3 text-lg font-semibold flex justify-between">
              <span>Branch Name: {selectedBranch.name}</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-300 p-3 rounded-lg">
                Branch Manager Name: {selectedBranch.managerName}
              </div>
              <div className="bg-gray-300 p-3 rounded-lg">
                Branch Manager Phone: {selectedBranch.managerPhone}
              </div>
              <div className="bg-gray-300 p-3 rounded-lg">
                Technicians: {selectedBranch.staff.technicities}
              </div>
              <div className="bg-gray-300 p-3 rounded-lg">
                Non Technicians: {selectedBranch.staff.nonTechnicities}
              </div>
              <div className="bg-gray-300 p-3 rounded-lg">
                Sales: {selectedBranch.staff.sales}
              </div>
              <div className="bg-gray-300 p-3 rounded-lg">
                Total Staff: {selectedBranch.staff.total}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 text-white p-3 text-lg font-semibold">
          Hiring Program
        </div>
        {/* <div className="p-4 space-y-3">
          <div className="bg-gray-300 p-3 rounded-lg text-lg font-semibold">
            Requirement Persons : {selectedBranch.hiring.requirementPersons}
          </div>
          <div className="bg-gray-300 p-3 rounded-lg text-lg font-semibold">
            Number of Requirement Persons :{' '}
            {selectedBranch.hiring.numberOfRequirementPersons}
          </div>
        </div> */}
      </div>
      <div className="p-6">
        <Table
          columns={filteredData.length ? Object.keys(filteredData[0]) : []}
          data={filteredData}
          showDelete={false}
          showEdit={false}
          showDetails={false}
        />
      </div>
    </div>
  );
};

export default HrHome;
