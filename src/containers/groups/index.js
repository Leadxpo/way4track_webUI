import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaEllipsisV, FaFileDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
import * as XLSX from "xlsx";

const GroupTable = () => {
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [groupData, setGroupData] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [underGroup, setUnderGroup] = useState('');
  const [groupType, setGroupType] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const response = await ApiService.post('/groups/getGroupDataForTable', {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        setGroupData(response.data);
        setFilteredData(response.data);
      } else {
        console.error('Failed to fetch group data');
        setGroupData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSearch = () => {
    const filtered = groupData.filter(item => {
      const matchGroupName = groupName ? item.name?.toLowerCase().includes(groupName.toLowerCase()) : true;
      const matchUnderGroup = underGroup ? item.under?.toLowerCase().includes(underGroup.toLowerCase()) : true;
      const matchGroupType = groupType ? item.underType?.toLowerCase().includes(groupType.toLowerCase()) : true;
      return matchGroupName && matchUnderGroup && matchGroupType;
    });

    setFilteredData(filtered);
  };

  const handleNavigate = (type, item) => {
    if (type === 'edit') {
      navigate(`/add-groups?id=${item.id}`);
    } else if (type === 'details') {
      navigate(`/moredetails-group/${item.id}`);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this group?');
    if (!confirmed) return;

    try {
      const response = await ApiService.post('/groups/delete', { id });
      if (response.status) {
        alert('Group deleted successfully!');
        fetchGroups();
      } else {
        alert('Failed to delete group.');
      }
    } catch (error) {
      console.error('Error deleting group:', error);
      alert('Something went wrong while deleting.');
    }
  };

  const handlePreview = () => {
    if (filteredData.length === 0) {
      alert("No group data available to preview.");
      return;
    }

    const formattedData = formatProductExcelData(filteredData);
    setPreviewData(formattedData);
    setIsPreviewOpen(true);
  };

  const formatProductExcelData = (data) => {
    return data.map((item) => ({
      "Group ID": item.id,
      "Group Name": item.name,
      "Under Group": item.under,
      "Type of Group": item.underType,
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Group</h1>
        <button
          className="bg-yellow-400 text-black px-5 py-2 rounded-full shadow-md flex items-center gap-2 hover:bg-yellow-500"
          onClick={() => navigate('/add-groups')}
        >
          <FaPlus /> Create Group
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Type of Group"
          value={groupType}
          onChange={(e) => setGroupType(e.target.value)}
          className="p-2 border rounded w-1/4"
        />
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="p-2 border rounded w-1/4"
        />
        <input
          type="text"
          placeholder="Under Group"
          value={underGroup}
          onChange={(e) => setUnderGroup(e.target.value)}
          className="p-2 border rounded w-1/4"
        />
        <button onClick={handleSearch} className="bg-green-600 text-white p-2 rounded shadow">
          <FaSearch />
        </button>
        <button
          onClick={handlePreview}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          <FaFileDownload className="mr-2" /> Download
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">NO.</th>
              <th className="p-3">Name</th>
              <th className="p-3">Under Group</th>
              <th className="p-3">Type of Group</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                  <td className="p-3 underline">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.under}</td>
                  <td className="p-3">{item.underType}</td>
                  <td className="p-3 relative">
                    <FaEllipsisV
                      className="cursor-pointer"
                      onClick={() => setDropdownOpenIndex(dropdownOpenIndex === index ? null : index)}
                    />
                    {dropdownOpenIndex === index && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded z-10">
                        <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/add-groups', { state: { item } })}>Edit</p>
                        <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDelete(item.id)}>Delete</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No matching groups found.</td>
              </tr>
            )}
          </tbody>
        </table>
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

export default GroupTable;
