import React from 'react';
import Table from '../../components/Table';
const SubDealerHome = () => {
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Purchase Amount"
          className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
        />
        <input
          type="text"
          placeholder="Reefer Amount"
          className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
        />
        <button className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center">
          Search
        </button>
      </div>
      <p className="text-xl my-4">Purchase Order</p>
      <Table />
      <p className="text-xl my-4">Business Given</p>
      <Table />
    </div>
  );
};

export default SubDealerHome;
