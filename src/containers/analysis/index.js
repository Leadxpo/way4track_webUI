import React, { useState } from 'react';
import AnalysisCard from '../../components/AnalysisCard';
import AnalysisCardBarChart from '../../components/AnalysisCardBarChart';

const Analysis = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Handle popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="mx-32">
      {/* Analysis Components */}
      <AnalysisCardBarChart togglePopup={togglePopup} />
      {/* <AnalysisCard
        bartitle1={'Resolved Issues'}
        bartitle2={'Pending Issues'}
        barpercentage1={60}
        barpercentage2={40}
      /> */}

      {/* Popup Modal */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center rounded-lg">
          <div className="bg-white rounded-lg shadow-lg p-12 w-1/2">
            {/* Popup Content */}
            <h2 className="text-center text-green-700 font-bold text-xl mb-4">
              Total Credit Amount: 15000 /-
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Sales Section */}
              <div className="border border-green-500 rounded-md p-4">
                <h3 className="text-center text-green-700 font-semibold text-lg mb-4">
                  Sales : 30% - 10000 Rs
                </h3>
                <table className="table-auto w-full text-gray-600">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Branch</th>
                      <th className="px-4 py-2 text-center">%</th>
                      <th className="px-4 py-2 text-right">Rs.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2">Visakhapatnam</td>
                      <td className="px-4 py-2 text-center">05%</td>
                      <td className="px-4 py-2 text-right">3000</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2">Hyderabad</td>
                      <td className="px-4 py-2 text-center">10%</td>
                      <td className="px-4 py-2 text-right">2000</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2">Vijayawada</td>
                      <td className="px-4 py-2 text-center">05%</td>
                      <td className="px-4 py-2 text-right">3000</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2">Kakinada</td>
                      <td className="px-4 py-2 text-center">10%</td>
                      <td className="px-4 py-2 text-right">2000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Services Section */}
              <div className="border border-green-500 rounded-md p-4">
                <h3 className="text-center text-green-700 font-semibold text-lg mb-4">
                  Services : 5% - 5000 Rs
                </h3>
                <table className="table-auto w-full text-gray-600">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Branch</th>
                      <th className="px-4 py-2 text-center">%</th>
                      <th className="px-4 py-2 text-right">Rs.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2">Visakhapatnam</td>
                      <td className="px-4 py-2 text-center">05%</td>
                      <td className="px-4 py-2 text-right">2000</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2">Hyderabad</td>
                      <td className="px-4 py-2 text-center">10%</td>
                      <td className="px-4 py-2 text-right">1000</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2">Vijayawada</td>
                      <td className="px-4 py-2 text-center">05%</td>
                      <td className="px-4 py-2 text-right">1000</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2">Kakinada</td>
                      <td className="px-4 py-2 text-center">10%</td>
                      <td className="px-4 py-2 text-right">1000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Close Button */}
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
