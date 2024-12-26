import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AnalysisCard = ({
  bartitle1,
  barpercentage1,
  bartitle2,
  barpercentage2,
}) => {
  const debitPercentage = 75;
  const creditPercentage = 25;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-6">
      {/* Debit and Credit bars */}
      <div className="flex justify-between items-center m-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Analysis For All Branches</h2>

          <div className="w-full mr-6">
            <h3 className="text-green-600 font-semibold text-lg mb-2">
              Total {bartitle1} - {barpercentage1}%
            </h3>
            <div className="bg-gray-200 rounded-full h-6">
              <div
                className="bg-green-600 h-6 rounded-full"
                style={{ width: `${debitPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="w-full mt-2">
            <h3 className="text-red-600 font-semibold text-lg mb-2">
              Total {bartitle2} - {barpercentage2}%
            </h3>
            <div className="bg-gray-200 rounded-full h-6">
              <div
                className="bg-red-600 h-6 rounded-full"
                style={{ width: `${creditPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Debit and Credit Details */}
          <div className="flex justify-between mt-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-green-600 font-bold text-xl mb-4">
                  {bartitle1}
                </h3>
                <ul className="list-none text-lg text-gray-700">
                  <li>Products: 40%</li>
                  <li>Sales: 30%</li>
                  <li>Serves: 5%</li>
                </ul>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full flex items-center">
                  Fore More <FaArrowRight className="ml-2" />
                </button>
              </div>

              <div>
                <h3 className="text-red-600 font-bold text-xl mb-4">
                  {bartitle2}
                </h3>
                <ul className="list-none text-lg text-gray-700">
                  <li>Salaries: 10%</li>
                  <li>Expenses: 10%</li>
                  <li>Vouchers: 5%</li>
                </ul>
                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full flex items-center">
                  Fore More <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Circular progress for debit percentage */}
        <div className="w-1/3 flex justify-center">
          <div style={{ width: 250, height: 250 }}>
            <CircularProgressbar
              value={debitPercentage}
              text={`${debitPercentage}%`}
              styles={buildStyles({
                pathColor: `#28a745`,
                textColor: '#000',
                trailColor: '#DC2626',
                textSize: '24px',
                strokeLinecap: 'butt',
              })}
              strokeWidth={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;
