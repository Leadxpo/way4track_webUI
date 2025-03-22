import React, { useState } from "react";
import EditPayroll from "../containers/payroll/editPayroll";

const PayrollDetailsView = ({ payrollData }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-7xl w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payroll Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <img src={payrollData.staffPhoto} alt="Staff" className="w-24 h-24 rounded-full" />
        </div>
        <div>
          <p><strong>Name:</strong> {payrollData.staffName}</p>
          <p><strong>Designation:</strong> {payrollData.designation}</p>
          <p><strong>Branch:</strong> {payrollData.branch || "N/A"}</p>
          <p><strong>Salary Status:</strong> {payrollData.salaryStatus}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-gray-600">
        <p><strong>Month Days:</strong> {payrollData.monthDays}</p>
        <p><strong>Present Days:</strong> {payrollData.presentDays}</p>
        <p><strong>Leave Days:</strong> {payrollData.leaveDays}</p>
        <p><strong>Actual Salary:</strong> ₹{payrollData.actualSalary}</p>
        <p><strong>Per Day Salary:</strong> ₹{payrollData.perDaySalary}</p>
        <p><strong>Per Hour Salary:</strong> ₹{payrollData.perHourSalary}</p>
        <p><strong>OT Amount:</strong> ₹{payrollData.OTAmount}</p>
        <p><strong>Late Deductions:</strong> ₹{payrollData.lateDeductions}</p>
        <p><strong>Gross Salary:</strong> ₹{payrollData.grossSalary}</p>
        <p><strong>Net Salary:</strong> ₹{payrollData.netSalary}</p>
      </div>

      <button 
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        onClick={() => setIsEditing(true)}
      >
        Edit Payroll
      </button>

      {isEditing && (
        <EditPayroll 
          initialData={payrollData} 
          onClose={() => setIsEditing(false)} 
          onSave={(updatedData) => {
            console.log("Updated Payroll Data:", updatedData);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default PayrollDetailsView;
