import { Container, Row, Col, Card } from 'react-bootstrap'

const FeaturesSection = ({stateData}) => {
  const aminitiesData = stateData?.aminities || [];
  const features = [
    {
      icon: "bi bi-geo-alt-fill",
      title: "Live Location Tracking",
      description: "Real-time tracking with GEO fencing."
    },
    {
      icon: "bi bi-speedometer2",
      title: "Over Speed",
      description: "Get Over Speed Alerts on Your Smartphone."
    },
    {
      icon: "bi bi-map",
      title: "Geofence",
      description: "Get powerful insights with Geofence Analytics."
    },
    {
      icon: "bi bi-clock-history",
      title: "History View",
      description: "Entire data of vehicle history is available."
    }
  ]

  return (
    <section className="py-5 bg-custom-light">
      <Container>
        <Row className="mb-5">
          <Col className="text-center" data-aos="fade-up">
            <h2 className="section-title">Key Features</h2>
            <p className="section-subtitle">
              Our GPS tracking system offers advanced features for complete vehicle monitoring
            </p>
          </Col>
        </Row>
        <Row>
        {aminitiesData?.map((item, index) => {
          const aminityImages = [
            stateData.aminityImage1,
            stateData.aminityImage2,
            stateData.aminityImage3,
            stateData.aminityImage4,
            stateData.aminityImage5,
            stateData.aminityImage6,
          ];

            <Col md={6} lg={3} key={index} className="mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
              <Card className="h-100 border-0 shadow-custom text-center hover-lift">
                <Card.Body className="p-4">
                  <div className="feature-icon-container mb-3">
                  <img
          src={
            aminityImages[index]
              ? aminityImages[index]
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
          }
          alt="Feature"
          className="future-icon"
        />
                  </div>
                  <h4 className="fw-bold mb-3 text-primary">{item.title}</h4>
                  <p className="mb-0 text-secondary">{item.desc}</p>
                </Card.Body>
              </Card>
            </Col>
        })}
        </Row>
      </Container>
    </section>
  )
}

export default FeaturesSection