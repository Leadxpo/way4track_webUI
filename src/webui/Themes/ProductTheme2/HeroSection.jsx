import { Container, Row, Col, Button } from "react-bootstrap";

const HeroSection = ({stateData}) => {
  return (
    <section className="py-5 bg-custom-light">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-right">
            <div className="text-center text-lg-start">
              <p className="text-uppercase fw-bold mb-2 text-secondary">
                Authorized by
              </p>
              {/* <div className="mb-4">
                <img
                  src="./images/ap_mining.png"
                  alt="Government Authorization"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  className="shadow-sm"
                />
              </div> */}
              <p className="fw-bold text-primary small mb-4">
                DEPARTMENT OF MINES AND GEOLOGY
                <br />
                GOVERNMENT OF INDIA
              </p>
              <div className="img-container overflow-hidden rounded-custom shadow-custom">
                <img
                  src={stateData.blogImage}
                  alt="Mining Truck"
                  className="img-fluid"
                />
              </div>
            </div>
          </Col>
          <Col lg={6} data-aos="fade-left" data-aos-delay="200">
            <div className="ps-lg-5">
              <h1 className="display-4 fw-bold mb-4 text-primary">
                {stateData.name}.
              </h1>
              <p className="lead mb-4 text-secondary">
                {stateData.shortDescription}
              </p>
              <Button
                variant="success"
                size="lg"
                className="btn-custom rounded-pill"
              >
                Know more
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
