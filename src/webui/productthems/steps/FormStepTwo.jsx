import React from 'react';
import "../styles/FormSteps.css";



function FormStepTwo({ stepRepeatedItems, setStepRepeatedItems, setStepsData, stepsData, currentStep,  handleImageChange,imagePreviews}) {
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
      <h2 className="form-step-title">Amenities</h2>
      <p className="form-step-description">
        Add up to 6 amenities that enhance your product's appeal. Each amenity should have a name, description, and optional image.
      </p>
      
      <div className="amenities-grid">
        {stepRepeatedItems[currentStep]?.map((item, index) => (
          <div className="amenity-card" key={index}>
            <div className="amenity-header">
              <h3 className="amenity-title">Amenity {index + 1}</h3>
            </div>
            
            <div className="amenity-body">
              <div className="form-group">
                <label className="form-label">Name</label>
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
                  placeholder="Enter amenity name"
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
                  placeholder="Enter a brief description"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Image</label>
                <div className="image-upload-container">
                  {item.photos ? (
                    <div className="image-preview-container">
                      <img 
                        src={URL.createObjectURL(item.photos)} 
                        alt={`Amenity ${index + 1}`} 
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
                        id={`amenity-image-${index}`}
                        className="file-input"
                        accept="image/*"
                        onChange={(e) =>{
                          handleImageChange(`amenity${index}`, e.target.files[0])
                          handleRepeatedItemChange(
                            currentStep,
                            index,
                            'photos',
                            e.target.files[0]
                          )
                        }
                        }
                      />
                      <label htmlFor={`amenity-image-${index}`} className="file-label">
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

      <div className="amenities-tips">
        <h4>Tips for great amenities:</h4>
        <ul>
          <li>Use clear, concise names that highlight the benefit</li>
          <li>Keep descriptions brief but informative</li>
          <li>Use high-quality images that showcase the amenity</li>
          <li>Focus on what makes your product unique</li>
        </ul>
      </div>
    </div>
  );
}

export default FormStepTwo;