import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react';

const AddDashboardTheme = () => {
  const [formData, setFormData] = useState({
    name: '',
    header: '',
    shortDescription: '',
    theme: '',
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [usedThemes, setUsedThemes] = useState([]);
  const [list, setList] = useState([]);
  const [themeBgimage, setthemeBgimage] = useState(null);
  const [themeBgPreview, setThemeBgPreview] = useState(null);

  const sessionThemes = [
    'Session-1',
    'Session-2',
    'Session-3',
    'Session-4',
    'Session-5',
    'Session-6',
    'Session-7',
    'Session-8',
    'Session-9',
    'Session-10',
  ];

  const handleBgFileChange = (e) => {
    const file = e.target.files[0];
    setthemeBgimage(file);
    if (file) {
      setThemeBgPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    switch (formData.theme) {
      case 'Session-2':
        setList(
          new Array(4)
            .fill(null)
            .map(() => ({ desc: '', photo: null, preview: null }))
        );
        break;
      case 'Session-3':
        setList(
          new Array(10)
            .fill(null)
            .map(() => ({ desc: '', photo: null, preview: null }))
        );
        break;
      case 'Session-4':
        setList([{ desc: '', photo: null, preview: null }]);
        break;
      case 'Session-5':
      case 'Session-6':
        setList([{ name: '', desc: '' }]);
        break;
      default:
        setList([]);
    }
  }, [formData.theme]);

  const handleListChange = (index, field, value) => {
    const updated = [...list];
    updated[index][field] = value;
    setList(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('header', formData.header);
    payload.append('shortDescription', formData.shortDescription);
    payload.append('theme', formData.theme);
    payload.append('companyCode', 'WAY4TRACK');
    payload.append('unitCode', 'WAY4');

    if (image) {
      payload.append('image', image);
    }

    if (themeBgimage) {
      payload.append('themeBgimage', themeBgimage);
    }

    list.forEach((item, index) => {
      payload.append(`list[${index}][desc]`, item.desc || '');
      payload.append(`list[${index}][name]`, item.name || '');

      if (
        ['Session-2', 'Session-3', 'Session-4'].includes(formData.theme) &&
        item.photo
      ) {
        payload.append(`photo`, item.photo);
      }
    });

    try {
      const response = await ApiService.post(
        'promotion/handlePromotionDetails',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status) {
        alert(
          response.data.internalMessage || 'Dashboard theme added successfully!'
        );
        setFormData({ name: '', header: '', shortDescription: '', theme: '' });
        setImage(null);
        setPreviewImage(null);
        setList([]);
        setthemeBgimage(null);
        setThemeBgPreview(null);
      } else {
        alert(`Failed: ${response.data.internalMessage || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error during submission. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Add Dashboard Theme</h2>
            <span className="text-sm text-gray-500">All fields marked with * are required</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter theme name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Header *
                  </label>
                  <input
                    type="text"
                    name="header"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.header}
                    onChange={handleChange}
                    required
                    placeholder="Enter header text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description *
                  </label>
                  <textarea
                    name="shortDescription"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Enter a brief description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Theme *
                  </label>
                  <select
                    name="theme"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.theme}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Session</option>
                    {sessionThemes.map((theme) => (
                      <option
                        key={theme}
                        value={theme}
                        disabled={usedThemes.includes(theme)}
                      >
                        {theme} {usedThemes.includes(theme) ? '(Already used)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {[
                  'Session-2',
                  'Session-3',
                  'Session-4',
                  'Session-5',
                  'Session-6',
                ].includes(formData.theme) && formData.theme && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        List Items ({list.length}{' '}
                        {formData.theme === 'Session-4'
                          ? 'dynamic cards'
                          : ['Session-5', 'Session-6'].includes(formData.theme)
                            ? 'text entries'
                            : 'fixed cards'})
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {list.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 relative border border-gray-200"
                        >
                          {['Session-5', 'Session-6'].includes(formData.theme) && (
                            <input
                              type="text"
                              placeholder="Title"
                              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={item.name}
                              onChange={(e) =>
                                handleListChange(index, 'name', e.target.value)
                              }
                            />
                          )}

                          <input
                            type="text"
                            placeholder="Description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={item.desc}
                            onChange={(e) =>
                              handleListChange(index, 'desc', e.target.value)
                            }
                          />

                          {['Session-2', 'Session-3', 'Session-4'].includes(
                            formData.theme
                          ) && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-center w-full">
                                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                                  <div className="flex items-center justify-center">
                                    <Upload className="h-6 w-6 text-gray-400" />
                                    <span className="ml-2 text-sm text-gray-500">
                                      Click to upload image
                                    </span>
                                  </div>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      if (file) {
                                        setList((prevList) => {
                                          const updated = [...prevList];
                                          updated[index] = {
                                            ...updated[index],
                                            photo: file,
                                            preview: URL.createObjectURL(file),
                                          };
                                          return updated;
                                        });
                                      }
                                    }}
                                    
                                    
                                  />
                                </label>
                              </div>
                              {item.preview && (
                                <div className="relative">
                                  <img
                                    src={item.preview}
                                    alt="preview"
                                    className="w-full h-40 object-cover rounded-lg"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                    onClick={() => {
                                      const updated = [...list];
                                      updated[index].photo = null;
                                      updated[index].preview = null;
                                      setList(updated);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {(formData.theme === 'Session-4' ||
                            ['Session-5', 'Session-6'].includes(
                              formData.theme
                            )) && (
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                              onClick={() => {
                                const updated = list.filter((_, i) => i !== index);
                                setList(updated);
                              }}
                              disabled={list.length === 1}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {(formData.theme === 'Session-4' ||
                      ['Session-5', 'Session-6'].includes(formData.theme)) && (
                      <button
                        type="button"
                        className="w-full py-2 px-4 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50 flex items-center justify-center"
                        onClick={() =>
                          setList([
                            ...list,
                            formData.theme === 'Session-4'
                              ? { desc: '', photo: null, preview: null }
                              : { name: '', desc: '' },
                          ])
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add More
                      </button>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Main Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-500">
                            {previewImage ? 'Change image' : 'Upload an image'}
                          </span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                    {previewImage && (
                      <div className="mt-2 relative">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                          onClick={() => {
                            setImage(null);
                            setPreviewImage(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Theme Background Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-500">
                            {themeBgPreview ? 'Change background' : 'Upload background'}
                          </span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleBgFileChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                    {themeBgPreview && (
                      <div className="mt-2 relative">
                        <img
                          src={themeBgPreview}
                          alt="Background Preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                          onClick={() => {
                            setthemeBgimage(null);
                            setThemeBgPreview(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Submit Theme
                </button>
              </form>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Live Preview</h3>
                <div className="space-y-4">
                  {formData.theme && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Theme</span>
                      <p className="text-gray-900">{formData.theme}</p>
                    </div>
                  )}
                  {formData.name && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Name</span>
                      <p className="text-gray-900">{formData.name}</p>
                    </div>
                  )}
                  {formData.header && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Header</span>
                      <p className="text-gray-900">{formData.header}</p>
                    </div>
                  )}
                  {formData.shortDescription && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Description</span>
                      <p className="text-gray-900">{formData.shortDescription}</p>
                    </div>
                  )}
                  {previewImage && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Main Image</span>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-2 w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  {themeBgPreview && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Background Image</span>
                      <img
                        src={themeBgPreview}
                        alt="Background Preview"
                        className="mt-2 w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  {!formData.name &&
                    !formData.header &&
                    !formData.shortDescription &&
                    !previewImage && (
                    <div className="text-center py-8">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Fill the form to see a preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDashboardTheme;