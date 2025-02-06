import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import ApiService, { initialAuthState } from '../../services/ApiService';

class CommonReq {
  constructor(unitCode, companyCode, userId, userName) {
    this.unitCode = unitCode;
    this.companyCode = companyCode;
    this.userId = userId;
    this.userName = userName;
  }
}

const Purchase = ({ onEdit, onDetails }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = new CommonReq(
          initialAuthState.unitCode,
          initialAuthState.companyCode,
          initialAuthState.userId,
          initialAuthState.userName
        );

        const response = await ApiService.post(
          '/dashboards/getPurchaseData',
          payload
        );
        const data = response.data;

        setTableData(data);
        setColumns(Object.keys(data[0] || {}));
      } catch (error) {
        console.error('Error fetching purchase data:', error);
      }
    };

    fetchData();
  }, []);

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
