import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const HiringDetails = () => {
  // Static candidate data
  const location = useLocation();
  const HiringDetail = location.state?.HiringDetails || {};
  const [candidate, setCandidate] = useState({});

  
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await ApiService.post('/hiring/getHiringDetails', {
          id: HiringDetail.id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          const hiring = response.data?.[0];
          setCandidate({
            ...hiring,
            candidateName: hiring.candidateName,
            phoneNumber: hiring.phoneNumber,
            email: hiring.email,
            qualifications: hiring.qualifications,
            levelWiseData: hiring.levelWiseData,
            address: hiring.address,
            status: hiring.status,
            dateOfUpload: hiring.dateOfUpload,
            resumePath: hiring.resumePath,
            hiringLevel: hiring.hiringLevel,

          });
        } else {
          setCandidate({})
        }

      } catch (error) {
        console.error('Error fetching branch details:', error);
        alert('Failed to fetch branch details.');
      }
    };
    fetchClientDetails();

  }, [HiringDetail.id]);
  const [levels, setLevels] = useState(candidate.levels);
  const [expandedLevels, setExpandedLevels] = useState([
    true,
    false,
    false,
    false,
  ]);

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
        <div className="flex items-center space-x-6 bg-white p-4 rounded-md shadow">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{candidate.candidateName}</h2>
            <p>Email: {candidate.email}</p>
            <p>Phone Number: {candidate.phoneNumber}</p>
            <p>Level: {candidate.hiringLevel}</p>
            <p>Address: {candidate.address}</p>

          </div>
        </div>

        {/* Levels */}
        <div>
          <h2 className="text-xl font-bold mb-4">Levels</h2>
          {levels.map((level, index) => (
            <div key={index} className="bg-white rounded-md shadow mb-4">
              <div
                className={`flex items-center justify-between p-4 cursor-pointer ${expandedLevels[index]
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
                    <span>Type:</span>
                    <input
                      type="text"
                      className="w-full border px-4 py-2 rounded-md"
                      value={level.type || ''}
                      disabled
                    />
                  </label>
                  <label>
                    <span>Date of Conductor:</span>
                    <input
                      type="date"
                      className="w-full border px-4 py-2 rounded-md"
                      value={level.dateOfConductor || ''}
                      disabled
                    />
                  </label>
                  <label>
                    <span>Conductor By:</span>
                    <input
                      type="text"
                      className="w-full border px-4 py-2 rounded-md"
                      value={level.conductorBy || ''}
                      disabled
                    />
                  </label>
                  <label>
                    <span>Conductor Place:</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default HiringDetails;
