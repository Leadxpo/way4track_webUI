import React, { useState } from 'react';
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
const requestsData = [
  {
    location: 'Visakhapatnam',
    color: 'blue',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
  {
    location: 'Hyderabad',
    color: 'red',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
  {
    location: 'Vijayawada',
    color: 'green',
    requests: [
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'Fuel Monitoring System Request', count: 34 },
      { name: 'Bike GPS Tracker Request', count: 10 },
      { name: 'AIS 140 VLTD for transport & commercial vehicles', count: 45 },
    ],
  },
];
const branchesData = [
  {
    name: 'Visakhapatnam',
    phone: '+91 45534 58535',
    email: 'Wey4track456@gmail.com',
    salary: 34000,
    employees: [
      {
        name: 'Praveen',
        phone: '+91 44556 63334',
        email: 'Wey4track456@gmail.com',
        salary: 55000,
        role: 'Technical',
      },
      {
        name: 'Praveen',
        phone: '+91 44556 63334',
        email: 'Wey4track456@gmail.com',
        salary: 55000,
        role: 'Technical',
      },
      {
        name: 'Praveen',
        phone: '+91 44556 63334',
        email: 'Wey4track456@gmail.com',
        salary: 55000,
        role: 'Technical',
      },
      {
        name: 'Praveen',
        phone: '+91 44556 63334',
        email: 'Wey4track456@gmail.com',
        salary: 55000,
        role: 'Technical',
      },
    ],
  },
  {
    name: 'Hyderabad',
    phone: '+91 12345 67890',
    email: 'hydbranch@example.com',
    salary: 38000,
    employees: [
      {
        name: 'Ravi',
        phone: '+91 98765 43210',
        email: 'ravi@gmail.com',
        salary: 60000,
        role: 'Non Technical',
      },
    ],
  },
];

const BranchList = () => {
  const [openBranch, setOpenBranch] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState({});

  const toggleBranch = (branchName) => {
    setOpenBranch(openBranch === branchName ? null : branchName);
  };

  const filterEmployees = (branchName, role) => {
    const branch = branchesData.find((b) => b.name === branchName);
    if (branch) {
      setFilteredEmployees((prev) => ({
        ...prev,
        [branchName]: branch.employees.filter((emp) => emp.role === role),
      }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 mb-6">
        {requestsData.map((location) => {
          const { border, bg } = getColorClasses(location.color);
          return (
            <div
              key={location.location}
              className={`border-2 ${border} rounded-lg shadow-md`}
            >
              <h3 className={`${bg} text-white font-semibold text-lg p-3`}>
                {location.location}
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
      <h3 className="text-2xl font-semibold my-4">Branches</h3>
      {branchesData.map((branch) => (
        <div key={branch.name} className="mb-4 border rounded-lg shadow-md">
          <button
            onClick={() => toggleBranch(branch.name)}
            className="w-full bg-green-600 text-white py-3 px-5 flex justify-between items-center text-lg font-semibold rounded-t-lg"
          >
            {branch.name}
            <span>{openBranch === branch.name ? '▲' : '▼'}</span>
          </button>

          {openBranch === branch.name && (
            <div className="bg-gray-100 p-4">
              <p>
                <strong>Phone:</strong> {branch.phone}
              </p>
              <p>
                <strong>Email:</strong> {branch.email}
              </p>
              <p>
                <strong>Salary:</strong> ₹{branch.salary.toLocaleString()}
              </p>

              {/* Filters */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => filterEmployees(branch.name, 'Technical')}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  Technical
                </button>
                <button
                  onClick={() => filterEmployees(branch.name, 'Non Technical')}
                  className="px-3 py-1 bg-gray-500 text-white rounded-md"
                >
                  Non Technical
                </button>
                <button
                  onClick={() => filterEmployees(branch.name, 'Sales Man')}
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
                      {(filteredEmployees[branch.name] || branch.employees).map(
                        (emp, index) => (
                          <tr key={index} className="text-center bg-white">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{emp.name}</td>
                            <td className="border px-4 py-2">{emp.phone}</td>
                            <td className="border px-4 py-2">{emp.email}</td>
                            <td className="border px-4 py-2">
                              ₹{emp.salary.toLocaleString()}
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
