import React from 'react';

const CashCard = ({ title, amount, details }) => {
  return (
    <div className="bg-green-300 rounded-3xl shadow-lg p-6 w-full max-w-lg flex justify-between items-center mt-6">
      {/* Left Side */}
      <div className="border-r border-gray-700">
        <h2 className="text-2xl font-semibold mr-4">{title}</h2>
        <p className="text-4xl font-bold mt-2 text-white italic mr-4">
          ₹<span className="text-5xl font-extrabold italic">{amount}</span>/-
        </p>
      </div>

      {/* Right Side */}
      <div>
        <p className="text-lg font-medium whitespace-nowrap">
          Branch 01: ₹5000/-
        </p>
        <p className="text-lg font-medium whitespace-nowrap">
          Branch 02: ₹5000/-
        </p>
        <p className="text-lg font-medium whitespace-nowrap">
          Branch 03: ₹5000/-
        </p>
        <p className="text-lg font-medium whitespace-nowrap">
          Branch 04: ₹5000/-
        </p>
      </div>
    </div>
  );
};

export default CashCard;
