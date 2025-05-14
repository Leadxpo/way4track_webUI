import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

const MiningVehiclesSection = ({ stateData }) => {
  const [workForDes, setWorkForDes] = useState([])
  useEffect(() => {
    const workforDescription = stateData.workDescription?.split("*");
    setWorkForDes(workforDescription)
  }, [])
  return (
    <section className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-left">
            <h2 className="section-title">
              {stateData.name} systems for <br />
              <span className="highlight">{stateData.workFor}</span>
            </h2>

            {workForDes?.map((item) => {
             return( <p className="mb-3">
                {item}
              </p>)
            })}
            {/* <p className="mb-3">
              It is now mandatory for all the Mining transport organisations that the E-permit system
              has to be integrated with the GPS vehicle tracking system.
            </p>
            <p className="mb-3">
              As per the AP state government guidelines all mining transport vehicles must be integrated
              with AIS 140 devices in order to maintain real-time location, stoppage reports and other
              performance information with government servers.
            </p> */}
          </Col>
          <Col lg={6} data-aos="fade-left" data-aos-delay="200">
            <div className="img-container overflow-hidden rounded-custom shadow-custom">
              <img
                src={stateData.banner0}
                alt="AIS140 Mining Vehicles"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default MiningVehiclesSection