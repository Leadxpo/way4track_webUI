import React from 'react';
import { useInView } from 'react-intersection-observer';

const AboutSection = ({stateData}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  return (
    <section className="about-section py-5" ref={ref}>
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mb-5">
          <h6 className="text-primary text-uppercase" data-aos="fade-up">About Our Device</h6>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            {stateData.name?stateData.name:"Advanced GPS Tracking Technology"}
          </h2>
          <div className="divider mx-auto" data-aos="fade-up" data-aos-delay="200"></div>
        </div>
      </div>
      
      <div className="row align-items-center" style={{padding:"50px",justifyContent:'center'}}>
        <div className="col-lg-5 mb-4 mb-lg-0">
          <div className={`about-image ${inView ? 'animate' : ''}`} data-aos="fade-right">
            <img src={stateData.blogImage?stateData.blogImage:"https://images.pexels.com/photos/4219052/pexels-photo-4219052.jpeg"} alt="OBD GPS Tracker" className="img-fluid rounded shadow" />
            <div className="floating-badge">
              <span>Premium</span>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-7">
          <div className="about-content" data-aos="fade-left">
            <p className="lead">
              Way4Track plug & play is an enhanced version of Plus and Basic series of GPS tracking devices, 
              offering numerous advanced features for comprehensive vehicle monitoring.
            </p>
            <p>
              In the vehicle tracking system, it can be used to track cars, buses, trucks, and many other vehicles. 
              Simply attach it to the OBD port under the dashboard and use it even when unplugged, thanks to its 
              built-in battery backup system.
            </p>
            <div className="row mt-4">
              <div className="col-md-6 mb-3">
                <div className="feature-item" data-aos="zoom-in" data-aos-delay="100">
                  <div className="icon-box">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <h5>Real-time Tracking</h5>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="feature-item" data-aos="zoom-in" data-aos-delay="200">
                  <div className="icon-box">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h5>Tamper Alert</h5>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="feature-item" data-aos="zoom-in" data-aos-delay="300">
                  <div className="icon-box">
                    <i className="bi bi-battery-charging"></i>
                  </div>
                  <h5>Built-in Battery</h5>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="feature-item" data-aos="zoom-in" data-aos-delay="400">
                  <div className="icon-box">
                    <i className="bi bi-tools"></i>
                  </div>
                  <h5>Diagnostic Data</h5>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AboutSection;