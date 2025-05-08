import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const WarehouseManagerBranch = () => {
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [filterBranchData, setFilterBranchData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [filterSubdealerData, setFilterSubdealerData] = useState([]);
  const [subdealerData, setSubdealerData] = useState([]);


  useEffect(() => {
    const getProductDetailsByBranch = async () => {
      try {
        const response = await ApiService.post(
          '/products/productAssignDetails',
          {
            // id: assetDetailsFromState.id,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        console.log(",,,,,>>>", response.data
        );

        



        if (response.status) {

          setFilterBranchData(response.data.branchDetails);
          setBranchData(response.data.branchDetails);
          setFilterSubdealerData(response.data.subDealerDetails);
          setSubdealerData(response.data.subDealerDetails
          );
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching branch details data:', error);
        alert('Failed to fetch branch details data.');
      }
    };
    getProductDetailsByBranch();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* <div className="mt-10 bg-white rounded-lg shadow-md overflow-hidden"> */}
      <h1 className="text-3xl font-bold mb-4">
                Branches
            </h1>
      <div className="overflow-x-auto mt-10">
        <table className="w-full bg-white rounded-xl shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">NO.</th>
              <th className="p-3 text-left">
                Branch Name
              </th>
              <th className="p-3 text-left">Product</th>
              {/* <th className="p-3 text-left">
                Assign Time
              </th> */}
              <th className="p-3 text-left">
                Present Stock
              </th>
              <th className="p-3 text-left">
                In Hand Stock
              </th>

              <td className="p-3 text-left">Status</td>

            </tr>
          </thead>
          <tbody>
            {filterBranchData.length > 0 ? (
              filterBranchData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="p-3">{String(index + 1).padStart(2, "0")}</td>
                  <td className="p-3">{item.branchName}</td>
                  <td className="p-3">{item.productName}</td>
                  {/* <td className="p-3">{item.
                    assignTime
                  }</td> */}
                  <td className="p-3">{item.presentStock
                  }</td>
                  <td className="p-3">{item.handStock}</td>

                  <td className="p-3">{item.productStatus}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-5 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h1 className="text-3xl font-bold mb-4">
                Sub dealers
            </h1>
      <div className="overflow-x-auto mt-10">
        <table className="w-full bg-white rounded-xl shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">NO.</th>
              <th className="p-3 text-left">
                
Sub Dealer Id

              </th>
              <th className="p-3 text-left">
              Sub Dealer Name</th>
              {/* <th className="p-3 text-left">
                Assign Time
              </th> */}
              <th className="p-3 text-left">
                Present Stock
              </th>

              <td className="p-3 text-left">Status</td>
              {/* <th className="p-3 text-left">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {filterSubdealerData.length > 0 ? (
              filterSubdealerData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="p-3">{String(index + 1).padStart(2, "0")}</td>
                  <td className="p-3">{item.
subDealerId
}</td>
                  <td className="p-3">{item.
subDealerName}</td>

                  <td className="p-3">{item.presentStock
                  }</td>

                  <td className="p-3">{item.productStatus}</td>


                  {/* <td className="p-3">
                    <button className="p-2 text-gray-600 hover:text-gray-900">⋮</button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-5 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* </div> */}
    </div>
  );
};

export default WarehouseManagerBranch;
