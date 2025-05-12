import React from "react";
import "./ProductTheme2.css";

const ProductTheme2 = ({data}) => {
  const features = [
    {
      icon: "/live_location_tracking.png", // Replace with actual paths to your icons
      title: "Live Location Tracking",
      description: "Real-time tracking with GEO fencing.",
    },
    {
      icon: "/over_speed.png",
      title: "Over Speed",
      description: "Get Over Speed Alerts on Your Smartphone.",
    },
    {
      icon: "/geo_fence.png",
      title: "Geofence",
      description: "Get powerful insights with Geofence Analytics.",
    },
    {
      icon: "/history_view.png",
      title: "History View",
      description: "Entire data of vehicle history is available.",
    },
  ];
  return (
    <div>
      <div className="ais-container">
        {/* <header className="header">
        <img src="/logo-way4track.png" alt="Way4Track Logo" className="logo" />
        <span className="company-name">SHARON TELEMATICS PVT. LTD</span>
        <div className="login-buttons">
          <button className="green">Blogs</button>
          <button className="purple">Way4Track Pro</button>
          <button className="green">Way4Track Login</button>
          <button className="yellow">Way4Track Prime Login</button>
          <button className="red">Way4Track Prime Login 1</button>
        </div>
      </header> */}

        {/* Section 1: Government Approved Mining Device */}
        <div className="main-section">
          <div className="left-panel">
            <p className="auth-text">AUTHORISED BY</p>
            {/* <img
            src="/andhra-logo.png"
            alt="Andhra Pradesh Logo"
            className="ap-logo"
          />
          <p className="govt-text">
            DEPARTMENT OF MINES AND GEOLOGY
            <br />
            GOVT. OF ANDHRA PRADESH
          </p> */}
            <img
              src="/ap_mining.png"
              alt="Mining Truck"
              className="truck-img"
            />
          </div>

          <div className="right-panel">
            <h1 className="main-title">
             {data.name}
            </h1>
            <p className="sub-text">
              AIS 140 IRNSS Device is approved and certified by the Govt. of
              India.
            </p>
            <button className="know-more">Know more</button>
          </div>
        </div>

        {/* Section 2: AIS140 GPS for Mining Vehicles */}
        <section className="mining-section">
          <div className="text-column">
            <h2 className="section-title">
              AIS140 GPS systems for <br /> <span>Mining Vehicles</span>
            </h2>
            <p>
              Automotive Industry Standard-140 or AIS-140 is the Intelligent
              Transport System (ITS) that the government of India have designed
              to optimize and secure the efficiency of the transport system in
              India.
            </p>
            <p>
              It is now mandatory for all the Mining transport organisations
              that the E-permit system has to be integrated with the GPS vehicle
              tracking system.
            </p>
            <p>
              As per the AP state government guidelines all mining transport
              vehicles must be integrated with AIS 140 devices in order to
              maintain real-time location, stoppage reports and other
              performance information with government servers.
            </p>
          </div>
          <div className="image-column">
            <img
              src="/mining_1.png"
              alt="AIS140 Mining Vehicles"
              className="mining-image"
            />
          </div>
        </section>

        {/* Section 3: AIS 140 Certified Device Info */}
        <section className="device-info-section">
          <div className="device-info-container">
            <div className="device-image">
              <img src="/ais140_img.png" alt="AIS 140 GPS Tracker" />
            </div>
            <div className="device-text">
              <h2 className="device-title">
                AIS 140 CERTIFIED GPS TRACKING DEVICE
              </h2>
              <p>
                Automotive Industry Standard-140 or AIS-140 is the Intelligent
                Transport System (ITS) that the government of India have
                designed to optimize and secure the efficiency of the transport
                system in India. This design has been proven worldwide to
                enhance the use of the present transport foundation up to its
                optimum ability which helps to improve the transport system in
                its efficacy, value, safety and security. The implementation of
                AIS 140 is being done all over the country.
              </p>
              <button className="know-more">Know more</button>
            </div>
          </div>
        </section>

        {/* Section 4: Online Mineral ePermit Steps */}
        <section className="epermit-steps-section">
          <div className="epermit-steps-sub-section">
            <h2 className="epermit-title">
              Here are 3 working steps to The Online Mineral ePermit System
            </h2>
            <p className="epermit-description">
              The online E-Permit system is made easy with Way4Track to help our
              customers get AIS140 GPS integration as easy as possible and to
              make the process much faster.
            </p>
            <p className="epermit-description">
              The 3 steps mentioned show the Process of GPS integration with the
              portal of Online Mineral ePermit System, Department of AP Mining
              and Geology, Andhra Pradesh.
            </p>
            <p className="epermit-description">
              This design has been proven worldwide to enhance the use of the
              present transport foundation up to its optimum ability which helps
              to improve the transport system in its efficacy, value, safety and
              security. The implementation of AIS 140 is being done all over the
              country.
            </p>
            <button className="know-more">Learn More</button>
          </div>
          <div className="step-cards">
            <div className="step-card">
              <div className="step-number">01</div>
              <div>
                <h3 className="step-title">Vehicle Registration</h3>
                <p>
                  The process of Vehicle getting registered with Mining
                  Transportation.
                </p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div>
                <h3 className="step-title">GPS Installation</h3>
                <p>
                  This process involves the Vehicle getting fitted with GPS
                  Device.
                </p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div>
                <h3 className="step-title">Vehicle communication</h3>
                <p>
                  The process of GPS getting live and interactive with servers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Why Choose Us */}
        <section className="why-choose-us-section">
          <div className="choose-us-content">
            <div className="choose-us-illustration">
              <img
                src="/customer_service.png"
                alt="Support Team Illustration"
              />
            </div>
            <div className="choose-us-text">
              <h4 className="section-subtitle">WHY CHOOSE US?</h4>
              <h2 className="highlight-title">
                We bring solutions to make life easier for our clients.
              </h2>
              <ul className="features-list">
                <li>
                  <strong>✔ Approved Dealers</strong>
                  <br />
                  We are approved dealer for AIS 140 with large group of
                  customer network.
                </li>
                <li>
                  <strong>✔ Top-Notch Support</strong>
                </li>
                <li>
                  <strong>✔ User friendly Dashboard</strong>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Our Solutions */}
        <section className="our-solutions-section">
          <div className="solutions-content">
            <div className="solutions-text">
              <p className="section-subtitle">OUR SOLUTIONS</p>
              <h2 className="highlight-title">
                AIS 140 IRNSS Certified GPS Tracker for commercial vehicles
              </h2>
              <p>
                An AIS 140 IRNSS Certified GPS Tracker is a perfect fit for
                commercial vehicles to maximize profits by their operating
                efficiency and cutting on cost. It may also replace the toll
                gates in the future.
              </p>
            </div>
            <div className="solutions-image">
              <img src="/ap_mining_04.png" alt="Commercial Vehicles" />
            </div>
          </div>
        </section>

        <div className="bg-white py-12 px-6 max-w-7xl mx-auto">
          {/* Features Section */}
          <div className="ais-features">
            {features.map((feature, index) => (
              <div className="ais-feature-item" key={index}>
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="ais-icon"
                />
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="product-theme-2-footer-image-section">
        <img
          className="product-theme-2-footer-image"
          src="images/ais_mining_banner_footer.png"
        />
      </div>
    </div>
  );
};

export default ProductTheme2;
