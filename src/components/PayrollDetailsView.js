import React, { useState,useEffect } from 'react';
import EditPayroll from '../containers/payroll/editPayroll';
import ApiService, { initialAuthState } from '../services/ApiService';
import { useNavigate } from 'react-router';
import {getPermissions} from '../common/commonUtils';

const PayrollDetailsView = ({ payrollData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editpayrollData, setPayrollData] = useState(false);
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const perms = getPermissions('attendance');
    setPermissions(perms);
  }, [permissions]);
  return (
    <div className="max-w-7xl w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Payroll Details
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <img
            src={payrollData.staffPhoto}
            alt="Staff"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div>
          <p>
            <strong>Name:</strong> {payrollData.staffName}
          </p>
          <p>
            <strong>Designation:</strong> {payrollData.designation}
          </p>
          <p>
            <strong>Branch:</strong> {payrollData.branch || 'N/A'}
          </p>
          <p>
            <strong>Salary Status:</strong> {payrollData.salaryStatus}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-gray-600">
        <p>
          <strong>Month Days:</strong> {payrollData.monthDays}
        </p>
        <p>
          <strong>Present Days:</strong> {payrollData.presentDays}
        </p>
        <p>
          <strong>Leave Days:</strong> {payrollData.leaveDays}
        </p>
        <p>
          <strong>Actual Salary:</strong> ₹{payrollData.actualSalary}
        </p>
        <p>
          <strong>Per Day Salary:</strong> ₹{payrollData.perDaySalary}
        </p>
        <p>
          <strong>Per Hour Salary:</strong> ₹{payrollData.perHourSalary}
        </p>
        <p>
          <strong>OT Amount:</strong> ₹{payrollData.OTAmount}
        </p>
        <p>
          <strong>Late Deductions:</strong> ₹{payrollData.lateDeductions}
        </p>
        <p>
          <strong>Gross Salary:</strong> ₹{payrollData.grossSalary}
        </p>
        <p>
          <strong>Net Salary:</strong> ₹{payrollData.netSalary}
        </p>
      </div>

{permissions.edit && <button
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        onClick={() => setIsEditing(true)}
      >
        Edit Payroll
      </button>
}
      {isEditing && (
        <EditPayroll
          initialData={payrollData}
          onClose={() => setIsEditing(false)}
          onSave={async (updatedData) => {
            console.log('Updated Payroll Data:', updatedData);

            const payrollPayload = {
              id: updatedData.id,
              staffId: updatedData.staffId,
              staffName: updatedData.staffName,
              branch: updatedData.branch || '',
              designation: updatedData.designation,
              staffPhoto: updatedData.staffPhoto || '',
              year: updatedData.year || new Date().getFullYear(),
              month: updatedData.month || new Date().getMonth() + 1,
              monthDays: updatedData.monthDays,
              presentDays: updatedData.presentDays,
              leaveDays: updatedData.leaveDays,
              actualSalary: updatedData.actualSalary,
              totalEarlyMinutes: updatedData.totalEarlyMinutes,
              totalLateMinutes: updatedData.totalLateMinutes,
              lateDays: updatedData.lateDays,
              perDaySalary: updatedData.perDaySalary || 0,
              perHourSalary: updatedData.perHourSalary || 0,
              totalOTHours: updatedData.totalOTHours,
              OTAmount: updatedData.OTAmount || 0,
              lateDeductions: updatedData.lateDeductions || 0,
              grossSalary: updatedData.grossSalary || 0,
              ESIC_Employee: updatedData.ESIC_Employee || 0,
              ESIC_Employer: updatedData.ESIC_Employer || 0,
              PF_Employee: updatedData.PF_Employee || 0,
              PF_Employer1: updatedData.PF_Employer1 || 0,
              PF_Employer2: updatedData.PF_Employer2 || 0,
              extraHalfSalary: updatedData.extraHalfSalary || 0,
              daysOutLate6HoursOrMore: updatedData.daysOutLate6HoursOrMore,
              netSalary: updatedData.netSalary || 0,
              salaryStatus: updatedData.salaryStatus,
              carryForwardLeaves: updatedData.carryForwardLeaves,
              professionalTax: updatedData.professionalTax || 0,
              incentives: updatedData.incentives || 0,
              foodAllowance: updatedData.foodAllowance || 0,
              leaveEncashment: updatedData.leaveEncashment || 0,
              plBikeNeedToPay: updatedData.plBikeNeedToPay || false,
              plBikeAmount: updatedData.plBikeAmount || 0,
              payableAmount: updatedData.payableAmount,
              advanceAmount: updatedData.advanceAmount, // Fixed typo

              // Additional fields from initialAuthState
              companyCode: initialAuthState?.companyCode,
              unitCode: initialAuthState?.unitCode,
            };
            try {
              const response = await ApiService.post(
                'PAYROLL/createOrUpdatePayroll',
                payrollPayload
              );

              if (response.status) {
                alert('Payroll Saved Successfully:', response.data);
                setPayrollData((prevData) => {
                  const payrollArray = Array.isArray(prevData) ? prevData : [];

                  return payrollArray.some((p) => p.id === updatedData.id)
                    ? payrollArray.map((p) =>
                        p.id === updatedData.id ? updatedData : p
                      )
                    : [...payrollArray, response.data];
                });
                navigate('/payrolls');
                setIsEditing(false); // Only close editing after successful save
              } else {
                alert(
                  response.data.message || 'Failed to save payroll details.'
                );
              }
            } catch (error) {
              console.error('Error saving payroll data:', error);
            }
          }}
        />
      )}
    </div>
  );
};

export default PayrollDetailsView;
