// src/LandingPage.js
import React from 'react';

import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import GpsSection from './GpsSection';
import ParentsAppSection from './ParentsAppSection';
import MonitoringSection from './MonitoringSection';
import DriverAppSection from './DriverAppSection';
import SupportedTrackersSection from './SupportedTrackersSection';



const LandingPage = ({ stateData }) => {
  return (
    <div className="landing-page bg-gradient-to-b from-white to-amber-50">
      <HeroSection stateData={stateData} />

      <div className="container-fluid">
        <FeaturesSection stateData={stateData} />
        <GpsSection stateData={stateData} />
        <ParentsAppSection stateData={stateData} />
        <MonitoringSection stateData={stateData} />
        <DriverAppSection stateData={stateData} />
        <SupportedTrackersSection stateData={stateData} />
      </div>
    </div>
  );
};

export default LandingPage;
