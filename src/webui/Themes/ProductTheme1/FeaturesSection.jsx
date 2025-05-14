import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { WrenchIcon, RouteIcon, MapPinIcon } from 'lucide-react';
import './styles/FeaturesSection.css';
import './styles/DashboardDemo.css';

const FeaturesSection = ({ stateData }) => {
  const aminitiesData = stateData?.aminities || [];
  // const features = [
  //   {
  //     icon: <WrenchIcon size={40} />,
  //     title: "Maintenance Reminder",
  //     description: "Streamline your assets' maintenance activities with our reminder system. Cut costs and prevent breakdowns."
  //   },
  //   {
  //     icon: <RouteIcon size={40} />,
  //     title: "Route Playback",
  //     description: "Review the route traveled by your assets for selected dates and times. Playback speed and stop locations included."
  //   },
  //   {
  //     icon: <MapPinIcon size={40} />,
  //     title: "Geofence",
  //     description: "Set boundaries for your vehicle and get notified when it exits the defined area with instant alerts."
  //   }
  // ];

  return (
    <section className="features-section section-padding" id="features">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="section-title" data-aos="fade-up">{stateData.solutionTitle}</h2>
            <div className="title-underline" data-aos="fade-up" data-aos-delay="100"></div>
          </Col>
        </Row>
        <Row>

          <Col lg={4} md={6} sm={12} className="mb-4">
            <div
              className="feature-card"
            >
              <img
                src={
                  stateData.aminityImage1
                    ? stateData.aminityImage1
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
                }
                alt="Feature"
              />
            </div>
            <h3 className="feature-title">{aminitiesData[0].name}</h3>
            <p className="feature-description">{aminitiesData[0].desc}</p>
          </Col>
          <Col lg={4} md={6} sm={12} className="mb-4">
            <div
              className="feature-card"
            >
              <img
                src={
                  stateData.aminityImage2
                    ? stateData.aminityImage2
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
                }
                alt="Feature"
              />
            </div>
            <h3 className="feature-title">{aminitiesData[1].name}</h3>
            <p className="feature-description">{aminitiesData[1].desc}</p>
          </Col>
          <Col lg={4} md={6} sm={12} className="mb-4">
            <div
              className="feature-card"
            >
              <img
                src={
                  stateData.aminityImage3
                    ? stateData.aminityImage3
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
                }
                alt="Feature"
              />
            </div>
            <h3 className="feature-title">{aminitiesData[2].name}</h3>
            <p className="feature-description">{aminitiesData[2].desc}</p>
          </Col>
        </Row>
        <img
          src={stateData.banner1}
          alt="Vehicle Tracking Dashboard"
          className="dashboard-image img-fluid"
        />
        <Row>
          <Col lg={4} md={6} sm={12} className="mb-4">
            <div
              className="feature-card"
            >
              <img
                src={
                  stateData.aminityImage4
                    ? stateData.aminityImage4
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
                }
                alt="Feature"
              />
            </div>
            <h3 className="feature-title">{aminitiesData[3].name}</h3>
            <p className="feature-description">{aminitiesData[3].desc}</p>
          </Col>
          <Col lg={4} md={6} sm={12} className="mb-4">
            <div
              className="feature-card"
            >
              <img
                src={
                  stateData.aminityImage5
                    ? stateData.aminityImage5
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
                }
                alt="Feature"
              />
            </div>
            <h3 className="feature-title">{aminitiesData[4].name}</h3>
            <p className="feature-description">{aminitiesData[4].desc}</p>
          </Col>
          <Col lg={4} md={6} sm={12} className="mb-4">
            <div
              className="feature-card"
            >
              <img
                src={
                  stateData.aminityImage6
                    ? stateData.aminityImage6
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
                }
                alt="Feature"
              />
            </div>
            <h3 className="feature-title">{aminitiesData[5].name}</h3>
            <p className="feature-description">{aminitiesData[5].desc}</p>
          </Col>
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
    </section >
  );
};

export default FeaturesSection;