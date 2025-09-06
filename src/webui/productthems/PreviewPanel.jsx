import React, { useState } from 'react';
// import '../styles/PreviewPanel.css';
import ProductTheme1 from '../Themes/ProductTheme1/Index';
import ProductTheme2 from '../Themes/ProductTheme2';
import ProductTheme3 from '../Themes/ProductTheme3/Index';
import ProductTheme4 from '../Themes/ProductTheme4/index';

function PreviewPanel({
  selectedTheme,
  stepsData,
  imagePreviews,
  aminitiesData,
  applicationData,
  deviceData,
  productAppData,
}) {
  const [viewMode, setViewMode] = useState('desktop');

  const renderThemePreview = () => {

// Get keys starting with 'application' from imagePreviews

const defaultImage =
'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const deviceImages = Object.keys(imagePreviews)
  .filter(key => key.startsWith('device'))
  .sort((a, b) => {
    // Optional: Sort by index (e.g., application0, application1...)
    const indexA = parseInt(a.replace('device', ''), 10);
    const indexB = parseInt(b.replace('device', ''), 10);
    return indexA - indexB;
  })
  .map(key => imagePreviews[key] || defaultImage);

const productAppImages = Object.keys(imagePreviews)
  .filter(key => key.startsWith('productApp'))
  .sort((a, b) => {
    // Optional: Sort by index (e.g., application0, application1...)
    const indexA = parseInt(a.replace('productApp', ''), 10);
    const indexB = parseInt(b.replace('productApp', ''), 10);
    return indexA - indexB;
  })
  .map(key => imagePreviews[key] || defaultImage);

    const previewData = {
      name: stepsData[0]?.fields?.name || 'Product ',
      description:
        stepsData[0]?.fields?.description || 'Product description goes here...',
      shortDescription:
        stepsData[0]?.fields?.shortDescription || 'Short description',

        workTitle:
        stepsData[0]?.fields?.workTitle || 'Short workTitle',

             workFor:
        stepsData[0]?.fields?.workFor || 'Short workFor',

          workDescription:
        stepsData[0]?.fields?.workDescription || 'Short workDescription',

          productModal:
        stepsData[0]?.fields?.productModal || 'Short productModal',

        solutionTitle:
        stepsData[0]?.fields?.solutionTitle || 'Short solutionTitle',

        solutionDescription:
        stepsData[0]?.fields?.solutionDescription || 'Short solutionDescription',


      banner1: imagePreviews.image0 || defaultImage,
      banner2: imagePreviews.image1 || defaultImage,
      banner3: imagePreviews.image2 || defaultImage,
      homeBanner: imagePreviews.homeBanner || defaultImage,
      footerBanner: imagePreviews.footerBanner || defaultImage,
      blogImage: imagePreviews.blogImage || defaultImage,
      chooseImage: imagePreviews.chooseImage || defaultImage,
      productIcon: imagePreviews.productIcon || defaultImage,
      solutionImage: imagePreviews.solutionImage || defaultImage,

      steps: stepsData[0]?.fields?.steps || [],
      points: stepsData[0]?.points || [],
      aminityImage1: imagePreviews.amenity0 || defaultImage,
      aminityImage2: imagePreviews.amenity1 || defaultImage,
      aminityImage3: imagePreviews.amenity2 || defaultImage,
      aminityImage4: imagePreviews.amenity3 || defaultImage,
      aminityImage5: imagePreviews.amenity4 || defaultImage,
      aminityImage6: imagePreviews.amenity5 || defaultImage,
      aminityImage7: imagePreviews.amenity6 || defaultImage,
      aminityImage8: imagePreviews.amenity7 || defaultImage,
      aminityImage9: imagePreviews.amenity8 || defaultImage,
      aminityImage10: imagePreviews.amenity9 || defaultImage,
      aminityImage11: imagePreviews.amenity10 || defaultImage,
      aminityImage12: imagePreviews.amenity11 || defaultImage,
      aminityImage13: imagePreviews.amenity12 || defaultImage,
      aminityImage14: imagePreviews.amenity13 || defaultImage,
      aminityImage15: imagePreviews.amenity14 || defaultImage,

      applicationImage1: imagePreviews.application0 || defaultImage,
      applicationImage2: imagePreviews.application1 || defaultImage,
      applicationImage3: imagePreviews.application2 || defaultImage,
      applicationImage4: imagePreviews.application3 || defaultImage,
      applicationImage5: imagePreviews.application4 || defaultImage,
      applicationImage6: imagePreviews.application5 || defaultImage,
      applicationImage7: imagePreviews.application6 || defaultImage,
      applicationImage8: imagePreviews.application7 || defaultImage,
      applicationImage9: imagePreviews.application8 || defaultImage,
      aminities: aminitiesData || [],
      application: applicationData || [],
      deviceData: deviceData || [],
      devicesImage:deviceImages ||[],
      productAppData: productAppData || [],
      productAppImage:productAppImages ||[]

    };
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
    // return <ProductTheme4 data={previewData} />;
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
