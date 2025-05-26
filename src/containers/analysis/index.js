import React, { useEffect, useState } from 'react';
import AnalysisCardBarChart from '../../components/AnalysisCardBarChart';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const Analysis = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [branchSalesData, setBranchSalesData] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const fetchBranchWiseSales = async () => {
    try {
      const response = await ApiService.post('/dashboards/getBranchWiseYearlySales', {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
        date: currentYear,
      });

      const dataArray = response?.data || [];
      if (response?.status && Array.isArray(dataArray)) {
        setBranchSalesData(dataArray);
      } else {
        setBranchSalesData([]);
      }
    } catch (e) {
      console.error('Error fetching analysis details:', e);
      setBranchSalesData([]);
    }
  };

  useEffect(() => {
    fetchBranchWiseSales();
  }, []);

  const totalSales = branchSalesData.reduce((acc, item) => acc + (item.TotalSalesAmount || 0), 0);
  const totalServices = branchSalesData.reduce((acc, item) => acc + (item.serviceTotalAmount || 0), 0);
  const totalProducts = branchSalesData.reduce((acc, item) => acc + (item.productTotalAmount || 0), 0);

  return (
    <div className="mx-32">
      <AnalysisCardBarChart
        togglePopup={togglePopup}
        creditDebitPercent={branchSalesData}
        date={currentYear}
      />

      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center rounded-lg">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 h-2/3 overflow-y-auto border border-gray-300">
            <h2 className="text-center text-green-700 font-bold text-xl mb-4">
              Branch-Wise Sales Report - {currentYear}
            </h2>

            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <h3 className="text-green-700 font-semibold text-lg mb-2">Total Sales</h3>
                <p className="text-black font-medium">Rs.{totalSales.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-green-700 font-semibold text-lg mb-2">Total Services</h3>
                <p className="text-black font-medium">Rs.{totalServices.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-green-700 font-semibold text-lg mb-2">Total Products</h3>
                <p className="text-black font-medium">Rs.{totalProducts.toFixed(2)}</p>
              </div>
            </div>

            <h2 className="text-center text-green-700 font-bold text-xl mt-6 mb-2">
              Branch-wise Breakdown
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {branchSalesData.map((item, index) => (
                <div
                  key={index}
                  className="border border-green-500 rounded-md p-4 shadow-sm"
                >
                  <h3 className="text-center text-lg font-semibold text-gray-700 mb-2">
                    {item.branchName}
                  </h3>
                  <p className="text-sm text-gray-600">Sales:Rs.{item.TotalSalesAmount}</p>
                  <p className="text-sm text-gray-600">Services:Rs.{item.serviceTotalAmount}</p>
                  <p className="text-sm text-gray-600">Products:Rs.{item.productTotalAmount}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={togglePopup}
                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
