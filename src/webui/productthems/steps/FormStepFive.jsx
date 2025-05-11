// src/components/productthems/steps/FormStepFive.jsx
import React from 'react';
import "../styles/FormSteps.css";

function FormStepFive({ step5Items, setStep5Items }) {
  const handleChange = (index, field, value) => {
    const updated = [...step5Items];
    updated[index][field] = value;
    setStep5Items(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...step5Items];
    updated[index].photos = file;
    setStep5Items(updated);
  };

  const addItem = () => {
    setStep5Items([
      ...step5Items,
      { name: '', shortDescription: '', points: [], photos: null }
    ]);
  };

  // const handlePointChange = (index, pointIndex, field, value) => {
  //   const updated = [...step5Items];
  //   updated[index].points[pointIndex][field] = value;
  //   setStep5Items(updated);
  // };



  const handlePointChange = (index, pointIndex, field, value) => {
    const updated = [...step5Items];
    if (!updated[index].points) {
      updated[index].points = [];
    }
    if (!updated[index].points[pointIndex]) {
      updated[index].points[pointIndex] = {};
    }
    updated[index].points[pointIndex][field] = value;
    setStep5Items(updated);
  };
  

  const addPoint = (index) => {
    const updated = [...step5Items];
    if (!updated[index].points) updated[index].points = [];
    updated[index].points.push({ title: '', desc: '' });
    setStep5Items(updated);
  };

  const handleRemoveStep5Item = (indexToRemove) => {
    const updated = step5Items.filter((_, idx) => idx !== indexToRemove);
    setStep5Items(updated);
  };
  

  return (
    <div>
      <h3>Apps</h3>
      {step5Items.map((item, index) => (
  <div key={index} className="card p-3 my-3">
    <input
      type="text"
      placeholder="App Name"
      value={item.name}
      onChange={(e) => handleChange(index, 'name', e.target.value)}
      className="form-control my-2"
    />
    <textarea
      placeholder="Short Description"
      value={item.shortDescription}
      onChange={(e) => handleChange(index, 'shortDescription', e.target.value)}
      className="form-control my-2"
    />
    <input
      type="file"
      onChange={(e) => handleFileChange(index, e.target.files[0])}
      className="form-control my-2"
    />

    <h5>Points</h5>
    {(item.points || []).map((point, pIndex) => (
      <div key={pIndex} className="d-flex gap-2">
        <input
          type="text"
          placeholder="Title"
          value={point.title}
          onChange={(e) =>
            handlePointChange(index, pIndex, 'title', e.target.value)
          }
          className="form-control my-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={point.desc}
          onChange={(e) =>
            handlePointChange(index, pIndex, 'desc', e.target.value)
          }
          className="form-control my-2"
        />
      </div>
    ))}
    <button className="btn btn-sm btn-outline-primary" onClick={() => addPoint(index)}>
      Add Point
    </button>

    <button
      type="button"
      className="btn btn-danger mt-2"
      onClick={() => handleRemoveStep5Item(index)}
      disabled={step5Items.length === 1}
    >
      Remove
    </button>
  </div>
))}

      <button className="btn btn-primary mt-3" onClick={addItem}>Add New App</button>
    </div>
  );
}

export default FormStepFive;
