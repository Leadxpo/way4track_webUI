import React, { useState, useEffect } from 'react';

// FeatureCard Component
const FeatureCard = ({ icon, title, description, color }) => {
  console.log("rrr:", icon)
  return (
    <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
      <div
        className={`feature-card`}
        style={{ '--accent-color': color }}
      >
        <img
          src={
            icon
              ? icon
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
          }
          alt="Feature"
          className="future-icon"
        />
        <h3 className="feature-title" style={{textTransform:'capitalize'}}>{title}</h3>
        <p className="feature-description">{description}</p>
        <div className="feature-overlay"></div>
      </div>
    </div>
  );
};

// FeaturesSection Component
const FeaturesSection = ({ stateData }) => {
  const aminitiesData = stateData?.aminities || [];

  return (
    <section className="features-section py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mb-5">
          <h6 className="text-primary text-uppercase" data-aos="fade-up">
            What We Do
          </h6>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Key Features & Benefits
          </h2>
          <div className="divider mx-auto" data-aos="fade-up" data-aos-delay="200"></div>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="300">
            The Way4Track vehicle tracking system ensures the safety and peace of mind for all our customers
          </p>
        </div>
      </div>

      <div className="row" style={{ padding: '50px' }}>
        {aminitiesData?.map((item, index) => {
          const aminityImages = [
            stateData.aminityImage1,
            stateData.aminityImage2,
            stateData.aminityImage3,
            stateData.aminityImage4,
            stateData.aminityImage5,
            stateData.aminityImage6,
          ];

          return (
            <FeatureCard
              key={index}
              icon={aminityImages[index]} // this gets the correct File or URL
              title={item.name}
              description={item.desc}
              color="#4CAF50"
            />
          );
        })}
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-8 text-center">
          <div className="cta-box" data-aos="zoom-in">
            <h3>Ready to enhance your vehicle security?</h3>
            <p>Get started with our premium{stateData.name} device today</p>
            <button className="btn btn-primary btn-lg mt-3">
              Request a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
