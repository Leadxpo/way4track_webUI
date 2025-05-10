import React from 'react';
import "../styles/FormSteps.css";



function FormStepFour({ step4Items, setStep4Items }) {
  const handleStep4FieldChange = (index, field, value) => {
    const updated = [...step4Items];
    updated[index][field] = value;
    setStep4Items(updated);
  };

  const addStep4Item = () => {
    setStep4Items([
      ...step4Items,
      { webProductName: '', photo: null, model: '' },
    ]);
  };

  const removeStep4Item = (index) => {
    if (step4Items.length === 1) return;
    const updated = [...step4Items];
    updated.splice(index, 1);
    setStep4Items(updated);
  };

  return (
    <div className="form-step">
      <h2 className="form-step-title">Devices</h2>
      <p className="form-step-description">
        Add device specifications, pricing, and options for your product.
      </p>

      <div className="devices-container">
        {step4Items.map((item, index) => (
          <div className="device-card" key={index}>
            <div className="device-header">
              <h3 className="device-title">Device {index + 1}</h3>
              {step4Items.length > 1 && (
                <button
                  className="btn btn-icon btn-danger"
                  onClick={() => removeStep4Item(index)}
                >
                  ×
                </button>
              )}
            </div>
            
            <div className="device-body">
              <div className="form-row">
                <div className="form-group col-6">
                  <label className="form-label">Device Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.name || ''}
                    onChange={(e) =>
                      handleStep4FieldChange(
                        index,
                        'name',
                        e.target.value
                      )
                    }
                    placeholder="Enter device name"
                  />
                </div>
                
                <div className="form-group col-6">
                  <label className="form-label">Model</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.model || ''}
                    onChange={(e) =>
                      handleStep4FieldChange(
                        index,
                        'model',
                        e.target.value
                      )
                    }
                    placeholder="Enter model number"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Device Image</label>
                <div className="image-upload-container">
                  {item.photo ? (
                    <div className="image-preview-container">
                      <img 
                        src={URL.createObjectURL(item.photo)} 
                        alt={`Device ${index + 1}`} 
                        className="image-preview" 
                      />
                      <button 
                        className="remove-image-btn"
                        onClick={() => {
                          handleStep4FieldChange(
                            index,
                            'photo',
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
                        id={`device-photo-${index}`}
                        className="file-input"
                        accept="image/*"
                        onChange={(e) =>
                          handleStep4FieldChange(
                            index,
                            'photo',
                            e.target.files[0]
                          )
                        }
                      />
                      <label htmlFor={`device-photo-${index}`} className="file-label">
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
              
              <div className="form-row">
                <div className="form-group col-6">
                  <label className="form-label">Base Price</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      value={item.amount || 0}
                      onChange={(e) =>
                        handleStep4FieldChange(
                          index,
                          'amount',
                          parseFloat(e.target.value)
                        )
                      }
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="form-group col-6">
                  <label className="form-label">Discount (%)</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={item.discount || 0}
                      onChange={(e) =>
                        handleStep4FieldChange(
                          index,
                          'discount',
                          parseFloat(e.target.value)
                        )
                      }
                      placeholder="0"
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group col-6">
                  <div className="switch-container">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={item.isRelay || false}
                        onChange={(e) =>
                          handleStep4FieldChange(
                            index,
                            'isRelay',
                            e.target.checked
                          )
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className="switch-label">Relay Option</span>
                  </div>
                  
                  {item.isRelay && (
                    <div className="input-group mt-2">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        value={item.relayAmt || 0}
                        onChange={(e) =>
                          handleStep4FieldChange(
                            index,
                            'relayAmt',
                            parseFloat(e.target.value)
                          )
                        }
                        placeholder="Relay Amount"
                      />
                    </div>
                  )}
                </div>
                
                <div className="form-group col-6">
                  <div className="switch-container">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={item.isNetwork || false}
                        onChange={(e) =>
                          handleStep4FieldChange(
                            index,
                            'isNetwork',
                            e.target.checked
                          )
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className="switch-label">Network Option</span>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <div className="switch-container">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={item.isSubscription || false}
                      onChange={(e) =>
                        handleStep4FieldChange(
                          index,
                          'isSubscription',
                          e.target.checked
                        )
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="switch-label">Subscription Option</span>
                </div>
                
                {item.isSubscription && (
                  <div className="subscription-options">
                    <div className="form-row">
                      <div className="form-group col-6">
                        <label className="form-label">Monthly Amount</label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            value={item.subscriptionMonthlyAmt || 0}
                            onChange={(e) =>
                              handleStep4FieldChange(
                                index,
                                'subscriptionMonthlyAmt',
                                parseFloat(e.target.value)
                              )
                            }
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group col-6">
                        <label className="form-label">Yearly Amount</label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            value={item.subscriptionYearlyAmt || 0}
                            onChange={(e) =>
                              handleStep4FieldChange(
                                index,
                                'subscriptionYearlyAmt',
                                parseFloat(e.target.value)
                              )
                            }
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={item.description || ''}
                  onChange={(e) =>
                    handleStep4FieldChange(
                      index,
                      'description',
                      e.target.value
                    )
                  }
                  placeholder="Enter device description, features, and specifications"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="btn btn-outline-primary" onClick={addStep4Item}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Another Device
      </button>
    </div>
  );
}

export default FormStepFour;