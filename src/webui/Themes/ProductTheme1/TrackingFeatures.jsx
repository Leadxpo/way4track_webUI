import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CalendarClock, Clock, Bell, Users } from 'lucide-react';
import './styles/TrackingFeatures.css';

const TrackingFeatures = ({ dashboardImage }) => {
  const trackingFeatures = [
    {
      icon: <CalendarClock size={28} />,
      title: "Maintenance Remainders",
      description: "Never miss a service with automated maintenance reminders based on time or mileage."
    },
    {
      icon: <Clock size={28} />,
      title: "Live Vehicle Status",
      description: "Monitor real-time status of your bike including location, speed, and engine status."
    },
    {
      icon: <Bell size={28} />,
      title: "Custom Notifications",
      description: "Set up personalized alerts for speeding, movement, or geofence violations."
    },
    {
      icon: <Users size={28} />,
      title: "Family Sharing",
      description: "Share location and tracking access with family members for better security."
    }
  ];

  return (
    <section className="tracking-features section-padding">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div 
              className="dashboard-container" 
              data-aos="fade-up"
            >
              <img 
                src={dashboardImage} 
                alt="Tracking Dashboard" 
                className="dashboard-img img-fluid" 
              />
              <div className="floating-icon icon-1">
                <div className="pulse-ring"></div>
                <div className="icon-inner">
                  <MapPin />
                </div>
              </div>
              <div className="floating-icon icon-2">
                <div className="pulse-ring"></div>
                <div className="icon-inner">
                  <Bell />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          {trackingFeatures.map((feature, index) => (
            <Col md={6} lg={3} sm={12} key={index}>
              <div 
                className="tracking-feature" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="feature-icon-box">
                  {feature.icon}
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
        <Row className="mt-5">
          <Col lg={8} className="mx-auto">
            <div className="what-we-do-box" data-aos="fade-up">
              <h3>— WHAT WE DO? —</h3>
              <p>
                The crucial idea of the way4track vehicle tracking system is to ensure 
                the safety of all its customers. The GPS tracking app for the bike has 
                to be installed by the individual who will track and monitor the concerned 
                person's location.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const MapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default TrackingFeatures;