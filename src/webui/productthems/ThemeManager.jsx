import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector';
import ProgressBar from './ProgressBar';
import FormStepOne from './steps/FormStepOne';
import FormStepTwo from './steps/FormStepTwo';
import FormStepThree from './steps/FormStepThree';
import FormStepFour from './steps/FormStepFour';
import FormStepFive from './steps/FormStepFive';
import PreviewPanel from './PreviewPanel';
import themesData from '../productthems/data/themesData';
import ApiService from '../../services/ApiService';
import '../productthems/styles/ThemeManager.css';

function ThemeManager() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [stepsData, setStepsData] = useState([
    { fields: { steps: [] }, images: [], points: [], },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [imagePreviews, setImagePreviews] = useState({});
  const [step4Items, setStep4Items] = useState([
    { webProductName: '', photo: null, model: '' },
  ]);
  const [step5Items, setStep5Items] = useState([
    { name: '', shortDescription: '', points: [], photos: null },
  ]);

  const [stepRepeatedItems, setStepRepeatedItems] = useState({
    1: Array.from({ length: 6 }, () => ({ name: '', desc: '', photos: null })),
    2: Array.from({ length: 6 }, () => ({ name: '', desc: '', photos: null })),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (stepsData.length > 3) {
      const updatedSteps = [...stepsData];
      updatedSteps[3].fields.dynamicItems = step4Items;
      setStepsData(updatedSteps);
    }
  }, [step4Items]);

  const handleThemeClick = (id) => {
    const theme = themesData.find((t) => t.id === id);
    setSelectedTheme(theme);
    setStepsData([{ fields: { steps: [] }, images: [], points: [] }]);
    setCurrentStep(0);
    setImagePreviews({});
  };

  const handleFieldChange = (field, value) => {
    const updatedSteps = [...stepsData];
    updatedSteps[currentStep].fields[field] = value;
    setStepsData(updatedSteps);
  };

  const handleImageChange = (indexOrKey, file) => {
    const updatedSteps = [...stepsData];
    const imageUrl = URL.createObjectURL(file);

    if (typeof indexOrKey === 'string') {
      updatedSteps[currentStep].fields[indexOrKey] = file;
      setImagePreviews((prev) => ({
        ...prev,
        [indexOrKey]: imageUrl,
      }));
    } else {
      updatedSteps[currentStep].images[indexOrKey] = file;
      setImagePreviews((prev) => ({
        ...prev,
        [`image${indexOrKey}`]: imageUrl,
      }));
    }

    setStepsData(updatedSteps);
  };

  // step 5 remove
  const handleRemoveStep5Item = (index) => {
    const updatedItems = [...step5Items];
    updatedItems.splice(index, 1);
    setStep5Items(updatedItems);
  };

  const handleAddStep = () => {
    if (stepsData.length < 5) {
      setStepsData([...stepsData, { fields: {}, images: [] }]);
      setCurrentStep(currentStep + 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / 5) * 100;

  const handleSubmitProduct = async () => {
    try {
      setIsSubmitting(true);

      // Step 1: Product details
      const step1Data = new FormData();
      step1Data.append('name', stepsData[0]?.fields?.name || '');
      step1Data.append('layoutType', selectedTheme?.id || '');
      step1Data.append(
        'shortDescription',
        stepsData[0]?.fields?.shortDescription || ''
      );
      step1Data.append('companyCode', 'WAY4TRACK');
      step1Data.append('unitCode', 'WAY4');
      step1Data.append('description', stepsData[0]?.fields?.description || '');

      // Add images and banners
      if (stepsData[0]?.images?.[0])
        step1Data.append('banner1', stepsData[0].images[0]);
      if (stepsData[0]?.images?.[1])
        step1Data.append('banner2', stepsData[0].images[1]);
      if (stepsData[0]?.images?.[2])
        step1Data.append('banner3', stepsData[0].images[2]);
      if (stepsData[0]?.fields?.homeBanner)
        step1Data.append('homeBanner', stepsData[0].fields.homeBanner);
      if (stepsData[0]?.fields?.footerBanner)
        step1Data.append('footerBanner', stepsData[0].fields.footerBanner);
      if (stepsData[0]?.fields?.chooseImage)
        step1Data.append('chooseImage', stepsData[0].fields.chooseImage);
      if (stepsData[0]?.fields?.productIcon)
        step1Data.append('productIcon', stepsData[0].fields.productIcon);
      if (stepsData[0]?.fields?.blogImage)
        step1Data.append('blogImage', stepsData[0].fields.blogImage);

      // Points array
      step1Data.append('points', JSON.stringify(stepsData[0]?.points || []));

      // Steps data
      const steps = stepsData[0]?.fields?.steps || [];
      step1Data.append('steps', JSON.stringify(steps));

      // Submit Step 1
      const step1Res = await ApiService.post(
        'website-product/handleWebsiteProductDetails',
        step1Data
      );
      console.log('Step 1 Response:', step1Res);

      const webProductId = step1Res.data.id;
      const webProductName = step1Res.data.name;

      if (!step1Res.status || !webProductId) {
        throw new Error('Step 1 failed or webProductId not returned');
      }

      // Step 2: Amenities details
      const step2Data = new FormData();
      const amenitiesList = stepRepeatedItems[1].map((item) => ({
        name: item.name || '',
        desc: item.desc || '',
        companyCode: 'WAY4TRACK',
        unitCode: 'WAY4',
        webProductId,
        webProductName,
      }));

      step2Data.append('dtoList', JSON.stringify(amenitiesList));
      stepRepeatedItems[1]?.forEach((item) => {
        if (item.photos) {
          step2Data.append('photos', item.photos, item.photos.name);
        }
      });

      // Submit Step 2
      await ApiService.post('amenities/handleAmenitiesDetails', step2Data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Step 3: Applications details
      const step3Data = new FormData();
      const applicationsList = stepRepeatedItems[2].map((item) => ({
        name: item.name || '',
        desc: item.desc || '',
        companyCode: 'WAY4TRACK',
        unitCode: 'WAY4',
        webProductId,
        webProductName,
      }));

      step3Data.append('dtoList', JSON.stringify(applicationsList));
      stepRepeatedItems[2]?.forEach((item) => {
        if (item.photos) {
          step3Data.append('photos', item.photos, item.photos.name);
        }
      });

      // Submit Step 3
      await ApiService.post('application/handleApplicationDetails', step3Data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Step 4: Device details (submit each device separately)
      const devicePromises = step4Items.map(async (item) => {
        const step4Data = new FormData();
        step4Data.append('webProductId', webProductId);
        step4Data.append('webProductName', webProductName);
        step4Data.append('companyCode', item.companyCode || 'WAY4TRACK');
        step4Data.append('unitCode', item.unitCode || 'WAY4');
        step4Data.append('amount', item.amount?.toString() || '0');

        if (item.photo) step4Data.append('photo', item.photo, item.photo.name);
        if (item.model) step4Data.append('model', item.model);
        if (item.name) step4Data.append('name', item.name);
        if (typeof item.description === 'string')
          step4Data.append('description', item.description);

        step4Data.append('isRelay', item.isRelay ? '1' : '0');
        step4Data.append('isSubscription', item.isSubscription ? '1' : '0');
        step4Data.append('isNetwork', item.isNetwork ? '1' : '0');
        step4Data.append('relayAmt', item.relayAmt?.toString() || '0');
        step4Data.append(
          'subscriptionMonthlyAmt',
          item.subscriptionMonthlyAmt?.toString() || '0'
        );
        step4Data.append(
          'subscriptionYearlyAmt',
          item.subscriptionYearlyAmt?.toString() || '0'
        );
        step4Data.append('discount', item.discount?.toString() || '0');

        return ApiService.post('device/handleDeviceDetails', step4Data);
      });

      await Promise.all(devicePromises);

      const appPromises = step5Items.map(async (item) => {
        const step5Data = new FormData();
        // step5Data.append('webProductId', webProductId);

        // Create dtoList for each item, including points
        const dtoList = [
          {
            name: item.name || '',
            description: item.shortDescription || '',
            webProductId: webProductId, // Add webProductId for each app
            points: item.points || [], // Correct: pass the array directly// Add points, ensuring it's a JSON string
            companyCode: 'WAY4TRACK',
            unitCode: 'WAY4',
          },
        ];

        // Append the dtoList as a JSON string
        step5Data.append('dtoList', JSON.stringify(dtoList));

        if (item.photos) {
          step5Data.append('photos', item.photos, item.photos.name);
        }

        return ApiService.post('product-apps/handleBulkProductApp', step5Data);
      });

      await Promise.all(appPromises);

      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert(`Submission failed: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormStepOne
            stepsData={stepsData}
            setStepsData={setStepsData}
            handleFieldChange={handleFieldChange}
            handleImageChange={handleImageChange}
            imagePreviews={imagePreviews}
            selectedTheme={selectedTheme}
          />
        );
      case 1:
        return (
          <FormStepTwo
            stepRepeatedItems={stepRepeatedItems}
            setStepRepeatedItems={setStepRepeatedItems}
            setStepsData={setStepsData}
            stepsData={stepsData}
            handleImageChange={handleImageChange}
            imagePreviews={imagePreviews}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <FormStepThree
            stepRepeatedItems={stepRepeatedItems}
            setStepRepeatedItems={setStepRepeatedItems}
            setStepsData={setStepsData}
            stepsData={stepsData}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <FormStepFour step4Items={step4Items} setStep4Items={setStep4Items} />
        );

      case 4:
        return (
          <FormStepFive
            step5Items={step5Items}
            setStep5Items={setStep5Items}
            handleRemoveStep5Item={handleRemoveStep5Item}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="theme-manager">
      <div className="container">
        {showSuccess && (
          <div className="success-notification">
            <div className="success-content">
              <span className="success-icon">✓</span>
              <p>Product submitted successfully!</p>
            </div>
          </div>
        )}

        <ThemeSelector
          themesData={themesData}
          selectedTheme={selectedTheme}
          handleThemeClick={handleThemeClick}
        />

        {selectedTheme && (
          <ProgressBar
            percentage={progressPercentage}
            currentStep={currentStep}
          />
        )}

        <div className="content-container">
          <div className="form-container">
            {selectedTheme && renderCurrentStep()}

            {selectedTheme && (
              <div className="navigation-buttons">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 0}
                >
                  Previous
                </button>

                {stepsData.length < 5 &&
                  currentStep === stepsData.length - 1 && (
                    <button
                      className="btn btn-accent"
                      onClick={handleAddStep}
                      style={{ backgroundColor: 'cadetblue' }}
                    >
                      Add Step
                    </button>
                  )}

                {currentStep < stepsData.length - 1 && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Next
                  </button>
                )}

                {currentStep === 4 && (
                  <button
                    className="btn btn-success"
                    onClick={handleSubmitProduct}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Product'}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="preview-container">
            {selectedTheme && (
              <PreviewPanel
                selectedTheme={selectedTheme}
                stepsData={stepsData}
                imagePreviews={imagePreviews}
                aminitiesData={stepRepeatedItems[1]}
                applicationData={stepRepeatedItems[2]}
                deviceData={step4Items}
                productAppData={step5Items}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeManager;
