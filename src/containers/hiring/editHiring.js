import React, { useState } from 'react';

const EditHiring = () => {
  // Static candidate data
  const candidate = {
    name: 'Sai Kumar',
    email: 'way4teack@gmail.com',
    phone: '+91 45645 64556',
    level: 2,
    levels: [
      {
        type: 'Technical',
        dateOfConductor: '2023-12-10',
        conductorBy: 'HR',
        conductorPlace: 'Hyderabad',
        result: 'Pass',
        review: 'Good performance',
      },
      {},
      {},
      {},
    ],
  };

  const [levels, setLevels] = useState(candidate.levels);
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
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p>Email: {candidate.email}</p>
            <p>Phone Number: {candidate.phone}</p>
            <p>Level: {candidate.level}</p>
          </div>
        </div>

        {/* Levels */}
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
                    <span>Type:</span>
                    <input
                      type="text"
                      className="w-full border px-4 py-2 rounded-md"
                      value={level.type || ''}
                      onChange={(e) =>
                        handleInputChange(index, 'type', e.target.value)
                      }
                    />
                  </label>
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
                        handleInputChange(index, 'conductorBy', e.target.value)
                      }
                    />
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
