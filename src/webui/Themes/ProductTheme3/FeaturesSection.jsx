import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Route, Users, MapPin, Activity } from 'lucide-react';

const FeatureCard = ({ icon, title, delay }) => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-4 shadow p-4 d-flex flex-column align-items-center transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
      whileHover={{ y: -5 }}
    >
      <img
        src={
          icon
            ? icon
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRpsF77MHduooAtrs4TQNFI-LnykVqlbr_Q&s'
        }
        alt="Feature"
        className="future-icon"
      />
      <h3 className="h6 fw-semibold text-dark text-center">{title}</h3>
    </motion.div>
  );
};

const FeaturesSection = ({ stateData }) => {
  const aminitiesData = stateData?.aminities || [];

  console.log("rrr : ", stateData)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-5 px-3 container">
      <motion.div
        ref={ref}
        className="text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-secondary text-uppercase small">What We Do?</span>
        <h2 className="mt-2 h3 fw-bold text-warning" style={{ textTransform: 'capitalize' }}>
          {stateData.workTitle}
          {/* <br className="d-none d-md-block" /> & BACK HOME SAFELY */}
        </h2>
      </motion.div>

      <div className="row g-4">
        {aminitiesData?.map((item, index) => {
          const aminityImages = [
            stateData.aminityImage1,
            stateData.aminityImage2,
            stateData.aminityImage3,
            stateData.aminityImage4,
            stateData.aminityImage5,
            stateData.aminityImage6,
          ];
          return (<div className="col-12 col-sm-6 col-lg-4">
            <FeatureCard icon={aminityImages[index]} title={item.name} delay={0} />
          </div>)
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
