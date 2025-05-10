import React from 'react';
import "../productthems/styles/PreviewPanel.css";

function PreviewPanel({ selectedTheme, stepsData, imagePreviews }) {
  const renderThemePreview = () => {
    const defaultImage = 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    
    // Basic preview content that works for all themes
    const previewData = {
      name: stepsData[0]?.fields?.name || 'Product Name',
      description: stepsData[0]?.fields?.description || 'Product description goes here...',
      shortDescription: stepsData[0]?.fields?.shortDescription || 'Short description',
      banner1: imagePreviews.image0 || defaultImage,
      banner2: imagePreviews.image1 || defaultImage,
      banner3: imagePreviews.image2 || defaultImage,
      homeBanner: imagePreviews.homeBanner || defaultImage,
      footerBanner: imagePreviews.footerBanner || defaultImage,
      blogImage: imagePreviews.blogImage || defaultImage,
      chooseImage: imagePreviews.chooseImage || defaultImage,
      productIcon: imagePreviews.productIcon || defaultImage,
      steps: stepsData[0]?.fields?.steps || [],
      points: stepsData[0]?.points || []
    };

    return (
      <div className="theme-preview">
        <div className="preview-header">
          <div className="preview-branding">
            {previewData.productIcon ? (
              <img src={previewData.productIcon} alt="Logo" className="preview-logo" />
            ) : (
              <div className="preview-logo-placeholder">Logo</div>
            )}
            <h2 className="preview-title">{previewData.name}</h2>
          </div>
          <div className="preview-nav">
            <div className="preview-nav-item active">Home</div>
            <div className="preview-nav-item">Features</div>
            <div className="preview-nav-item">Pricing</div>
            <div className="preview-nav-item">Contact</div>
          </div>
        </div>
        
        <div className="preview-hero">
          <img 
            src={previewData.banner1} 
            alt="Hero" 
            className="preview-hero-image" 
          />
          <div className="preview-hero-content">
            <h1>{previewData.name}</h1>
            <p>{previewData.shortDescription}</p>
            <button className="preview-cta-button">Learn More</button>
          </div>
        </div>
        
        <div className="preview-features">
          <h2>Key Features</h2>
          <div className="preview-features-grid">
            {previewData.points.map((point, index) => (
              <div className="preview-feature-card" key={index}>
                <div className="preview-feature-icon">
                  <span>{index + 1}</span>
                </div>
                <h3>{point.title || 'Feature Title'}</h3>
                <p>{point.description || 'Feature description goes here'}</p>
              </div>
            ))}
          </div>
        </div>
        
        {previewData.steps.length > 0 && (
          <div className="preview-steps">
            <h2>How It Works</h2>
            <div className="preview-steps-list">
              {previewData.steps.map((step, index) => (
                <div className="preview-step" key={index}>
                  <div className="preview-step-number">{index + 1}</div>
                  <div className="preview-step-content">
                    <h3>{step.title || `Step ${index + 1}`}</h3>
                    <p>{step.description || 'Step description goes here'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="preview-footer">
          <div className="preview-footer-content">
            <p>© {new Date().getFullYear()} {previewData.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h2>Live Preview</h2>
        <div className="preview-device-switcher">
          <button className="preview-device-button active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="14" x="3" y="5" rx="2" />
              <line x1="2" x2="22" y1="19" y2="19" />
            </svg>
          </button>
          <button className="preview-device-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="12" height="18" x="6" y="3" rx="2" />
              <line x1="12" x2="12" y1="21" y2="21" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="preview-frame">
        {renderThemePreview()}
      </div>
    </div>
  );
}

export default PreviewPanel;