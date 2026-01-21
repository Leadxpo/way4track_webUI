import React, { useState, useEffect } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
import { FaEllipsisV } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const SalesVisit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [demoLeads, setDemoLeads] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [filters, setFilters] = useState({
    clientName: '',
    clientPhoneNumber: '',
    status: '',
  });

  const [popupData, setPopupData] = useState(null);
  const [statusPopup, setStatusPopup] = useState(null); // { item, position }

  useEffect(() => {
    const fetchDemoLeads = async () => {
      try {
        const response = await ApiService.post(
          '/demoLead/getAllDemoLeadDetails',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        const data = response.data || [];
        setDemoLeads(data);
        setFilteredData(data);
      } catch (err) {
        console.error('Failed to fetch demo leads:', err);
        setDemoLeads([]);
        setFilteredData([]);
      }
    };
    fetchDemoLeads();
  }, []);

  useEffect(() => {
    const perms = getPermissions('demo-leads');
    setPermissions(perms);
  }, []);

  useEffect(() => {
    let data = [...demoLeads];

    if (filters.clientName) {
      data = data.filter((d) =>
        (d.clientName || '')
          .toLowerCase()
          .includes(filters.clientName.toLowerCase())
      );
    }

    if (filters.clientPhoneNumber) {
      data = data.filter((d) =>
        (d.clientPhoneNumber || '')
          .toLowerCase()
          .includes(filters.clientPhoneNumber.toLowerCase())
      );
    }

    if (filters.status) {
      data = data.filter(
        (d) => (d.status || '').toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredData(data);
  }, [filters, demoLeads]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // const handleActionClick = (event, item) => {
  //   const rect = event.currentTarget.getBoundingClientRect();

  //   setPopupData((prev) =>
  //     prev && prev.item?.id === item.id
  //       ? null
  //       : {
  //           item,
  //           position: {
  //             top: rect.top + window.scrollY + 30,
  //             left: rect.left + window.scrollX - 50,
  //           },
  //         }
  //   );
  // };

  const handleStatusClick = (event, item) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setStatusPopup({
      item,
      position: {
        top: rect.top + window.scrollY + 30,
        left: rect.left + window.scrollX - 50,
      },
    });
  };

  const handleEdit = (lead) => {
    // keep behavior similar to previous app - adjust route as needed
    navigate('/edit-demo-lead', { state: { lead } });
    setPopupData(null);
  };

  const handleMoreDetails = (lead) => {
    navigate('/demo-lead-details', { state: { lead } });
    setPopupData(null);
  };

  const handleStatusChange = async (itemId, newStatus) => {
    // optimistic local update
    const prevLeads = [...demoLeads];
    const updatedLeads = demoLeads.map((l) =>
      l.id === itemId ? { ...l, status: newStatus } : l
    );
    setDemoLeads(updatedLeads);
    setFilteredData((prev) =>
      prev.map((l) => (l.id === itemId ? { ...l, status: newStatus } : l))
    );
    setStatusPopup(null);

    try {
      await ApiService.post('/demoLead/updateLeadStatus', {
        id: itemId,
        status: newStatus,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });
    } catch (err) {
      console.error('Failed to update lead status:', err);
      // revert on failure
      setDemoLeads(prevLeads);
      setFilteredData(prevLeads);
      alert('Failed to update status on server.');
    }
  };

  const generateExcel = () => {
    const rows = filteredData.map((d) => ({
      id: d.id,
      demoLeadId: d.demoLeadId,
      clientName: d.clientName,
      clientPhoneNumber: d.clientPhoneNumber,
      totalProductsSelected: d.totalProductsSelected,
      selectedProducts:
        Array.isArray(d.selectedProducts) && d.selectedProducts.length
          ? d.selectedProducts
              .map((p) => p.productName || p.deviceName || '')
              .join(', ')
          : '',
      status: d.status,
      description: d.description || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Demo Leads');
    XLSX.writeFile(workbook, 'Demo_Leads.xlsx');
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Demo Leads</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <input
          type="text"
          placeholder="Client Name"
          value={filters.clientName}
          onChange={(e) => handleFilterChange('clientName', e.target.value)}
          className="border border-gray-500 px-2 rounded h-10"
        />
        <input
          type="text"
          placeholder="Client Phone"
          value={filters.clientPhoneNumber}
          onChange={(e) =>
            handleFilterChange('clientPhoneNumber', e.target.value)
          }
          className="border border-gray-500 px-2 rounded h-10"
        />
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="border border-gray-500 px-2 rounded h-10"
        >
          <option value="">All Status</option>
          <option value="pending">PENDING</option>
          <option value="completed">COMPLETED</option>
          <option value="sent">SENT</option>
        </select>

        <button
          color="#333333"
          className="bg-green-300 h-10 p-2 my-2 rounded col-start-1 col-span-1"
          onClick={() => generateExcel()}
        >
          Generate Excel
        </button>
      </div>

      <div className="overflow-x-auto" style={{ marginTop: '20px' }}>
        {filteredData?.length === 0 ? (
          <div className="text-center text-gray-500 text-lg p-5">
            No Data Found
          </div>
        ) : (
          <div
            className="overflow-y-auto"
            style={{ maxHeight: '500px', maxWidth: '100%' }}
          >
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">No.</th>
                  <th className="p-3">Demo Lead ID</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Total Products</th>
                  <th className="p-3">Selected Products</th>
                  <th className="p-3">Status</th>
                  {/* <th className="p-3">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  const products =
                    Array.isArray(item.selectedProducts) &&
                    item.selectedProducts.length
                      ? item.selectedProducts
                          .map((p) => p.productName || p.deviceName || '')
                          .join(', ')
                      : '';
                  return (
                    <tr
                      key={item.id}
                      className={`border-b`}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? '#FFFFFF' : '#F7F7F7',
                      }}
                    >
                      <td className="p-3 font-semibold">{item.id}</td>
                      <td className="p-3">{item.demoLeadId || 'N/A'}</td>
                      <td className="p-3 font-semibold">
                        {item.clientName || 'N/A'}
                      </td>
                      <td className="p-3">{item.clientPhoneNumber || 'N/A'}</td>
                      <td className="p-3">
                        {item.totalProductsSelected ??
                          (Array.isArray(item.selectedProducts)
                            ? item.selectedProducts.length
                            : 0)}
                      </td>
                      <td className="p-3">{products}</td>
                      <td
                        className="p-3 cursor-pointer"
                        onClick={(e) => handleStatusClick(e, item)}
                        title="Click to change status"
                      >
                        {item.status || 'N/A'}
                      </td>
                      {/* <td className="p-3 relative">
                        <button
                          onClick={(e) => handleActionClick(e, item)}
                          className="p-2"
                        >
                          <FaEllipsisV />
                        </button>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {popupData && (
        <div
          className="popup-menu absolute bg-white border border-gray-300 shadow-md rounded-lg py-2 w-40"
          style={{
            top: `${popupData.position.top}px`,
            left: `${popupData.position.left}px`,
          }}
        >
          {permissions.edit && (
            <button
              className="block px-4 py-2 text-left w-full hover:bg-gray-100"
              onClick={() => handleEdit(popupData.item)}
            >
              Edit
            </button>
          )}

          {permissions.view && (
            <button
              className="block px-4 py-2 text-left w-full hover:bg-gray-100"
              onClick={() => handleMoreDetails(popupData.item)}
            >
              More Details
            </button>
          )}
        </div>
      )}

      {statusPopup && (
        <div
          className="popup-menu absolute bg-white border border-gray-300 shadow-md rounded-lg py-2 w-48"
          style={{
            top: `${statusPopup.position.top}px`,
            left: `${statusPopup.position.left}px`,
            zIndex: 50,
          }}
        >
          <div className="px-3 py-2 text-sm text-gray-600">Update Status</div>
          <hr />
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleStatusChange(statusPopup.item.id, 'pending')}
          >
            PENDING
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleStatusChange(statusPopup.item.id, 'completed')}
          >
            COMPLETED
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleStatusChange(statusPopup.item.id, 'sent')}
          >
            SENT
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesVisit;
