import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import './EditDashboardTheme.css'; // Import your CSS file for styling
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';

const EditDashboardTheme = ({ theme, promo }) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const payload = {
          companyCode: 'WAY4TRACK',
          unitCode: 'WAY4',
          theme,
        };

        const response = await ApiService.post(
          '/promotion/getAllPromotions',
          payload
        );
        const data = response?.data;
        console.log('Promotion Data:', data);

        if (Array.isArray(data)) {
          const filtered = data.filter(
            (item) =>
              typeof item.theme === 'string' &&
              normalize(item.theme) === normalize(theme)
          );

          const seen = new Set();
          const unique = filtered.filter((item) => {
            if (seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
          });

          setPromotions(unique);
        } else {
          setPromotions([]);
        }
      } catch (error) {
        console.error(`Error fetching promotions for ${theme}:`, error);
        setPromotions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotion();
  }, [theme]);

  if (loading) return <p>Loading {theme}...</p>;
  if (!promotions.length) return <p>No promotion found for {theme}.</p>;

  return (
    <div className="container-fluid my-4">
      {/* <h3 className="text-capitalize mb-4">{theme}</h3> */}
      {promotions.map((promo) => {
        const normTheme = normalize(theme);
        let content;

        switch (normTheme) {
          case 'session1':
            content = (
              <>
                <div className="col-md-5">
                  <h4 className="way4track-text">WAY4TRACK</h4>
                  <h1 className="typewriter-container">
                    <Typewriter
                      options={{
                        strings: [
                          'Track Anything...',
                          'Anytime...',
                          'Anywhere...',
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 50,
                        deleteSpeed: 40,
                      }}
                    />
                  </h1>
                  <p className="short-desc">{promo.shortDescription}</p>
                </div>
                <div className="col-md-7">
                  {promo.image && (
                    <img
                      src={promo.image}
                      alt="Session-1"
                      className="img-fluid rounded"
                    />
                  )}
                </div>
              </>
            );
            break;

          case 'session2':
            content = promo.list && promo.list.length > 0 && (
              <div className="row">
                {[...Array(Math.ceil(promo.list.length / 4))].map(
                  (_, groupIndex) => {
                    const groupStart = groupIndex * 4;
                    const group = promo.list.slice(groupStart, groupStart + 4);

                    return (
                      <div className="col-12 mb-4" key={groupIndex}>
                        <div className="row hover-card align-items-start">
                          {/* Left: 2x2 Image Grid */}
                          <div className="col-md-6">
                            <div className="row">
                              {group.map((item, index) => {
                                const absoluteIndex = groupStart + index;
                                return (
                                  <div
                                    className="col-6 mb-3"
                                    key={absoluteIndex}
                                  >
                                    <div className="image-wrapper">
                                      <img
                                        src={item.photo}
                                        alt={`Session2-${absoluteIndex}`}
                                        className="img-fluid rounded zoom-img"
                                        onMouseEnter={() =>
                                          setHoveredIndex(absoluteIndex)
                                        }
                                        onMouseLeave={() =>
                                          setHoveredIndex(null)
                                        }
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <h4 className="fw-bold">{promo.header}</h4>
                              <p className="text-muted">
                                {promo.shortDescription}
                              </p>
                            </div>

                            <div className="row">
                              {group.map((item, index) => {
                                const absoluteIndex = groupStart + index;
                                const isHovered =
                                  hoveredIndex === absoluteIndex;
                                return (
                                  <div
                                    className="col-6 mb-3"
                                    key={absoluteIndex}
                                  >
                                    <div
                                      className={`d-flex align-items-start ${
                                        isHovered
                                          ? 'bg-light-session2 text-primary'
                                          : ''
                                      }`}
                                    >
                                      <span
                                        className="me-2"
                                        style={{
                                          color: 'green',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        ✔
                                      </span>
                                      <p
                                        className="fw-bold mb-0"
                                        style={{
                                          textAlign: 'justify',
                                          fontSize: '15px',
                                        }}
                                      >
                                        {item.desc}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            );
            break;

          case 'session3':
            content = promo.list && promo.list.length > 0 && (
              <div
                className="row align-items-start"
                style={{ padding: '0px 30px' }}
              >
                {/* Left column: split list into two side-by-side columns */}
                <div className="col-md-6">
                  <div className="row">
                    {/* First 5 items */}
                    <div className="col-6">
                      {promo.list.slice(0, 5).map((item, index) => (
                        <div
                          className="d-flex  align-items-center mb-3"
                          key={index}
                          style={{
                            borderLeft: '3px solid green',
                            background:
                              'linear-gradient(to right, #c7ffda 0%, #38f9d7 100%)',
                            // borderRadius: "4px",
                            padding: '10px 5px',
                          }}
                        >
                          <img
                            src={item.photo}
                            alt={`Session3-Icon-${index}`}
                            className="me-2"
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'contain',
                            }}
                          />
                          <p className="fw-bold mb-0">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Next 5 items */}
                    <div className="col-6">
                      {promo.list.slice(5, 10).map((item, index) => (
                        <div
                          className="d-flex align-items-center mb-3"
                          key={index + 5}
                          style={{
                            borderLeft: '3px solid green',
                            background:
                              'linear-gradient(to right, #c7ffda 0%, #38f9d7 100%)', // light green tint, adjust as needed
                            // borderRadius: "4px",
                            padding: '10px 5px',
                          }}
                        >
                          <img
                            src={item.photo}
                            alt={`Session3-Icon-${index + 5}`}
                            className="me-2"
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'contain',
                            }}
                          />
                          <p className="fw-bold mb-0">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column: main image */}
                <div className="col-md-6">
                  <img
                    src={promo.image}
                    alt="Session3-MainImage"
                    className="img-fluid rounded shadow-sm"
                    style={{
                      objectFit: 'cover',
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </div>
              </div>
            );
            break;

          case 'session4':
            content = promo.list && promo.list.length > 0 && (
              <section style={{ padding: '40px 0px' }}>
                <div className="client-swiper-container">
                  <h2
                    className="client-heading"
                    style={{ textAlign: 'center' }}
                  >
                    {promo.heading || 'Our Esteemed Clients'}
                  </h2>
                  <p className="client-subtext" style={{ textAlign: 'center' }}>
                    {promo.subtext ||
                      'Trusted by businesses across Andhra Pradesh and beyond'}
                  </p>

                  <div className="scroll-wrapper">
                    <div className="scroll-track">
                      {promo.list.concat(promo.list).map((item, index) => (
                        <div className="scroll-card" key={index}>
                          <img src={item.photo} alt={`Session4-${index}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
            break;

          case 'session5':
            content = (
              <div style={{ backgroundColor: 'aliceblue' }}>
                <section
                  className="container px-0"
                  style={{
                    backgroundImage: `url(${promo.themeBgimage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh', // Ensure the section takes full height
                  }}
                >
                  <div className="row m-0 py-5">
                    {/* Title and header */}
                    <div className="col-12 text-center mb-4">
                      <p className="fw-bold mining-name">{promo.name}</p>
                      <p className="fw-bold">{promo.header}</p>
                    </div>

                    {/* Left column */}
                    <div className="col-md-4 d-flex flex-column align-items-start">
                      {promo.list &&
                        promo.list.map((item, index) => (
                          <div
                            key={index}
                            className="card mb-4 shadow-lg border-0 rounded-4"
                          >
                            <div className="card-body p-4">
                              {/* Icon and Title with Description */}
                              <div className="d-flex flex-column align-items-start">
                                {/* Arrow and Title */}
                                <div className="d-flex align-items-center mb-3">
                                  {/* Arrow Icon */}
                                  <i
                                    className="bi bi-arrow-right-circle text-primary"
                                    style={{
                                      fontSize: '30px',
                                      marginRight: '10px',
                                    }}
                                  ></i>
                                  {/* Title */}
                                  <h5 className="card-title fw-bold text-dark mb-0">
                                    {item.name}
                                  </h5>
                                </div>

                                {/* Description */}
                                <p className="card-text text-muted">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Right column */}
                    <div className="col-md-8 d-flex flex-column align-items-center">
                      {promo.image && (
                        <img
                          src={promo.image}
                          alt="Session-5"
                          className="img-fluid rounded-4 shadow-lg mb-4"
                        />
                      )}

                      {/* Buttons below the image */}
                      <div className="d-flex gap-3 flex-wrap justify-content-center">
                        <a
                          href={`tel:${promo.callNumber || '1234567890'}`}
                          className="btn btn-primary"
                        >
                          Call
                        </a>
                        <button
                          className="btn btn-info text-white"
                          onClick={() =>
                            navigate(promo.themeLink || '/more-info')
                          }
                        >
                          Know More
                        </button>
                        <button
                          className="btn btn-success"
                          // onClick={() => handleEnquiry(promo)}
                        >
                          Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            );
            break;

          case 'session6':
            content = (
              <div
                className="container-fluid px-0"
                style={{ backgroundColor: 'aliceblue' }}
              >
                <div className="row m-0 py-5">
                  {/* Title and Header */}
                  <div className="col-12 text-center mb-4">
                    <p className="fw-bold mining-name">{promo.name}</p>
                    <p className="fw-bold">{promo.header}</p>
                  </div>

                  {/* Right column: Main image */}
                  <div className="col-md-8 d-flex flex-column align-items-center">
                    {promo.image && (
                      <img
                        src={promo.image}
                        alt="Session-5"
                        className="img-fluid rounded-4 shadow-lg mb-4"
                      />
                    )}

                    {/* Buttons below the image */}
                    <div className="d-flex gap-3 flex-wrap justify-content-center">
                      <a
                        href={`tel:${promo.callNumber || '1234567890'}`}
                        className="btn btn-primary"
                      >
                        Call
                      </a>
                      <button
                        className="btn btn-info text-white"
                        onClick={() =>
                          navigate(promo.themeLink || '/more-info')
                        }
                      >
                        Know More
                      </button>
                      <button
                        className="btn btn-success"
                        // onClick={() => handleEnquiry(promo)}
                      >
                        Enquiry
                      </button>
                    </div>
                  </div>

                  {/* Left column: List of points */}
                  <div className="col-md-4 d-flex flex-column align-items-start">
                    {promo.list &&
                      promo.list.map((item, index) => (
                        <div
                          key={index}
                          className="card mb-4 shadow-lg border-0 rounded-4"
                        >
                          <div className="card-body p-4">
                            {/* Arrow Icon and Title with Description */}
                            <div className="d-flex flex-column align-items-start">
                              {/* Arrow and Title */}
                              <div className="d-flex align-items-center mb-3">
                                {/* Arrow Icon */}
                                <i
                                  className="bi bi-arrow-right-circle text-primary"
                                  style={{
                                    fontSize: '30px',
                                    marginRight: '10px',
                                  }}
                                ></i>
                                {/* Title */}
                                <h5 className="card-title fw-bold text-dark mb-0">
                                  {item.name}
                                </h5>
                              </div>

                              {/* Description */}
                              <p className="card-text text-muted">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
            break;

          case 'session7':
            content = (
              <div
                className="row align-items-center session7-wrapper"
                style={{
                  backgroundImage: `url(${promo.themeBgimage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '100vh', // Ensure the section takes full height
                }}
              >
                {/* Title */}
                <div className="col-12 mb-3">
                  <p className="fw-bold mining-name h4">{promo.name}</p>
                </div>

                {/* Right: Image */}
                <div className="col-md-8 mb-3">
                  {promo.image && (
                    <img
                      src={promo.image}
                      alt="Session-7"
                      className="img-fluid rounded shadow-sm"
                    />
                  )}
                </div>

                {/* Left: Stylized List */}
                <div className="col-md-4">
                  <div className="session7-list p-3">
                    <ul className="list-unstyled">
                      {promo.list?.map((item, index) => (
                        <li
                          key={index}
                          className="d-flex align-items-start mb-2"
                        >
                          <span className="me-2 text-primary">➤</span>
                          <span className="session7-desc">{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="d-flex gap-3 flex-wrap justify-content-center"
                    style={{ padding: '20px 0px' }}
                  >
                    <a
                      href={`tel:${promo.callNumber || '1234567890'}`}
                      className="btn btn-primary"
                    >
                      Call
                    </a>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => navigate(promo.themeLink || '/more-info')}
                    >
                      Know More
                    </button>
                    <button
                      className="btn btn-success"
                      // onClick={() => handleEnquiry(promo)}
                    >
                      Enquiry
                    </button>
                  </div>
                </div>
              </div>
            );
            break;

          case 'session8':
            content = (
              <div className="row">
                {/* Left column: Name and descriptions list */}
                <p className="fw-bold mining-name">{promo.name}</p>

                <div className="col-md-4">
                  <div className="session7-list p-3">
                    <ul className="list-unstyled">
                      {promo.list?.map((item, index) => (
                        <li
                          key={index}
                          className="d-flex align-items-start mb-2"
                        >
                          <span className="me-2 text-primary">➤</span>
                          <span className="session7-desc">{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="d-flex gap-3 flex-wrap justify-content-center"
                    style={{ padding: '20px 0px' }}
                  >
                    <a
                      href={`tel:${promo.callNumber || '1234567890'}`}
                      className="btn btn-primary"
                    >
                      Call
                    </a>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => navigate(promo.themeLink || '/more-info')}
                    >
                      Know More
                    </button>
                    <button
                      className="btn btn-success"
                      // onClick={() => handleEnquiry(promo)}
                    >
                      Enquiry
                    </button>
                  </div>
                </div>

                {/* Right column: Main image */}
                <div
                  className="col-md-8"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  {promo.image && (
                    <img
                      src={promo.image}
                      alt="Session-8"
                      className="img-fluid rounded"
                    />
                  )}
                </div>
              </div>
            );
            break;

          case 'session9':
            content = (
              <div
                className="row"
                style={{
                  backgroundImage: `url(${promo.themeBgimage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '100vh',
                  backgroundColor: '',
                }}
              >
                {/* Left column: Name and descriptions list */}
                <p className="fw-bold mining-name">{promo.name}</p>

                {/* Right column: Main image */}
                <div className="col-md-8">
                  {promo.image && (
                    <img
                      src={promo.image}
                      alt="Session-9"
                      className="img-fluid rounded"
                    />
                  )}
                </div>
                <div className="col-md-4">
                  <div className="session7-list p-3">
                    <ul className="list-unstyled">
                      {promo.list?.map((item, index) => (
                        <li
                          key={index}
                          className="d-flex align-items-start mb-2"
                        >
                          <span className="me-2 text-primary">➤</span>
                          <span className="session7-desc">{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="d-flex gap-3 flex-wrap justify-content-center"
                    style={{ padding: '20px 0px' }}
                  >
                    <a
                      href={`tel:${promo.callNumber || '1234567890'}`}
                      className="btn btn-primary"
                    >
                      Call
                    </a>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => navigate(promo.themeLink || '/more-info')}
                    >
                      Know More
                    </button>
                    <button
                      className="btn btn-success"
                      // onClick={() => handleEnquiry(promo)}
                    >
                      Enquiry
                    </button>
                  </div>
                </div>
              </div>
            );
            break;

          case 'session10':
            content = (
              <div className="row">
                {/* Left column: Name and descriptions list */}
                <p className="fw-bold mining-name">{promo.name}</p>

                <div className="col-md-4">
                  <div className="session7-list p-3">
                    <ul className="list-unstyled">
                      {promo.list?.map((item, index) => (
                        <li
                          key={index}
                          className="d-flex align-items-start mb-2"
                        >
                          <span className="me-2 text-primary">➤</span>
                          <span className="session7-desc">{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="d-flex gap-3 flex-wrap justify-content-center"
                    style={{ padding: '20px 0px' }}
                  >
                    <a
                      href={`tel:${promo.callNumber || '1234567890'}`}
                      className="btn btn-primary"
                    >
                      Call
                    </a>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => navigate(promo.themeLink || '/more-info')}
                    >
                      Know More
                    </button>
                    <button
                      className="btn btn-success"
                      // onClick={() => handleEnquiry(promo)}
                    >
                      Enquiry
                    </button>
                  </div>
                </div>

                {/* Right column: Main image */}
                <div
                  className="col-md-8"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  {promo.image && (
                    <img
                      src={promo.image}
                      alt="Session-10"
                      className="img-fluid rounded"
                    />
                  )}
                </div>
              </div>
            );
            break;

          default:
            content = (
              <>
                <div className="col-md-4">
                  {promo.header && <h5>{promo.header}</h5>}
                  <p>{promo.name}</p>
                  <p>{promo.shortDescription}</p>
                </div>
                <div className="col-md-8">
                  {promo.image && (
                    <img
                      src={promo.image}
                      alt="Default"
                      className="img-fluid rounded"
                    />
                  )}
                </div>
              </>
            );
        }

        return (
          <div className="row align-items-center mb-4" key={promo.id}>
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default EditDashboardTheme;
