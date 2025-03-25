import { useState, useEffect } from "react";

export default function EducationDetails({ setEducationDetails,candidateData }) {
  console.log("candidateData : ",candidateData);

  const [qualifications, setQualification] = useState([
    {
      qualificationName: "",
      marksOrCgpa: "",
      qualificationFiles: null,
    }
  ]);
  const qualificationOptions = [
    "10th Class", "Intermediate", "Degree", "Post Graduation", "ITI / Diploma"
  ];
  const [experience, setExperience] = useState([
    {
      previousCompany: "",
      previous_designation: "",
      total_experience: "",
      previous_salary: "",
      letter: "experienceLetter",
      experience: null,
    }
  ]);

  const letterOptions = [
    "resignationLetter",
    "terminationLetter",
    "appointmentLetter",
    "leaveFormat",
    "relievingLetter",
    "experienceLetter",
  ];

  // Handle Qualification Input Change
  const handleQualificationChange = (index, field, value) => {
    const updatedQualification = [...qualifications];
    updatedQualification[index][field] = value;
    setQualification(updatedQualification);
  };

  // Handle Experience Input Change
  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const handleExperienceFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedExperience = [...experience];
      updatedExperience[index].experience = file;
      setExperience(updatedExperience);
    }
  };

  // Handle File Upload
  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedQualification = [...qualifications];
      updatedQualification[index].qualificationFiles = file;  // Ensure correct key name
      setQualification(updatedQualification);
    }
  };

  // Add Qualification
  const addQualification = () => {
    setQualification([
      ...qualifications,
      {
        qualificationName: "",
        marksOrCgpa: "",
        qualificationFiles: null,
      }
    ]);
  };

  // Remove Qualification
  const removeQualification = (index) => {
    if (qualifications.length > 1) {
      setQualification(qualifications.filter((_, i) => i !== index));
    }
  };

  // Add Experience
  const addExperience = () => {
    setExperience([
      ...experience,
      {
        previousCompany: "",
        previous_designation: "",
        total_experience: "",
        previous_salary: "",
        letter: "experienceLetter",
        experience: null,
      }
    ]);
  };

  // Remove Experience
  const removeExperience = (index) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
  };

  // Send Data to Parent on Change
  useEffect(() => {
    setEducationDetails({
      qualifications,
      experience
    });
  }, [qualifications, experience, setEducationDetails]);

  return (
    <form className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Qualification Section */}
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        Qualification
        <button type="button" onClick={addQualification} className="ml-2 bg-green-500 text-white p-2 rounded">
          +
        </button>
      </h2>

      {qualifications.map((qual, index) => (
        <div key={index} className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            {/* <input
              type="text"
              placeholder="Qualification Name *"
              className="p-2 border rounded"
              value={qual.qualificationName}
              onChange={(e) => handleQualificationChange(index, "qualificationName", e.target.value)}
              required
            /> */}
            <select className="p-2 border rounded" value={qual.qualificationName}
              onChange={(e) => handleQualificationChange(index, "qualificationName", e.target.value)} required>
              <option value="">Select Qualification *</option>
              {qualificationOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <input
              type="text"
              placeholder="Marks or CGPA *"
              className="p-2 border rounded"
              value={qual.marksOrCgpa}
              onChange={(e) => handleQualificationChange(index, "marksOrCgpa", e.target.value)}
              required
            />
            <input type="file" className="border rounded p-2" onChange={(e) => handleFileChange(index, e)} />
          </div>

          {index > 0 && (
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => removeQualification(index)}
            >
              -
            </button>
          )}
        </div>
      ))}

      {/* Experience Section */}
      <h2 className="text-2xl font-bold mt-6 mb-4 flex items-center">
        Experience
        <button type="button" onClick={addExperience} className="ml-2 bg-green-500 text-white p-2 rounded">
          +
        </button>
      </h2>

      {experience.map((exp, index) => (
        <div key={index} className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Previous Company *"
              className="p-2 border rounded"
              value={exp.previousCompany}
              onChange={(e) => handleExperienceChange(index, "previousCompany", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Previous Designation *"
              className="p-2 border rounded"
              value={exp.previous_designation}
              onChange={(e) => handleExperienceChange(index, "previous_designation", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Total Experience (Years) *"
              className="p-2 border rounded"
              value={exp.total_experience}
              onChange={(e) => handleExperienceChange(index, "total_experience", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Previous Salary *"
              className="p-2 border rounded"
              value={exp.previous_salary}
              onChange={(e) => handleExperienceChange(index, "previous_salary", e.target.value)}
              required
            />
            <select
              className="p-2 border rounded"
              value={exp.letter}
              onChange={(e) => handleExperienceChange(index, "letter", e.target.value)}
            >
              {letterOptions.map((option) => (
                <option key={option} value={option}>{option.replace(/([A-Z])/g, " $1").trim()}</option>
              ))}
            </select>
            <input
              type="file"
              className="border rounded p-2"
              onChange={(e) => handleExperienceFileChange(index, e)}
            />

          </div>
          {index > 0 && (
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => removeExperience(index)}
            >
              -
            </button>
          )}
        </div>
      ))}
    </form>
  );
}
