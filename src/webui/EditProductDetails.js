
import React, { useState, useEffect } from 'react';
import "../webui/productthems/styles/FormSteps.css";
import { useLocation } from 'react-router';
import ApiService from '../services/ApiService';

function EditProductDetails() {
  const location = useLocation();
  const [productDetails, setProductDetails] = useState({
    name: '',
    layoutType: '',
    shortDescription: '',
    companyCode: '',
    unitCode: '',
    description: '',
    banner1: null,
    banner2: null,
    banner3: null,
    homeBanner: null,
    footerBanner: null,
    chooseImage: null,
    productIcon: null,
    blogImage: null,
    // points: [{ title: "", description: "" }],
    // steps: [{ title: "", description: "" }]
  });

  const [originalProductDetails, setOriginalProductDetails] = useState({});

  useEffect(() => {
    const product = location?.state?.product;
    if (product) {
      setProductDetails({
        name: product.name || '',
        shortDescription: product.shortDescription || '',
        companyCode: product.companyCode || '',
        unitCode: product.unitCode || '',
        description: product.description || '',
        banner1: product.banner1 || null,
        banner2: product.banner2 || null,
        banner3: product.banner3 || null,
        homeBanner: product.homeBanner || null,
        footerBanner: product.footerBanner || null,
        chooseImage: product.chooseImage || null,
        productIcon: product.productIcon || null,
        blogImage: product.blogImage || null,
        // points: product.points?.length ? product.points : [{ title: "", description: "" }],
        // steps: product.steps?.length ? product.steps : [{ title: "", description: "" }]
      });
      setOriginalProductDetails({ ...product }); // Save original product details
    }
  }, [location.state?.product]);

  const handleFieldChange = (field, value) => {
    setProductDetails(prev => ({ ...prev, [field]: value }));
  };

  // const handlePointChange = (index, field, value) => {
  //   const updated = [...productDetails.points];
  //   updated[index][field] = value;
  //   setProductDetails(prev => ({ ...prev, points: updated }));
  // };

  // const addNewPoint = () => {
  //   setProductDetails(prev => ({
  //     ...prev,
  //     points: [...prev.points, { title: '', description: '' }]
  //   }));
  // };

  // const removePoint = (index) => {
  //   const updated = [...productDetails.points];
  //   updated.splice(index, 1);
  //   setProductDetails(prev => ({ ...prev, points: updated }));
  // };

  // const handleStepChange = (index, field, value) => {
  //   const updated = [...productDetails.steps];
  //   updated[index][field] = value;
  //   setProductDetails(prev => ({ ...prev, steps: updated }));
  // };

  // const addNewStep = () => {
  //   setProductDetails(prev => ({
  //     ...prev,
  //     steps: [...prev.steps, { title: '', description: '' }]
  //   }));
  // };

  // const removeStep = (index) => {
  //   const updated = [...productDetails.steps];
  //   updated.splice(index, 1);
  //   setProductDetails(prev => ({ ...prev, steps: updated }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append the fields and check for modified images
    Object.keys(productDetails).forEach((key) => {
      if (key.includes('banner') || key === 'chooseImage' || key === 'productIcon' || key === 'blogImage' || key === 'homeBanner' || key === 'footerBanner') {
        // Only send the changed image if it's different from the original
        if (productDetails[key] !== originalProductDetails[key]) {
          formData.append(key, productDetails[key]);
        }
      } else if (productDetails[key]) {
        formData.append(key, productDetails[key]);
      }
    });

    // Append the ID to FormData
    if (location?.state?.product?.id) {
      formData.append('id', location.state.product.id);
    }

    try {
      // Send the FormData to the API
      await ApiService.post('/website-product/handleWebsiteProductDetails', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.error("Error submitting product details:", error);
    }
  };

  const renderImagePreview = (imageFile) => {
    return typeof imageFile === 'string' ? imageFile : URL.createObjectURL(imageFile);
  };

  return (
    <form className="form-step" onSubmit={handleSubmit}>
      <h2 className="form-step-title">Product Details</h2>

      <section className="form-section">
        <h3 className="section-title">Basic Information</h3>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productDetails.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Short Description</label>
          <input
            type="text"
            className="form-control"
            value={productDetails.shortDescription}
            onChange={(e) => handleFieldChange('shortDescription', e.target.value)}
            placeholder="Brief product description"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Full Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={productDetails.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="Detailed product description"
          />
        </div>
      </section>

      <section className="form-section">
        <h3 className="section-title">Banner Images</h3>
        <div className="d-flex gap-4 flex-wrap">
          {['banner1', 'banner2', 'banner3'].map((banner, idx) => (
            <div className="upload-box" key={banner}>
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFieldChange(banner, e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <div className="upload-area">
                  {productDetails[banner] ? (
                    <img
                      src={renderImagePreview(productDetails[banner])}
                      alt={`Banner ${idx + 1}`}
                      className="preview-img"
                    />
                  ) : (
                    <>
                      <div className="upload-icon">⬆</div>
                      <div className="upload-text">Upload</div>
                    </>
                  )}
                </div>
              </label>
              <div className="upload-title">{`Banner ${idx + 1}`}</div>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="form-section">
        <h3 className="section-title">Product Features</h3>
        <h4 className="subsection-title">Key Points</h4>
        {productDetails.points.map((point, index) => (
          <div className="feature-point" key={index}>
            <div className="form-row">
              <div className="form-group col-5">
                <label className="form-label">Point Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={point.title}
                  onChange={(e) => handlePointChange(index, 'title', e.target.value)}
                  placeholder="Feature title"
                />
              </div>
              <div className="form-group col-6">
                <label className="form-label">Point Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={point.description}
                  onChange={(e) => handlePointChange(index, 'description', e.target.value)}
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

        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={addNewPoint}
        >
          Add Feature Point
        </button>
      </section> */}

      {/* <section className="form-section">
        <h3 className="section-title">How It Works</h3>

        {productDetails.steps.map((step, idx) => (
          <div className="step-item" key={idx}>
            <div className="step-number">{idx + 1}</div>
            <div className="step-content">
              <div className="form-row">
                <div className="form-group col-5">
                  <label className="form-label">Step Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={step.title}
                    onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                    placeholder="Step title"
                  />
                </div>
                <div className="form-group col-6">
                  <label className="form-label">Step Description</label>
                  <textarea
                    className="form-control"
                    value={step.description}
                    onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
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

        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={addNewStep}
        >
          Add Step
        </button>
      </section>
 */}

      {/* Additional Media Section */}
      <section className="form-section">
        <h3 className="section-title">Additional Media</h3>
        <div className="d-flex gap-4 flex-wrap">
          {['blogImage', 'homeBanner', 'footerBanner', 'chooseImage', 'productIcon'].map((banner, idx) => (
            <div className="upload-box" key={banner}>
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFieldChange(banner, e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <div className="upload-area">
                  {productDetails[banner] ? (
                    <img
                      src={renderImagePreview(productDetails[banner])}
                      alt={`Banner ${idx + 1}`}
                      className="preview-img"
                    />
                  ) : (
                    <>
                      <div className="upload-icon">⬆</div>
                      <div className="upload-text">Upload</div>
                    </>
                  )}
                </div>
              </label>
              <div className="upload-title">{`Banner ${idx + 1}`}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="form-actions">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  );
}

export default EditProductDetails;

