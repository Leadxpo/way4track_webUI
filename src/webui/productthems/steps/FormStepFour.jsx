import React from 'react';
// import "./FormStepFour.css";

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
    <div className="step4_formStep">
      <h2 className="step4_formTitle">Devices</h2>
      <p className="step4_description">
        Add device specifications, pricing, and options for your product.
      </p>

      <div className="step4_devicesContainer">
        {step4Items.map((item, index) => (
          <div className="step4_deviceCard" key={index}>
            <div className="step4_deviceHeader">
              <h3 className="step4_deviceTitle">Device {index + 1}</h3>
              {step4Items.length > 1 && (
                <button
                  className="step4_btnIcon step4_btnDanger"
                  onClick={() => removeStep4Item(index)}
                >
                  ×
                </button>
              )}
            </div>
            
            <div className="step4_deviceBody">
              <div className="step4_formRow">
                <div className="step4_formGroup step4_col6">
                  <label className="step4_formLabel">Device Name</label>
                  <input
                    type="text"
                    className="step4_formControl"
                    value={item.name || ''}
                    onChange={(e) => handleStep4FieldChange(index, 'name', e.target.value)}
                    placeholder="Enter device name"
                  />
                </div>
                
                <div className="step4_formGroup step4_col6">
                  <label className="step4_formLabel">Model</label>
                  <input
                    type="text"
                    className="step4_formControl"
                    value={item.model || ''}
                    onChange={(e) => handleStep4FieldChange(index, 'model', e.target.value)}
                    placeholder="Enter model number"
                  />
                </div>
              </div>
              
              <div className="step4_formGroup">
                <label className="step4_formLabel">Device Image</label>
                <div className="step4_imageUploadContainer">
                  {item.photo ? (
                    <div className="step4_imagePreviewContainer">
                      <img 
                        src={URL.createObjectURL(item.photo)} 
                        alt={`Device ${index + 1}`} 
                        className="step4_imagePreview" 
                      />
                      <button 
                        className="step4_removeImageBtn"
                        onClick={() => handleStep4FieldChange(index, 'photo', null)}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="step4_imageUploadField">
                      <input
                        type="file"
                        id={`device-photo-${index}`}
                        className="step4_fileInput"
                        accept="image/*"
                        onChange={(e) => handleStep4FieldChange(index, 'photo', e.target.files[0])}
                      />
                      <label htmlFor={`device-photo-${index}`} className="step4_fileLabel">
                        Upload
                      </label>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="step4_formRow">
                <div className="step4_formGroup step4_col6">
                  <label className="step4_formLabel">Base Price</label>
                  <div className="step4_inputGroup">
                    <span className="step4_inputGroupText">$</span>
                    <input
                      type="number"
                      className="step4_formControl"
                      value={item.amount || 0}
                      onChange={(e) => handleStep4FieldChange(index, 'amount', parseFloat(e.target.value))}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="step4_formGroup step4_col6">
                  <label className="step4_formLabel">Discount (%)</label>
                  <div className="step4_inputGroup">
                    <input
                      type="number"
                      className="step4_formControl"
                      value={item.discount || 0}
                      onChange={(e) => handleStep4FieldChange(index, 'discount', parseFloat(e.target.value))}
                      placeholder="0"
                    />
                    <span className="step4_inputGroupText">%</span>
                  </div>
                </div>
              </div>
              
              <div className="step4_formRow">
                <div className="step4_formGroup step4_col6">
                  <div className="step4_switchContainer">
                    <label className="step4_switch">
                      <input
                        type="checkbox"
                        checked={item.isRelay || false}
                        onChange={(e) => handleStep4FieldChange(index, 'isRelay', e.target.checked)}
                      />
                      <span className="step4_slider step4_round"></span>
                    </label>
                    <span className="step4_switchLabel">Relay Option</span>
                  </div>
                  
                  {item.isRelay && (
                    <div className="step4_inputGroup step4_mt2">
                      <span className="step4_inputGroupText">$</span>
                      <input
                        type="number"
                        className="step4_formControl"
                        value={item.relayAmt || 0}
                        onChange={(e) => handleStep4FieldChange(index, 'relayAmt', parseFloat(e.target.value))}
                        placeholder="Relay Amount"
                      />
                    </div>
                  )}
                </div>
                
                <div className="step4_formGroup step4_col6">
                  <div className="step4_switchContainer">
                    <label className="step4_switch">
                      <input
                        type="checkbox"
                        checked={item.isNetwork || false}
                        onChange={(e) => handleStep4FieldChange(index, 'isNetwork', e.target.checked)}
                      />
                      <span className="step4_slider step4_round"></span>
                    </label>
                    <span className="step4_switchLabel">Network Option</span>
                  </div>
                </div>
              </div>
              
              <div className="step4_formGroup">
                <div className="step4_switchContainer">
                  <label className="step4_switch">
                    <input
                      type="checkbox"
                      checked={item.isSubscription || false}
                      onChange={(e) => handleStep4FieldChange(index, 'isSubscription', e.target.checked)}
                    />
                    <span className="step4_slider step4_round"></span>
                  </label>
                  <span className="step4_switchLabel">Subscription Option</span>
                </div>
                
                {item.isSubscription && (
                  <div className="step4_subscriptionOptions">
                    <div className="step4_formRow">
                      <div className="step4_formGroup step4_col6">
                        <label className="step4_formLabel">Monthly Amount</label>
                        <div className="step4_inputGroup">
                          <span className="step4_inputGroupText">$</span>
                          <input
                            type="number"
                            className="step4_formControl"
                            value={item.subscriptionMonthlyAmt || 0}
                            onChange={(e) => handleStep4FieldChange(index, 'subscriptionMonthlyAmt', parseFloat(e.target.value))}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      
                      <div className="step4_formGroup step4_col6">
                        <label className="step4_formLabel">Yearly Amount</label>
                        <div className="step4_inputGroup">
                          <span className="step4_inputGroupText">$</span>
                          <input
                            type="number"
                            className="step4_formControl"
                            value={item.subscriptionYearlyAmt || 0}
                            onChange={(e) => handleStep4FieldChange(index, 'subscriptionYearlyAmt', parseFloat(e.target.value))}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="step4_formGroup">
                <label className="step4_formLabel">Description</label>
                <textarea
                  className="step4_formControl"
                  rows="3"
                  value={item.description || ''}
                  onChange={(e) => handleStep4FieldChange(index, 'description', e.target.value)}
                  placeholder="Enter device description, features, and specifications"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="step4_btnOutlinePrimary" onClick={addStep4Item}>
        Add Another Device
      </button>
    </div>
  );
}

export default FormStepFour;