// components/AddDeviceModal.jsx
import React, { useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';

function AddDevicePopup({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    description: '',
    amount: '',
    discount: '',
    isRelay: false,
    relayAmt: '',
    isSubscription: false,
    subscriptionMonthlyAmt: '',
    subscriptionYearlyAmt: '',
    isNetwork: false,
    network2gAmt: '',
    network4gAmt: '',
    photos: [],
    imagePreviews: [],
    applications: []
  });

  console.log(formData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle multiple image uploads
  const handleImageChange = (files) => {
    setFormData((prev) => {
      const newPhotos = [...prev.photos];
      const newPreviews = [...prev.imagePreviews];

      Array.from(files).forEach(file => {
        newPhotos.push(file);
        newPreviews.push(URL.createObjectURL(file));
      });

      return {
        ...prev,
        photos: newPhotos,
        imagePreviews: newPreviews
      };
    });
  };

  // Remove specific image
  const handleRemoveImage = (imageIndex) => {
    setFormData((prev) => {
      const newPhotos = [...prev.photos];
      const newPreviews = [...prev.imagePreviews];

      newPhotos.splice(imageIndex, 1);
      newPreviews.splice(imageIndex, 1);

      return {
        ...prev,
        photos: newPhotos,
        imagePreviews: newPreviews
      };
    });
  };

  // Handle application changes
  const handleApplicationChange = (appIndex, field, value) => {
    setFormData((prev) => {
      const updatedApplications = [...prev.applications];
      if (!updatedApplications[appIndex]) {
        updatedApplications[appIndex] = {
          name: '',
          desc: '',
          photo: null,
          preview: null
        };
      }
      updatedApplications[appIndex][field] = value;

      return {
        ...prev,
        applications: updatedApplications
      };
    });
  };

  // Add new application
  const addApplication = () => {
    setFormData((prev) => ({
      ...prev,
      applications: [
        ...prev.applications,
        {
          name: '',
          desc: '',
          photo: null,
          preview: null
        }
      ]
    }));
  };

  // Remove application
  const removeApplication = (appIndex) => {
    setFormData((prev) => {
      const updatedApplications = [...prev.applications];
      updatedApplications.splice(appIndex, 1);

      return {
        ...prev,
        applications: updatedApplications
      };
    });
  };

  // Handle application image upload
  const handleApplicationImageChange = (appIndex, file) => {
    if (file) {
      setFormData((prev) => {
        const updatedApplications = [...prev.applications];
        if (!updatedApplications[appIndex]) {
          updatedApplications[appIndex] = {
            name: '',
            desc: '',
            photo: null,
            preview: null
          };
        }
        updatedApplications[appIndex].photo = file;
        updatedApplications[appIndex].preview = URL.createObjectURL(file);

        return {
          ...prev,
          applications: updatedApplications
        };
      });
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Add New Device</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Model</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full border p-2 rounded"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          {/* Device Images */}
          <div>
            <label className="block text-sm font-medium mb-1">Device Images</label>
            <div className="space-y-4">
              {formData.imagePreviews.map((preview, photoIndex) => (
                <div key={photoIndex} className="relative border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="relative">
                    <img
                      src={preview}
                      alt={`Device Image ${photoIndex + 1}`}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      onClick={() => handleRemoveImage(photoIndex)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Field */}
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-center">
                    <Upload className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">Add Device Images</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageChange(e.target.files)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div>
            <label className="block text-sm font-medium mb-2">Applications</label>
            {formData.applications.map((app, appIndex) => (
              <div key={appIndex} className="bg-gray-50 rounded-lg p-4 relative border border-gray-200 mb-3">
                <div className="flex flex-col mb-2">
                  <input
                    type="text"
                    placeholder="Application Name"
                    className="mt-1 block w-full border p-2 rounded-md mb-2"
                    value={app.name || ''}
                    onChange={(e) => handleApplicationChange(appIndex, 'name', e.target.value)}
                  />
                  <textarea
                    placeholder="Description"
                    className="mt-1 block w-full border p-2 rounded-md mb-2"
                    value={app.desc || ''}
                    onChange={(e) => handleApplicationChange(appIndex, 'desc', e.target.value)}
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
                      onChange={(e) => handleApplicationImageChange(appIndex, e.target.files[0])}
                    />
                  </label>
                </div>

                {app.preview && (
                  <div className="relative mb-2">
                    <img src={app.preview} alt="Application" className="w-full h-40 object-cover rounded-md" />
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      onClick={() => {
                        handleApplicationChange(appIndex, 'photo', null);
                        handleApplicationChange(appIndex, 'preview', null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={() => removeApplication(appIndex)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {formData.applications.length < 10 && (
              <button
                type="button"
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition"
                onClick={addApplication}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Application
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Discount (%)</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={formData.discount}
                onChange={(e) => handleChange('discount', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Relay</label>
            <select
              className="w-full border p-2 rounded"
              value={formData.isRelay}
              onChange={(e) => handleChange('isRelay', e.target.value === 'true')}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {formData.isRelay && (
            <div>
              <label className="block text-sm font-medium">Relay Amount</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={formData.relayAmt}
                onChange={(e) => handleChange('relayAmt', e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Subscription</label>
            <select
              className="w-full border p-2 rounded"
              value={formData.isSubscription}
              onChange={(e) =>
                handleChange('isSubscription', e.target.value === 'true')
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {formData.isSubscription && (
            <>
              <div>
                <label className="block text-sm font-medium">Monthly Amount</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={formData.subscriptionMonthlyAmt}
                  onChange={(e) =>
                    handleChange('subscriptionMonthlyAmt', e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Yearly Amount</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={formData.subscriptionYearlyAmt}
                  onChange={(e) =>
                    handleChange('subscriptionYearlyAmt', e.target.value)
                  }
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium">Network Support</label>
            <select
              className="w-full border p-2 rounded"
              value={formData.isNetwork}
              onChange={(e) =>
                handleChange('isNetwork', e.target.value === 'true')
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {formData.isNetwork && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">2G Network Amount</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={formData.network2gAmt}
                  onChange={(e) => handleChange('network2gAmt', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">4G Network Amount</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={formData.network4gAmt}
                  onChange={(e) => handleChange('network4gAmt', e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
          )}


          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDevicePopup;