import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Clock, Navigation, Car } from 'lucide-react';
import './styles/DashboardDemo.css';

const DashboardDemo = ({ dashboardImage }) => {
  const alerts = [
    {
      icon: <Clock size={28} />,
      title: "Parking Violation Alerts",
      description: "Get instant notifications when your vehicle is parked in unauthorized locations."
    },
    {
      icon: <Navigation size={28} />,
      title: "Route Deviation",
      description: "Know immediately if your vehicle deviates from the predefined route or schedule."
    },
    {
      icon: <Car size={28} />,
      title: "Theft Alerts",
      description: "Receive immediate alerts if your bike moves when it shouldn't, preventing theft."
    }
  ];

  return (
    <section className="dashboard-demo section-padding">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={10} className="text-center">
            <div 
              className="dashboard-image-container" 
              data-aos="fade-up"
            >
              <div className="overlay-element element-1">
                <div className="blob-shape"></div>
              </div>
              <div className="overlay-element element-2">
                <div className="blob-shape"></div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {alerts.map((alert, index) => (
            <Col md={4} sm={12} key={index}>
              <div 
                className="alert-card" 
                data-aos="fade-up" 
                data-aos-delay={100 * index}
              >
                <div className="alert-icon">
                  {alert.icon}
                </div>
                <h4 className="alert-title">{alert.title}</h4>
                <p className="alert-description">{alert.description}</p>
              </div>
            </Col>
          ))}
        </Row>
        <Row className="mt-5">
          <Col lg={8} md={10} className="mx-auto">
            <div className="cta-box" data-aos="fade-up">
              <h3>TRY IT TODAY</h3>
              <p>Way4Track offers tracking and monitoring services for your personal vehicle</p>
              <button className="btn btn-accent">Try it today</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardDemo;