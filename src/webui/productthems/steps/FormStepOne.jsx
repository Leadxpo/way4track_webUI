import React from 'react';
import '../styles/FormSteps.css';

function FormStepOne({
  stepsData,
  setStepsData,
  handleFieldChange,
  handleImageChange,
  imagePreviews,
  setImagePreviews,
  selectedTheme,
}) {
  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...stepsData];
    const stepList = [...(updatedSteps[0].fields.steps || [])];

    stepList[index] = {
      ...stepList[index],
      [field]: value,
    };

    updatedSteps[0].fields.steps = stepList;
    setStepsData(updatedSteps);
  };

  console.log(stepsData);

  const addNewStep = () => {
    const updatedSteps = [...stepsData];
    const existingSteps = updatedSteps[0].fields.steps || [];

    updatedSteps[0].fields.steps = [
      ...existingSteps,
      { title: '', description: '' },
    ];

    setStepsData(updatedSteps);
  };

  const removeStep = (index) => {
    const updatedSteps = [...stepsData];
    updatedSteps[0].fields.steps.splice(index, 1);
    setStepsData(updatedSteps);
  };

  const handlePointChange = (index, field, value) => {
    const updatedSteps = [...stepsData];
    if (!updatedSteps[0].points) updatedSteps[0].points = [];

    updatedSteps[0].points[index] = {
      ...updatedSteps[0].points[index],
      [field]: value,
    };

    setStepsData(updatedSteps);
  };

  const addNewPoint = () => {
    const updatedSteps = [...stepsData];
    if (!updatedSteps[0].points) updatedSteps[0].points = [];

    updatedSteps[0].points.push({ title: '', description: '' });
    setStepsData(updatedSteps);
  };

  const removePoint = (index) => {
    const updatedPoints = [...stepsData[0].points];
    updatedPoints.splice(index, 1);
    const updatedSteps = [...stepsData];
    updatedSteps[0].points = updatedPoints;
    setStepsData(updatedSteps);
  };

  const handleRemoveBannerImage = (index) => {
    const updatedSteps = [...stepsData];
    updatedSteps[0].images[index] = null;
    setStepsData(updatedSteps);

    setImagePreviews((prev) => {
      const updated = { ...prev };
      delete updated[`image${index}`];
      return updated;
    });
  };

  const handleRemoveFieldImage = (field) => {
    const updatedSteps = [...stepsData];
    updatedSteps[0].fields[field] = null;
    setStepsData(updatedSteps);

    setImagePreviews((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };
  console.log(selectedTheme);

  return (
    <div className="form-step">
      <h2 className="form-step-title">Product Details</h2>
      {/* basic data */}
      <section className="form-section">
        <h3 className="section-title">Basic Information</h3>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={stepsData[0].fields.name || ''}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Short Description</label>
          <input
            type="text"
            className="form-control"
            value={stepsData[0].fields.shortDescription || ''}
            onChange={(e) =>
              handleFieldChange('shortDescription', e.target.value)
            }
            placeholder="Brief product description"
          />
        </div>

        {selectedTheme.id !== 'theme1' && selectedTheme.id !== 'theme3' && (
          <div className="form-group">
            <label className="form-label">Full Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={stepsData[0].fields.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Detailed product description"
            />
          </div>
        )}
      </section>

      {/* banners data */}
      {(selectedTheme.id === 'theme2' || selectedTheme.id === 'theme3') && (
        <section className="form-section">
          <h3 className="section-title">Banner Images</h3>
          <div className="form-row">
            {Array.from({ length: selectedTheme?.images || 3 }).map(
              (_, index) => (
                <div className="form-group col-4" key={index}>
                  <label className="form-label">Banner {index + 1}</label>
                  <div className="image-upload-container">
                    {imagePreviews[`image${index}`] ? (
                      <div className="image-preview-container">
                        <img
                          src={imagePreviews[`image${index}`]}
                          alt={`Banner ${index + 1}`}
                          className="image-preview"
                        />
                        <button
                          className="remove-image-btn"
                          onClick={() => handleRemoveBannerImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="image-upload-field">
                        <input
                          type="file"
                          id={`banner-${index}`}
                          className="file-input"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(index, e.target.files[0])
                          }
                        />
                        <label
                          htmlFor={`banner-${index}`}
                          className="file-label"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
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
              )
            )}
          </div>
        </section>
      )}
      {/* featurs data */}
      {selectedTheme.id !== 'theme4' && (
        <section className="form-section">
          <h3 className="section-title">Why choose us (Product Features)</h3>

          <h4 className="subsection-title">Key Points</h4>
          {stepsData[0]?.points?.map((point, index) => (
            <div className="feature-point" key={index}>
              <div className="form-row">
                <div className="form-group col-5">
                  <label className="form-label">Point Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={point.title || ''}
                    onChange={(e) =>
                      handlePointChange(index, 'title', e.target.value)
                    }
                    placeholder="Feature title"
                  />
                </div>
                <div className="form-group col-6">
                  <label className="form-label">Point Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={point.description || ''}
                    onChange={(e) =>
                      handlePointChange(index, 'description', e.target.value)
                    }
                    placeholder="Feature description"
                  />
                </div>
                <div className="form-group col-1">
                  <button
                    type="button"
                    className="btn btn-icon btn-danger"
                    onClick={() => removePoint(index)}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(selectedTheme.id !== 'theme1' || stepsData[0]?.points?.length < 3) &&
            (selectedTheme.id !== 'theme2' || stepsData[0]?.points?.length < 4) && (
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addNewPoint}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Feature Point
              </button>
            )}

          {/* <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={addNewPoint}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Feature Point
          </button> */}
        </section>
      )}
      {/* how it works data */}
      <section className="form-section">
        <h3 className="section-title">How It Works</h3>

        {stepsData[0]?.fields?.steps?.map((step, idx) => (
          <div className="step-item" key={idx}>
            <div className="step-number">{idx + 1}</div>
            <div className="step-content">
              <div className="form-row">
                <div className="form-group col-5">
                  <label className="form-label">Step Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={step.title || ''}
                    onChange={(e) =>
                      handleStepChange(idx, 'title', e.target.value)
                    }
                    placeholder="Step title"
                  />
                </div>
                <div className="form-group col-6">
                  <label className="form-label">Step Description</label>
                  <textarea
                    className="form-control"
                    value={step.description || ''}
                    onChange={(e) =>
                      handleStepChange(idx, 'description', e.target.value)
                    }
                    placeholder="Step description"
                  />
                </div>
                <div className="form-group col-1">
                  <button
                    type="button"
                    className="btn btn-icon btn-danger"
                    onClick={() => removeStep(idx)}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {selectedTheme.id === 'theme1' &&
          stepsData[0]?.fields?.steps?.length > 0 && (
            <div className="form-group">
              <label className="form-label">How It Works Banner</label>
              <span className="image-size-info">
                Recommended size: 1200 × 400 px
              </span>
              <div className="image-upload-container">
                {imagePreviews[`image${0}`] ? (
                  <div className="image-preview-container">
                    <img
                      src={imagePreviews[`image${0}`]}
                      alt="Banner 1"
                      className="image-preview"
                    />
                    <button
                      className="remove-image-btn"
                      onClick={() => handleRemoveBannerImage(0)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="image-upload-field">
                    <input
                      type="file"
                      id="banner-0"
                      className="file-input"
                      accept="image/*"
                      onChange={(e) => handleImageChange(0, e.target.files[0])}
                    />
                    <label htmlFor="banner-0" className="file-label">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
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
          )}
        {(selectedTheme.id !== 'theme1' ||
          stepsData[0]?.fields?.steps?.length < 6) && (
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={addNewStep}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Step
            </button>
          )}
      </section>

      {selectedTheme.id === 'theme1' && (
        <section className="form-section">
          <h3 className="section-title">Banner Images</h3>
          <div className="form-row">
            {Array.from({ length: selectedTheme?.images || 3 })
              .map((_, index) => index)
              .filter((index) => index > 0)
              .map((index) => (
                <div className="form-group col-4" key={index}>
                  <label className="form-label">Banner {index + 1}</label>
                  <div className="image-upload-container">
                    {imagePreviews[`image${index}`] ? (
                      <div className="image-preview-container">
                        <img
                          src={imagePreviews[`image${index}`]}
                          alt={`Banner ${index + 1}`}
                          className="image-preview"
                        />
                        <button
                          className="remove-image-btn"
                          onClick={() => handleRemoveBannerImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="image-upload-field">
                        <input
                          type="file"
                          id={`banner-${index}`}
                          className="file-input"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(index, e.target.files[0])
                          }
                        />
                        <label
                          htmlFor={`banner-${index}`}
                          className="file-label"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
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
              ))}
          </div>
        </section>
      )}

      {/* our solutions */}
      <section className="form-section">
        <h3 className="section-title">Our soultions</h3>
        <div className="form-group">
          <label className="form-label">Work Title</label>
          <input
            type="text"
            className="form-control"
            value={stepsData[0].fields.workTitle || ''}
            onChange={(e) => handleFieldChange('workTitle', e.target.value)}
            placeholder="Enter work title"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Work For</label>
          <input
            type="text"
            className="form-control"
            value={stepsData[0].fields.workFor || ''}
            onChange={(e) => handleFieldChange('workFor', e.target.value)}
            placeholder="Brief work for"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Work Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={stepsData[0].fields.workDescription || ''}
            onChange={(e) =>
              handleFieldChange('workDescription', e.target.value)
            }
            placeholder="Detailed work description"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Product Model</label>
          <input
            type="text"
            className="form-control"
            value={stepsData[0].fields.productModal || ''}
            onChange={(e) => handleFieldChange('productModal', e.target.value)}
            placeholder="Enter product model"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Solution Title</label>
          <input
            type="text"
            className="form-control"
            value={stepsData[0].fields.solutionTitle || ''}
            onChange={(e) => handleFieldChange('solutionTitle', e.target.value)}
            placeholder="Enter solution title"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Solution Description</label>
          <input
            type="text"
            className="form-control"
            value={stepsData[0].fields.solutionDescription || ''}
            onChange={(e) =>
              handleFieldChange('solutionDescription', e.target.value)
            }
            placeholder="Enter product solutionDescription"
          />
        </div>
      </section>

      {/* media data */}
      <section className="form-section">
        <h3 className="section-title">Additional Media</h3>

        <div className="form-row">
          <div className="form-group col-4">
            <label className="form-label">Hero Poster</label>
            <span className="image-size-info">
              Recommended size: 800 × 600 px (4:3)
            </span>
            <div className="image-upload-container">
              {imagePreviews.blogImage ? (
                <div className="image-preview-container">
                  <img
                    src={imagePreviews.blogImage}
                    alt="Blog"
                    className="image-preview"
                  />
                  <button
                    className="remove-image-btn"
                    onClick={() => handleRemoveFieldImage('blogImage')}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-upload-field">
                  <input
                    type="file"
                    id="blog-image"
                    className="file-input"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange('blogImage', e.target.files[0])
                    }
                  />
                  <label htmlFor="blog-image" className="file-label">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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

          <div className="form-group col-4">
            <label className="form-label">Home Banner</label>
            <span className="image-size-info">
              Recommended size: 1920 × 1080 px (16:9)
            </span>
            <div className="image-upload-container">
              {imagePreviews.homeBanner ? (
                <div className="image-preview-container">
                  <img
                    src={imagePreviews.homeBanner}
                    alt="Home Banner"
                    className="image-preview"
                  />
                  <button
                    className="remove-image-btn"
                    onClick={() => handleRemoveFieldImage('homeBanner')}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-upload-field">
                  <input
                    type="file"
                    id="home-banner"
                    className="file-input"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange('homeBanner', e.target.files[0])
                    }
                  />
                  <label htmlFor="home-banner" className="file-label">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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

          <div className="form-group col-4">
            <label className="form-label">Footer Banner</label>
            <span className="image-size-info">
              Recommended size: 1920 × 400 px (wide)
            </span>
            <div className="image-upload-container">
              {imagePreviews.footerBanner ? (
                <div className="image-preview-container">
                  <img
                    src={imagePreviews.footerBanner}
                    alt="Footer Banner"
                    className="image-preview"
                  />
                  <button
                    className="remove-image-btn"
                    onClick={() => handleRemoveFieldImage('footerBanner')}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-upload-field">
                  <input
                    type="file"
                    id="footer-banner"
                    className="file-input"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange('footerBanner', e.target.files[0])
                    }
                  />
                  <label htmlFor="footer-banner" className="file-label">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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

        <div className="form-row">
          <div className="form-group col-4">
            <label className="form-label">Choose Image</label>
            <span className="image-size-info">
              Recommended size: 600 × 600 px (1:1)
            </span>
            <div className="image-upload-container">
              {imagePreviews.chooseImage ? (
                <div className="image-preview-container">
                  <img
                    src={imagePreviews.chooseImage}
                    alt="Choose"
                    className="image-preview"
                  />
                  <button
                    className="remove-image-btn"
                    onClick={() => handleRemoveFieldImage('chooseImage')}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-upload-field">
                  <input
                    type="file"
                    id="choose-image"
                    className="file-input"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange('chooseImage', e.target.files[0])
                    }
                  />
                  <label htmlFor="choose-image" className="file-label">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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

          <div className="form-group col-4">
            <label className="form-label">Product Icon</label>
            <span className="image-size-info">
              Recommended size: 256 × 256 px (square)
            </span>
            <div className="image-upload-container">
              {imagePreviews.productIcon ? (
                <div className="image-preview-container">
                  <img
                    src={imagePreviews.productIcon}
                    alt="Product Icon"
                    className="image-preview"
                  />
                  <button
                    className="remove-image-btn"
                    onClick={() => handleRemoveFieldImage('productIcon')}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-upload-field">
                  <input
                    type="file"
                    id="product-icon"
                    className="file-input"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange('productIcon', e.target.files[0])
                    }
                  />
                  <label htmlFor="product-icon" className="file-label">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
          <div className="form-group col-4">
            <label className="form-label">Solution Image</label>
            <span className="image-size-info">
              Recommended size: 800 × 600 px (4:3)
            </span>
            <div className="image-upload-container">
              {imagePreviews.solutionImage ? (
                <div className="image-preview-container">
                  <img
                    src={imagePreviews.solutionImage}
                    alt="Solution"
                    className="image-preview"
                  />
                  <button
                    className="remove-image-btn"
                    onClick={() => handleRemoveFieldImage('solutionImage')}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-upload-field">
                  <input
                    type="file"
                    id="solutionImage"
                    className="file-input"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange('solutionImage', e.target.files[0])
                    }
                  />
                  <label htmlFor="solutionImage" className="file-label">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
      </section>
    </div>
  );
}

export default FormStepOne;
