import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Check, ChevronRight, AlertTriangle } from 'lucide-react';

const HeroSection = ({ stateData }) => {
  const description = stateData.description.split("*");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-5 container">
      <div className="row align-items-center g-5">
        {/* Text Content */}
        <motion.div
          className="col-md-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="d-flex align-items-center mb-3" variants={itemVariants}>
            <div className="bg-warning p-2 rounded-circle d-flex align-items-center justify-content-center me-2">
              <AlertTriangle size={18} className="text-white" />
            </div>
            <span className="fw-semibold text-warning">Safety First</span>
          </motion.div>

          <motion.h1 className="display-5 fw-bold mb-4 text-dark" style={{ textTransform: 'capitalize' }} variants={itemVariants}>
            {stateData.name} <span className="text-warning">Tracker</span>
          </motion.h1>

          <motion.p className="lead text-muted mb-4" variants={itemVariants}>
            {stateData.shortDescription ? stateData.shortDescription : "SmartBus generates trips, lets you see how long the bus spends at each stop, notifies delays, records attendance, and more. Sit back and relax, let SmartBus do the work for you!"}
          </motion.p>

          <motion.div className="d-flex flex-column gap-3 mb-4" variants={itemVariants}>
            {description.map((item) => {
             return( <div className="d-flex align-items-start gap-2">
                <Check className="text-success flex-shrink-0 mt-1" size={18} />
                <p className="text-muted mb-0">{item}</p>
              </div>)
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <button className="btn btn-warning d-inline-flex align-items-center fw-medium px-4 py-2 rounded-pill shadow-sm">
              Free Demo Call
              <ChevronRight className="ms-2" size={18} />
            </button>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="col-md-6 position-relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="position-relative">
            {/* Floating Badge */}
            <motion.div
              className="position-absolute top-0 start-0 translate-middle bg-danger text-white fw-bold text-center px-3 py-2 rounded-circle shadow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.8,
                type: 'spring',
                stiffness: 200
              }}
            >
              <div className="small">Safety</div>
              <div className="fs-6">First!</div>
            </motion.div>

            {/* Image */}
            <motion.img
              src={stateData.banner1}
              alt="School Bus"
              className="img-fluid rounded-4 shadow"
              style={{ height: '400px', objectFit: 'cover', width: '100%' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
