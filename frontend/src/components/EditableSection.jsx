import React, { useState, useEffect } from "react";
import "../App.css"

function EditableSection({ title, sectionKey, content, onEnhance, onChange }) {
  const [sectionData, setSectionData] = useState(content);

  useEffect(() => {
    setSectionData(content);
  }, [content]);

  const handleInputChange = (e) => {
    const updated = e.target.value;
    setSectionData(updated);
    onChange(sectionKey, updated);
  };

  const handleEnhanceClick = () => {
    onEnhance(sectionKey, sectionData);
  };

  return (
    <div className="section">
      <div className="sections-top">
        <h3>{title}</h3>
        <button onClick={handleEnhanceClick}>Enhance with AI</button>
      </div>

      {Array.isArray(sectionData) ? (
        sectionData.map((item, index) => (
          <textarea
          className="section-array"
            key={index}
            value={item}
            data-section={sectionKey}
            onChange={(e) => {
              const updatedList = [...sectionData];
              updatedList[index] = e.target.value;
              setSectionData(updatedList);
              onChange(sectionKey, updatedList);
            }}
          />
        ))
      ) : (
        <textarea
          className="section-string"
          data-section={sectionKey}
          value={sectionData}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
}

export default EditableSection;
