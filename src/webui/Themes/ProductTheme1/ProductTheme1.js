import React from "react";

import "./ProductTheme1.css";
import { productThemeData } from "./productThemeData"; // Adjust path if needed

const ProductTheme1 = ({ data  }) => {
  if (!data) return null; // Prevent render errors if data is undefined

  const {
    header,
    mainImage,
    featuresSection,
    trackingDashboard,
    bikeTrackerSection,
    footerImage,
  } = data;

  return (
    <div className="tracker-container">
      {/* Header Section */}
      <div className="header-section">
        <h1 className="title">{data.name}</h1>
        <p className="subtitle">{header?.shortDescription}</p>
      </div>

      {/* Image Section */}
      <div className="image-section">
        <div className="image-wrapper">
          <img src={mainImage} alt="Map Tracking" className="map-image" />
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="features-heading">{featuresSection?.heading}</h2>
        <div className="features-grid">
          {featuresSection?.features?.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Dashboard Section */}
      <div className="vehicle-tracking-container">
        <div className="tracking-dashboard-image">
          <img
            src={trackingDashboard?.leftImage}
            alt="Vehicle Tracking Dashboard"
          />
        </div>

        <div className="alerts-section">
          {trackingDashboard?.alerts?.map((alert, index) => (
            <div className="alert-feature" key={index}>
              <img src={alert.img} alt={alert.title} />
              <h4>{alert.title}</h4>
              <p>{alert.text}</p>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h5>{trackingDashboard?.cta?.title}</h5>
          <p>{trackingDashboard?.cta?.text}</p>
          <button>Try it today</button>
        </div>
      </div>

      {/* Bike Tracker Section */}
      <div className="bike-tracker-section">
        <div className="dashboard-image-container">
          <img
            src={bikeTrackerSection?.rightImage}
            alt="GPS Tracking Dashboard"
            className="dashboard-image"
          />
        </div>

        <div className="features-row">
          {bikeTrackerSection?.features?.map((feature, index) => (
            <div className="feature" key={index}>
              <img src={feature.img} alt={feature.title} />
              <h4>{feature.title}</h4>
              <p>{feature.text}</p>
            </div>
          ))}

          <div className="what-we-do">
            <h5>{bikeTrackerSection?.whatWeDo?.title}</h5>
            <p>{bikeTrackerSection?.whatWeDo?.text}</p>
          </div>

          <div className="info-boxes">
            {bikeTrackerSection?.infoBoxes?.map((box, index) => (
              <div className="info-box orange" key={index}>
                <img
                  src={box.icon}
                  alt={box.title}
                  className="feature-icon"
                />
                <h4>{box.title}</h4>
                <p>{box.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <img className="footer-image" src={footerImage} alt="Footer" />
    </div>
  );
};

export default ProductTheme1;
