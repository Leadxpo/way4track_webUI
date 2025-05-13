import React, { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import DashboardDemo from './DashboardDemo';
import TrackingFeatures from './TrackingFeatures';
import FeatureGrid from './FeatureGrid';
import CTASection from './CTASection';
import './styles/App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  // Mock data that would normally come from an API or CMS
  const productData = {
    name: "Bike GPS Tracker",
    shortDescription: "The ultimate bike tracking solution with real-time location monitoring",
    description: "Advanced Consumer Vehicle Tracking Platform",
    heroImage: "./images/banner1.png",
    mobileAppImage: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=",
    dashboardImage1: "./images/banner2.png",
    dashboardImage2: "./images/banner3.png",
    footerImage: "https://images.pexels.com/photos/5372639/pexels-photo-5372639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  };

  return (
    <div className="bike-tracker-app">
      <HeroSection 
        title={productData.name} 
        description={productData.shortDescription}
        heroImage={productData.heroImage}
        mobileAppImage={productData.mobileAppImage}
      />
      <FeaturesSection 
        title={productData.description}
      />
      <DashboardDemo 
        dashboardImage={productData.dashboardImage1}
      />
      <TrackingFeatures 
        dashboardImage={productData.dashboardImage2}
      />
      <FeatureGrid />
      <CTASection 
        footerImage={productData.footerImage}
      />
    </div>
  );
}

export default App;