import React, { useState } from 'react';
// import '../styles/PreviewPanel.css';
import ProductTheme1 from '../Themes/ProductTheme1/ProductTheme1';
import ProductTheme2 from '../Themes/ProductTheme2/ProductTheme2';
import ProductTheme3 from '../Themes/ProductTheme3/ProductTheme3';
import ProductTheme4 from '../Themes/ProductTheme4/ProductTheme4';

function PreviewPanel({ selectedTheme, stepsData, imagePreviews }) {
  const [viewMode, setViewMode] = useState('desktop');

  const renderThemePreview = () => {
    const defaultImage =
      'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

    const previewData = {
      name: stepsData[0]?.fields?.name || 'Product ',
      description:
        stepsData[0]?.fields?.description || 'Product description goes here...',
      shortDescription:
        stepsData[0]?.fields?.shortDescription || 'Short description',
      banner1: imagePreviews.image0 || defaultImage,
      banner2: imagePreviews.image1 || defaultImage,
      banner3: imagePreviews.image2 || defaultImage,
      homeBanner: imagePreviews.homeBanner || defaultImage,
      footerBanner: imagePreviews.footerBanner || defaultImage,
      blogImage: imagePreviews.blogImage || defaultImage,
      chooseImage: imagePreviews.chooseImage || defaultImage,
      productIcon: imagePreviews.productIcon || defaultImage,
      steps: stepsData[0]?.fields?.steps || [],
      points: stepsData[0]?.points || [],
    };
console.log("rrr:",selectedTheme.id)
    switch (selectedTheme.id) {
      case 'theme1':
        return <ProductTheme1 data={previewData} />;
      case 'theme2':
        return <ProductTheme2 data={previewData} />;
      case 'theme3':
        return <ProductTheme3 data={previewData} />;
      case 'theme4':
        return <ProductTheme4 data={previewData} />;
      default:
        return <div>Please select a theme to preview.</div>;
    }
  };

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h2>Live Preview</h2>
      
      </div> 
      <div>{renderThemePreview()}</div>
    </div>
  );
}

export default PreviewPanel;
