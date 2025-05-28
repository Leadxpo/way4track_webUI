import React, { useState, useEffect } from 'react';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';

const Promocode = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({ promocode: '' });
  const [promocodes, setPromocodes] = useState([]);
  const [allPromocodes, setAllPromocodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    fetchPromocodes();
  }, []);

  const fetchPromocodes = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };
      const response = await ApiService.post(
        '/promocode/getPromocodeDetails',
        payload
      );
      if (response.data) {
        setPromocodes(response.data);
        setAllPromocodes(response.data);
      } else {
        console.error('Error: Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching promocodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const searchQuery = searchData.promocode.toLowerCase().trim();
    if (searchQuery === '') {
      setPromocodes(allPromocodes);
    } else {
      const filteredData = allPromocodes.filter((item) =>
        item.promocode?.toLowerCase().includes(searchQuery)
      );
      setPromocodes(filteredData);
    }
  };

  const handleInputChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDelete = async (promoId) => {
    if (!window.confirm('Are you sure you want to delete this promocode?'))
      return;

    const payload = {
      id: promoId,
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
    };

    try {
      const res = await ApiService.post(
        '/promocode/deletePromocodeDetails',
        payload
      );
      if (res.status) {
        alert('Promocode deleted successfully!');
        fetchPromocodes();
      }
    } catch (error) {
      console.error('Error deleting promocode:', error);
      alert('Failed to delete promocode.');
    }
  };

  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-semibold text-gray-800">Promocodes</h2>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded-md"
          onClick={() => navigate('/addEdit-promocode')}
        >
          Add Promocode
        </button>
      </div>

      <div className="flex mb-4">
        <div className="flex-grow mx-2">
          <input
            type="text"
            name="promocode"
            placeholder="Search by Promocode"
            value={searchData.promocode}
            onChange={handleInputChange}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border px-1"
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="border-b bg-blue-500 text-white text-left">
                <th className="px-4 py-3 text-sm font-bold">Promocode</th>
                <th className="px-4 py-3 text-sm font-bold">Discount</th>
                <th className="px-4 py-3 text-sm font-bold">Discount Type</th>
                <th className="px-4 py-3 text-sm font-bold">Min Sale</th>
                <th className="px-4 py-3 text-sm font-bold">Max Discount</th>
                <th className="px-4 py-3 text-sm font-bold">Date</th>
                <th className="px-4 py-3 text-sm font-bold">Users</th>
                <th className="px-4 py-3 text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {promocodes.length > 0 ? (
                promocodes.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}
                  >
                    <td className="px-4 py-3">{item.promocode}</td>
                    <td className="px-4 py-3">{item.discount}</td>
                    <td className="px-4 py-3">{item.discountType}</td>
                    <td className="px-4 py-3">{item.minSaleAmount ?? '-'}</td>
                    <td className="px-4 py-3">
                      {item.maxDiscountAmount ?? '-'}
                    </td>
                    <td className="px-4 py-3">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="px-4 py-3">{item.promoUsers || '-'}</td>
                    <td className="px-4 py-3 relative dropdown-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(item.id);
                        }}
                        className="p-2 bg-white rounded-md"
                      >
                        <FaEllipsisV className="text-gray-700" />
                      </button>
                      {dropdownOpen === item.id && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                          <ul className="text-left">
                            <li
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                navigate('/addEdit-promocode', {
                                  state: { editData: item },
                                })
                              }
                            >
                              Edit
                            </li>
                            <li
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No Promocodes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Promocode;
