import React, { useState, useEffect } from 'react';
import { FaPlus, FaFileExcel } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { formatString } from '../../common/commonUtils';
import * as XLSX from "xlsx";
import { data } from 'autoprefixer';
import { getPermissions } from '../../common/commonUtils';

const Ledger = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const rrr=()=>{

      const perms = getPermissions('voucher');
      setPermissions(perms);
    }
    rrr()
  }, [permissions]);

  const [searchData, setSearchData] = useState({
    clientId: '',
    clientName: '',
    branch: '',
  });
  const [branches, setBranches] = useState([]);
  const [records, setRecords] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [client, setClient] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  const fetchBranches = async () => {
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      if (response.status) {
        setBranches(response.data); // Set branches to state
      } else {
        console.error('Failed to fetch branches');
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };
  const fetchClients = async () => {
    try {
      const res = await ApiService.post('/client/getClientNamesDropDown');
      setClient(res.data || []);
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setClient([]);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);



  const handleExcelDownload = () => {
    console.log('Downloading Excel...');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        clientId: Number(searchData.client),
        clientName: searchData.clientName,
      };
      const response = await ApiService.post('ledger/getLedgerDataTable', {
        ...payload,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        const data = response.data;

        if (data.length > 0) {
          // Extract column names dynamically from the first record
          setColumns(Object.keys(data[0]));
        } else {
          setColumns([]); // No columns if no data
        }

        setRecords(data);
      } else {
        setError(response.data.message || 'No records found.');
        setColumns([]);
        setRecords([]);
      }
    } catch (error) {
      setError('Failed to fetch ledger data. Please try again.');
      console.error('Error fetching ledger data:', error);
      setColumns([]);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (ledger) => {
    navigate('/ledger-details', {
      state: { ledgerDetails: ledger },
    });
  };

  const handlePreview = () => {
    if (columns.length === 0) {
      alert("No group data available to preview.");
      return;
    }

    const formattedData = formatProductExcelData(columns);
    setPreviewData(formattedData);
    setIsPreviewOpen(true);
  };

  const formatProductExcelData = (columns) => {
    return columns.map((item) => ({
      "Ledger Group": item.group,
      "Ledger Name": item.name,
      "State": item.state,
      "Contry": item.country,
      "PAN Number": item.panNumber,
      "Id": item.clientId,
      "Registration Type": item.registrationType,
      "GST UIN Number": item.gstUinNumber,


    }));
  };

  const handleDownload = () => {
    if (!previewData || previewData.length === 0) {
      alert("No data available to download.");
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(previewData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Group_Data");
      XLSX.writeFile(workbook, "Filtered_Groups.xlsx");

      setIsPreviewOpen(false);
    } catch (error) {
      console.error("Error generating Excel file:", error);
      alert("Failed to generate the Excel file. Please try again.");
    }
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Ledger</h1>
        {permissions.add && <button
          className="bg-yellow-400 text-black px-5 py-2 rounded-full shadow-md flex items-center gap-2 hover:bg-yellow-500"
          onClick={() => navigate('/add-ledger')}
        >
          <FaPlus /> Create Ledger
        </button>}
      </div>
      {/* Search Section */}


      <div className=" flex justify-end ">
        <button
          className="w-52 text-left p-2 bg-green-600 text-white hover:bg-green-700 cursor-pointer flex items-center gap-2 rounded"
          onClick={handlePreview}
        >
          <FaFileExcel className="text-white" /> Excel Download
        </button>
      </div>




      {/* Loading and Error Messages */}
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-lg">
        {records.length > 0 ? (
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                {columns.map((col, index) => (
                  <th key={index} className="py-2 px-4">
                    {formatString(col)}
                  </th>
                ))}
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((record, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} text-sm`}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-1 px-4">
                      {record[col]}
                    </td>
                  ))}
                  <td className="py-1 px-4">
                    <button
                      className={`px-4 py-2 text-white rounded-md transition ${permissions.view ? 'bg-yellow-600 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`
                      }
                      onClick={() => handleView(record)} disabled={!permissions.view}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && (
            <p className="py-4 text-center text-gray-500">No records found</p>
          )
        )}
      </div>



      {isPreviewOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h4 className="text-xl font-semibold mb-4">Preview Data</h4>
            <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg">
              <table className="min-w-full border">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    {Object.keys(previewData[0]).map((key, index) => (
                      <th key={index} className="p-2 text-left border">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="p-2 border">{value}</td>
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

export default Ledger;
