import React from "react";
import PayrollDetailsView from "../../components/PayrollDetailsView";
import { useLocation, useNavigate } from 'react-router-dom';

const PayrollDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const payrollData = location.state?.paySlipDetails || {};
    return (
    <div className="min-h-screen flex items-center w-full justify-center bg-gray-100">
      <PayrollDetailsView payrollData={payrollData} />
    </div>
  );
};

export default PayrollDetails;
