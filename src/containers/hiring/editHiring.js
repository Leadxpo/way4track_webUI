import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { useNavigate, useLocation } from 'react-router';
import { initialAuthState } from '../../services/ApiService';
const EditHiring = () => {
  const [candidate, setCandidate] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const hiringToEdit = state?.hiringDetails;
  useEffect(() => {
    const fetchClientDetailsData = async () => {
      try {
        const response = await ApiService.post('/hiring/saveHiringDetailsWithResume', {
          id: hiringToEdit.id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          // Ensure client details data is an array
          setCandidate(response.data || []);
          navigate('/hiring');
        } else {
          setCandidate([]);
        }
      } catch (error) {
        console.error('Error fetching client details data:', error);
        alert('Failed to fetch client details data.');
      }
    };
    fetchClientDetailsData();
  }, [hiringToEdit.id]);
  const [levels, setLevels] = useState(candidate.levelWiseData);
  const [expandedLevels, setExpandedLevels] = useState([
    true,
    false,
    false,
    false,
  ]);

  const handleInputChange = (levelIndex, field, value) => {
    const updatedLevels = [...levels];
    updatedLevels[levelIndex][field] = value;
    setLevels(updatedLevels);
  };

  const toggleLevel = (index) => {
    const updatedExpandedLevels = [...expandedLevels];
    updatedExpandedLevels[index] = !updatedExpandedLevels[index];
    setExpandedLevels(updatedExpandedLevels);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8 space-y-6">
        <h2 className="text-3xl font-bold">Edit Hiring</h2>
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
            <p>Level: {candidate.address}</p>
            <p>Level: {candidate.resume}</p>
            <p>Level: {candidate.status}</p>
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
                    <select
                      value={level.conductorBy || ''}
                      onChange={(e) =>
                        handleInputChange(index, 'conductorBy', e.target.value)
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
                      <option value="Warehouse Manager">Warehouse Manager</option>
                    </select>
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
        </div>
      </div>
    </div>
  );
};

export default EditHiring;
