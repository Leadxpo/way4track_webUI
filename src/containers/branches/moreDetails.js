import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { FiMoreVertical } from 'react-icons/fi';

const BranchDetails = () => {
  const [branchDetails, setBranchDetails] = useState({
    branchName: '',
    branchNumber: '',
    address: '',
    email: '',
    branchPhoto: '',
    city: '',
    state: '',
    phoneNumber: '',
    branchOpening: '',
    staff: [],
    asserts: [],
  });
  const [activeTab, setActiveTab] = useState('staff');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null); // for dropdown toggle
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const location = useLocation();
  const branchDetailsFromState = location.state?.branchDetails || {};

  useEffect(() => {
    const fetchBranchDetails = async () => {
      if (!branchDetailsFromState?.id) {
        alert('Branch ID is missing. Please select a valid branch.');
        return;
      }

      try {
        const response = await ApiService.post('/branch/getBranchDetailsById', {
          id: branchDetailsFromState.id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });

        if (response?.status) {
          setBranchDetails(response.data);
      console.log('Fetching branch details for ID:', response.data);

        } else {
          console.warn('Branch not found:', response);
          alert(
            response.internalMessage ||
              'Branch not found. It may have been deleted.'
          );
        }
      } catch (error) {
        console.error('Error fetching branch details:', error);
        alert('Failed to fetch branch details. Please try again later.');
      }
    };

    fetchBranchDetails();
  }, [branchDetailsFromState.id]);

  // const handleSearch = (e) => {
  //   setSearch(e.target.value.toLowerCase());
  // };

  const bankData = [
    {
      no: 1,
      accountHolder: 'John Doe',
      accountType: 'Savings',
      accountNumber: '1234567890',
      gstNo: 'GST12345',
      ifsc: 'IFSC001',
      amount: '₹50,000',
    },
    {
      no: 2,
      accountHolder: 'Jane Smith',
      accountType: 'Current',
      accountNumber: '0987654321',
      gstNo: 'GST67890',
      ifsc: 'IFSC002',
      amount: '₹75,000',
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = bankData.filter(
      (item) =>
        item.accountNumber.includes(value) ||
        item.accountHolder.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  const displayData = search ? filteredData : bankData;

  return (
    <div className="space-y-10 px-8 py-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img src="/logo-square.png" alt="Branch Logo" className="w-16 h-16 " />
        <h1 className="text-3xl font-bold text-green-600">
          {branchDetails.branchName || 'Branch Details'}
        </h1>
      </div>

      {/* Branch Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <strong>Branch Name:</strong>
          <p>{branchDetails.branchName || 'N/A'}</p>
        </div>
        <div>
          <strong>Branch Number:</strong>
          <p>{branchDetails.branchNumber || 'N/A'}</p>
        </div>
        <div>
          <strong>Email:</strong>
          <p>{branchDetails.email || 'N/A'}</p>
        </div>
        <div>
          <strong>Address:</strong>
          <p>{branchDetails.branchAddress || 'N/A'}</p>
        </div>
        <div>
          <strong>City:</strong>
          <p>{branchDetails.city || 'N/A'}</p>
        </div>
        <div>
          <strong>State:</strong>
          <p>{branchDetails.state || 'N/A'}</p>
        </div>
        <div>
          <strong>Branch Opening:</strong>
          <p>{branchDetails.branchOpening || 'N/A'}</p>
        </div>
        {/* <div>
          <strong>GST:</strong>
          <p>{branchDetails.GST || 'N/A'}</p>
        </div> */}
      </div>

      <div className=" items-center mb-4 ">
        <strong>Branch Image</strong>
        <img
          src={branchDetails.branchPhoto || 'default-branch.png'}
          alt="Branch Logo"
          className="w-40 h-30 py-4"
        />
      </div>

      {/* Staff */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Branch Manager</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branchDetails.staff.filter(
            (staff) => staff.designation === 'Branch Manager'
          ).length > 0 ? (
            branchDetails.staff
              .filter((staff) => staff.designation === 'Branch Manager')
              .map((staff, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200"
                >
                  {/* Staff Image */}
                  <img
                    src={staff.staffPhoto || 'default-staff.png'}
                    alt={staff.name}
                    className="rounded-full w-24 h-24 mx-auto mb-4"
                  />

                  {/* Staff Name */}
                  <h3 className="text-lg font-semibold">{staff.name}</h3>

                  {/* Designation */}
                  <p className="text-gray-500 text-sm font-medium">
                    {staff.designation}
                  </p>

                  {/* Branch Name */}
                  <p className="text-gray-400 text-xs">
                    {branchDetails.branchName}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex justify-center gap-2">
                    {/* <button className="border border-gray-400 text-gray-700 px-4 py-1 rounded-lg text-sm hover:bg-gray-100">
                Message
              </button> */}
                    <button
                      className="border border-gray-400 text-gray-700 px-4 py-1 rounded-lg text-sm hover:bg-gray-100"
                      onClick={() => {
                        setSelectedStaff(staff);
                        setShowModal(true);
                        setShowDropdown(null);
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p>No branch manager available for this branch.</p>
          )}
        </div>
      </div>

      {/* Dynamic Heading Based on Tab */}
      <h2 className="text-xl font-semibold mb-4">
        {activeTab === 'staff'
          ? 'Branch Staff'
          : activeTab === 'bank'
            ? 'Branch Bank'
            : 'Branch Assets'}
      </h2>

      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-4">
        {['staff', 'bank', 'assets'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-sm w-96 h-12 font-semibold rounded-md shadow ${
              activeTab === tab
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Staff Table */}
      {activeTab === 'staff' && (
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by Name"
            value={search}
            onChange={handleSearch}
            className="w-full p-2 border rounded mb-4"
          />
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-300 text-gray-800">
                <th className="px-4 py-2 text-left">Employee ID</th>
                <th className="px-4 py-2 text-left">Employee Name</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {branchDetails.staff
                .filter((staff) => staff.name.toLowerCase().includes(search))
                .sort((a, b) =>
                  String(a.staffId).localeCompare(String(b.staffId))
                )
                .map((staff, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="px-4 py-2">{staff.staffId}</td>
                    <td className="px-4 py-2">{staff.name}</td>
                    <td className="px-4 py-2">{staff.designation}</td>
                    <td className="px-4 py-2">{staff.phoneNumber}</td>
                    <td className="px-4 py-2 text-center relative">
                      <div
                        className="inline-block cursor-pointer"
                        onClick={() =>
                          setShowDropdown(showDropdown === index ? null : index)
                        }
                      >
                        <FiMoreVertical className="text-gray-600" />
                      </div>
                      {showDropdown === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => {
                              setSelectedStaff(staff);
                              setShowModal(true);
                              setShowDropdown(null);
                            }}
                          >
                            More Details
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              {branchDetails.staff.filter((staff) =>
                staff.name.toLowerCase().includes(search)
              ).length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Bank Table */}
      {activeTab === 'bank' && (
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by Account Number or Account Holder"
            value={search}
            onChange={handleSearch}
            className="w-full p-2 border rounded mb-4"
          />
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">No</th>
                <th className="border p-2">Account Holder</th>
                <th className="border p-2">Account Type</th>
                <th className="border p-2">Account Number</th>
                <th className="border p-2">Bank Name</th>
                <th className="border p-2">IFSC CODE</th>
                <th className="border p-2">Amount</th>
                {/* <th className="border p-2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {branchDetails.accounts
                .filter(
                  (item) =>
                    item.accountName.toLowerCase().includes(search) ||
                    item.accountNumber.toLowerCase().includes(search)
                )
                .map((item) => (
                  <tr key={item.id} className="text-center border">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.accountName}</td>
                    <td className="border p-2">{item.accountType}</td>
                    <td className="border p-2">{item.accountNumber}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.ifscCode}</td>
                    <td className="border p-2">{item.totalAmount}</td>
                    {/* <td className="border p-2">
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td> */}
                  </tr>
                ))}
              {displayData.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Assets Table */}
      {activeTab === 'assets' && (
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by Asset Name or Type"
            value={search}
            onChange={handleSearch}
            className="w-full p-2 border rounded mb-4"
          />
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">assets Id</th>
                <th className="border p-2">Assets Name</th>
                <th className="border p-2">Assets Type</th>
                <th className="border p-2">Date Of Purchase</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Amount</th>
                {/* <th className="border p-2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {branchDetails.asserts
                .filter(
                  (item) =>
                    item.assertsName.toLowerCase().includes(search) ||
                    item.assetType.toLowerCase().includes(search)
                )
                .map((item) => (
                  <tr key={item.id} className="text-center border">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.assertsName}</td>
                    <td className="border p-2">{item.assetType}</td>
                    <td className="border p-2">
                      {new Date(item.purchaseDate).toLocaleDateString()}{' '}
                    </td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.assertsAmount}</td>
                    {/* <td className="border p-2">
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td> */}
                  </tr>
                ))}
              {displayData.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Staff Details
            </h3>

            {/* Basic Details */}
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Employee ID:</strong> {selectedStaff.staffId}
              </p>
              <p>
                <strong>Name:</strong> {selectedStaff.name}
              </p>
              <p>
                <strong>Gender:</strong> {selectedStaff.gender}
              </p>
              <p>
                <strong>DOB:</strong> {selectedStaff.dob}
              </p>
              <p>
                <strong>Designation:</strong> {selectedStaff.designation}
              </p>
              <p>
                <strong>Department:</strong> {selectedStaff.department}
              </p>
              <p>
                <strong>Status:</strong> {selectedStaff.status}
              </p>
              <p>
                <strong>Joining Date:</strong> {selectedStaff.joiningDate}
              </p>
              <p>
                <strong>Resignation Date:</strong>{' '}
                {selectedStaff.resignationDate || '-'}
              </p>
              <p>
                <strong>Termination Date:</strong>{' '}
                {selectedStaff.terminationDate || '-'}
              </p>
              <p>
                <strong>Final Settlement Date:</strong>{' '}
                {selectedStaff.finalSettlementDate || '-'}
              </p>
            </div>

            <hr className="my-4" />

            {/* Contact Info */}
            <h4 className="font-semibold mb-2">Contact Info</h4>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Phone:</strong> {selectedStaff.phoneNumber}
              </p>
              <p>
                <strong>Alternate Phone:</strong>{' '}
                {selectedStaff.alternateNumber}
              </p>
              <p>
                <strong>Office Phone:</strong>{' '}
                {selectedStaff.officePhoneNumber || '-'}
              </p>
              <p>
                <strong>Email:</strong> {selectedStaff.email}
              </p>
              <p>
                <strong>Office Email:</strong> {selectedStaff.officeEmail}
              </p>
              <p>
                <strong>Location:</strong> {selectedStaff.location}
              </p>
              <p className="col-span-2">
                <strong>Address:</strong> {selectedStaff.address}
              </p>
            </div>

            <hr className="my-4" />

            {/* Document Info */}
            <h4 className="font-semibold mb-2">Documents & IDs</h4>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Aadhar:</strong> {selectedStaff.aadharNumber}
              </p>
              <p>
                <strong>PAN:</strong> {selectedStaff.panCardNumber}
              </p>
              <p>
                <strong>Driving Licence:</strong> {selectedStaff.drivingLicence}
              </p>
              <p>
                <strong>DL Number:</strong>{' '}
                {selectedStaff.drivingLicenceNumber || '-'}
              </p>
              <p>
                <strong>UAN Number:</strong> {selectedStaff.uanNumber}
              </p>
              <p>
                <strong>ESIC Number:</strong> {selectedStaff.esicNumber || '-'}
              </p>
            </div>

            <hr className="my-4" />

            {/* Bank Info */}
            <h4 className="font-semibold mb-2">Bank Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Bank Name:</strong> {selectedStaff.bankName}
              </p>
              <p>
                <strong>Account Number:</strong> {selectedStaff.accountNumber}
              </p>
              <p>
                <strong>Account Branch:</strong> {selectedStaff.accountBranch}
              </p>
              <p>
                <strong>IFSC Code:</strong> {selectedStaff.ifscCode}
              </p>
              <p>
                <strong>Account Type:</strong> {selectedStaff.accountType}
              </p>
              <p>
                <strong>Monthly Salary:</strong> ₹{selectedStaff.monthlySalary}
              </p>
            </div>

            <hr className="my-4" />

            {/* Insurance */}
            <h4 className="font-semibold mb-2">Insurance</h4>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Insurance No:</strong> {selectedStaff.insuranceNumber}
              </p>
              <p>
                <strong>Eligibility Date:</strong>{' '}
                {selectedStaff.insuranceEligibilityDate}
              </p>
              <p>
                <strong>Expiry Date:</strong>{' '}
                {selectedStaff.insuranceExpiryDate}
              </p>
            </div>

            <hr className="my-4" />

            {/* Equipment Allocation */}
            <h4 className="font-semibold mb-2">Equipment Allocation</h4>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Bike Allocation:</strong> {selectedStaff.bikeAllocation}
              </p>
              <p>
                <strong>Bike Number:</strong> {selectedStaff.bikeNumber}
              </p>
              <p>
                <strong>Mobile Allocation:</strong>{' '}
                {selectedStaff.mobileAllocation}
              </p>
              <p>
                <strong>Mail Allocation:</strong> {selectedStaff.mailAllocation}
              </p>
              <p>
                <strong>Mobile Brand:</strong>{' '}
                {selectedStaff.mobileBrand || '-'}
              </p>
             
            </div>

            <hr className="my-4" />

            <div className="text-right">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchDetails;
