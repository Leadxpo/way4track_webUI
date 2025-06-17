import React, { useState, useEffect } from 'react';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
import { FaPencil } from 'react-icons/fa6';

const ProductType = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({ name: '' });
  const [productTypes, setProductTypes] = useState([]);
  const [allProductTypes, setAllProductTypes] = useState([]); // Store full data
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await ApiService.post(
        '/productType/getProductTypeDetails'
      );
      if (response.data) {
        setProductTypes(response.data || []);
        setAllProductTypes(response.data || []); // Store original data
      } else {
        console.error('Error: API response is invalid');
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const searchQuery = searchData.name.toLowerCase().trim();

    if (searchQuery === '') {
      setProductTypes(allProductTypes); // Reset to original data
    } else {
      const filteredData = allProductTypes.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
      setProductTypes(filteredData);
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product type?')) {
      return;
    }

    const data = new FormData();
    data.append('id', id);
    data.append('companyCode', initialAuthState.companyCode);
    data.append('unitCode', initialAuthState.unitCode);

    try {
      const res = await ApiService.post(
        `/productType/deleteProductTypeDetails`,
        data
      );

      if (res.status) {
        alert('Product type deleted successfully!');
        fetchProductTypes();
      }
    } catch (error) {
      console.error('Error deleting product type:', error);
      alert('Failed to delete product type.');
    }
  };

  useEffect(() => {
    const perms = getPermissions('product-type');
    setPermissions(perms);
  }, [permissions]);

  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-semibold text-gray-800">Product Types</h2>
        <button
          className={`px-4 py-2 text-white rounded-md transition ${permissions.view ? 'bg-blue-300 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
          onClick={() => navigate('/add-product-type')}
          disabled={!permissions.add}
        >
          Add Product Type
        </button>
      </div>

      <div className="flex mb-4">
        <div className="flex-grow mx-2">
          <input
            type="text"
            name="name"
            placeholder="Search by Name"
            value={searchData.name}
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
                <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {productTypes.length > 0 ? (
                productTypes.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}
                  >
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.type}</td>
                    <td className="px-6 py-4 text-left relative dropdown-container">
                      <button
                        onClick={() =>
                          navigate('/edit-product-type', {
                            state: { productType: item },
                          })
                        }
                        disabled={!permissions.edit}
                        className={`px-4 py-2 text-white rounded-md transition ${permissions.edit ? 'bg-blue-300 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
                      >
                        <FaPencil
                          className="cursor-pointer text-gray-700" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No product types found
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

export default ProductType;
