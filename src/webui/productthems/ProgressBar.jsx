import React from 'react';
import "../productthems/styles/ProgressBar.css";

function ProgressBar({ percentage, currentStep }) {
  const steps = ['Product Details', 'Amenities', 'Applications', 'Devices', 'Apps'];

  
  return (
    <div className="progress-container">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`progress-step ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="step-number">
              {index < currentStep ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${percentage}%` }}
        >
          <span className="progress-percentage">{Math.round(percentage)}%</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;