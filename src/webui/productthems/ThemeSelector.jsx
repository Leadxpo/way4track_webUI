import React from 'react';
import './styles/ThemeSelector.css';

function ThemeSelector({ themesData, selectedTheme, handleThemeClick }) {
  return (
    <div className="theme-selector">
      <h2>Select a Theme</h2>
      <div className="theme-options">
        {themesData.map((theme) => (
          <div
            key={theme.id}
            className={`theme-card ${selectedTheme?.id === theme.id ? 'selected' : ''}`}
            onClick={() => handleThemeClick(theme.id)}
          >
            <div className="theme-icon">
              {theme.icon || (
                <div className="placeholder-icon">
                  {theme.title.charAt(0)}
                </div>
              )}
            </div>
            <div className="theme-info">
              <h3>{theme.title}</h3>
              <p>{theme.description || 'A beautiful product theme layout'}</p>
            </div>
            {selectedTheme?.id === theme.id && (
              <div className="selected-indicator">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;