import React from 'react';
import { useNavigate } from 'react-router-dom';
import hasPermission from '../../common/permission'

const AssertCard = ({ asset,permission }) => {
  console.log(asset,"assetCard")
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-row items-center"
      style={{ height: '150px',  borderRadius: '22px' }}
    >
      <img
        src={asset.assetPhoto}
        alt={asset.assertsName}
        className="w-24 h-24 object-cover rounded-full"
      />
      <div style={{ marginLeft: '10px' }}>
        <h2
          className="text-xl font-semibold mt-2"
          style={{ fontSize: '21px', fontWeight: '400', color: '#000000' }}
        >
          {asset.assertsName}  
        </h2>
        <p
          className="text-gray-600"
          style={{ fontSize: '11px', fontWeight: '400', color: '#7A7A7A' }}
        >
          {asset.branchId ? asset.branchId.branchName : 'Branch not available'}
        </p>
        <p
          className="text-green-600"
          style={{ fontSize: '11px', fontWeight: '600' }}
        >
          Qty : {asset.quantity}
        </p>
        
        <p
          className={`mt-1 ${asset.statusColor} font-medium`}
          style={{ fontSize: '11px', fontWeight: '400', color: '#FF0000' }}
        >
          {asset.status}
        </p>
        <div style={{ display: 'flex' }}>
          <p
            className="text-lg font-bold mt-2"
            style={{ fontSize: '14px', fontWeight: '700', color: '#000000' }}
          >
            ₹{asset.assertsAmount}/-
          </p>
          {hasPermission(permission, "assets", "view") &&

          <button
            className="mt-2"
            style={{
              width: '65px',
              height: '25px',
              borderRadius: '3px',
              borderColor: '#C6C6C6',
              borderWidth: '1px',
              borderStyle: 'solid',
              fontSize: '8px',
              color: '#7A7A7A',
              backgroundColor: '#ffffff',
              marginLeft: '30px',
            }}
            onClick={() => navigate('/asset-details',{state: {asset}})}
          >
            More Details
          </button>
}
        </div>
      </div>
    </div>
  );
};

export default AssertCard;
