// import React, { useState, useEffect } from 'react';
// import ApiService from '../../services/ApiService';
// import { useNavigate, useLocation } from 'react-router';
// import { initialAuthState } from '../../services/ApiService';
// const EditHiring = () => {
//   const [candidate, setCandidate] = useState([]);
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const hiringToEdit = state?.hiringDetails;
//   useEffect(() => {
//     const fetchClientDetailsData = async () => {
//       try {
//         const response = await ApiService.post('/hiring/saveHiringDetailsWithResume', {
//           id: hiringToEdit.id,
//           companyCode: initialAuthState.companyCode,
//           unitCode: initialAuthState.unitCode,
//         });
//         if (response.status) {
//           // Ensure client details data is an array
//           setCandidate(response.data || []);
//           navigate('/hiring');
//         } else {
//           setCandidate([]);
//         }
//       } catch (error) {
//         console.error('Error fetching client details data:', error);
//         alert('Failed to fetch client details data.');
//       }
//     };
//     fetchClientDetailsData();
//   }, [hiringToEdit.id]);
//   const [levels, setLevels] = useState(candidate.levelWiseData);
//   const [expandedLevels, setExpandedLevels] = useState([
//     true,
//     false,
//     false,
//     false,
//   ]);

//   const handleInputChange = (levelIndex, field, value) => {
//     const updatedLevels = [...levels];
//     updatedLevels[levelIndex][field] = value;
//     setLevels(updatedLevels);
//   };

//   const toggleLevel = (index) => {
//     const updatedExpandedLevels = [...expandedLevels];
//     updatedExpandedLevels[index] = !updatedExpandedLevels[index];
//     setExpandedLevels(updatedExpandedLevels);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8 space-y-6">
//         <h2 className="text-3xl font-bold">Edit Hiring</h2>
//         {/* Header */}
//         <div className="flex items-center space-x-6 bg-white p-4 rounded-md shadow">
//           <img
//             src="https://via.placeholder.com/150"
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover"
//           />
//           <div>
//             <h2 className="text-xl font-semibold">{candidate.candidateName}</h2>
//             <p>Email: {candidate.email}</p>
//             <p>Phone Number: {candidate.phoneNumber}</p>
//             <p>Level: {candidate.hiringLevel}</p>
//             <p>Level: {candidate.address}</p>
//             <p>Level: {candidate.resume}</p>
//             <p>Level: {candidate.status}</p>
//           </div>
//         </div>

//         {/* Levels */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Levels</h2>
//           {levels.map((level, index) => (
//             <div key={index} className="bg-white rounded-md shadow mb-4">
//               <div
//                 className={`flex items-center justify-between p-4 cursor-pointer ${expandedLevels[index]
//                   ? 'bg-green-600 text-white'
//                   : 'bg-gray-200'
//                   }`}
//                 onClick={() => toggleLevel(index)}
//               >
//                 <h3 className="font-semibold">Level {index + 1}</h3>
//                 <span>{expandedLevels[index] ? '⬆' : '⬇'}</span>
//               </div>
//               {expandedLevels[index] && (
//                 <div className="p-4 grid grid-cols-2 gap-4">

//                   <label>
//                     <span>Date of Conductor:</span>
//                     <input
//                       type="date"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.dateOfConductor || ''}
//                       onChange={(e) =>
//                         handleInputChange(
//                           index,
//                           'dateOfConductor',
//                           e.target.value
//                         )
//                       }
//                     />
//                   </label>
//                   <label>
//                     <span>Conductor By:</span>
//                     <select
//                       value={level.conductorBy || ''}
//                       onChange={(e) =>
//                         handleInputChange(index, 'conductorBy', e.target.value)
//                       }
//                       className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
//                     >
//                       <option value="">Select designation</option>
//                       <option value="CEO">CEO</option>
//                       <option value="HR">HR</option>
//                       <option value="Accountant">Accountant</option>
//                       <option value="BranchManager">Branch Manager</option>
//                       <option value="SubDealer">Sub Dealer</option>
//                       <option value="Technician">Technician</option>
//                       <option value="SalesMan">Sales Man</option>
//                       <option value="CallCenter">Call Center</option>
//                       <option value="Warehouse Manager">Warehouse Manager</option>
//                     </select>
//                   </label>
//                   <label>
//                     <span>Conductor Place:</span>
//                     <input
//                       type="text"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.conductorPlace || ''}
//                       onChange={(e) =>
//                         handleInputChange(
//                           index,
//                           'conductorPlace',
//                           e.target.value
//                         )
//                       }
//                     />
//                   </label>
//                   <label>
//                     <span>Result:</span>
//                     <input
//                       type="text"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.result || ''}
//                       onChange={(e) =>
//                         handleInputChange(index, 'result', e.target.value)
//                       }
//                     />
//                   </label>
//                   <label>
//                     <span>Review:</span>
//                     <input
//                       type="text"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.review || ''}
//                       onChange={(e) =>
//                         handleInputChange(index, 'review', e.target.value)
//                       }
//                     />
//                   </label>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditHiring;

import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { useNavigate, useLocation } from 'react-router';
import { initialAuthState } from '../../services/ApiService';

const EditHiring = () => {
  const [candidate, setCandidate] = useState(null);
  const [levels, setLevels] = useState([]);
  const [status, setStatus] = useState();
  const [expandedLevels, setExpandedLevels] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const hiringToEdit =  location.state?.hiring || {};

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await ApiService.post('/hiring/getHiringDetailsById', {
          id: hiringToEdit?.hiringId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });

        if (response.status) {
          const hiring = response.data;
          setCandidate({
            ...hiring,
            candidateName: hiring?.candidateName || '',
            phoneNumber: hiring?.phoneNumber || '',
            email: hiring?.email || '',
            qualifications: hiring?.qualifications || '',
            address: hiring?.address || '',
            status: hiring?.status || '',
            dateOfUpload: hiring?.dateOfUpload || '',
            resumePath: hiring?.resumePath || '',
            hiringLevel: hiring?.hiringLevel || '',
          });

          console.log(hiring.levelWiseData);
          // Ensure levels is set correctly
          setLevels(response.data?.levelWiseData || []);
        } else {
          setCandidate({});
          setLevels([]);
        }
      } catch (error) {
        console.error('Error fetching hiring details:', error);
        alert('Failed to fetch hiring details.');
      }
    };

    fetchClientDetails();
  }, [location.state?.hiring]);
  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append('id', hiringToEdit.hiringId);
    payload.append('hiringLevel', hiringToEdit.hiringLevel);
    payload.append('candidateName', hiringToEdit.candidateName);
    payload.append('phoneNumber', hiringToEdit.phoneNumber);
    payload.append('email', hiringToEdit.email);
    payload.append('address', hiringToEdit.address);
    payload.append('dateOfUpload', hiringToEdit.dateOfUpload);
    payload.append('status', status);
    payload.append('companyCode', hiringToEdit.companyCode);
    payload.append('unitCode', hiringToEdit.unitCode);

    // Append qualifications
    // hiringToEdit.qualifications.forEach((q, index) => {
    //   payload.append(`qualifications[${index}][qualificationName]`, q.name);
    //   payload.append(`qualifications[${index}][marks]`, q.marks);
    //   payload.append(`qualifications[${index}][yearOfPass]`, q.year);
    // });

    // Append Level Wise Data
    levels.forEach((level, index) => {
      payload.append(
        `levelWiseData[${index}][dateOfConductor]`,
        level.dateOfConductor
      );
      payload.append(`levelWiseData[${index}][conductorBy]`, level.conductorBy);
      payload.append(
        `levelWiseData[${index}][conductorPlace]`,
        level.conductorPlace
      );
      payload.append(`levelWiseData[${index}][result]`, level.result);
      payload.append(`levelWiseData[${index}][review]`, level.review);
    });

    // Append resume file

    try {
      const endpoint = `/hiring/saveHiringDetailsWithResume`;
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status) {
        alert('Hiring details saved successfully!');
        navigate('/hiring');
      } else {
        alert('Failed to save hiring details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving hiring details:', error);
      alert('Failed to save hiring details. Please try again.');
    }
  };
  // useEffect(() => {
  //   const fetchClientDetailsData = async () => {
  //     console.log(location.state.hiringDetails, "?????????????")
  //     if (!hiringToEdit?.hiringId) {
  //       console.warn('No hiringToEdit ID provided.');
  //       return;
  //     }

  //     try {
  //       const response = await ApiService.post('/hiring/saveHiringDetailsWithResume', {
  //         id: hiringToEdit.hiringId,
  //         companyCode: initialAuthState.companyCode,
  //         unitCode: initialAuthState.unitCode,
  //       });

  //       console.log('API Response:', response);
  //       console.log(response, ":::::::::::::::::::::::::")

  //       if (response.status) {
  //         setCandidate(response.data || {});
  //         setLevels(response.data?.levelWiseData || []);
  //         setExpandedLevels(new Array(response.data?.levelWiseData?.length || 0).fill(false));
  //       } else {
  //         setCandidate({});
  //         setLevels([]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching client details data:', error);
  //       alert('Failed to fetch candidate details.');
  //     }
  //   };

  //   fetchClientDetailsData();
  // }, [hiringToEdit.hiringId]);

  const handleInputChange = (levelIndex, field, value) => {
    setLevels((prevLevels) => {
      const updatedLevels = [...prevLevels];
      updatedLevels[levelIndex] = {
        ...updatedLevels[levelIndex],
        [field]: value,
      };
      return updatedLevels;
    });
  };

  const handleStatus = (e) => {
    console.log("Selected status:", e.target.value);
    setStatus(e.target.value);
  };


  const toggleLevel = (index) => {
    setExpandedLevels((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const addLevel = () => {
    setLevels([
      ...levels,
      {
        result: '',
        review: '',
        conductorBy: '',
        conductorPlace: '',
        dateOfConductor: '',
      },
    ]);
  };

  const removeLevel = () => {
    const tempLevels = levels;
    tempLevels.pop();
    setLevels([...tempLevels]);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8 space-y-6">
        <h2 className="text-3xl font-bold">Edit Hiring</h2>

        {candidate === null ? (
          <p>Loading candidate details...</p>
        ) : Object.keys(candidate).length === 0 ? (
          <p>No candidate details found.</p>
        ) : (
          <>
            <div className="flex items-center space-x-6 bg-white p-4 rounded-md shadow">
              {/* <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              /> */}
              <div>
                <h2 className="text-xl font-semibold">
                  {candidate.candidateName}
                </h2>
                <p>Email: {candidate.email}</p>
                <p>Phone Number: {candidate.phoneNumber}</p>
                <p>Level: {candidate.hiringLevel}</p>
                <p>Address: {candidate.address}</p>
                <p>Resume: {candidate.resume}</p>
                <p>Status: {candidate.status}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Levels</h2>
              {levels.map((level, index) => (
                <div key={index} className="bg-white rounded-md shadow mb-4">
                  <div
                    className={`flex items-center justify-between p-4 cursor-pointer ${
                      expandedLevels[index]
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200'
                    }`}
                    onClick={() => toggleLevel(index)}
                  >
                    <h3 className="font-semibold">Level {index + 1}</h3>
                    <span>{expandedLevels[index] ? '⬆' : '⬇'}</span>
                  </div>
                  {expandedLevels[index] && (
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <label>
                        <span>Date of Conductor:</span>
                        <input
                          type="date"
                          className="w-full border px-4 py-2 rounded-md"
                          value={level.dateOfConductor || ''}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'dateOfConductor',
                              e.target.value
                            )
                          }
                        />
                      </label>
                      <label>
                        <span>Conductor By:</span>
                        <input
                          type="text"
                          className="w-full border px-4 py-2 rounded-md"
                          value={level.conductorBy || ''}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'conductorBy',
                              e.target.value
                            )
                          }
                        />
                        {/* <select
                          value={level.conductorBy || ''}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'conductorBy',
                              e.target.value
                            )
                          }
                          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                        >
                          <option value="">Select designation</option>
                          <option value="CEO">CEO</option>
                          <option value="HR">HR</option>
                          <option value="Accountant">Accountant</option>
                          <option value="BranchManager">Branch Manager</option>
                          <option value="SubDealer">Sub Dealer</option>
                          <option value="Technician">Technician</option>
                          <option value="SalesMan">Sales Man</option>
                          <option value="CallCenter">Call Center</option>
                          <option value="Warehouse Manager">
                            Warehouse Manager
                          </option>
                        </select> */}
                      </label>
                      <label>
                        <span>Conductor Place:</span>
                        <input
                          type="text"
                          className="w-full border px-4 py-2 rounded-md"
                          value={level.conductorPlace || ''}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'conductorPlace',
                              e.target.value
                            )
                          }
                        />
                      </label>
                      <label>
                        <span>Result:</span>
                        <input
                          type="text"
                          className="w-full border px-4 py-2 rounded-md"
                          value={level.result || ''}
                          onChange={(e) =>
                            handleInputChange(index, 'result', e.target.value)
                          }
                        />
                      </label>
                      <label>
                        <span>Review:</span>
                        <input
                          type="text"
                          className="w-full border px-4 py-2 rounded-md"
                          value={level.review || ''}
                          onChange={(e) =>
                            handleInputChange(index, 'review', e.target.value)
                          }
                        />
                      </label>
                    </div>
                  )}
                </div>
              ))}
              <div>
                <button
                  className="bg-yellow-500 w-30 text-white p-2 rounded-md mr-4"
                  onClick={addLevel}
                >
                  Add Level
                </button>
                <button
                  className="bg-red-500 w-30 text-white p-2 rounded-md"
                  onClick={removeLevel}
                >
                  Remove Level
                </button>
              </div>
            </div>

            <label>
                        <span>Hiring status:</span>
                        <select
            value={status}
            onChange={handleStatus}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
          >
            <option value="">Select Status</option>
            {['rejected', 'INTERVIEWED','qualified',].map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
                      </label>
            <button
              onClick={handleSubmit}
              className="bg-green-700 w-20 text-white p-2 rounded-md"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditHiring;
