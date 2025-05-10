import React from "react";
import "./ProductTheme3.css";

const ProductTheme3 = () => {
  return (
    <div className="pt4-schoolbus-wrapper">
      {/* Header */}
      <div className="pt4-schoolbus-header">
        <img
          src="/bus_internal1.png"
          alt="School Bus"
          className="pt4-schoolbus-image"
        />

        <div className="pt4-schoolbus-content">
          <h2 className="pt4-schoolbus-title">School Bus Tracker</h2>
          <p className="pt4-schoolbus-description">
            SmartBus generates trips, lets you see how long the bus spends at
            each stop, notifies delays, records attendance, and more. Sit back
            and relax, let SmartBus do the work for you!
          </p>
          <button className="pt4-demo-button">Free Demo Call</button>
        </div>
      </div>

      {/* Section Title */}
      <div className="pt4-schoolbus-section-title">
        <p className="pt4-p3-what-we-do">WHAT WE DO?</p>
        <h3 className="pt4-schoolbus-highlight">
          GETTING KIDS GETS TO SCHOOL ON TIME & BACK HOME SAFELY
        </h3>
      </div>

      {/* Features */}
      <div className="pt4-features-grid">
        <FeatureCard image="/route_planing.png" title="Route Planing" />
        <FeatureCard
          image="/driver_Cleaner_Allocation.png"
          title="Driver Allocation"
        />
        <FeatureCard image="/geofencing.png" title="Geofencing" />
        <FeatureCard image="/rpm.png" title="RPM" />
      </div>

      <div className="pt4-gps-container">
        <div className="pt4-gps-left">
          <p className="pt4-gps-analyze">ANALYZE NOW</p>
          <h2 className="pt4-gps-title">GPS For School Bus</h2>
          <p className="pt4-gps-description">
            We provide customised GPS solutions to School buses to help both
            management and parents to track their first location and activity.
          </p>
          <p className="pt4-gps-description">
            lets you see how long the bus spends at each stop, notifies delays,
            records attendance, and more. Sit back and relax, let SmartBus do
            the work for you!
          </p>
        </div>

        <div className="pt4-gps-right">
          <img
            src="/bus_internal2.png"
            alt="GPS For School Bus"
            className="pt4-gps-image"
          />
        </div>
      </div>

      <div className="pt4-parents-app-container">
        <div className="pt4-parents-app-top">
          <div className="pt4-parents-app-left">
            <p className="pt4-section-subtitle">FEATURES</p>
            <h2 className="pt4-section-title">Parents App</h2>
            <p className="pt4-section-text">
              Keeps parents in the know of bus ETA, departures, and delays. An
              easy-to-use and intuitive app, giving parents control over their
              child’s safety.
            </p>
            <p className="pt4-section-text">
              A portal that allows school management to ensure the safety of
              students in transit. They can track multiple buses in real-time
              and quickly connect with drivers and parents during emergencies.
            </p>
          </div>

          <div className="pt4-parents-app-right">
            <div className="pt4-feature-box">
              <div className="pt4-feature-number">01</div>
              <div>
                <h4 className="pt4-feature-title">Bus Tracking</h4>
                <p className="pt4-feature-description">
                  Know bus locations in real-time
                </p>
              </div>
            </div>
            <div className="pt4-feature-box">
              <div className="pt4-feature-number">02</div>
              <div>
                <h4 className="pt4-feature-title">No More Waiting!</h4>
                <p className="pt4-feature-description">
                  Get accurate ETA notifications
                </p>
              </div>
            </div>
            <div className="pt4-feature-box">
              <div className="pt4-feature-number">03</div>
              <div>
                <h4 className="pt4-feature-title">Child Attendance Records</h4>
                <p className="pt4-feature-description">
                  Keep a record of your child’s attendance
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt4-parents-app-bottom">
          <div className="pt4-parents-app-image">
            <img src="/bus_internal3.png" alt="Safety Graph and Phone" />
          </div>

          <div className="pt4-parents-app-why">
            <p className="pt4-section-subtitle">WHY CHOOSE US?</p>
            <h2 className="pt4-section-title">
              Why is SmartBus the smart choice?
            </h2>

            <div className="pt4-accordion-item">
              <h4>📌 Attendance</h4>
              <p>
                SmartBus offers advanced tools for tracking and maintaining
                student attendance. Account for students’ presence using QR
                codes, RFID, or biometrics. Additionally, parents can access
                their child’s attendance records and reports in case of
                discrepancies.
              </p>
            </div>
            <div className="pt4-accordion-item">
              <h4>📊 Student Data Management</h4>
            </div>
            <div className="pt4-accordion-item">
              <h4>🧑‍✈️ Better Drivers</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="pt4-school-bus-monitoring">
        <section className="pt4-monitoring-section">
          <p className="pt4-section-subtitle">APP</p>
          <h2 className="pt4-section-title">School Bus Monitoring</h2>
          <div className="pt4-feature-cards">
            <div className="pt4-feature-card">
              <img
                src="/point_of_Intrest.png"
                alt="point_of_Intrest"
                className="pt4-feature-image"
              />

              <h3 className="pt4-feature-title">School Bus Monitoring</h3>
              <p className="pt4-feature-description">
                Control from the very first to the last stop!
              </p>
            </div>
            <div className="pt4-feature-card">
              <img
                src="/travel_history.png"
                alt="travel_history"
                className="pt4-feature-image"
              />
              <h3 className="pt4-feature-title">Improve Safety Metrics</h3>
              <p className="pt4-feature-description">
                Avoid route deviation or reckless driving
              </p>
            </div>
            <div className="pt4-feature-card">
              <img
                src="/route_planing.png"
                alt="route_planing"
                className="pt4-feature-image"
              />
              <h3 className="pt4-feature-title">Instant Notifications</h3>
              <p className="pt4-feature-description">
                Get notified instantly in case of emergencies
              </p>
            </div>
            <div className="pt4-feature-card">
              <img
                src="/route_path_Allocation.png"
                alt="route_path_Allocation"
                className="pt4-feature-image"
              />
              <h3 className="pt4-feature-title">Route Optimization</h3>
              <p className="pt4-feature-description">
                Outline shorter and efficient bus routes
              </p>
            </div>
          </div>
        </section>

        <section className="pt4-driver-app-section">
          <div className="pt4-driver-app-sub-section">
            {/* Left Column: Features */}
            <div className="pt4-driver-features-column">
              <p className="pt4-section-subtitle">APP</p>
              <h2 className="pt4-section-title">Driver App</h2>
              <ul className="pt4-driver-features">
                <li className="pt4-driver-feature">Pickup/Drop Management</li>
                <li className="pt4-driver-feature">
                  Driver’s can confirm student attendance
                </li>
                <li className="pt4-driver-feature">Route Planning</li>
                <li className="pt4-driver-feature">
                  Edit or get acquainted with trips
                </li>
              </ul>
            </div>

            {/* Right Column: Combined Image */}
            <div className="pt4-driver-image-column">
              <img
                src="/bus_internal4.png"
                alt="Driver app showing route on map"
                className="pt4-driver-image"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="pt4-supported-gps-section">
        <div className="pt4-gps-cards-container">
          <div className="pt4-gps-card">
            <p className="pt4-gps-text">
              “SmartBus is our school bus monitoring software solution. It is an
              application suite consisting of the SmartBus Manager app, the
              SmartBus Parent app, the SmartBus driver app, and the SmartBus
              attendant app.”
            </p>
          </div>
          <div className="pt4-gps-card">
            <p className="pt4-gps-text">
              “The SmartBus parent app keeps all parents updated with their
              kid’s school bus locations. Using the live tracking system,
              parents can access their child’s school bus arrival and departure
              times. They can also customize school bus arrival alerts.”
            </p>
          </div>
          <div className="pt4-gps-card">
            <p className="pt4-gps-text">
              “SmartBus can be integrated with video telematics tools like
              dual-lens dash cams. Then, live video footage can be accessed by
              parents and school admins.”
            </p>
          </div>
          <div className="pt4-gps-card">
            <p className="pt4-gps-text">
              “SmartBus offers a variety of tools and reports to better
              understand driving behaviors. You can install driver-facing dash
              cams to see what your drivers are doing.”
            </p>
          </div>
        </div>
        <div className="pt4-gps-info-section">
          <p className="pt4-gps-subtitle">OUR COMMUNITY</p>
          <h2 className="pt4-gps-title">Supported GPS Tracker</h2>
          <p className="pt4-gps-description">
            Our fleet management system is compatible with over 1200+ GPS
            trackers and a variety of sensors. So, you can change your GPS
            trackers or hardware devices without having to change your fleet
            management platform!
          </p>
        </div>
      </div>
      <div>
        <img
          className="pt4-footer-image"
          src="/school_bus_banner_footer.png"
          alt="school_bus_banner_footer"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ image, title }) => (
  <div className="pt4-feature-card">
    <img src={image} alt={title} className="pt4-feature-image" />
    <p className="pt4-feature-title">{title}</p>
  </div>
);

export default ProductTheme3;
