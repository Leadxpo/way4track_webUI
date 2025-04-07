import { useState, useEffect } from 'react';

export default function EducationDetails({ setEducationDetails }) {
  const [qualifications, setQualification] = useState([
    {
      qualificationName: '',
      marksOrCgpa: '',
      qualificationFiles: null,
    },
  ]);
  const [experience, setExperience] = useState([
    {
      previousCompany: '',
      previous_designation: '',
      total_experience: '',
      previous_salary: '',
      letter: 'experienceLetter',
      experience: null,
    },
  ]);

  const [errors, setErrors] = useState({
    qualifications: [],
    experience: [],
  });

  const letterOptions = [
    'resignationLetter',
    'terminationLetter',
    'appointmentLetter',
    'leaveFormat',
    'relievingLetter',
    'experienceLetter',
  ];

  // Handle Qualification Input Change
  const handleQualificationChange = (index, field, value) => {
    const updatedQualification = [...qualifications];
    updatedQualification[index][field] = value;
    setQualification(updatedQualification);
  };

  // Handle Experience Input Change
  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  // Handle File Upload for Qualifications
  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    handleQualificationChange(index, 'qualificationFiles', file);
  };

  // Add Qualification
  const addQualification = () => {
    setQualification([
      ...qualifications,
      {
        qualificationName: '',
        marksOrCgpa: '',
        qualificationFiles: null,
      },
    ]);
  };

  // Remove Qualification
  const removeQualification = (index) => {
    if (qualifications.length > 1) {
      setQualification(qualifications.filter((_, i) => i !== index));
    }
  };

  // Add Experience
  const addExperience = () => {
    setExperience([
      ...experience,
      {
        previousCompany: '',
        previous_designation: '',
        total_experience: '',
        previous_salary: '',
        letter: 'experienceLetter',
        experience: null,
      },
    ]);
  };

  // Remove Experience
  const removeExperience = (index) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
  };

  // Validation for Qualifications and Experience
  const validateFields = () => {
    let qualificationErrors = [];
    let experienceErrors = [];

    // Validate Qualifications
    qualifications.forEach((qual, index) => {
      const qualErrors = [];
      if (!qual.qualificationName.trim()) {
        qualErrors.push('Qualification name is required.');
      }
      if (!qual.marksOrCgpa.trim()) {
        qualErrors.push('Marks or CGPA is required.');
      }
      if (!qual.qualificationFiles) {
        qualErrors.push('Qualification file is required.');
      }
      if (qualErrors.length > 0) {
        qualificationErrors[index] = qualErrors;
      }
    });

    // Validate Experience
    experience.forEach((exp, index) => {
      const expErrors = [];
      if (!exp.previousCompany.trim()) {
        expErrors.push('Previous company is required.');
      }
      if (!exp.previous_designation.trim()) {
        expErrors.push('Previous designation is required.');
      }
      if (!exp.total_experience.trim()) {
        expErrors.push('Total experience is required.');
      }
      if (!exp.previous_salary.trim()) {
        expErrors.push('Previous salary is required.');
      }
      if (!exp.letter) {
        expErrors.push('Experience letter type is required.');
      }
      if (!exp.experience) {
        expErrors.push('Experience file is required.');
      }
      if (expErrors.length > 0) {
        experienceErrors[index] = expErrors;
      }
    });

    // Set error state
    setErrors({
      qualifications: qualificationErrors,
      experience: experienceErrors,
    });

    // If there are any errors, return false, otherwise true
    return (
      qualificationErrors.every((err) => err.length === 0) &&
      experienceErrors.every((err) => err.length === 0)
    );
  };

  // Send Data to Parent on Change
  useEffect(() => {
    setEducationDetails({
      qualifications,
      experience,
    });
  }, [qualifications, experience, setEducationDetails]);

  return (
    <form className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Qualification Section */}
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        Qualification
        <button
          type="button"
          onClick={addQualification}
          className="ml-2 bg-green-500 text-white p-2 rounded"
        >
          +
        </button>
      </h2>

      {qualifications.map((qual, index) => (
        <div
          key={index}
          className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Qualification Name *"
              className="p-2 border rounded"
              value={qual.qualificationName}
              onChange={(e) =>
                handleQualificationChange(
                  index,
                  'qualificationName',
                  e.target.value
                )
              }
            // required
            />
            {errors.qualifications[index] &&
              errors.qualifications[index].includes(
                'Qualification name is required.'
              ) && (
                <p className="text-red-500 text-xs">
                  Qualification name is required.
                </p>
              )}
            <input
              type="text"
              placeholder="Marks or CGPA *"
              className="p-2 border rounded"
              value={qual.marksOrCgpa}
              onChange={(e) =>
                handleQualificationChange(index, 'marksOrCgpa', e.target.value)
              }
            // required
            />
            {errors.qualifications[index] &&
              errors.qualifications[index].includes(
                'Marks or CGPA is required.'
              ) && (
                <p className="text-red-500 text-xs">
                  Marks or CGPA is required.
                </p>
              )}
            <input
              type="file"
              className="border rounded p-2"
              onChange={(e) => handleFileChange(index, e)}
            />
            {errors.qualifications[index] &&
              errors.qualifications[index].includes(
                'Qualification file is required.'
              ) && (
                <p className="text-red-500 text-xs">
                  Qualification file is required.
                </p>
              )}
          </div>

          {index > 0 && (
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => removeQualification(index)}
            >
              -
            </button>
          )}
        </div>
      ))}

      {/* Experience Section */}
      <h2 className="text-2xl font-bold mt-6 mb-4 flex items-center">
        Experience
        <button
          type="button"
          onClick={addExperience}
          className="ml-2 bg-green-500 text-white p-2 rounded"
        >
          +
        </button>
      </h2>

      {experience.map((exp, index) => (
        <div
          key={index}
          className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Previous Company *"
              className="p-2 border rounded"
              value={exp.previousCompany}
              onChange={(e) =>
                handleExperienceChange(index, 'previousCompany', e.target.value)
              }
            // required
            />
            {errors.experience[index] &&
              errors.experience[index].includes(
                'Previous company is required.'
              ) && (
                <p className="text-red-500 text-xs">
                  Previous company is required.
                </p>
              )}
            <input
              type="text"
              placeholder="Previous Designation *"
              className="p-2 border rounded"
              value={exp.previous_designation}
              onChange={(e) =>
                handleExperienceChange(
                  index,
                  'previous_designation',
                  e.target.value
                )
              }
            // required
            />
            {errors.experience[index] &&
              errors.experience[index].includes(
                'Previous designation is required.'
              ) && (
                <p className="text-red-500 text-xs">
                  Previous designation is required.
                </p>
              )}
            <input
              type="text"
              placeholder="Total Experience (Years) *"
              className="p-2 border rounded"
              value={exp.total_experience}
              onChange={(e) =>
                handleExperienceChange(
                  index,
                  'total_experience',
                  e.target.value
                )
              }
            // required
            />
            {errors.experience[index] &&
              errors.experience[index].includes(
                'Total experience is required.'
              ) && (
                <p className="text-red-500 text-xs">
                  Total experience is required.
                </p>
              )}
            <input
              type="text"
              placeholder="Previous Salary *"
              className="p-2 border rounded"
              value={exp.previous_salary}
              onChange={(e) =>
                handleExperienceChange(index, 'previous_salary', e.target.value)
              }
            // required
            />
            {errors.experience[index] &&
              errors.experience[index].includes(
                'Previous salary is required.'
              ) && (
                <p className="text-red-500 text-xs">
                  Previous salary is required.
                </p>
              )}
            <select
              className="p-2 border rounded"
              value={exp.letter}
              onChange={(e) =>
                handleExperienceChange(index, 'letter', e.target.value)
              }
            >
              {letterOptions.map((option) => (
                <option key={option} value={option}>
                  {option.replace(/([A-Z])/g, ' $1').trim()}
                </option>
              ))}
            </select>
            <input
              type="file"
              className="border rounded p-2"
              onChange={(e) =>
                handleExperienceChange(index, 'experience', e.target.files[0])
              }
            />
            {errors.experience[index] &&
              errors.experience[index].includes(
                'Experience file is required.'
              ) && (
                <p className="text-red-500 text-xs">
                  Experience file is required.
                </p>
              )}
          </div>
          {index > 0 && (
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => removeExperience(index)}
            >
              -
            </button>
          )}
        </div>
      ))}
    </form>
  );
}

// import { useState, useEffect } from 'react';

// export default function EducationDetails({ setEducationDetails }) {
//   const [qualifications, setQualification] = useState([
//     {
//       qualificationName: '',
//       marksOrCgpa: '',
//       qualificationFiles: null,
//     },
//   ]);

//   const [experience, setExperience] = useState([
//     {
//       previousCompany: '',
//       previous_designation: '',
//       total_experience: '',
//       previous_salary: '',
//       letter: 'experienceLetter',
//       experience: null,
//     },
//   ]);

//   const letterOptions = [
//     'resignationLetter',
//     'terminationLetter',
//     'appointmentLetter',
//     'leaveFormat',
//     'relievingLetter',
//     'experienceLetter',
//   ];

//   // Handle Qualification Input Change
//   const handleQualificationChange = (index, field, value) => {
//     console.log('handleQualification');
//     const updatedQualification = [...qualifications];
//     updatedQualification[index][field] = value;
//     setQualification(updatedQualification);
//   };

//   // Handle Experience Input Change
//   const handleExperienceChange = (index, field, value) => {
//     const updatedExperience = [...experience];
//     updatedExperience[index][field] = value;
//     setExperience(updatedExperience);
//   };

//   // Handle File Upload
//   const handleFileChange = (index, event) => {
//     console.log('clicked');
//     const file = event.target.files[0];
//     console.log(file, 'test1');
//     handleQualificationChange(index, 'qualificationFiles', file);
//   };

//   // Add Qualification
//   const addQualification = () => {
//     setQualification([
//       ...qualifications,
//       {
//         qualificationName: '',
//         marksOrCgpa: '',
//         qualificationFiles: null,
//       },
//     ]);
//   };

//   // Remove Qualification
//   const removeQualification = (index) => {
//     if (qualifications.length > 1) {
//       setQualification(qualifications.filter((_, i) => i !== index));
//     }
//   };

//   // Add Experience
//   const addExperience = () => {
//     setExperience([
//       ...experience,
//       {
//         previousCompany: '',
//         previous_designation: '',
//         total_experience: '',
//         previous_salary: '',
//         letter: 'experienceLetter',
//         experience: null,
//       },
//     ]);
//   };

//   // Remove Experience
//   const removeExperience = (index) => {
//     if (experience.length > 1) {
//       setExperience(experience.filter((_, i) => i !== index));
//     }
//   };

//   // Send Data to Parent on Change
//   useEffect(() => {
//     setEducationDetails({
//       qualifications,
//       experience,
//     });
//   }, [qualifications, experience, setEducationDetails]);

//   return (
//     <form className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
//       {/* Qualification Section */}
//       <h2 className="text-2xl font-bold mb-4 flex items-center">
//         Qualification
//         <button
//           type="button"
//           onClick={addQualification}
//           className="ml-2 bg-green-500 text-white p-2 rounded"
//         >
//           +
//         </button>
//       </h2>

//       {qualifications.map((qual, index) => (
//         <div
//           key={index}
//           className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow"
//         >
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Qualification Name *"
//               className="p-2 border rounded"
//               value={qual.qualificationName}
//               onChange={(e) =>
//                 handleQualificationChange(
//                   index,
//                   'qualificationName',
//                   e.target.value
//                 )
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Marks or CGPA *"
//               className="p-2 border rounded"
//               value={qual.marksOrCgpa}
//               onChange={(e) =>
//                 handleQualificationChange(index, 'marksOrCgpa', e.target.value)
//               }
//               required
//             />
//             <input
//               type="file"
//               className="border rounded p-2"
//               onChange={(e) => handleFileChange(index, e)}
//             />
//           </div>

//           {index > 0 && (
//             <button
//               className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
//               onClick={() => removeQualification(index)}
//             >
//               -
//             </button>
//           )}
//         </div>
//       ))}

//       {/* Experience Section */}
//       <h2 className="text-2xl font-bold mt-6 mb-4 flex items-center">
//         Experience
//         <button
//           type="button"
//           onClick={addExperience}
//           className="ml-2 bg-green-500 text-white p-2 rounded"
//         >
//           +
//         </button>
//       </h2>

//       {experience.map((exp, index) => (
//         <div
//           key={index}
//           className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow"
//         >
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Previous Company *"
//               className="p-2 border rounded"
//               value={exp.previousCompany}
//               onChange={(e) =>
//                 handleExperienceChange(index, 'previousCompany', e.target.value)
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Previous Designation *"
//               className="p-2 border rounded"
//               value={exp.previous_designation}
//               onChange={(e) =>
//                 handleExperienceChange(
//                   index,
//                   'previous_designation',
//                   e.target.value
//                 )
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Total Experience (Years) *"
//               className="p-2 border rounded"
//               value={exp.total_experience}
//               onChange={(e) =>
//                 handleExperienceChange(
//                   index,
//                   'total_experience',
//                   e.target.value
//                 )
//               }
//               required
//             />
//             <input
//               type="text"
//               placeholder="Previous Salary *"
//               className="p-2 border rounded"
//               value={exp.previous_salary}
//               onChange={(e) =>
//                 handleExperienceChange(index, 'previous_salary', e.target.value)
//               }
//               required
//             />
//             <select
//               className="p-2 border rounded"
//               value={exp.letter}
//               onChange={(e) =>
//                 handleExperienceChange(index, 'letter', e.target.value)
//               }
//             >
//               {letterOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option.replace(/([A-Z])/g, ' $1').trim()}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="file"
//               className="border rounded p-2"
//               onChange={(e) =>
//                 handleExperienceChange(
//                   index,
//                   'uploadLetters',
//                   e.target.files[0]
//                 )
//               }
//             />
//           </div>
//           {index > 0 && (
//             <button
//               className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
//               onClick={() => removeExperience(index)}
//             >
//               -
//             </button>
//           )}
//         </div>
//       ))}
//     </form>
//   );
// }
