import React, { useEffect, useRef } from 'react';
import { Cpu } from 'lucide-react';

const HeroSection = ({stateData}) => {
  const heroRef = useRef(null);  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 500;
      const scale = 1 - scrollPosition / 2000;
      const translateY = scrollPosition * 0.5;
      
      heroRef.current.style.opacity = opacity > 0 ? opacity : 0;
      heroRef.current.style.transform = `scale(${scale > 0.8 ? scale : 0.8}) translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container h-100 d-flex align-items-center">
        <div className="row align-items-center w-100">
          <div className="col-lg-6 text-white" data-aos="fade-right">
            <h1 className="display-4 fw-bold mb-4" style={{color:"white",textTransform:'capitalize'}}>{stateData.name?stateData.name:"OBD Plug and Play Device"}</h1>
            <p className="lead mb-4">
              {stateData.shortDescription?stateData.shortDescription:"Advanced positioning device with premium features like electronic fence, remote tracking, and comprehensive vehicle diagnostics."}
            </p>
            <button className="btn btn-primary btn-lg pulse-btn">
              Learn More
            </button>
          </div>
          <div className="col-lg-6 d-flex justify-content-center" data-aos="zoom-in" data-aos-delay="300">
            <div className="device-container" ref={heroRef}>
              <div className="device">
                <div className="device-body">
                  <div className="device-icon">
                    <Cpu size={40} />
                  </div>
                </div>
                <div className="device-connector"></div>
                <div className="device-light pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;