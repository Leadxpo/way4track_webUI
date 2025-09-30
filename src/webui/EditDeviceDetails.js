import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import AddDevicePopup from './AddDevicePopup';
import { Upload, X, Plus } from 'lucide-react';

function EditDeviceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [productMeta, setProductMeta] = useState({});

  useEffect(() => {
    const product = location?.state?.product;
    console.log(product, 'product');
    if (product && product.device) {
      const filledDevices = product.device.map((d) => ({
        id: d.id,
        name: d.name || '',
        model: d.model || '',
        description: d.description || '',
        photos: Array.isArray(d.image) ? [...d.image] : (d.image ? [d.image] : []),
        imagePreviews: Array.isArray(d.image) ? [...d.image] : (d.image ? [d.image] : []),
        isRelay: !!d.isRelay,
        relayAmt: d.relayAmt || '',
        amount: d.amount || '',
        isSubscription: !!d.isSubscription,
        subscriptionMonthlyAmt: d.subscriptionMonthlyAmt || '',
        subscriptionYearlyAmt: d.subscriptionYearlyAmt || '',
        isNetwork: !!d.isNetwork,
        network4gAmt: d.network4gAmt || '',
        network2gAmt: d.network2gAmt || '',
        discount: d.discount || '',
        applications: d.points ? d.points.map(point => ({
          name: point.title || '',
          desc: point.desc || '',
          photo: null,
          preview: point.file || '',
          existingFile: point.file
        })) : []
      }));
      setDeviceDetails(filledDevices);

      setProductMeta({
        companyCode: product.companyCode,
        unitCode: product.unitCode,
        webProductId: product.id,
        webProductName: product.name,
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

  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (index, files) => {
    setDeviceDetails((prev) => {
      const updated = [...prev];
      const newPhotos = [...(updated[index].photos || [])];
      const newPreviews = [...(updated[index].imagePreviews || [])];

      Array.from(files).forEach(file => {
        newPhotos.push(file);
        newPreviews.push(URL.createObjectURL(file));
      });

      updated[index].photos = newPhotos;
      updated[index].imagePreviews = newPreviews;
      return updated;
    });
  };

  // Remove specific image
  const handleRemoveImage = (deviceIndex, imageIndex) => {
    setDeviceDetails((prev) => {
      const updated = [...prev];
      // updated[deviceIndex].photos.splice(imageIndex, 1);
      // updated[deviceIndex].imagePreviews.splice(imageIndex, 1);
      // return updated;

      const newPhotos = [...updated[deviceIndex].photos];
      const newPreviews = [...updated[deviceIndex].imagePreviews];

      newPhotos.splice(imageIndex, 1);
      newPreviews.splice(imageIndex, 1);

      updated[deviceIndex].photos = newPhotos;
      updated[deviceIndex].imagePreviews = newPreviews;

      return updated;
    });
  };

  // Handle application changes
  const handleApplicationChange = (deviceIndex, appIndex, field, value) => {
    setDeviceDetails((prev) => {
      const updated = [...prev];
      if (!updated[deviceIndex].applications) {
        updated[deviceIndex].applications = [];
      }
      updated[deviceIndex].applications[appIndex][field] = value;
      return updated;
    });
  };

  // Add new application
  const addApplication = (deviceIndex) => {
    setDeviceDetails((prev) => {
      const updated = [...prev];
      if (!updated[deviceIndex].applications) {
        updated[deviceIndex].applications = [];
      }
      updated[deviceIndex].applications.push({
        name: '',
        desc: '',
        photo: null,
        preview: null
      });
      return updated;
    });
  };

  // Remove application
  const removeApplication = (deviceIndex, appIndex) => {
    setDeviceDetails((prev) => {
      const updated = [...prev];
      updated[deviceIndex].applications.splice(appIndex, 1);
      return updated;
    });
  };

  // Handle application image upload
  const handleApplicationImageChange = (deviceIndex, appIndex, file) => {
    if (file) {
      setDeviceDetails((prev) => {
        const updated = [...prev];
        updated[deviceIndex].applications[appIndex].photo = file;
        updated[deviceIndex].applications[appIndex].preview = URL.createObjectURL(file);
        return updated;
      });
    }
  };

  console.log(deviceDetails, 'deviceDetails');

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
    formData.append('webProductName', productMeta.webProductName);
    formData.append('isRelay', device.isRelay ? Number(1) : Number(0));
    formData.append('relayAmt', Number(device.relayAmt));
    formData.append('amount', Number(device.amount));
    formData.append(
      'isSubscription',
      device.isSubscription ? Number(1) : Number(0)
    );
    formData.append(
      'subscriptionMonthlyAmt',
      Number(device.subscriptionMonthlyAmt)
    );
    formData.append(
      'subscriptionYearlyAmt',
      Number(device.subscriptionYearlyAmt)
    );
    formData.append('isNetwork', device.isNetwork ? Number(1) : Number(0));
    formData.append('discount', device.discount === '' ? 0 : Number(device.discount) || 0);

    formData.append('network4gAmt', Number(device.network4gAmt) || 0);
    formData.append('network2gAmt', Number(device.network2gAmt) || 0);

    if (device.photos && device.photos.length > 0) {
      device.photos.forEach((photo) => {
        if (photo instanceof File) {
          formData.append("mediaFiles", photo, photo.name);
        } else if (typeof photo === "string" && photo.startsWith("http")) {
          formData.append("image", photo);
        }
      });
    }

    if (device.applications && device.applications.length > 0) {
      device.applications.forEach((app, index) => {
        formData.append(`points[${index}].title`, app.name || '');
        formData.append(`points[${index}].desc`, app.desc || '');
        formData.append(`points[${index}].file`, app.preview || '');

        if (app.photo) {
          formData.append("pointFiles", app.photo, app.photo.name);
        }
      });
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
        photos: [],
        image: null,
        imagePreview: '',
        isRelay: false,
        relayAmt: '',
        amount: '',
        isSubscription: false,
        subscriptionMonthlyAmt: '',
        subscriptionYearlyAmt: '',
        isNetwork: false,
        network4gAmt: '',
        network2gAmt: '',
        discount: '',
        applications: []
      },
    ]);
  };

  const handleRemoveDevice = async (indexToRemove) => {
    const id = indexToRemove;
    setDeviceDetails((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    try {
      const res = await ApiService.post('/device/deleteDeviceDetails', {
        id: id,
      });
      console.log(`Device ${id} deleted successfully:`, res.data);
      alert(`Device "${id}" deleted successfully`);
      // navigate('/ceoui');
    } catch (error) {
      console.error(`Failed to update device ${id}:`, error);
      alert(`Failed to update device "${id}"`);
    }
  };

  const handleSaveDevice = (newDevice) => {
    // setDeviceDetails((prev) => [...prev, newDevice]);
    handleSingleSubmit(newDevice)
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-2">Devices</h2>
      <p className="text-gray-500 mb-6">
        Update each device's model, image, pricing, and additional info.
      </p>

      {/* <button
        type="button"
        onClick={() => handleAddNewDevice()}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm mb-6"
      >
        + Add New Device
      </button> */}

      <button
        type="button"
        onClick={() => setShowModal(true)}
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

            {/* Device Images */}
            <div>
              <label className="block text-sm font-medium mb-1">Device Images</label>
              <div className="space-y-4">
                {device.imagePreviews && device.imagePreviews.map((preview, photoIndex) => (
                  <div key={photoIndex} className="relative border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="relative">
                      <img
                        src={preview}
                        alt={`Device ${index + 1} - Image ${photoIndex + 1}`}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        onClick={() => handleRemoveImage(index, photoIndex)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Upload Field */}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor={`device-photo-${index}`}
                    className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-center">
                      <Upload className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500">Add Device Image</span>
                    </div>
                    <input
                      type="file"
                      id={`device-photo-${index}`}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageChange(index, e.target.files)}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div>
              <label className="block text-sm font-medium mb-2">Applications</label>
              {device.applications && device.applications.map((app, appIndex) => (
                <div key={appIndex} className="bg-gray-50 rounded-lg p-4 relative border border-gray-200 mb-3">
                  <div className="flex flex-col mb-2">
                    <input
                      type="text"
                      placeholder="Application Name"
                      className="mt-1 block w-full border p-2 rounded-md mb-2"
                      value={app.name}
                      onChange={(e) => handleApplicationChange(index, appIndex, 'name', e.target.value)}
                    />
                    <textarea
                      placeholder="Description"
                      className="mt-1 block w-full border p-2 rounded-md mb-2"
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
                        onChange={(e) => handleApplicationImageChange(index, appIndex, e.target.files[0])}
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
                          handleApplicationChange(index, appIndex, 'photo', null);
                          handleApplicationChange(index, appIndex, 'preview', null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    onClick={() => removeApplication(index, appIndex)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {(device.applications?.length || 0) < 10 && (
                <button
                  type="button"
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition"
                  onClick={() => addApplication(index)}
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

            {device.isNetwork && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    2G Network Amount
                  </label>
                  <input
                    type="number"
                    value={device.network2gAmt}
                    onChange={(e) =>
                      handleChange(index, 'network2gAmt', e.target.value)
                    }
                    className="mt-1 block w-full border p-2 rounded-md"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    4G Network Amount
                  </label>
                  <input
                    type="number"
                    value={device.network4gAmt}
                    onChange={(e) =>
                      handleChange(index, 'network4gAmt', e.target.value)
                    }
                    className="mt-1 block w-full border p-2 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}


            {/* Save button for this specific device */}
            {/* <div className="pt-2">
              <button
                type="button"
                onClick={() => handleSingleSubmit(device)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition"
              >
                Save
              </button>
            </div> */}

            <div className="pt-2 flex gap-4">
              <button
                type="button"
                onClick={() => handleSingleSubmit(device)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => handleRemoveDevice(device.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {showModal && (
        <AddDevicePopup
          onClose={() => setShowModal(false)}
          onSave={handleSaveDevice}
        />
      )}
    </div>
  );
}

export default EditDeviceDetails;
