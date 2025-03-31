// // import React, { useState, useCallback, useMemo } from "react";
// // import PersonnelDetails from "./PersonnelDetails";
// // import EducationDetails from "./EducationDetails";
// // import BankDetails from "./BankDetails";
// // import EmployerDetails from "./EmployerDetails";
// // import ApiService from '../../services/ApiService';
// // import { useNavigate } from "react-router";

// // export default function AddStaffForm() {
// //   const navigate = useNavigate();
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [formData, setFormData] = useState({
// //     personnelDetails: {},
// //     educationDetails: {},
// //     bankDetails: {},
// //     employerDetails: {}
// //   });

// //   console.log("vdfgfgf",formData)

// //   const handleTempDataUpdate = useCallback((newData, section) => {
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [section]: newData,
// //     }));
// //   }, []);

// //   const isStepValid = useMemo(() => {
// //     switch (currentStep) {
// //       case 1:
// //         return !!formData.personnelDetails?.name?.trim();
// //       case 2:
// //         return formData.educationDetails?.qualification?.length > 0;
// //       case 3:
// //         return !!formData.bankDetails?.accountNumber?.trim();
// //       case 4:
// //         return !!formData.employerDetails?.companyName?.trim();
// //       default:
// //         return false;
// //     }
// //   }, [currentStep, formData]);

// //   const renderForm = () => {
// //     switch (currentStep) {
// //       case 1:
// //         return <PersonnelDetails setPersonnelDetails={(data) => handleTempDataUpdate(data, 'personnelDetails')} />;
// //       case 2:
// //         return <EducationDetails setEducationDetails={(data) => handleTempDataUpdate(data, 'educationDetails')} />;
// //       case 3:
// //         return <BankDetails setBankDetails={(data) => handleTempDataUpdate(data, 'bankDetails')} />;
// //       case 4:
// //         return <EmployerDetails setEmployerDetails={(data) => handleTempDataUpdate(data, 'employerDetails')} />;
// //       default:
// //         return null;
// //     }
// //   };

// // const handleSubmit=async()=>{
// //   try {
// //     const endpoint = '/staff/handleStaffDetails'
// //     const response = await ApiService.post(endpoint, formData, {
// //       headers: { 'Content-Type': 'multipart/form-data' },
// //     });

// //     if (response.data.status) {
// //       alert(
// //  'Employee added successfully!'
// //       );
// //       navigate('/staff');
// //     } else {
// //       alert('Failed to save employee details. Please try again.');
// //     }
// //   } catch (error) {
// //     console.error('Error saving employee details:', error);
// //     alert('Failed to save employee details. Please try again.');
// //   }
// // }

// //   return (
// //     <div className="max-w-4xl mx-auto p-4">
// //       <h1 className="text-3xl font-bold mb-6">Complete the Form</h1>
// //       {renderForm()}
// //       {currentStep < 4 && (
// //         <button
// //           onClick={() => setCurrentStep((prev) => prev + 1)}
// //           // disabled={!isStepValid}
// //           className={"mt-4 px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"}
// //         >
// //           Next
// //         </button>
// //       )}
// //       {currentStep === 4 && (
// //         <button
// //           onClick={handleSubmit}
// //           className="mt-4 ml-4 px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
// //         >
// //           Submit All Data
// //         </button>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useState, useCallback, useMemo } from "react";
// import PersonnelDetails from "./PersonnelDetails";
// import EducationDetails from "./EducationDetails";
// import BankDetails from "./BankDetails";
// import EmployerDetails from "./EmployerDetails";
// import ApiService from '../../services/ApiService';
// import { useNavigate } from "react-router";
// import { initialAuthState } from '../../services/ApiService';

// export default function AddStaffForm() {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);

//   // Lazy initialization of state
//   const [formData, setFormData] = useState(() => ({
//     personnelDetails: {},
//     educationDetails: {},
//     bankDetails: {},
//     employerDetails: {}
//   }));

//   console.log("Current Form Data:", formData);

//   // UseCallback to prevent re-creation
//   const handleTempDataUpdate = useCallback((newData, section) => {
//     setFormData((prevData) => {
//       if (prevData[section] === newData) return prevData; // Avoid unnecessary state updates
//       return { ...prevData, [section]: newData };
//     });
//   }, []);

//   // Memoized validation check
//   const isStepValid = useMemo(() => {
//     switch (currentStep) {
//       case 1:
//         return !!formData.personnelDetails?.name?.trim();
//       case 2:
//         return formData.educationDetails?.qualification?.length > 0;
//       case 3:
//         return !!formData.bankDetails?.accountNumber?.trim();
//       case 4:
//         return !!formData.employerDetails?.companyName?.trim();
//       default:
//         return false;
//     }
//   }, [currentStep, formData]);

//   // Prevent function recreation
//   const renderForm = useMemo(() => {
//     switch (currentStep) {
//       case 1:
//         return <PersonnelDetails setPersonnelDetails={(data) => handleTempDataUpdate(data, 'personnelDetails')} />;
//       case 2:
//         return <EducationDetails setEducationDetails={(data) => handleTempDataUpdate(data, 'educationDetails')} />;
//       case 3:
//         return <BankDetails setBankDetails={(data) => handleTempDataUpdate(data, 'bankDetails')} />;
//       case 4:
//         return <EmployerDetails setEmployerDetails={(data) => handleTempDataUpdate(data, 'employerDetails')} />;
//       default:
//         return null;
//     }
//   }, [currentStep, handleTempDataUpdate]);

//   // Submit function with optimized FormData
//   const handleSubmit = useCallback(async () => {
//     try {

//       const combinedData = {
//         ...formData.personnelDetails,
//         ...formData.educationDetails,
//         ...formData.bankDetails,
//         ...formData.employerDetails,
//         companyCode: initialAuthState.companyCode,
//         unitCode: initialAuthState.unitCode,
//       };

//       // Debugging: Convert FormData to object for logging
//       // console.log("Final FormData:", Object.fromEntries(formPayload.entries()));

//       const response = await ApiService.post('/staff/handleStaffDetails', combinedData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.data.status) {
//         alert("Employee added successfully!");
//         navigate('/staff');
//       } else {
//         alert("Failed to save employee details. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error saving employee details:", error);
//       alert("Failed to save employee details. Please try again.");
//     }
//   }, [formData, navigate]);

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Complete the Form</h1>
//       {renderForm}
//       {currentStep < 4 && (
//         <button
//           onClick={() => setCurrentStep((prev) => prev + 1)}
//           // disabled={!isStepValid} // Enable validation
//           className={"mt-4 px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"}
//         >
//           Next
//         </button>
//       )}
//       {currentStep === 4 && (
//         <button
//           onClick={handleSubmit}
//           className="mt-4 ml-4 px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
//         >
//           Submit All Data
//         </button>
//       )}
//     </div>
//   );
// }

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

  const [formData, setFormData] = useState(() => ({
    personnelDetails: {},
    educationDetails: {},
    bankDetails: {},
    employerDetails: {},
  }));

  console.log('Current Form Data:', formData.educationDetails);

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
          />
        );
      case 2:
        return (
          <EducationDetails
            setEducationDetails={(data) =>
              handleTempDataUpdate(data, 'educationDetails')
            }
          />
        );
      case 3:
        return (
          <BankDetails
            setBankDetails={(data) => handleTempDataUpdate(data, 'bankDetails')}
          />
        );
      case 4:
        return (
          <EmployerDetails
            setEmployerDetails={(data) =>
              handleTempDataUpdate(data, 'employerDetails')
            }
          />
        );
      default:
        return null;
    }
  }, [currentStep, handleTempDataUpdate]);

  const handleSubmit = useCallback(async () => {
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
