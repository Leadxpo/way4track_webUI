// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import ApiService from '../../services/ApiService';
// import { initialAuthState } from '../../services/ApiService';
// const HiringDetails = () => {
//   // Static candidate data
//   const location = useLocation();
//   const HiringDetail = location.state?.HiringDetails || {};
//   const [candidate, setCandidate] = useState({});


//   useEffect(() => {
//     const fetchClientDetails = async () => {
//       try {
//         const response = await ApiService.post('/hiring/getHiringDetails', {
//           id: HiringDetail.id,
//           companyCode: initialAuthState.companyCode,
//           unitCode: initialAuthState.unitCode,
//         });
//         if (response.status) {
//           const hiring = response.data?.[0];
//           setCandidate({
//             ...hiring,
//             candidateName: hiring.candidateName,
//             phoneNumber: hiring.phoneNumber,
//             email: hiring.email,
//             qualifications: hiring.qualifications,
//             levelWiseData: hiring.levelWiseData,
//             address: hiring.address,
//             status: hiring.status,
//             dateOfUpload: hiring.dateOfUpload,
//             resumePath: hiring.resumePath,
//             hiringLevel: hiring.hiringLevel,

//           });
//         } else {
//           setCandidate({})
//         }

//       } catch (error) {
//         console.error('Error fetching branch details:', error);
//         alert('Failed to fetch branch details.');
//       }
//     };
//     fetchClientDetails();

//   }, [HiringDetail.id]);
//   const [levels, setLevels] = useState(candidate.levels);
//   const [expandedLevels, setExpandedLevels] = useState([
//     true,
//     false,
//     false,
//     false,
//   ]);

//   const toggleLevel = (index) => {
//     const updatedExpandedLevels = [...expandedLevels];
//     updatedExpandedLevels[index] = !updatedExpandedLevels[index];
//     setExpandedLevels(updatedExpandedLevels);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8 space-y-6">
//         <h2 className="text-3xl font-bold">Hiring Details</h2>
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
//             <p>Address: {candidate.address}</p>

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
//                     <span>Type:</span>
//                     <input
//                       type="text"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.type || ''}
//                       disabled
//                     />
//                   </label>
//                   <label>
//                     <span>Date of Conductor:</span>
//                     <input
//                       type="date"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.dateOfConductor || ''}
//                       disabled
//                     />
//                   </label>
//                   <label>
//                     <span>Conductor By:</span>
//                     <input
//                       type="text"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.conductorBy || ''}
//                       disabled
//                     />
//                   </label>
//                   <label>
//                     <span>Conductor Place:</span>
//                     <input
//                       type="text"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.conductorPlace || ''}
//                       disabled
//                     />
//                   </label>
//                   <label>
//                     <span>Result:</span>
//                     <input
//                       type="text"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.result || ''}
//                       disabled
//                     />
//                   </label>
//                   <label>
//                     <span>Review:</span>
//                     <input
//                       type="text"
//                       className="w-full border px-4 py-2 rounded-md"
//                       value={level.review || ''}
//                       disabled
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

// export default HiringDetails;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { FaDownload } from 'react-icons/fa';

const HiringDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const HiringDetail = location.state?.hiring || {};
  const [candidate, setCandidate] = useState({});
  const [levels, setLevels] = useState([]);
  const [expandedLevels, setExpandedLevels] = useState([true, false, false, false]);
 
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await ApiService.post('/hiring/getHiringDetailsById', {
          id:HiringDetail.hiringId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.data) {
          // const hiring = response.data?.[0];
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

          // Ensure levels is set correctly
          setLevels(hiring?.levelWiseData || []);
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
  }, [HiringDetail.id]);

  const toggleLevel = (index) => {
    const updatedExpandedLevels = [...expandedLevels];
    updatedExpandedLevels[index] = !updatedExpandedLevels[index];
    setExpandedLevels(updatedExpandedLevels);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8 space-y-6">
        <h2 className="text-3xl font-bold">Hiring Details</h2>

        {/* Header */}
        <div className="relative flex items-center space-x-6 bg-white p-4 rounded-md shadow">
  {/* <img
    src="https://via.placeholder.com/150"
    alt="Profile"
    className="w-24 h-24 rounded-full object-cover"
  /> */}
  <div>
    <h2 className="text-xl font-semibold">Name: {candidate.candidateName}</h2>
    <p>Email: {candidate.email}</p>
    <p>Phone Number: {candidate.phoneNumber}</p>
    <p>Level: {candidate.hiringLevel}</p>
    <p>Address: {candidate.address}</p>
    <p className="flex items-center">
      Resume download:
      <a
        href={candidate.resumePath}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center ml-2"  // Adds margin-left for spacing
      >
        <FaDownload size={20} color="green" />
      </a>
    </p>
  </div>

  {candidate.status === "Qualified" && (
    <button
      className="absolute m-3 top-0 right-0 h-12 px-4 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
      onClick={() => navigate("/add-staff", { state: {candidateDetails:candidate} })}
    >
      Add to Staff
    </button>
  )}
</div>


        {/* Levels */}
        <div>
          <h2 className="text-xl font-bold mb-4">Levels</h2>
          {levels.length > 0 ? (
            levels.map((level, index) => (
              <div key={index} className="bg-white rounded-md shadow mb-4">
                <div
                  className={`flex items-center justify-between p-4 cursor-pointer ${expandedLevels[index] ? 'bg-green-600 text-white' : 'bg-gray-200'
                    }`}
                  onClick={() => toggleLevel(index)}
                >
                  <h3 className="font-semibold">Level {index + 1}</h3>
                  <span>{expandedLevels[index] ? '⬆' : '⬇'}</span>
                </div>
                {expandedLevels[index] && (
                  <div className="p-4 grid grid-cols-2 gap-4">
                    {/* <label>
                      <span>Type:</span>
                      <input
                        type="text"
                        className="w-full border px-4 py-2 rounded-md"
                        value={level.type || ''}
                        disabled
                      />
                    </label> */}
                    <label>
                      <span>Date of Interview:</span>
                      <input
                        type="date"
                        className="w-full border px-4 py-2 rounded-md"
                        value={level.dateOfConductor ? level.dateOfConductor.split('T')[0] : ''}
                        disabled
                      />
                    </label>
                    <label>
                      <span>Interviewed By:</span>
                      <input
                        type="text"
                        className="w-full border px-4 py-2 rounded-md"
                        value={level.conductorBy || ''}
                        disabled
                      />
                    </label>
                    <label>
                      <span>Place of Interview:</span>
                      <input
                        type="text"
                        className="w-full border px-4 py-2 rounded-md"
                        value={level.conductorPlace || ''}
                        disabled
                      />
                    </label>
                    <label>
                      <span>Result:</span>
                      <input
                        type="text"
                        className="w-full border px-4 py-2 rounded-md"
                        value={level.result || ''}
                        disabled
                      />
                    </label>
                    <label>
                      <span>Review:</span>
                      <input
                        type="text"
                        className="w-full border px-4 py-2 rounded-md"
                        value={level.review || ''}
                        disabled
                      />
                    </label>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No levels available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HiringDetails;
