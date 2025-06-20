// components/AddDeviceModal.jsx
import React, { useState } from 'react';

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
    image: null,
    imagePreview: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (file) => {
    const preview = file ? URL.createObjectURL(file) : '';
    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: preview,
    }));
  };

  const handleSubmit = () => {
    onSave(formData); // Pass the new device data to parent
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Add New Device</h2>

        <div className="space-y-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div>
            <label>Model</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              className="w-full border p-2 rounded"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Amount</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />
            </div>
            <div>
              <label>Discount (%)</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={formData.discount}
                onChange={(e) => handleChange('discount', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label>Relay</label>
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
              <label>Relay Amount</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={formData.relayAmt}
                onChange={(e) => handleChange('relayAmt', e.target.value)}
              />
            </div>
          )}

          <div>
            <label>Subscription</label>
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
                <label>Monthly Amount</label>
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
                <label>Yearly Amount</label>
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
            <label>Network Support</label>
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

          <div>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
            {formData.imagePreview && (
              <img
                src={formData.imagePreview}
                alt="preview"
                className="mt-2 h-20"
              />
            )}
          </div>

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
