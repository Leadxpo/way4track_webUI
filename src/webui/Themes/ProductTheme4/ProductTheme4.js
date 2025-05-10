import React from "react";
import "./ProductTheme4.css";

const ProductTheme4 = () => {
  return (
    <div className="pt4-obd-container">
      {/* OBD Card Section */}
      <section className="pt4-obd-card-section">
        <div className="pt4-obd-card">
          {/* <img
            src="/obd-device.png"
            alt="OBD Device"
            className="pt4-obd-card-image"
          /> */}
          <div className="pt4-obd-card-content">
            <h2>OBD Plug and Play Device</h2>
            <p>
              Positioning device with features like electronic fence, remote
              tracking, and vehicle diagnostics.
            </p>
          </div>
        </div>
      </section>

      <div className="pt4-main-section">
        {/* About Section */}
        <section className="pt4-about-section">
          <h2>About</h2>
          <p>
            Way4Track plug & play is an extended version of Plus and Basic
            series of GPS tracking devices. Being an enhanced version, it offers
            many new features. In the vehicle tracking system, it could be used
            to track a car, bus, truck, and many more other vehicles. Attach to
            the OBD port of the car under the dashboard and use it even when it
            is unplugged.
          </p>
        </section>

        {/* Product Parameters Section */}
        <section className="pt4-about-section">
          <h2>Product Parameters</h2>
          <p>
            We offer great prices, premium and quality products for your
            business.
          </p>

          {/* Product Table */}
          <table className="pt4-product-table">
            <tbody>
              <tr>
                <td>
                  <strong>Device Name</strong>
                </td>
                <td>OBD GPS Tracker</td>
              </tr>
              <tr>
                <td>
                  <strong>Model</strong>
                </td>
                <td>WS17</td>
              </tr>
              <tr>
                <td>
                  <strong>Features</strong>
                </td>
                <td>Intelligent vehicle tracking</td>
              </tr>
              <tr>
                <td>
                  <strong>Device Dimension</strong>
                </td>
                <td>47mm(L) × 20mm(W) × 43mm(H)</td>
              </tr>
              <tr>
                <td>
                  <strong>Device Weight</strong>
                </td>
                <td>41g</td>
              </tr>
              <tr>
                <td>
                  <strong>Quad Band</strong>
                </td>
                <td>850/1900/900/1800MHz</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="pt4-about-section">
          <h2>What We Do?</h2>
          <p>
            The crucial idea of the Way4Track vehicle tracking system is to
            ensure the safety of all its customers. The GPS tracking app for the
            bike has to be installed by the individual who will track and
            monitor the concerned person’s location.
          </p>
        </section>

        <section className="pt4-tracking-card-section">
          <div className="pt4-card">
            <img
              src="/tracking.png"
              alt="tracking"
              className="pt4-what-we-do-logo"
            />
            <h3>Tracking</h3>
            <p>
              Track all your loved ones as well as employees in just a single
              screen. Way4Track plug & play lets you track all the concerned
              people within a short span of time. Tracking and safety always
              assured with Way4Track!
            </p>
          </div>
          <div className="pt4-card">
            <img
              src="/24_hours_history.png"
              alt="24_hours_history"
              className="pt4-what-we-do-logo"
            />
            <h3>24 Hour History</h3>
            <p>
              Do not have time to track your friends, family, employees as well
              as colleagues in real-time? Then check all the missed out on just
              a single screen and never worry about them again.
            </p>
          </div>
        </section>

        {/* Speed Alerts & Location on Demand Cards Section */}
        <section className="pt4-tracking-card-section">
          <div className="pt4-card">
            <img
              src="/speed_alert.png"
              alt="speed_alert"
              className="pt4-what-we-do-logo"
            />
            <h3>Speed Alerts</h3>
            <p>
              Set your own speed limits and get alerts whenever it reaches
              maximum. You can benefit from this feature from the Way4Track
              tracking app. Get alerts instantly and track all your friends,
              family, employees as well as colleagues.
            </p>
          </div>
          <div className="pt4-card">
            <img
              src="/location_demand.png"
              alt="location_demand"
              className="pt4-what-we-do-logo"
            />
            <h3>Location on Demand</h3>
            <p>
              Whichever mode your tracker is in, the location on demand feature
              allows you to fetch its real-time position.
            </p>
          </div>
        </section>

        {/* Recover Offline GPS Data & Zone Alerts Card Section */}
        <section className="pt4-tracking-card-section">
          <div className="pt4-card">
            <img
              src="/car_gps_tracker_details_stats.png"
              alt="car_gps_tracker_details_stats"
              className="pt4-what-we-do-logo"
            />
            <h3>Recover Offline GPS Data</h3>
            <p>
              This device has a unique feature to store offline GPS data, which
              means it will store the tracking device locations even when your
              device is offline (GPRS unavailable and GPS available) and post
              the offline historic data to the server as soon as the device is
              online and connected to GPRS.
            </p>
          </div>

          <div className="pt4-card">
            <img
              src="/bike_gps_tracker_zone_alerts.png"
              alt="bike_gps_tracker_zone_alerts"
              className="pt4-what-we-do-logo"
            />
            <h3>Zone Alerts</h3>
            <p>
              Way4Track tracking app enables you to create zones for tracking
              your friends, family, employees, as well as colleagues. It alerts
              you every time the concerned person enters or exits the designated
              zones.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductTheme4;
