import React, { useState, useCallback, useMemo } from 'react';
import PersonnelDetails from './PersonnelDetails';
import EducationDetails from './EducationDetails';
import BankDetails from './BankDetails';
import EmployerDetails from './EmployerDetails';
import ApiService from '../../services/ApiService';
import { useNavigate } from 'react-router';
import { initialAuthState } from '../../services/ApiService';

export default function AddStaffForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState(() => ({
    personnelDetails: {},
    educationDetails: {},
    bankDetails: {},
    employerDetails: {},
  }));

  console.log('Current Form Data:', formData.educationDetails);

  const validateStep = useCallback(() => {
    let errorMessage = '';

    switch (currentStep) {
      case 1: // Personnel Details validation
        const requiredFields = [
          'name',
          'dob',
          'gender',
          'location',
          'phoneNumber',
          'alternateNumber',
          'email',
          'aadharNumber',
          'panCardNumber',
          'drivingLicence',
          'address',
          'uanNumber',
          'esicNumber',
          'bloodGroup',
        ];

        // Loop through the required fields and check for emptiness
        for (let field of requiredFields) {
          if (!formData.personnelDetails?.[field]?.trim()) {
            errorMessage = `Please enter your ${field.replace(/([a-z])([A-Z])/g, '$1 $2')}.`;
            break;
          }
        }
        break;

      case 2: // Education Details validation
        if (!formData.educationDetails?.qualifications?.length) {
          errorMessage = 'Please add at least one qualification.';
        }
        break;

      case 3: // Bank Details validation
        const requiredBankFields = [
          'accountNumber',
          'bankName',
          'ifscCode',
          'accountBranch',
          'accountType',
        ];

        // Loop through the required fields and check for emptiness
        for (let field of requiredBankFields) {
          if (!formData.bankDetails?.[field]?.trim()) {
            errorMessage = `Please enter your ${field.replace(/([a-z])([A-Z])/g, '$1 $2')}.`;
            break;
          }
        }
        break;

      case 4: // Employer Details validation
        if (!formData.employerDetails?.staffId?.trim()) {
          errorMessage = 'Please enter your employer staff id.';
        }
        break;

      default:
        errorMessage = 'Invalid step';
    }

    setError(errorMessage);
    return !errorMessage; // If there's an error message, return false; otherwise, true
  }, [currentStep, formData]);

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
        return (
          <PersonnelDetails
            setPersonnelDetails={(data) =>
              handleTempDataUpdate(data, 'personnelDetails')
            }

            personnelDetails={formData.personnelDetails}
          />
        );
      case 2:
        return (
          <EducationDetails
            setEducationDetails={(data) =>
              handleTempDataUpdate(data, 'educationDetails')
            }

            educationDetails={formData.educationDetails}
          />
        );
      case 3:
        return (
          <BankDetails
            setBankDetails={(data) => handleTempDataUpdate(data, 'bankDetails')}
            bankDetails={formData.bankDetails}
          />
        );
      case 4:
        return (
          <EmployerDetails
            setEmployerDetails={(data) =>
              handleTempDataUpdate(data, 'employerDetails')
            }
            employerDetails={formData.employerDetails}
          />
        );
      default:
        return null;
    }
  }, [currentStep, handleTempDataUpdate]);

  const handleSubmit = useCallback(async () => {
    if (!validateStep()) return;

    try {
      const combinedFormData = new FormData();

      const combinedData = {
        ...formData?.personnelDetails,
        ...formData?.educationDetails,
        ...formData?.bankDetails,
        ...formData?.employerDetails,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      // Append non-file data
      Object.entries(combinedData).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          typeof value !== 'object'
        ) {
          combinedFormData.append(key, value);
        }
      });

      if (formData?.personnelDetails?.photo) {
        combinedFormData.append('photo', formData.personnelDetails.photo);
      }

      const qualifications = formData?.educationDetails?.qualifications?.map(
        (qualification) => ({
          qualificationName: qualification?.qualificationName,
          marksOrCgpa: qualification?.marksOrCgpa,
          // qualificationFiles: null,
        })
      );

      combinedFormData.append('qualifications', JSON.stringify(qualifications));

      let qualificationFiles = [];

      formData?.educationDetails?.qualifications?.forEach(
        (qualification, index) => {
          if (qualification?.qualificationFiles) {
            // combinedFormData.append(`qualificationFiles[${index}]`, qualification.qualificationFiles);
            combinedFormData.append(
              `qualificationFiles`,
              qualification.qualificationFiles
            );
            qualificationFiles.push(qualification.qualificationFiles);
          }
        }
      );

      combinedFormData.append(
        'qualificationFiles',
        JSON.stringify(qualificationFiles)
      );

      // Append experience array
      const formattedExperience =
        formData?.educationDetails?.experience?.map((exp, index) => {
          if (exp?.uploadLetters) {
            combinedFormData.append(
              // `experienceLetters[${index}]`,
              `experience`,
              exp.uploadLetters
            );
          }

          return {
            previousCompany: exp.previousCompany || '',
            previous_designation: exp.previous_designation || '',
            total_experience: exp.total_experience || '',
            previous_salary: exp.previous_salary || '',
          };
        }) || [];

      combinedFormData.append(
        'experienceDetails',
        JSON.stringify(formattedExperience)
      );

      console.log('FormData Entries:');
      for (let [key, value] of combinedFormData.entries()) {
        console.log(key, value);
      }

      const response = await ApiService.post(
        '/staff/handleStaffDetails',
        combinedFormData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status) {
        alert('Employee added successfully!');
        navigate('/staff');
      } else {
        alert('Failed to save employee details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving employee details:', error);
      alert('Failed to save employee details. Please try again.');
    }
  }, [formData, navigate]);

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
      setError('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Complete the Form</h1>

      {renderForm}
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
            // onClick={() => setCurrentStep((prev) => prev + 1)}
            onClick={handleNext}
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

// import React, { useState, useCallback, useMemo } from 'react';
// import PersonnelDetails from './PersonnelDetails';
// import EducationDetails from './EducationDetails';
// import BankDetails from './BankDetails';
// import EmployerDetails from './EmployerDetails';
// import ApiService from '../../services/ApiService';
// import { useNavigate } from 'react-router';
// import { initialAuthState } from '../../services/ApiService';

// export default function AddStaffForm() {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);

//   const [formState, setForState] = useState(() => ({
//     personnelDetails: {},
//     educationDetails: {},
//     bankDetails: {},
//     employerDetails: {},
//   }));

//   console.log('Current Form Data:', formState.educationDetails);

//   const handleTempDataUpdate = useCallback((newData, section) => {
//     setForState((prevData) => {
//       if (prevData[section] === newData) return prevData;
//       return { ...prevData, [section]: newData };
//     });
//   }, []);

//   const isStepValid = useMemo(() => {
//     switch (currentStep) {
//       case 1:
//         return !!formState.personnelDetails?.name?.trim();
//       case 2:
//         return formState.educationDetails?.qualification?.length > 0;
//       case 3:
//         return !!formState.bankDetails?.accountNumber?.trim();
//       case 4:
//         return !!formState.employerDetails?.companyName?.trim();
//       default:
//         return false;
//     }
//   }, [currentStep, formState]);

//   const renderForm = useMemo(() => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <PersonnelDetails
//             setPersonnelDetails={(data) =>
//               handleTempDataUpdate(data, 'personnelDetails')
//             }
//           />
//         );
//       case 2:
//         return (
//           <EducationDetails
//             setEducationDetails={(data) =>
//               handleTempDataUpdate(data, 'educationDetails')
//             }
//           />
//         );
//       case 3:
//         return (
//           <BankDetails
//             setBankDetails={(data) => handleTempDataUpdate(data, 'bankDetails')}
//           />
//         );
//       case 4:
//         return (
//           <EmployerDetails
//             setEmployerDetails={(data) =>
//               handleTempDataUpdate(data, 'employerDetails')
//             }
//           />
//         );
//       default:
//         return null;
//     }
//   }, [currentStep, handleTempDataUpdate]);

//   const handleSubmit = useCallback(async () => {
//     try {
//       const combinedData = {
//         ...formState.personnelDetails,
//         ...formState.educationDetails,
//         ...formState.bankDetails,
//         ...formState.employerDetails,
//         companyCode: initialAuthState.companyCode,
//         unitCode: initialAuthState.unitCode,
//       };

//       const formData = new FormData();
//       formData.append('data', JSON.stringify(combinedData));

//       // Append files properly
//       formState.qualifications.forEach((qualification, index) => {
//         if (qualification.qualificationFiles) {
//           formData.append(
//             `qualificationFiles`,
//             qualification.qualificationFiles
//           );
//         }
//       });

//       console.log('Final FormData Payload:', formData);

//       const response = await ApiService.post(
//         '/staff/handleStaffDetails',
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         }
//       );

//       if (response.data.status) {
//         alert('Employee added successfully!');
//         navigate('/staff');
//       } else {
//         alert('Failed to save employee details. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error saving employee details:', error);
//       alert('Failed to save employee details. Please try again.');
//     }
//   }, [formState, navigate]);

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Complete the Form</h1>
//       {renderForm}
//       <div className="mt-4 flex justify-between">
//         {currentStep > 1 && (
//           <button
//             onClick={() => setCurrentStep((prev) => prev - 1)}
//             className="px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
//           >
//             Previous
//           </button>
//         )}
//         {currentStep < 4 ? (
//           <button
//             onClick={() => setCurrentStep((prev) => prev + 1)}
//             className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
//           >
//             Submit All Data
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
