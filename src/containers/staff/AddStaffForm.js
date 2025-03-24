
import React, { useState, useCallback, useMemo } from "react";
import PersonnelDetails from "./PersonnelDetails";
import EducationDetails from "./EducationDetails";
import BankDetails from "./BankDetails";
import EmployerDetails from "./EmployerDetails";
import ApiService from '../../services/ApiService';
import { useNavigate } from "react-router";
import { initialAuthState } from '../../services/ApiService';

export default function AddStaffForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState(() => ({
    personnelDetails: {},
    educationDetails: {},
    bankDetails: {},
    employerDetails: {}
  }));

  console.log("Current Form Data:", formData);

  const handleTempDataUpdate = useCallback((newData, section) => {
    setFormData((prevData) => {
      if (prevData[section] === newData) return prevData;
      return { ...prevData, [section]: newData };
    });
  }, []);

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1:
        return !!formData.personnelDetails?.name?.trim();
      case 2:
        return formData.educationDetails?.qualification?.length > 0;
      case 3:
        return !!formData.bankDetails?.accountNumber?.trim();
      case 4:
        return !!formData.employerDetails?.companyName?.trim();
      default:
        return false;
    }
  }, [currentStep, formData]);

  const renderForm = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <PersonnelDetails setPersonnelDetails={(data) => handleTempDataUpdate(data, 'personnelDetails')} />;
      case 2:
        return <EducationDetails setEducationDetails={(data) => handleTempDataUpdate(data, 'educationDetails')} />;
      case 3:
        return <BankDetails setBankDetails={(data) => handleTempDataUpdate(data, 'bankDetails')} />;
      case 4:
        return <EmployerDetails setEmployerDetails={(data) => handleTempDataUpdate(data, 'employerDetails')} />;
      default:
        return null;
    }
  }, [currentStep, handleTempDataUpdate]);

  const handleSubmit = useCallback(async () => {
    try {
      const combinedData = {
        ...formData.personnelDetails,
        ...formData.educationDetails,
        ...formData.bankDetails,
        ...formData.employerDetails,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const response = await ApiService.post('/staff/handleStaffDetails', combinedData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert("Employee added successfully!");
        navigate('/staff');
      } else {
        alert("Failed to save employee details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving employee details:", error);
      alert("Failed to save employee details. Please try again.");
    }
  }, [formData, navigate]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Complete the Form</h1>
      {renderForm}
      <div className="mt-4 flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
          >
            Previous
          </button>
        )}
        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
          >
            Submit All Data
          </button>
        )}
      </div>
    </div>
  );
}

