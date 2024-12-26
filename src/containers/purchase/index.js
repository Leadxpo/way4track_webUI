import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import purchaseData from '../../mockData/mockPurchase.json';
const Purchase = ({ onEdit, onDetails }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    setTableData(purchaseData);
    setColumns(Object.keys(purchaseData[0] || {}));
  });
  return (
    <div className="p-10">
      <p className="font-bold text-xl">Purchase</p>
      <div className="mt-8">
        <Table
          columns={columns}
          data={tableData}
          onEdit={onEdit}
          onDetails={onDetails}
        />
      </div>
    </div>
  );
};

export default Purchase;
