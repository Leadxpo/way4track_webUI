import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import PreviewPanel from './PreviewPanel';
import themesData from './themesData';

function ThemeEditorPage({ stepsData, imagePreviews }) {
  const [selectedThemeId, setSelectedThemeId] = useState(null);

  const handleThemeClick = (themeId) => {
    setSelectedThemeId(themeId);
  };

  const selectedTheme = themesData.find((theme) => theme.id === selectedThemeId);

  return (
    <div className="theme-editor-container">
      <ThemeSelector
        themesData={themesData}
         selectedTheme={themesData.find(theme => theme.id === selectedTheme)}
        handleThemeClick={handleThemeClick}
      />

      <PreviewPanel
        selectedTheme={selectedThemeId} // send just the theme ID here
        stepsData={stepsData}
        imagePreviews={imagePreviews}
      />
    </div>
  );
}

export default ThemeEditorPage;
