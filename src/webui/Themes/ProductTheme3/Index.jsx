// src/LandingPage.js
import React from 'react';

// import HeroSection from './HeroSection';
// import FeaturesSection from './FeaturesSection';
// import GpsSection from './GpsSection';
// import ParentsAppSection from './ParentsAppSection';
// import MonitoringSection from './MonitoringSection';
// import DriverAppSection from './DriverAppSection';
// import SupportedTrackersSection from './SupportedTrackersSection';
import SchoolBus from './SchoolBus';



const LandingPage = ({ data }) => {
  return (
    <div className="landing-page bg-gradient-to-b from-white to-amber-50">
      <SchoolBus 
      title={data.name} 
        description={data.shortDescription} 
        heroImage={data.blogImage}
        stateData={data} />
      {/* <HeroSection stateData={data} /> */}
      {/* <div className="container-fluid"> */}
        {/* <FeaturesSection stateData={data} /> */}
        {/* <GpsSection stateData={data} /> */}
        {/* <ParentsAppSection stateData={data} /> */}
        {/* <MonitoringSection stateData={data} />
        <DriverAppSection stateData={data} /> */}
        {/* <SupportedTrackersSection stateData={data} /> */}
      {/* </div> */}
    </div>
  );
};

export default LandingPage;
