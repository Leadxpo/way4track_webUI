import React, { useState } from 'react';
import './Mining.css';

function Mining() {
  const [selectedTruckInfo, setSelectedTruckInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Quantity control functions
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="mining-body">
      {/* Landing Section */}
      <div className="mining-hero">
        <img
          className="mining-hero-img"
          src="/images/mining1.png"
          alt="Mining"
        />
      </div>

      {/* Header Content */}
      <div className="mining-intro">
        <div className="mining-intro-heading">
          <h1>Curious to know about AIS-140 GPS Tracker ?</h1>
        </div>
        <div className="mining-intro-text">
          <p>
            AIS-140 is a mandate by the Government of India that requires
            vehicles to have GPS tracking and an emergency button. In mining
            vehicles, it is mainly used for real-time tracking and ensuring
            worker safety within mining zones.
          </p>
        </div>
      </div>

      {/* Tracker Properties Section */}
      <div className="mining-features">
        {/* Left side */}
        <div className="mining-feature-left">
          <div className="mining-feature-icon">
            <img src="/images/file_map.png" alt="GNSS Precision Tracking" />
          </div>
          <div className="mining-feature-title">
            <p>Advanced GNSS Precision Tracking</p>
          </div>
          <div className="mining-feature-desc">
            <p>
              Navigate with unmatched precision, powered by advanced
              high-sensitivity GNSS technology. Equipped with GPS, GLONASS, and
              IRNSS, it ensures seamless regional accuracy at all times. Whether
              you're driving through bustling city streets, cruising along
              highways, or exploring remote off-road terrains, reliable tracking
              stays with you everywhere. Wherever your journey takes you, trust
              in continuous, precise, and dependable navigation.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="mining-feature-right">
          <div className="mining-feature-top">
            <div className="mining-feature-top-header">
              <div className="mining-feature-top-icon">
                <img src="/images/ambulance.png" alt="Real-Time Tracking" />
              </div>
              <div className="mining-feature-top-title">
                <p>Real-Time Tracking & Route Playback</p>
              </div>
            </div>
            <div className="mining-feature-top-desc">
              <p>
                "Monitor your vehicles live with accurate real-time tracking.
                Replay complete routes to review past journeys with ease.
                Improve planning, safety, and accountability on the move. Stay
                in control with every trip, past or present."
              </p>
            </div>
          </div>

          <div className="mining-feature-bottom">
            <div className="mining-feature-card">
              <div className="mining-feature-card-icon">
                <img src="/images/target.png" alt="High Accuracy Tracking" />
              </div>
              <div className="mining-feature-card-title">
                <p>
                  High Accuracy Tracking <br /> (≤ 2.5 meters)
                </p>
              </div>
              <div className="mining-feature-card-desc">
                <p>
                  Pinpoint location precision with up to 2.5 meters accuracy.
                  Reliable tracking in cities, highways, and remote areas.
                </p>
              </div>
            </div>

            <div className="mining-feature-card">
              <div className="mining-feature-card-icon">
                <img src="/images/alarm_smart_wake.png" alt="Smart Alerts" />
              </div>
              <div className="mining-feature-card-title">
                <p>Smart Alerts for Safer Tracking</p>
              </div>
              <div className="mining-feature-card-desc">
                <p>
                  Get instant alerts for geo-fence breaches, overspeeding, and
                  route deviations. Stay in control with safer, smarter vehicle
                  tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GPS Image */}
      <div className="mining-gps-img">
        <img src="/images/Rectangle 73.png" alt="GPS Tracker" />
      </div>

      {/* Properties 2 Section (3-column layout) */}
      <div className="mining-props">
        {/* Left */}
        <div className="mining-prop-left">
          <h3>Panic/SOS Button Support</h3>
          <p>
            In the event of an emergency, the system instantly transmits
            real-time alerts to the control center, enabling immediate awareness
            and action. This rapid communication ensures faster response times,
            minimizes risks, and significantly enhances the safety and security
            of passengers, drivers, and vehicles at all times.
          </p>
        </div>

        {/* Middle */}
        <div className="mining-prop-middle">
          <div className="mining-prop-card-1"></div>
          <div className="mining-prop-card-2">
            <div>
              <h3>Inbuilt eSIM Support</h3>
            </div>
            <div>
              <p>
                Enjoy hassle-free connectivity with inbuilt eSIM (available in
                select models). Stay connected without the need for physical SIM
                cards.
              </p>
            </div>
          </div>
          <div className="mining-prop-card-3">
            <h3>e-SIM Slots for Uninterrupted Tracking</h3>
          </div>
        </div>

        {/* Right */}
        <div className="mining-prop-right">
          <h3>Cloud Data Storage</h3>
          <p>
            Secure and reliable cloud-based storage ensures that all trip data
            and safety alerts are archived. This provides easy access for
            audits, compliance, and long-term analysis of vehicle performance
            and safety.
          </p>
        </div>
      </div>
      <div className="mining-prop-footer">
        <p>
          Experience uninterrupted connectivity with built-in dual SIM support,
          designed to provide <br /> seamless network one SIM loses coverage or
          fails, the second SIM automatically takes over to <br /> maintain
          continuous sures reliable communication, minimizes downtime, and
          guarantees <br /> consistent performance, whether in urban zones,
          highways, or remote areas.
        </p>
      </div>
      <div className="mining-product">
        <div className="mining-product-img">
          <img src="/images/miningProductImage.png" alt="" />
        </div>
        <div className="mining-product-details">
          <div className="mining-product-title">
            <h2>
              AIS-140 Mining GPS Tracker – Government Approved | Real-Time
              Tracking | SOS Button | Dual SIM | 4 Hours Backup Battery
            </h2>
          </div>
          <div className="mining-product-price">
            <p>Rs. 3,999.00 - Rs. 4,990.00</p>
          </div>
          <div className="mining-product-features">
            <ul>
              <li>
                AIS-140 Certified & Govt Approved – Mandatory for commercial
                vehicles
              </li>
              <li>
                Real-Time Tracking & SOS Alerts – Safer rides, instant
                notifications
              </li>
              <li>Dual SIM / 2G & 4G Connectivity – Always stay connected</li>
              <li>4 Hours Backup Battery – Reliable even during power cuts</li>
            </ul>
          </div>
          <div className="mining-product-order">
            <div className="mining-product-option">
              <div className="mining-product-network-label">
                <p>Network Support SIM:</p>
              </div>
              <div className="mining-product-network-btns">
                <div className="mining-product-network-btn">
                  <button>2G</button>
                </div>
                <div className="mining-product-network-btn">
                  <button>4G</button>
                </div>
              </div>
            </div>
            <div className="mining-product-final-price">
              <p>Rs. 3,999.00</p>
            </div>
            <div className="mining-product-quantity">
              <div className="mining-product-quantity-label">
                <p>Quantity</p>
              </div>
              <div className="mining-product-quantity-controls">
                <div className="mining-product-quantity-selector">
                  <div className="mining-product-quantity-value">
                    <p>{quantity}</p>
                  </div>
                  <div className="mining-product-quantity-btns">
                    <div className="mining-product-quantity-btns-container">
                      <button
                        className="quantity-up"
                        onClick={incrementQuantity}
                      >
                        <img
                          className="arrow-up"
                          src="/images/up-arrows.png"
                          alt="Increase quantity"
                        />
                      </button>
                      <button
                        className="quantity-down"
                        onClick={decrementQuantity}
                      >
                        <img
                          className="arrow-down"
                          src="/images/arrow-down-sign-to-navigate.png"
                          alt="Decrease quantity"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mining-product-cart-btn">
                  <button>Add to Cart</button>
                </div>
                <div className="mining-product-buy-btn">
                  <button>Buy it now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Two-column truck info section */}
      <div className="mining-truck-info-section">
        <div className="mining-truck-info-left">
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(1)}
          >
            <p>
              Supports a wide range of 9–36V DC, making it compatible with
              multiple mining vehicles
            </p>
          </div>
          <hr className="mining-truck-info-divider" />
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(2)}
          >
            <p>
              Equipped with 4 hours battery, ensuring uninterrupted operation
              with a minimum of 4 hours backup as mandated by AIS-140 standards.
            </p>
          </div>
          <hr className="mining-truck-info-divider" />
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(3)}
          >
            <p>
              Water-resistant AIS-140 devices with an IP67 rating are ideal for
              mining vehicles, as they withstand dust, mud, and water, ensuring
              reliable real-time tracking even in tough environments.
            </p>
          </div>
        </div>
        <div className="mining-truck-info-right">
          <img
            className={
              selectedTruckInfo === 3 ? 'iphone-truck' : 'default-truck'
            }
            src={
              selectedTruckInfo === 3
                ? '/images/iphone-mine.png'
                : '/images/mining-page-truck.png'
            }
            alt="Mining Trucks"
          />
        </div>
      </div>
      {/* Benefits Section */}
      <div className="mining-benefits-section">
        <h2 className="mining-benefits-header">
          Benefits of AIS-140 GPS Tracker
        </h2>
        <div className="mining-benefits-grid">
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img src="/images/legal.png" alt="Legal Compliance" />
            </div>
            <div className="mining-benefit-title">
              <h3>Legal Compliance</h3>
            </div>
            <div className="mining-benefit-desc">
              AIS-140 certified GPS devices are mandatory in India for
              commercial and public transport vehicles to meet government
              standards.
            </div>
            <button className="mining-benefit-plus">
              <span>+</span>
            </button>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img
                src="/images/government-integration.png"
                alt="Government Integration"
              />
            </div>
            <div className="mining-benefit-title">
              <h3>Government Integration</h3>
            </div>
            <div className="mining-benefit-desc">
              Live location and travel data are automatically shared with state
              and national control centers.
            </div>
            <button className="mining-benefit-plus">
              <span>+</span>
            </button>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img
                className="mining-benefit-icon-passenger"
                src="/images/delivery-truck.png"
                alt="Passenger Safety"
              />
            </div>
            <div className="mining-benefit-title">
              <h3>Passenger Safety</h3>
            </div>
            <div className="mining-benefit-desc">
              SOS button enables instant emergency alerts to ensure quick help
              during accidents or threats.
            </div>
            <button className="mining-benefit-plus">
              <span>+</span>
            </button>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img src="/images/fleet.png" alt="Fleet Efficiency" />
            </div>
            <div className="mining-benefit-title">
              <h3>Fleet Efficiency</h3>
            </div>
            <div className="mining-benefit-desc">
              Real-time tracking improves routes, reduces downtime, and boosts
              productivity for fleets and trucks.
            </div>
            <button className="mining-benefit-plus">
              <span>+</span>
            </button>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img
                src="/images/shop-specialist-icon.png"
                alt="Shop Specialist"
              />
            </div>
            <div className="mining-benefit-title">
              <h3>Shop live with a Specialist</h3>
            </div>
            <div className="mining-benefit-desc">
              Let us guide you live over video and answer all of your questions.
            </div>
            <button className="mining-benefit-plus">
              <span>+</span>
            </button>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img src="/images/personal-setup-icon.png" alt="Personal Setup" />
            </div>
            <div className="mining-benefit-title">
              <h3>Join an online Personal Setup session</h3>
            </div>
            <div className="mining-benefit-desc">
              Talk one on one with a Specialist to set up your device and
              discover new features.
            </div>
            <button className="mining-benefit-plus">
              <span>+</span>
            </button>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img
                src="/images/explore-experience-icon.png"
                alt="Explore Experience"
              />
            </div>
            <div className="mining-benefit-title">
              <h3>Explore new experiences around you</h3>
            </div>
            <div className="mining-benefit-desc">
              Use the app to find personal workshops and more.
            </div>
            <button className="mining-benefit-plus">
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
      {/* Solutions Section */}
      <div className="mining-solutions-section">
        <div className="mining-solutions-header">
          <p className="mining-solutions-subtitle">Our solutions</p>
          <h2 className="mining-solutions-title">
            AIS-140 IRNSS Certified GPS Tracker!
          </h2>
        </div>
        <div className="mining-solutions-hero">
          <img
            src="/images/leadxpo_Expand_the_background_into_a_clean_seamless_white_studi_6f786aeb-e9ae-42a0-81d0-c4cecc5f93d5 1.png"
            alt="AIS-140 Vehicles"
          />
        </div>
        <div className="mining-solutions-grid">
          <div className="mining-solutions-card">
            <img
              src="/images/emergency_share.png"
              alt="Govt Approved"
              className="mining-solutions-icon"
            />
            <span>
              Govt Approved (AIS-140 Certified) – Mandatory for all mining
              vehicles.
            </span>
          </div>
          <div className="mining-solutions-card">
            <img
              src="/images/emergency_share.png"
              alt="Real-Time Tracking"
              className="mining-solutions-icon"
            />
            <span>
              Real-Time Tracking & Route Playback – Always know where your
              vehicle is.
            </span>
          </div>
          <div className="mining-solutions-card">
            <img
              src="/images/emergency_share.png"
              alt="Dual eSIM"
              className="mining-solutions-icon"
            />
            <span>
              Dual eSIM Support – Continuous connectivity without interruptions.
            </span>
          </div>
          <div className="mining-solutions-card">
            <img
              src="/images/emergency_share.png"
              alt="SOS/Panic"
              className="mining-solutions-icon"
            />
            <span>
              SOS/Panic Button – Instant emergency alerts to control centers.
            </span>
          </div>
          <div className="mining-solutions-card">
            <img
              src="/images/emergency_share.png"
              alt="Waterproof"
              className="mining-solutions-icon"
            />
            <span>
              Even in rain or wet environments, waterproof GPS ensures
              uninterrupted real-time tracking of mining vehicles.
            </span>
          </div>
          <div className="mining-solutions-card">
            <img
              src="/images/emergency_share.png"
              alt="Backup Battery"
              className="mining-solutions-icon"
            />
            <span>4 Hours Backup Battery – Works even during power cuts.</span>
          </div>
        </div>
      </div>

      {/* Product & Overview Section with Truck Image */}
      <div className="mining-product-overview">
        <div className="mining-product-overview-header">
          <h2>Product & Overview</h2>
        </div>

        <div className="mining-product-overview-content">
          <div className="mining-product-overview-text">
            <div>
              <h3>AIS-140 Mining GPS Tracker</h3>
              <p>
                The AIS-140 GPS Tracker is a government-certified device
                designed for compliance with MoRTH regulations in India. Built
                for public transport, mining fleets, and commercial vehicles, it
                ensures passenger safety, real-time monitoring, and legal
                compliance. With dual communication support to both government
                servers and user dashboards, it provides seamless control,
                safety, and operational efficiency.
              </p>
            </div>

            <div className="mining-product-overview-features">
              <p>
                Why Choose AIS-140 GPS Tracker?
                <br /> Government-Approved & Compliant – under AIS-140
                standards. <br />
                Enhanced Safety & Control – Equipped with SOS button, route{' '}
                <br />
                monitoring, and to prevent theft or misuse.
                <br />
                Government-Certified Compliance-The AIS-140 GPS Tracker is
                <br /> approved for meeting MoRTH regulations in India.
              </p>
            </div>
          </div>

          <div className="mining-product-overview-image">
            <img src="/images/product-mining-truck.png" alt="Mining Truck" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mining;
