import React from 'react';
import "../styles/FormSteps.css";



function FormStepThree({ stepRepeatedItems, setStepRepeatedItems, setStepsData, stepsData, currentStep, handleImageChange, imagePreviews, }) {
  const handleRepeatedItemChange = (stepIndex, itemIndex, field, value) => {
    const updated = [...stepRepeatedItems[stepIndex]];
    updated[itemIndex][field] = value;
    setStepRepeatedItems({ ...stepRepeatedItems, [stepIndex]: updated });

    const updatedSteps = [...stepsData];
    updatedSteps[stepIndex].fields.repeatedItems = updated;
    setStepsData(updatedSteps);
  };

  return (
    <div className="form-step">
      <h2 className="form-step-title">Applications</h2>
      <p className="form-step-description">
        Define up to 6 applications or use cases for your product. Show customers how they can benefit from your product across different scenarios.
      </p>

      <div className="applications-grid">
        {stepRepeatedItems[currentStep]?.map((item, index) => (
          <div className="application-card" key={index}>
            <div className="application-header">
              <h3 className="application-title">Application {index + 1}</h3>
            </div>

            <div className="application-body">
              <div className="form-group">
                <label className="form-label">Application Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.name}
                  onChange={(e) =>
                    handleRepeatedItemChange(
                      currentStep,
                      index,
                      'name',
                      e.target.value
                    )
                  }
                  placeholder="Enter application name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={item.desc}
                  onChange={(e) =>
                    handleRepeatedItemChange(
                      currentStep,
                      index,
                      'desc',
                      e.target.value
                    )
                  }
                  placeholder="Explain how this application works"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image</label>
                <div className="image-upload-container">
                  {item.photos ? (
                    <div className="image-preview-container">
                      <img
                        src={URL.createObjectURL(item.photos)}
                        alt={`Application ${index + 1}`}
                        className="image-preview"
                      />
                      <button
                        className="remove-image-btn"
                        onClick={() => {
                          handleRepeatedItemChange(
                            currentStep,
                            index,
                            'photos',
                            null
                          );
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="image-upload-field">
                      <input
                        type="file"
                        id={`application-image-${index}`}
                        className="file-input"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(`application${index}`, e.target.files[0])
                          handleRepeatedItemChange(
                            currentStep,
                            index,
                            'photos',
                            e.target.files[0]
                          )
                        }
                        }
                      />
                      <label htmlFor={`application-image-${index}`} className="file-label">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="applications-tips">
        <h4>Tips for effective applications:</h4>
        <ul>
          <li>Focus on real-world scenarios where your product shines</li>
          <li>Use specific, concrete examples rather than general statements</li>
          <li>Include images that show the application in use</li>
          <li>Highlight different industries or user types when applicable</li>
        </ul>
      </div>
    </div>
  );
}

export default FormStepThree;