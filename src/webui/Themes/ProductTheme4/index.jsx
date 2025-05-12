import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ParametersSection from './ParametersSection';
import FeaturesSection from './FeaturesSection';
import './styles/product-page.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = ({data}) => {
  return (
    <div className="product-page">
      <HeroSection stateData={data} />
      <div className="container-fluid">
        <AboutSection stateData={data}/>
        <ParametersSection stateData={data} />
        <FeaturesSection stateData={data} />
      </div>
    </div>
  );
};

export default ProductPage;