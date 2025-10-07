import React from 'react';
// import "./FormStepFour.css";
import { Upload, X, Plus } from 'lucide-react';

function FormStepFour({ step4Items, setStep4Items, handleImageChange, imagePreviews, selectedTheme, stepsData }) {
  const handleStep4FieldChange = (index, field, value) => {
    const updated = [...step4Items];
    updated[index][field] = value;
    setStep4Items(updated);
  };

  const addStep4Item = () => {
    setStep4Items([
      ...step4Items,
      { webProductName: '', photos: [], model: '', applications: [{ name: '', desc: '', link: '', photo: null, preview: null }] },
    ]);
  };

  const removeStep4Item = (index) => {
    if (step4Items.length === 1) return;
    const updated = [...step4Items];
    updated.splice(index, 1);
    setStep4Items(updated);
  };

  const handleApplicationChange = (deviceIndex, appIndex, field, value) => {
    const updated = [...step4Items];
    updated[deviceIndex].applications[appIndex][field] = value;
    setStep4Items(updated);
  };

  const addApplication = (deviceIndex) => {
    const updated = [...step4Items];
    if (!updated[deviceIndex].applications) updated[deviceIndex].applications = [];
    updated[deviceIndex].applications.push({ name: '', desc: '', link: '', photo: null, preview: null });
    setStep4Items(updated);
  };

  const removeApplication = (deviceIndex, appIndex) => {
    const updated = [...step4Items];
    updated[deviceIndex].applications.splice(appIndex, 1);
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
                <label className="step4_formLabel">Device Images</label>

                <div className="space-y-4">
                  {(item.photos || []).map((photo, photoIndex) => (
                    <div key={photoIndex} className="relative border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Device ${index + 1} - Image ${photoIndex + 1}`}
                          className="w-full h-40 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          onClick={() => {
                            const updatedPhotos = [...item.photos];
                            updatedPhotos.splice(photoIndex, 1);
                            handleStep4FieldChange(index, 'photos', updatedPhotos);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Upload Field */}
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor={`device-photo-${index}-${item.photos?.length || 0}`}
                      className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center">
                        <Upload className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-500">Add Device Image</span>
                      </div>
                      <input
                        type="file"
                        id={`device-photo-${index}-${item.photos?.length || 0}`}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const updatedPhotos = [...(item.photos || []), file];
                            handleStep4FieldChange(index, 'photos', updatedPhotos);
                            handleImageChange(`device${index}-photo${updatedPhotos.length}`, file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="step4_formGroup">
                <label className="step4_formLabel">Applications</label>
                {(item.applications || []).map((app, appIndex) => (
                  <div key={appIndex} className="bg-gray-50 rounded-lg p-4 relative border border-gray-200 mb-3">
                    <div className="flex flex-col mb-2">
                      <input
                        type="text"
                        placeholder="Application Name"
                        className="step4_formControl mb-2"
                        value={app.name}
                        onChange={(e) => handleApplicationChange(index, appIndex, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        className="step4_formControl mb-2"
                        value={app.desc}
                        onChange={(e) => handleApplicationChange(index, appIndex, 'desc', e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-center w-full mb-2">
                      <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center justify-center">
                          <Upload className="h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-500">Add Application Image</span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              handleApplicationChange(index, appIndex, 'photo', file);
                              handleApplicationChange(index, appIndex, 'preview', URL.createObjectURL(file));
                            }
                          }}
                        />
                      </label>
                    </div>

                    {app.preview && (
                      <div className="relative mb-2">
                        <img src={app.preview} alt="Application" className="w-full h-40 object-cover rounded-md" />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          onClick={() => handleApplicationChange(index, appIndex, 'photo', null) || handleApplicationChange(index, appIndex, 'preview', null)}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      className="step4_btnIcon step4_btnDanger absolute top-2 right-2"
                      onClick={() => removeApplication(index, appIndex)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {(item.applications?.length || 0) < 10 && (
                  <button
                    type="button"
                    className="step4_btnOutlinePrimary flex items-center"
                    onClick={() => addApplication(index)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Application
                  </button>
                )}
              </div>

              <div className="step4_formRow">
                <div className="step4_formGroup step4_col6">
                  <label className="step4_formLabel">Base Price</label>
                  <div className="step4_inputGroup">
                    <span className="step4_inputGroupText">₹</span>
                    <input
                      type="number"
                      className="step4_formControl"
                      value={item.amount || ''}
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
                      value={item.discount || ''}
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
                      <span className="step4_inputGroupText">₹</span>
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

              {/* Network Amount Fields - Show when Network Option is enabled */}
              {item.isNetwork && (
                <div className="step4_formRow">
                  <div className="step4_formGroup step4_col6">
                    <label className="step4_formLabel">4G Network Amount</label>
                    <div className="step4_inputGroup">
                      <span className="step4_inputGroupText">₹</span>
                      <input
                        type="number"
                        className="step4_formControl"
                        value={item.network4gAmt || ''}
                        onChange={(e) => handleStep4FieldChange(index, 'network4gAmt', parseFloat(e.target.value))}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="step4_formGroup step4_col6">
                    <label className="step4_formLabel">2G Network Amount</label>
                    <div className="step4_inputGroup">
                      <span className="step4_inputGroupText">₹</span>
                      <input
                        type="number"
                        className="step4_formControl"
                        value={item.network2gAmt || ''}
                        onChange={(e) => handleStep4FieldChange(index, 'network2gAmt', parseFloat(e.target.value))}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              )}

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

      {(selectedTheme.id !== 'theme2' || stepsData[3]?.fields?.dynamicItems?.length < 1) && (
        <button className="step4_btnOutlinePrimary" onClick={addStep4Item}>
          Add Another Device
        </button>
      )}
    </div>
  );
}

export default FormStepFour;