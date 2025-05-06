import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { FaPlus, FaFileExcel, FaEllipsisV, FaSearch } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { FaFileDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const SubStaffDetails = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({ name: '' });
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const [subDealerDetails, setSubDealerDetails] = useState([]);
  const [subDealerStaffDetailsData, setSubDealerStaffDetailsData] = useState(
    []
  );
  const [photoData, setPhotoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewData, setPreviewData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [totalPayments, setTotalPayments] = useState([]);
  const [requestBranchWiseData, setRequestBranchWiseData] = useState([]);

  const SubStaffId = Number(localStorage.getItem('id'));
  // const SubStaffId=6;
  useEffect(() => {
    const fetchSubDealerDetails = async () => {
      try {
        const response = await ApiService.post(
          '/subdealer/getSubDealerDetails',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );

        if (response.status && Array.isArray(response.data)) {
          const subDealer = response.data.find(
            (dealer) => Number(dealer.id) === SubStaffId
          );

          if (subDealer) {
            setSubDealerDetails({
              ...subDealer,
              name: subDealer.name,
              phone: subDealer.subDealerPhoneNumber,
              email: subDealer.emailId,
              alternatePhoneNumber: subDealer.alternatePhoneNumber,
              aadharNumber: subDealer.aadharNumber,
              gstNumber: subDealer.gstNumber,
              address: subDealer.address,
              subDealerPhoto: subDealer.subDealerPhoto,
              branch: subDealer.branchName,
            });
          } else {
            setSubDealerDetails({});
          }
        } else {
          setSubDealerDetails({});
        }
      } catch (error) {
        console.error('Error fetching sub-dealer details:', error);
        alert('Failed to fetch sub-dealer details.');
      }
    };

    fetchSubDealerDetails();
  }, [SubStaffId, initialAuthState.companyCode, initialAuthState.unitCode]);

  const fetchSubDealerStaffDetailsData = async () => {
    try {
      const response = await ApiService.post(
        '/subDealerStaff/getSubDealerStaffDetails',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      if (response.status) {
        const data = response.data || [];

        const filteredData = data
          .filter(
            (item) => item.subDealerId && item.subDealerId.id === SubStaffId
          )
          .map(({ subDealerId, ...rest }) => rest);

        setSubDealerStaffDetailsData(filteredData);
        setPreviewData(filteredData);
      } else {
        setSubDealerStaffDetailsData([]);
      }
    } catch (error) {
      console.error('Error fetching subDealer details data:', error);
    }
  };

  useEffect(() => {
    fetchSubDealerStaffDetailsData();
  }, [SubStaffId]);

  const handleDownload = () => {
    if (!previewData || previewData.length === 0) {
      alert('No data available to download.');
      return;
    }

    try {
      const formattedData = formatStaffExcelData(previewData);
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'subdealer_Staff');
      XLSX.writeFile(workbook, 'Filtered_Subdealer_Staff.xlsx');

      setIsPreviewOpen(false); // Close modal after download
    } catch (error) {
      console.error('Error generating Excel file:', error);
      alert('Failed to generate the Excel file. Please try again.');
    }
  };

  const handleDelete = async (subStaffId) => {
    if (
      !window.confirm('Are you sure you want to delete this Subdealer Staff?')
    ) {
      return;
    }

    const payload = {
      id: subStaffId,
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
    };

    try {
      const res = await ApiService.post(
        `/subDealerStaff/deleteSubDealerStaffDetails`,
        payload
      );
      if (res.status) {
        alert('Subdealer Staff deleted successfully!');
        fetchSubDealerStaffDetailsData();
      }

      // Refresh or update the UI after deletion
    } catch (error) {
      console.error('Error deleting subdealer staff:', error);
      alert('Failed to delete subdealer staff.');
    }
  };

  const formatStaffExcelData = (data) => {
    return data.map((subDealerStaff) => ({
      id: subDealerStaff.id,
      staffId: subDealerStaff.staffId,
      name: subDealerStaff.name,
      gender: subDealerStaff.gender,
      phoneNumber: subDealerStaff.phoneNumber,
      alternateNumber: subDealerStaff.alternateNumber,
      email: subDealerStaff.email,
      aadharNumber: subDealerStaff.aadharNumber,
      panCardNumber: subDealerStaff.panCardNumber,
      dob: subDealerStaff.dob,
      address: subDealerStaff.address,
      description: subDealerStaff.description,
      unitCode: subDealerStaff.unitCode,
      companyCode: subDealerStaff.companyCode,
      createdAt: subDealerStaff.createdAt,
      updatedAt: subDealerStaff.updatedAt,
    }));
  };

  // Received Amount Data Export
  const formatReceivedExcelData = (data) => {
    return data.map((item) => ({
      'Receipt ID': item.receiptId,
      'Employee ID': item.staffId,
      'Employee Name': item.staffName,
      'Received Amount': item.receivedAmount || 0,
    }));
  };

  // Pending Amount Data Export
  const formatPendingExcelData = (data) => {
    return data.map((item) => ({
      'Employee ID': item.staffId,
      'Employee Name': item.staffName,
      'Pending Amount': item.totalPayments - item.receivedAmount || 0, // Calculated field
    }));
  };

  // Handle Payments Preview
  const handleStaffPreview = () => {
    if (previewData.length === 0) {
      alert('No Staff data available to preview.');
      return;
    }

    const formattedData = formatStaffExcelData(previewData);
    setModalData(formattedData);
    setIsPreviewOpen(true);
  };

  // Total Payments

  const TotalPayments = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };
      if (payload.role === 'Branch Manager') {
        payload.branchName = localStorage.getItem('branchName');
      }
      let response;
      if (payload.branchName) {
        response = await ApiService.post(
          '/technician/getAllPaymentsForTable',
          payload
        );
      }
      // Ensure response.data is always an array
      if (response?.status && Array.isArray(response.data)) {
        setTotalPayments(response.data);
      } else {
        setTotalPayments([]); // Prevent undefined
      }
    } catch (error) {
      console.error('Error fetching request data:', error);
      setRequestBranchWiseData([]); // Handle errors gracefully
    }
  };

  useEffect(() => {
    TotalPayments();
  }, []);

  // Filtering payments based on search query
  const filteredTotalPayments = Array.isArray(totalPayments)
    ? totalPayments.filter((payment) =>
        payment?.technicianName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const searchQuery = searchData.name.toLowerCase().trim();

    if (searchQuery === '') {
      setPreviewData(subDealerStaffDetailsData); // Reset if empty
    } else {
      const filteredData = subDealerStaffDetailsData.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(searchQuery)
        )
      );
      setPreviewData(filteredData);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* SubDealer Information */}
      <p className="font-bold text-xl">Sub Dealer ID</p>
      <div className="flex items-start space-x-28 bg-white p-6 rounded-lg shadow-md">
        {/* <img
          src={subDealerDetails.subDealerPhoto}
          alt="subDealer"
          className="w-32 h-32 rounded-full object-cover"
        /> */}
        <div className="space-y-5">
          <p className="text-gray-800  font-bold text-xl">
            Sub Dealer Name : {subDealerDetails.name}
          </p>
          <p className="text-gray-800 font-semibold">
            Phone number : {subDealerDetails.phone}
          </p>
          <p className="text-gray-800 font-semibold">
            Email : {subDealerDetails.email}
          </p>
          {/* <p className="text-gray-800 font-semibold">
            SubDealer Branch : {subDealerDetails.
branch||"-"
}
          </p> */}

          <p className="text-gray-800 font-semibold">
            Gst Number : {subDealerDetails.gstNumber || '-'}
          </p>

          <p className="text-gray-800 font-semibold">
            Address : {subDealerDetails.address}
          </p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold"></h1>
        <button
          className="bg-yellow-400 text-black px-5 py-2  rounded-full shadow-md flex items-center gap-2 hover:bg-yellow-500"
          onClick={() => navigate('/add-sub-staff')}
        >
          <FaPlus /> Create Sub Dealer Staff
        </button>
      </div>

      {/* Stats Section */}

      <div>
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Sub Dealer Staff Details
        </h2>
        <div className="flex mb-4">
          <div className="flex-grow mx-2">
            <input
              type="text"
              name="name"
              placeholder="Search by Name"
              value={searchData.name}
              onChange={handleSearchChange}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border px-1"
            />
          </div>
          <button
            onClick={handleSearch}
            className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>
          <button
            onClick={handleStaffPreview}
            className="flex items-center bg-blue-500 text-white px-4 py-2 mx-2 rounded-lg shadow hover:bg-blue-600"
          >
            <FaFileDownload className="mr-2" /> Preview & Download
          </button>
        </div>
        <div className="flex justify-between mb-4"></div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-red-300 text-white">
              <th className="p-2 border">Staff Id</th>
              <th className="p-2 border">Staff Name</th>
              <th className="p-2 border">Email</th>

              <th className="p-2 border">Phone Number</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {previewData?.length > 0 ? (
              previewData?.map((payment, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}
                >
                  <td className="p-2 border text-center">{payment.staffId}</td>
                  <td className="p-2 border text-center">{payment.name}</td>
                  <td className="p-2 border text-center">{payment.email}</td>
                  <td className="p-2 border text-center">
                    {payment.phoneNumber}
                  </td>

                  <td className="px-6 py-4 relative dropdown-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(payment.id);
                      }}
                      className="p-2 bg-white rounded-md focus:outline-none"
                    >
                      <FaEllipsisV className="cursor-pointer text-gray-700" />
                    </button>

                    {dropdownOpen === payment.id && (
                      <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                        <ul className="text-left">
                          <li
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              navigate('/edit-sub-staff', {
                                state: { subdealerstaff: payment },
                              })
                            }
                          >
                            Edit
                          </li>
                          <li
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleDelete(payment.id)}
                          >
                            Delete
                          </li>
                          <li
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              navigate('/view-sub-staff', {
                                state: { subdealerstaff: payment },
                              })
                            }
                          >
                            More Details
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No Sub Dealer Staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h4 className="text-xl font-semibold mb-4">Preview Data</h4>
            <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg">
              <table className="min-w-full border">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    {Object.keys(modalData[0]).map((key, index) => (
                      <th key={index} className="p-2 text-left border">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modalData.map((row, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                      }
                    >
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="p-2 border">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Download Excel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubStaffDetails;
