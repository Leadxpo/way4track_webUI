import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';

function EditDeviceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [productMeta, setProductMeta] = useState({});

  useEffect(() => {
    const product = location?.state?.product;
    if (product && product.device) {
      const filledDevices = product.device.map((d) => ({
        id: d.id,
        name: d.name || '',
        model: d.model || '',
        description: d.description || '',
        image: null,
        imagePreview: d.image || '',
        isRelay: !!d.isRelay,
        relayAmt: d.relayAmt || '',
        amount: d.amount || '',
        isSubscription: !!d.isSubscription,
        subscriptionMonthlyAmt: d.subscriptionMonthlyAmt || '',
        subscriptionYearlyAmt: d.subscriptionYearlyAmt || '',
        isNetwork: !!d.isNetwork,
        discount: d.discount || '',
      }));
      setDeviceDetails(filledDevices);

      setProductMeta({
        companyCode: product.companyCode,
        unitCode: product.unitCode,
        webProductId: product.id,
      });
    }
  }, [location.state?.product]);

  const handleChange = (index, field, value) => {
    setDeviceDetails((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleImageChange = (index, file) => {
    const preview = file ? URL.createObjectURL(file) : '';
    setDeviceDetails((prev) => {
      const updated = [...prev];
      updated[index].image = file;
      updated[index].imagePreview = preview;
      return updated;
    });
  };

  const handleSingleSubmit = async (device) => {
    const formData = new FormData();
    formData.append('companyCode', productMeta.companyCode);
    formData.append('unitCode', productMeta.unitCode);
    // formData.append('id', device.id);
    if (device.id && Number(device.id) !== 0) {
      formData.append('id', device.id);
    }

    formData.append('name', device.name);
    formData.append('model', device.model);
    formData.append('description', device.description);
    formData.append('webProductId', productMeta.webProductId);
    formData.append('isRelay', device.isRelay ? 1 : 0);
    formData.append('relayAmt', device.relayAmt);
    formData.append('amount', device.amount);
    formData.append('isSubscription', device.isSubscription ? 1 : 0);
    formData.append('subscriptionMonthlyAmt', device.subscriptionMonthlyAmt);
    formData.append('subscriptionYearlyAmt', device.subscriptionYearlyAmt);
    formData.append('isNetwork', device.isNetwork ? 1 : 0);
    formData.append('discount', device.discount);

    if (device.image) {
      formData.append('photo', device.image);
    }

    try {
      const res = await ApiService.post(
        '/device/handleDeviceDetails',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(`Device ${device.id} updated successfully:`, res.data);
      alert(`Device "${device.name}" updated successfully`);
      navigate('/ceoui');
    } catch (error) {
      console.error(`Failed to update device ${device.id}:`, error);
      alert(`Failed to update device "${device.name}"`);
    }
  };

  const handleAddNewDevice = () => {
    setDeviceDetails((prev) => [
      ...prev,
      {
        id: '',
        name: '',
        model: '',
        description: '',
        image: null,
        imagePreview: '',
        isRelay: false,
        relayAmt: '',
        amount: '',
        isSubscription: false,
        subscriptionMonthlyAmt: '',
        subscriptionYearlyAmt: '',
        isNetwork: false,
        discount: '',
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-2">Devices</h2>
      <p className="text-gray-500 mb-6">
        Update each device's model, image, pricing, and additional info.
      </p>

      <button
        type="button"
        onClick={() => handleAddNewDevice()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm mb-6"
      >
        + Add New Device
      </button>

      {deviceDetails.map((device, index) => (
        <div key={index} className="border border-gray-200 rounded-md mb-6">
          <div className="bg-gray-100 px-4 py-2 rounded-t-md font-medium">
            Device {index + 1}
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={device.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="mt-1 block w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Model</label>
              <input
                type="text"
                value={device.model}
                onChange={(e) => handleChange(index, 'model', e.target.value)}
                className="mt-1 block w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={device.description}
                onChange={(e) =>
                  handleChange(index, 'description', e.target.value)
                }
                className="mt-1 block w-full border p-2 rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  value={device.amount}
                  onChange={(e) =>
                    handleChange(index, 'amount', e.target.value)
                  }
                  className="mt-1 block w-full border p-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={device.discount}
                  onChange={(e) =>
                    handleChange(index, 'discount', e.target.value)
                  }
                  className="mt-1 block w-full border p-2 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Relay</label>
                <select
                  value={device.isRelay}
                  onChange={(e) =>
                    handleChange(index, 'isRelay', e.target.value === 'true')
                  }
                  className="mt-1 block w-full border p-2 rounded-md"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              {device.isRelay && (
                <div>
                  <label className="block text-sm font-medium">
                    Relay Amount
                  </label>
                  <input
                    type="number"
                    value={device.relayAmt}
                    onChange={(e) =>
                      handleChange(index, 'relayAmt', e.target.value)
                    }
                    className="mt-1 block w-full border p-2 rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">
                  Subscription
                </label>
                <select
                  value={device.isSubscription}
                  onChange={(e) =>
                    handleChange(
                      index,
                      'isSubscription',
                      e.target.value === 'true'
                    )
                  }
                  className="mt-1 block w-full border p-2 rounded-md"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              {device.isSubscription && (
                <>
                  <div>
                    <label className="block text-sm font-medium">Monthly</label>
                    <input
                      type="number"
                      value={device.subscriptionMonthlyAmt}
                      onChange={(e) =>
                        handleChange(
                          index,
                          'subscriptionMonthlyAmt',
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Yearly</label>
                    <input
                      type="number"
                      value={device.subscriptionYearlyAmt}
                      onChange={(e) =>
                        handleChange(
                          index,
                          'subscriptionYearlyAmt',
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Network Support
              </label>
              <select
                value={device.isNetwork}
                onChange={(e) =>
                  handleChange(index, 'isNetwork', e.target.value === 'true')
                }
                className="mt-1 block w-full border p-2 rounded-md"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <label className="cursor-pointer block">
                <div className="border-dashed border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                  <span className="font-medium">Upload</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="hidden"
                />
              </label>

              {device.imagePreview && (
                <div className="mt-2">
                  <img
                    src={device.imagePreview}
                    alt="Preview"
                    className="h-24 rounded border border-gray-300 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Save button for this specific device */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleSingleSubmit(device)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EditDeviceDetails;
