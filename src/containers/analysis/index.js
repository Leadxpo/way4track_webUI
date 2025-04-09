import React, { useEffect, useState } from 'react';
import AnalysisCardBarChart from '../../components/AnalysisCardBarChart';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const Analysis = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [creditDebitPercent, setCreditDebitPercent] = useState([]);
  const [totalCredit, setTotalCredit] = useState({ sales: 0, services: 0 });
  const [totalDebit, setTotalDebit] = useState({ salaries: 0, expenses: 0 });

  // Handle popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const getProductTypeCreditAndDebitPercentages = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getBranchWiseYearlySales',
        {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );
      if (response?.status && Array.isArray(response.data)) {
        setCreditDebitPercent(response.data);

        // Calculate total credit and debit amounts
        const totalCredit = response.data.reduce(
          (acc, item) => {
            acc.sales += item.salesTotalCreditAmount || 0;
            acc.services += item.servicesTotalCreditAmount || 0;
            return acc;
          },
          { sales: 0, services: 0 }
        );

        const totalDebit = response.data.reduce(
          (acc, item) => {
            acc.salaries += item.salariesTotalDebitAmount || 0;
            acc.expenses += item.expensesTotalDebitAmount || 0;
            return acc;
          },
          { salaries: 0, expenses: 0 }
        );

        setTotalCredit(totalCredit);
        setTotalDebit(totalDebit);
      } else {
        setCreditDebitPercent([]);
      }
    } catch (e) {
      console.error('Error fetching analysis details:', e);
      setCreditDebitPercent([]);
    }
  };

  useEffect(() => {
    getProductTypeCreditAndDebitPercentages();
  }, []);

  return (
    <div className="mx-32">
      <AnalysisCardBarChart
        togglePopup={togglePopup}
        creditDebitPercent={creditDebitPercent}
      />
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center rounded-lg">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 h-2/3 overflow-y-auto border border-gray-300">
            <h2 className="text-center text-green-700 font-bold text-xl mb-2">
              Total Credit Amount: {totalCredit.sales + totalCredit.services} /-
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h3 className="text-center text-green-700 font-semibold text-lg mb-2">
                  Sales: {totalCredit.sales} Rs
                </h3>
              </div>
              <div>
                <h3 className="text-center text-green-700 font-semibold text-lg mb-2">
                  Services: {totalCredit.services} Rs
                </h3>
              </div>
            </div>
            <h2 className="text-center text-green-700 font-bold text-xl mt-4 mb-2">
              Branch-wise Credit Details
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h3 className="text-center text-green-700 font-semibold text-lg mb-2">
                  Sales
                </h3>
                {creditDebitPercent.length > 0 ? (
                  creditDebitPercent.map((item, index) => (
                    <div
                      key={index}
                      className="border border-green-500 rounded-md p-2 mb-2"
                    >
                      <h3 className="text-center text-green-700 font-semibold text-lg mb-2">
                        {item.branchName} : {item.salesCreditPercentage}% -{' '}
                        {item.salesTotalCreditAmount} Rs
                      </h3>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No data available</p>
                )}
              </div>
              <div>
                <h3 className="text-center text-green-700 font-semibold text-lg mb-2">
                  Services
                </h3>
                {creditDebitPercent.length > 0 ? (
                  creditDebitPercent.map((item, index) => (
                    <div
                      key={index}
                      className="border border-green-500 rounded-md p-2 mb-2"
                    >
                      <h3 className="text-center text-green-700 font-semibold text-lg mb-2">
                        {item.branchName} : {item.servicesCreditPercentage}% -{' '}
                        {item.servicesTotalCreditAmount} Rs
                      </h3>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No data available</p>
                )}
              </div>
            </div>
            <h2 className="text-center text-red-700 font-bold text-xl mt-4 mb-2">
              Total Debit Amount: {totalDebit.salaries + totalDebit.expenses} /-
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h3 className="text-center text-red-700 font-semibold text-lg mb-2">
                  Salaries: {totalDebit.salaries} Rs
                </h3>
              </div>
              <div>
                <h3 className="text-center text-red-700 font-semibold text-lg mb-2">
                  Expenses: {totalDebit.expenses} Rs
                </h3>
              </div>
            </div>
            <h2 className="text-center text-red-700 font-bold text-xl mt-4 mb-2">
              Branch-wise Debit Details
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h3 className="text-center text-red-700 font-semibold text-lg mb-2">
                  Salaries
                </h3>
                {creditDebitPercent.length > 0 ? (
                  creditDebitPercent.map((item, index) => (
                    <div
                      key={index}
                      className="border border-red-500 rounded-md p-2 mb-2"
                    >
                      <h3 className="text-center text-red-700 font-semibold text-lg mb-2">
                        {item.branchName} : {item.salariesDebitPercentage}% -{' '}
                        {item.salariesTotalDebitAmount} Rs
                      </h3>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No data available</p>
                )}
              </div>
              <div>
                <h3 className="text-center text-red-700 font-semibold text-lg mb-2">
                  Expenses
                </h3>
                {creditDebitPercent.length > 0 ? (
                  creditDebitPercent.map((item, index) => (
                    <div
                      key={index}
                      className="border border-red-500 rounded-md p-2 mb-2"
                    >
                      <h3 className="text-center text-red-700 font-semibold text-lg mb-2">
                        {item.branchName} : {item.expensesDebitPercentage}% -{' '}
                        {item.expensesTotalDebitAmount} Rs
                      </h3>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No data available</p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-4">
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
