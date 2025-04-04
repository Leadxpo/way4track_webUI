import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import * as XLSX from 'xlsx';
import { FaEye, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
});

const PDFFile = ({ data }) => (
  <Document>
    <Page
      size="A4"
      style={{
        padding: 20,
        fontSize: 12,
        fontFamily: 'Helvetica',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Header */}
      <View
        style={{
          borderBottom: '2px solid black',
          marginBottom: 10,
          paddingBottom: 5,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
          Work Details Record
        </Text>
      </View>

      {/* Data Rows */}
      <View>
        {[
          { label: 'ID', value: data.id },
          { label: 'Product Name', value: data.productName },
          { label: 'Service Name', value: data.service },
          { label: 'Staff Name', value: data.staffName },
          { label: 'Branch Name', value: data.branchName },
          { label: 'Client Name', value: data.clientName },
          { label: 'Phone Number', value: data.phoneNumber },
          { label: 'Sim Number', value: data.simNumber },
          { label: 'Vehicle Type', value: data.vehicleType },
          { label: 'Date', value: data.date },
          {
            label: 'Status',
            value: data.workStatus === 'accept' ? 'Accepted' : 'Activated',
          },
        ].map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
              borderBottom: '1px solid black',
            }}
          >
            <Text style={{ fontWeight: 'bold', width: '40%' }}>
              {item.label}:
            </Text>
            <Text style={{ width: '60%' }}>{item.value}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const BackendSupportWorks = () => {
  const navigate = useNavigate();
  const [workRecords, setWorkRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'activated', 'accepted'
  const userId = localStorage.getItem('userId');
  const [searchColumn, setSearchColumn] = useState('');
  // const [filteredRecords, setFilteredRecords] = useState([]);

  const [popupData, setPopupData] = useState(null);

  const fetchRecords = async () => {
    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          supporterId: userId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      setWorkRecords(response.data || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setWorkRecords([]);
    }
  };

  useEffect(() => {
    fetchRecords();
    const interval = setInterval(fetchRecords, 180000);
    return () => clearInterval(interval);
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(workRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'WorkRecords');
    XLSX.writeFile(workbook, 'WorkRecords.xlsx');
  };

  const filteredRecords = workRecords.filter((item) => {
    console.log(item, 'Itemmmm');
    const matchesSearch = Object.values(item).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    );

    const matchesDate =
      (!startDate || new Date(item.date) >= new Date(startDate)) &&
      (!endDate || new Date(item.date) <= new Date(endDate));

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'activated' && item.workStatus === 'activate') ||
      (activeTab === 'accepted' && item.workStatus === 'accept');

    return matchesSearch && matchesDate && matchesTab;
  });

  // const applyFilters = () => {
  //   const filtered = workRecords.filter((item) => {
  //     // Column-based filtering
  //     const matchesColumnSearch =
  //       selectedColumn && columnSearchTerm
  //         ? item[selectedColumn]
  //             ?.toString()
  //             .toLowerCase()
  //             .includes(columnSearchTerm.toLowerCase())
  //         : true;

  //     // Date filtering
  //     const matchesDate =
  //       (!startDate || new Date(item.date) >= new Date(startDate)) &&
  //       (!endDate || new Date(item.date) <= new Date(endDate));

  //     return matchesColumnSearch && matchesDate;
  //   });

  //   setFilteredRecords(filtered);
  // };

  const convertToIST = (utcDate) => {
    if (!utcDate) return null;
    const date = new Date(utcDate);
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); // Convert to IST
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(); // Use current time if endDate is missing
    const diffMs = end - start; // Difference in milliseconds

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Work Records</h2>
        <div>
          <button
            onClick={fetchRecords}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition mr-2"
          >
            Refresh
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Generate XL
          </button>
        </div>
      </div>

      <div className="flex w-full mb-4" style={{ display: 'flex' }}>
        {/* <button
          className={`px-4 py-2 rounded ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('all')}
        >
          All Works
        </button> */}
        <button
          className={`w-1/2 h-12 px-4 py-2 mr-1 text-lg font-semibold rounded-l ${
            activeTab === 'activated' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          } transition duration-300 ease-in-out`}
          onClick={() => setActiveTab('activated')}
        >
          Activated Works
        </button>
        <button
          className={`w-1/2 h-12 px-4 py-2 ml-1 text-lg font-semibold rounded-r ${
            activeTab === 'accepted' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          } transition duration-300 ease-in-out`}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted Works
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <div>
          <select
            className="border p-2 mr-2 rounded"
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
          >
            <option value="">search Based on...</option>
            <option value="productName">Product Name</option>
            <option value="service">Service Name</option>
            <option value="staffName">Staff Name</option>
            <option value="branchName">Branch Name</option>
            <option value="clientName">Client Name</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 mr-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            className="border p-2 mr-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 mr-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {/* <button
            // onClick={applyFilters}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition mr-2"
          >
            Filter
          </button> */}
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 whitespace-nowrap">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Service Name</th>
              <th className="px-4 py-2">Staff Name</th>
              <th className="px-4 py-2">Branch Name</th>
              <th className="px-4 py-2">Client Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">IMEI Number</th>
              <th className="px-4 py-2">Sim Number</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Vehicle Type</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((item) => (
                <tr key={item.id} className="bg-white border-b">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.productName}</td>
                  <td className="px-4 py-2">{item.service}</td>
                  <td className="px-4 py-2">{item.staffName}</td>
                  <td className="px-4 py-2">{item.branchName}</td>
                  <td className="px-4 py-2">{item.clientName}</td>
                  <td className="px-4 py-2">{item.phoneNumber}</td>
                  <td className="px-4 py-2">{item.imeiNumber}</td>
                  <td className="px-4 py-2">{item.simNumber}</td>
                  <td className="px-4 py-2">{convertToIST(item.startDate)}</td>
                  <td
                    className={`px-4 py-2 ${!item.endDate ? 'text-red-500' : ''}`}
                  >
                    {item.endDate ? convertToIST(item.endDate) : '-'}
                  </td>
                  <td
                    className={`px-4 py-2 ${!item.endDate ? 'text-red-500' : ''}`}
                  >
                    {item.startDate
                      ? `${calculateDuration(item.startDate, item.endDate)}`
                      : ''}
                  </td>

                  <td className="px-4 py-2">{item.vehicleType}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${item.workStatus === 'accept' ? 'text-green-500' : 'text-blue-500'}`}
                  >
                    {item.workStatus === 'accept' ? 'Accepted' : 'Activated'}
                  </td>
                  <td
                    className="px-4 py-2 text-center mt-4"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <FaEye
                      className="cursor-pointer text-blue-500"
                      onClick={() =>
                        navigate('/work-view-details', {
                          state: { data: item },
                        })
                      }
                    />
                    <PDFDownloadLink
                      document={<PDFFile data={item} />}
                      fileName={`WorkRecord_${item.id}.pdf`}
                    >
                      <FaFilePdf className="cursor-pointer text-red-500" />
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {popupData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Work Details</h2>
            <p>
              <strong>ID:</strong> {popupData.id}
            </p>
            <p>
              <strong>Product Name:</strong> {popupData.productName}
            </p>
            <p>
              <strong>Product Amount:</strong> {popupData.amount}
            </p>
            <p>
              <strong>Service Name:</strong> {popupData.service}
            </p>
            <p>
              <strong>Staff Name:</strong> {popupData.staffName}
            </p>
            <p>
              <strong>Branch Name:</strong> {popupData.branchName}
            </p>
            <p>
              <strong>Client Name:</strong> {popupData.clientName}
            </p>
            <p>
              <strong>Phone Number:</strong> {popupData.phoneNumber}
            </p>
            <p>
              <strong>Sim Number:</strong> {popupData.simNumber}
            </p>
            <p>
              <strong>Vehicle Type:</strong> {popupData.vehicleType}
            </p>
            <p>
              <strong>Date:</strong> {popupData.date}
            </p>
            <p>
              <strong>Status:</strong> {popupData.status}
            </p>

            <button
              onClick={() => setPopupData(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackendSupportWorks;
