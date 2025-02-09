import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
// const data = [
//   {
//     branchName: 'Visakhapatnam',
//     products: [
//       {
//         id: 1,
//         name: 'Bike GPS Tracker',
//         type: 'Bike GPS Tracker',
//         count: 45,
//         img: 'bike.jpg',
//       },
//       {
//         id: 2,
//         name: 'Car GPS Tracker',
//         type: 'Car GPS Tracker',
//         count: 56,
//         img: 'car.jpg',
//       },
//       {
//         id: 3,
//         name: 'Bike GPS Tracker',
//         type: 'Bike GPS Tracker',
//         count: 509,
//         img: 'bike.jpg',
//       },
//       {
//         id: 4,
//         name: 'Car GPS Tracker',
//         type: 'Car GPS Tracker',
//         count: 346,
//         img: 'car.jpg',
//       },
//     ],
//   },
//   { branchName: 'Hyderabad', products: [] },
//   { branchName: 'Vijayawada', products: [] },
//   { branchName: 'Kakinada', products: [] },
// ];



const WarehouseManagerBranch = () => {
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [data, setData] = useState([])
  // const location = useLocation();
  // const assetDetailsFromState = location.state?.assetDetails || {};

  useEffect(() => {
    const getProductDetailsByBranch = async () => {
      try {
        const response = await ApiService.post('/dashboards/getProductDetailsByBranch', {
          // id: assetDetailsFromState.id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          setData(response.data || []);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching client details data:', error);
        alert('Failed to fetch client details data.');
      }
    };
    getProductDetailsByBranch();
  }, []);
  const toggleExpand = (branchName) => {
    setExpandedLocation((prev) => (prev === branchName ? null : branchName));
  };

  return (
    <div className="p-4 space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg overflow-hidden shadow-md"
        >
          <div
            className="bg-green-500 text-white px-4 py-2 flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(item.branchName)}
          >
            <span>{item.branchName}</span>
            <span>{expandedLocation === item.branchName ? '▲' : '▼'}</span>
          </div>
          {expandedLocation === item.branchName && item.products.length > 0 && (
            <div className="bg-white">
              <table className="w-full text-left border-t">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">No.</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Number of Product</th>
                  </tr>
                </thead>
                <tbody>
                  {item.products.map((product, index) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 flex items-center">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <div className="font-bold">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            WayTrack offers tracking and monitoring services for
                            your personal vehicle.
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">{product.type}</td>
                      <td className="px-4 py-2 font-bold text-right">
                        {product.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {expandedLocation === item.branchName && item.products.length === 0 && (
            <div className="bg-white p-4 text-gray-500">
              No products available.
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WarehouseManagerBranch;
