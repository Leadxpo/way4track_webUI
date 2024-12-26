import React from 'react';
import Table from '../../components/Table';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
const ProductAssign = () => {
  const navigate = useNavigate();
  const handleCreateNew = () => {
    navigate('/add-product-assign');
  };
  const onEdit = (product) => {
    navigate('/add-product-assign', { state: { productDetails: product } });
  };
  const onDelete = () => {
    navigate('/delete-product-assign');
  };
  const onDetails = () => {
    navigate('/product-assign-details');
  };

  const tableData = [
    {
      'Request Number': 'REQ001',
      'Branch/Person': 'Branch A',
      Name: 'John Doe',
      'IME-From': 232344555555,
      'IME-To': 232344555556,
      'Number of Products': 5,
    },
    {
      'Request Number': 'REQ002',
      'Branch/Person': 'Person B',
      Name: 'Jane Smith',
      'IME-From': 232344555557,
      'IME-To': 232344555558,
      'Number of Products': 3,
    },
    {
      'Request Number': 'REQ003',
      'Branch/Person': 'Branch C',
      Name: 'Michael Johnson',
      'IME-From': 232344555559,
      'IME-To': 232344555560,
      'Number of Products': 8,
    },
    {
      'Request Number': 'REQ004',
      'Branch/Person': 'Person D',
      Name: 'Emily Davis',
      'IME-From': 232344555561,
      'IME-To': 232344555562,
      'Number of Products': 2,
    },
  ];

  return (
    <div className="p-10">
      <p className="font-bold text-xl">Product Assign</p>
      {/* Create New Button Row */}
      <div className="flex justify-end mb-4">
        <button
          className="h-12 px-4 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
          onClick={handleCreateNew}
        >
          Create New
        </button>
      </div>

      <div className="flex mb-4">
        <div className="flex-grow mx-2">
          <select className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1 focus:outline-none">
            <option value="">All Branches</option>
            <option>Vishakapatnam</option>
            <option>Hyderabad</option>
            <option>Vijayawada</option>
            <option>Kakinada</option>
          </select>
        </div>
        <div className="flex-grow mx-2">
          <button className="h-12 w-full px-6 bg-green-700 text-white rounded-md flex items-center">
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </div>

      <div className="mt-8">
        <Table
          columns={Object.keys(tableData[0])}
          data={tableData}
          onEdit={onEdit}
          onDetails={onDetails}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default ProductAssign;
