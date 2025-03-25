
import React, { useState, useCallback, useMemo } from "react";
import PersonnelDetails from "./PersonnelDetails";
import EducationDetails from "./EducationDetails";
import BankDetails from "./BankDetails";
import EmployerDetails from "./EmployerDetails";
import ApiService from '../../services/ApiService';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialAuthState } from '../../services/ApiService';

export default function AddStaffForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const candidateData = location.state?.candidateDetails || {};
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
        return <PersonnelDetails candidateData={candidateData} setPersonnelDetails={(data) => handleTempDataUpdate(data, 'personnelDetails')} />;
      case 2:
        return <EducationDetails candidateData={candidateData} setEducationDetails={(data) => handleTempDataUpdate(data, 'educationDetails')} />;
      case 3:
        return <BankDetails setBankDetails={(data) => handleTempDataUpdate(data, 'bankDetails')} />;
      case 4:
        return <EmployerDetails setEmployerDetails={(data) => handleTempDataUpdate(data, 'employerDetails')} />;
      default:
        return null;
    }
  }, [currentStep, handleTempDataUpdate]);

  // Submit function with optimized FormData
  // const handleSubmit = useCallback(async () => {
  //   try {

  //     const combinedData = {
  //       ...formData.personnelDetails,
  //       ...formData.educationDetails,
  //       ...formData.bankDetails,
  //       ...formData.employerDetails,
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //     };



  //     // Debugging: Convert FormData to object for logging
  //     // console.log("Final FormData:", Object.fromEntries(formPayload.entries()));

  //     const response = await ApiService.post('/staff/handleStaffDetails', combinedData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });

  //     if (response.data.status) {
  //       alert("Employee added successfully!");
  //       navigate('/staff');
  //     } else {
  //       alert("Failed to save employee details. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error saving employee details:", error);
  //     alert("Failed to save employee details. Please try again.");
  //   }
  // }, [formData, navigate]);


  const handleSubmit = useCallback(async () => {
    try {
      const formPayload = new FormData();

      // Append Other Details
      Object.entries(formData.personnelDetails).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      Object.entries(formData.educationDetails).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      Object.entries(formData.bankDetails).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      Object.entries(formData.employerDetails).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      // Append company and unit code from `initialAuthState`
      formPayload.append('companyCode', initialAuthState.companyCode);
      formPayload.append('unitCode', initialAuthState.unitCode);

      // Append Single File Fields
      // if (formData.personnelDetails.photo) {
      //   formPayload.append('photo', formData.personnelDetails.photo);
      // }
      // if (formData.personnelDetails.resume) {
      //   formPayload.append('resume', formData.personnelDetails.resume);
      // }

      // Append Multiple Files for Qualification
      // formData.educationDetails.qualifications.forEach((qual, index) => {
      //   if (qual.qualificationFiles) {
      //     qual.qualificationFiles.forEach((file, fileIndex) => {
      //       formPayload.append(`qualificationFiles[${index}][${fileIndex}]`, file);
      //     });
      //   }
      // });

      // Append Multiple Files for Experience
      // formData.educationDetails.experience.forEach((exp, index) => {
      //   if (exp.experience) {
      //     exp.experience.forEach((file, fileIndex) => {
      //       formPayload.append(`experience[${index}][${fileIndex}]`, file);
      //     });
      //   }
      // });

      const response = await ApiService.post('/staff/handleStaffDetails', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(formPayload, "::::::;;;;")
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

