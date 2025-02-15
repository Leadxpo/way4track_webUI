// import React, { useEffect, useState } from 'react';
// import ApiService, { initialAuthState } from '../../services/ApiService';
// import Table from '../../components/Table';
// import { formatString } from '../../common/commonUtils';


// const BranchList = () => {
//   const [openBranch, setOpenBranch] = useState(null);
//   const [filteredEmployees, setFilteredEmployees] = useState({});
//   const [branchesData, setBranchesData] = useState([])

//   const toggleBranch = (branchName) => {
//     setOpenBranch(openBranch === branchName ? null : branchName);
//   };



//   useEffect(() => {
//     const fetchStaffData = async () => {
//       try {
//         const response = await ApiService.post('/dashboards/getBranchStaffDetails', {
//           companyCode: initialAuthState.companyCode,
//           unitCode: initialAuthState.unitCode,
//         });
//         if (response.status) {
//           setBranchesData(response.data || []);
//         } else {
//           setBranchesData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching purchase order data:', error);
//         alert('Failed to fetch purchase order data.');
//       }
//     };

//     fetchStaffData();
//   }, []);

//   const filterEmployees = (branchName, role) => {
//     const branch = branchesData.find((b) => b.name === branchName);
//     if (branch) {
//       setFilteredEmployees((prev) => ({
//         ...prev,
//         [branchName]: branch.employees.filter((emp) => emp.role === role),
//       }));
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4">

//       <h3 className="text-2xl font-semibold my-4">Branches</h3>
//       {branchesData.map((branch) => (
//         <div key={branch.name} className="mb-4 border rounded-lg shadow-md">
//           <button
//             onClick={() => toggleBranch(branch.name)}
//             className="w-full bg-green-600 text-white py-3 px-5 flex justify-between items-center text-lg font-semibold rounded-t-lg"
//           >
//             {branch.name}
//             <span>{openBranch === branch.name ? '▲' : '▼'}</span>
//           </button>

//           {openBranch === branch.name && (
//             <div className="bg-gray-100 p-4">
//               <p>
//                 <strong>Phone:</strong> {branch.phone}
//               </p>
//               <p>
//                 <strong>Email:</strong> {branch.email}
//               </p>
//               <p>
//                 <strong>Salary:</strong> ₹{branch.salary.toLocaleString()}
//               </p>

//               {/* Filters */}
//               <div className="flex gap-2 mt-3">
//                 <button
//                   onClick={() => filterEmployees(branch.name, 'Technical')}
//                   className="px-3 py-1 bg-blue-500 text-white rounded-md"
//                 >
//                   Technical
//                 </button>
//                 <button
//                   onClick={() => filterEmployees(branch.name, 'Non Technical')}
//                   className="px-3 py-1 bg-gray-500 text-white rounded-md"
//                 >
//                   Non Technical
//                 </button>
//                 <button
//                   onClick={() => filterEmployees(branch.name, 'Sales Man')}
//                   className="px-3 py-1 bg-red-500 text-white rounded-md"
//                 >
//                   Sales Man
//                 </button>
//               </div>

//               {/* Scrollable Employee Table */}
//               <div className="overflow-x-auto">
//                 <div className="max-h-[300px] overflow-y-auto border rounded-lg">
//                   <table className="w-full min-w-[600px] border-collapse">
//                     <thead className="sticky top-0 bg-green-500 text-white">
//                       <tr>
//                         <th className="border px-4 py-2">No</th>
//                         <th className="border px-4 py-2">Name</th>
//                         <th className="border px-4 py-2">Phone</th>
//                         <th className="border px-4 py-2">Email</th>
//                         <th className="border px-4 py-2">Salary</th>
//                         <th className="border px-4 py-2">View</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {(filteredEmployees[branch.name] || branch.employees).map(
//                         (emp, index) => (
//                           <tr key={index} className="text-center bg-white">
//                             <td className="border px-4 py-2">{index + 1}</td>
//                             <td className="border px-4 py-2">{emp.name}</td>
//                             <td className="border px-4 py-2">{emp.phone}</td>
//                             <td className="border px-4 py-2">{emp.email}</td>
//                             <td className="border px-4 py-2">
//                               ₹{emp.salary.toLocaleString()}
//                             </td>
//                             <td className="border px-4 py-2">
//                               <button className="text-blue-500 hover:underline">
//                                 👁
//                               </button>
//                             </td>
//                           </tr>
//                         )
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BranchList;
import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import Table from '../../components/Table';
import { formatString } from '../../common/commonUtils';
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
const BranchList = () => {
  const [openBranch, setOpenBranch] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState({});
  const [branchesData, setBranchesData] = useState([]);
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    const fetchPurchaseOrderData = async () => {
      try {
        const response = await ApiService.post('/dashboards/getStaff', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          setEmployees(response.data || []);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error('Error fetching purchase order data:', error);
        alert('Failed to fetch purchase order data.');
      }
    };

    fetchPurchaseOrderData();
  }, []);


  const toggleBranch = (branchName) => {
    setOpenBranch(openBranch === branchName ? null : branchName);
  };

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await ApiService.post('/dashboards/getBranchStaffDetails', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        console.log(response); // Log the full response
        if (response.status && Array.isArray(response.data.data)) {
          setBranchesData(response.data.data);
        } else {
          setBranchesData([]);
        }
      } catch (error) {
        console.error('Error fetching purchase order data:', error);
        alert('Failed to fetch purchase order data.');
      }
    };

    fetchStaffData();
  }, []);

  const filterEmployees = (branchName, role) => {
    const branch = branchesData.find((b) => b.branchName === branchName);
    if (branch) {
      let staffKey = '';

      // Map button label to response data key
      switch (role) {
        case 'Technician':
          staffKey = 'technicalStaff';
          break;
        case 'Non Technical':
          staffKey = 'nonTechnicalStaff';
          break;
        case 'Sales Man':
          staffKey = 'salesStaff';
          break;
        default:
          staffKey = 'nonTechnicalStaff'; // Fallback to non-technical
      }

      setFilteredEmployees((prev) => ({
        ...prev,
        [branchName]: branch[staffKey] || [],
      }));
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-4">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 mb-6">
          {employees.map((staff) => {
            return (
              <div
                key={staff.id}
                className="border-2 border-gray-300 rounded-lg shadow-md p-4"
              >
                <h3 className="text-lg font-semibold text-gray-800">{staff.staffName}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Designation:</strong> {staff.designation}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {staff.phoneNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {staff.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Salary:</strong> ₹{staff.salary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <h3 className="text-2xl font-semibold my-4">Branches</h3>
      {Array.isArray(branchesData) && branchesData.map((branch) => (
        <div key={branch.branchName} className="mb-4 border rounded-lg shadow-md">
          <button
            onClick={() => toggleBranch(branch.branchName)}
            className="w-full bg-green-600 text-white py-3 px-5 flex justify-between items-center text-lg font-semibold rounded-t-lg"
          >
            {branch.branchName}
            <span>{openBranch === branch.branchName ? '▲' : '▼'}</span>
          </button>

          {openBranch === branch.branchName && (
            <div className="bg-gray-100 p-4">
              {/* Display branch manager details if available */}
              {branch.branchManagerName && (
                <div className="mb-4">
                  <h4 className="font-semibold">Branch Manager</h4>
                  <p>
                    <strong>Name:</strong> {branch.branchManagerName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {branch.branchManagerPhoneNumber}
                  </p>
                  <p>
                    <strong>Salary:</strong> ₹{branch.branchManagerSalary.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Filters */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => filterEmployees(branch.branchName, 'Technician')}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  Technical
                </button>
                <button
                  onClick={() => filterEmployees(branch.branchName, 'Non Technical')}
                  className="px-3 py-1 bg-gray-500 text-white rounded-md"
                >
                  Non Technical
                </button>
                <button
                  onClick={() => filterEmployees(branch.branchName, 'Sales Man')}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Sales Man
                </button>
              </div>

              {/* Scrollable Employee Table */}
              <div className="overflow-x-auto">
                <div className="max-h-[300px] overflow-y-auto border rounded-lg">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead className="sticky top-0 bg-green-500 text-white">
                      <tr>
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Salary</th>
                        <th className="border px-4 py-2">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render filtered employees or fallback to nonTechnicalStaff */}
                      {(filteredEmployees[branch.branchName] || branch.nonTechnicalStaff).map(
                        (emp, index) => (
                          <tr key={emp.staffId} className="text-center bg-white">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{emp.staffName}</td>
                            <td className="border px-4 py-2">{emp.phoneNumber}</td>
                            <td className="border px-4 py-2">{emp.email}</td>
                            <td className="border px-4 py-2">
                              ₹{emp.basicSalary.toLocaleString()}
                            </td>
                            <td className="border px-4 py-2">
                              <button className="text-blue-500 hover:underline">
                                👁
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BranchList;

