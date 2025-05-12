// src/LandingPage.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import GpsSection from './GpsSection';
import ParentsAppSection from './ParentsAppSection';
import MonitoringSection from './MonitoringSection';
import DriverAppSection from './DriverAppSection';
import SupportedTrackersSection from './SupportedTrackersSection';

function LandingPage3() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <div data-aos="fade-up">
        <HeroSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <FeaturesSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <GpsSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="300">
        <ParentsAppSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <MonitoringSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="500">
        <DriverAppSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="600">
        <SupportedTrackersSection />
      </div>
    </div>
  );
}

export default LandingPage3;
