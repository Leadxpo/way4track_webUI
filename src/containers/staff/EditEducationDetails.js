
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import ApiService from "../../services/ApiService";

export default function EditEducationDetails() {
  const location = useLocation();
  const receivedData = location?.state?.data || {};

  const [qualification, setQualification] = useState([]);
  const [experience, setExperience] = useState([]);

  const qualificationOptions = [
    "10th Class", "Intermediate", "Degree", "Post Graduation", "ITI / Diploma"
  ];

  const letterOptions = [
    "resignationLetter", "terminationLetter", "appointmentLetter", "leaveFormat", "relievingLetter", "experienceLetter"
  ];

  useEffect(() => {
    if (receivedData.qualifications) {
      setQualification(receivedData.qualifications.map(q => ({
        qualificationName: q.qualificationName || "",
        marksOrCgpa: q.marksOrCgpa || "",
        file: null,
      })));
    } else {
      setQualification([{ qualificationName: "", marksOrCgpa: "", file: null }]);
    }

    if (receivedData.experience) {
      setExperience(receivedData.experience.map(exp => ({
        previousCompany: exp.previousCompany || "",
        previous_designation: exp.previous_designation || "",
        total_experience: exp.total_experience || "",
        previous_salary: exp.previous_salary || "",
        letter: exp.letter || "",
        uploadLetters: null,
      })));
    } else {
      setExperience([{ previousCompany: "", previous_designation: "", total_experience: "", previous_salary: "", letter: "", uploadLetters: null }]);
    }
  }, [receivedData]);

  const handleQualificationChange = (index, field, value) => {
    const updatedQualification = [...qualification];
    updatedQualification[index][field] = value;
    setQualification(updatedQualification);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const handleFileChange = (index, event) => {
    handleQualificationChange(index, "file", event.target.files[0]);
  };

  const handleExperienceFileChange = (index, event) => {
    handleExperienceChange(index, "uploadLetters", event.target.files[0]);
  };

  const addQualification = () => {
    setQualification([...qualification, { qualificationName: "", marksOrCgpa: "", file: null }]);
  };

  const removeQualification = (index) => {
    if (qualification.length > 1) {
      setQualification(qualification.filter((_, i) => i !== index));
    }
  };

  const addExperience = () => {
    setExperience([...experience, { previousCompany: "", previous_designation: "", total_experience: "", previous_salary: "", letter: "", uploadLetters: null }]);
  };

  const removeExperience = (index) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    try {
      const endpoint = "/staff/handleStaffDetails"; 
      const formData = new FormData();

      qualification.forEach((qual, index) => {
        formData.append(`qualifications[${index}][qualificationName]`, qual.qualificationName);
        formData.append(`qualifications[${index}][marksOrCgpa]`, qual.marksOrCgpa);
        if (qual.file) formData.append(`qualifications[${index}][file]`, qual.file);
      });

      experience.forEach((exp, index) => {
        formData.append(`experience[${index}][previousCompany]`, exp.previousCompany);
        formData.append(`experience[${index}][previous_designation]`, exp.previous_designation);
        formData.append(`experience[${index}][total_experience]`, exp.total_experience);
        formData.append(`experience[${index}][previous_salary]`, exp.previous_salary);
        formData.append(`experience[${index}][letter]`, exp.letter);
        if (exp.uploadLetters) formData.append(`experience[${index}][uploadLetters]`, exp.uploadLetters);
      });

      const response = await ApiService.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        alert("Details updated successfully!");
      } else {
        alert("Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating details:", error);
      alert("An error occurred while updating details.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        Qualification
        <button type="button" onClick={addQualification} className="ml-2 bg-green-500 text-white p-2 rounded">+</button>
      </h2>
      {qualification.map((qual, index) => (
        <div key={index} className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            <select className="p-2 border rounded" value={qual.qualificationName}
              onChange={(e) => handleQualificationChange(index, "qualificationName", e.target.value)} required>
              <option value="">Select Qualification *</option>
              {qualificationOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <input type="text" placeholder="Marks or CGPA *" className="p-2 border rounded"
              value={qual.marksOrCgpa} onChange={(e) => handleQualificationChange(index, "marksOrCgpa", e.target.value)} required />
            <input type="file" className="border rounded p-2" onChange={(e) => handleFileChange(index, e)} />
          </div>
          {index > 0 && <button className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded" onClick={() => removeQualification(index)}>-</button>}
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-6 mb-4 flex items-center">
        Experience
        <button type="button" onClick={addExperience} className="ml-2 bg-green-500 text-white p-2 rounded">+</button>
      </h2>
      {experience.map((exp, index) => (
        <div key={index} className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Previous Company *" className="p-2 border rounded"
              value={exp.previousCompany} onChange={(e) => handleExperienceChange(index, "previousCompany", e.target.value)} required />
            <input type="text" placeholder="Previous Designation *" className="p-2 border rounded"
              value={exp.previous_designation} onChange={(e) => handleExperienceChange(index, "previous_designation", e.target.value)} required />
            <input type="number" placeholder="Previous Salary *" className="p-2 border rounded"
              value={exp.previous_salary} onChange={(e) => handleExperienceChange(index, "previous_salary", e.target.value)} required />
            <input type="text" placeholder="Total Experience (Years) *" className="p-2 border rounded"
              value={exp.total_experience} onChange={(e) => handleExperienceChange(index, "total_experience", e.target.value)} required />
            <select className="p-2 border rounded" value={exp.letter}
              onChange={(e) => handleExperienceChange(index, "letter", e.target.value)}>
              {letterOptions.map((option) => <option key={option} value={option}>{option.replace(/([A-Z])/g, " $1").trim()}</option>)}
            </select>
            <input type="file" className="border rounded p-2" onChange={(e) => handleExperienceFileChange(index, e)} />
          </div>
        </div>
      ))}

      <button onClick={handleSubmit} className="mt-6 w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
        Save Changes
      </button>
    </div>
  );
}
