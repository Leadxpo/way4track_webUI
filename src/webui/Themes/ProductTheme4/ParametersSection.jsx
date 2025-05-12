import React, { useEffect, useState } from 'react';

const ParameterRow = ({ param, value, animDelay }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`parameter-row ${hover ? 'active' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-aos="fade-up"
      data-aos-delay={animDelay}
    >
      <div className="parameter-label" style={{textTransform:'capitalize'}}>{param}</div>
      <div className="parameter-divider"></div>
      <div className="parameter-value"  style={{textTransform:'capitalize'}}>{value}</div>
    </div>
  );
};

const ParametersSection = ({ stateData }) => {
  const [parameeters, setParameters] = useState([])
  useEffect(() => {
    const parameters = stateData?.description;
    const parameterData = parameters?.split(";");
    if (Array.isArray(parameterData)) {
      setParameters(parameterData);
    }
  })

  return (
    <section className="parameters-section py-5">
      <div className="row justify-content-center" style={{ padding: "50px" }}>
        <div className="col-lg-8 text-center mb-5">
          <h6 className="text-primary text-uppercase" data-aos="fade-up">Technical Details</h6>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Product Specifications
          </h2>
          <div className="divider mx-auto" data-aos="fade-up" data-aos-delay="200"></div>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="300">
            Premium quality and reliable performance guaranteed
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="parameters-container">
            {parameeters?.map((item) => {
              const key = item.split(":")[0];
              const value = item.split(":")[1];
              return (<ParameterRow param={key} value={value} animDelay="100" />)
            })

            }
            {/* <ParameterRow param="Device Name" value="OBD GPS Tracker" animDelay="100" />
            <ParameterRow param="Model" value="WS17" animDelay="150" />
            <ParameterRow param="Features" value="Intelligent vehicle tracking" animDelay="200" />
            <ParameterRow param="Device Dimension" value="47mm(L) × 20mm(W) × 43mm(H)" animDelay="250" />
            <ParameterRow param="Device Weight" value="41g" animDelay="300" />
            <ParameterRow param="Quad Band" value="850/1900/900/1800MHz" animDelay="350" />
            <ParameterRow param="Battery" value="400mAh Li-ion battery (backup)" animDelay="400" />
            <ParameterRow param="GPS Accuracy" value="< 10 meters" animDelay="450" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParametersSection;