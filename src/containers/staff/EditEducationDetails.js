import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { MdFileDownload } from 'react-icons/md';

const urlToBlob = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
};

const blobToFile = (blob, filename) => {
  return new File([blob], filename, { type: blob.type });
};

export default function EditEducationDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log('EducationDetails', location.state);
  console.log('check0123');
  const [educationDetails, setEducationDetails] = useState([]);
  const [qualification, setQualification] = useState([
    {
      qualificationName: '',
      marksOrCgpa: '',
      file: null,
    },
  ]);

  const [experience, setExperience] = useState([
    {
      previousCompany: '',
      previous_designation: '',
      total_experience: '',
      previous_salary: '',
      letter: 'experienceLetter',
      uploadLetters: null,
    },
  ]);

  useEffect(() => {
    if (location.state?.data) {
      const { qualifications, experience } = location.state.data;

      if (qualifications?.length) {
        setQualification(
          qualifications.map((qual) => ({
            qualificationName: qual.qualificationName || '',
            marksOrCgpa: qual.marksOrCgpa || '',
            file: qual.file || null,
          }))
        );
      }

      if (experience?.length) {
        setExperience(
          experience.map((exp) => ({
            previousCompany: exp.previousCompany || '',
            previous_designation: exp.previous_designation || '',
            total_experience: exp.total_experience || '',
            previous_salary: exp.previous_salary || '',
            letter: exp.letter || 'experienceLetter',
            uploadLetters: exp.uploadLetters || null,
          }))
        );
      }
    }
  }, [location.state]);

  const letterOptions = [
    'resignationLetter',
    'terminationLetter',
    'appointmentLetter',
    'leaveFormat',
    'relievingLetter',
    'experienceLetter',
  ];

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
    const file = event.target.files[0];
    handleQualificationChange(index, 'file', file);
  };

  const addQualification = () => {
    setQualification([
      ...qualification,
      {
        qualificationName: '',
        marksOrCgpa: '',
        file: null,
      },
    ]);
  };

  const removeQualification = (index) => {
    if (qualification.length > 1) {
      setQualification(qualification.filter((_, i) => i !== index));
    }
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        previousCompany: '',
        previous_designation: '',
        total_experience: '',
        previous_salary: '',
        letter: 'experienceLetter',
        uploadLetters: null,
      },
    ]);
  };

  const removeExperience = (index) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    setEducationDetails({
      qualification,
      experience,
    });
  }, [qualification, experience, setEducationDetails]);

  const handleSubmit = async () => {
    console.log('check0');
    try {
      const formData = new FormData();

      const staffId = location.state?.data?.id;

      const qualifications = qualification.map((qual) => ({
        qualificationName: qual.qualificationName,
        marksOrCgpa: qual.marksOrCgpa,
      }));

      const experienceDetails = experience.map((exp) => ({
        previousCompany: exp.previousCompany,
        previous_designation: exp.previous_designation,
        total_experience: exp.total_experience,
        previous_salary: exp.previous_salary,
      }));

      formData.append('qualifications', JSON.stringify(qualifications));
      formData.append('experienceDetails', JSON.stringify(experienceDetails));

      if (staffId) {
        formData.append('id', staffId);
      }

      // qualification.forEach((qual) => {
      //   if (qual.file) {
      //     formData.append('qualificationFiles', qual.file);
      //   }
      // });

      // experience.forEach((exp) => {
      //   if (exp.uploadLetters) {
      //     formData.append('experience', exp.uploadLetters);
      //   }
      // });

      console.log('check1');
      for (const [i, qual] of qualification.entries()) {
        console.log('check2');
        if (qual.file) {
          console.log(qual.file, 'filename');
          if (typeof qual.file === 'string' && qual.file.startsWith('http')) {
            const blob = await urlToBlob(qual.file);
            const file = blobToFile(blob, `qualification_${i}.pdf`);
            formData.append('qualificationFiles', file);
          } else {
            formData.append('qualificationFiles', qual.file);
          }
        }
      }

      for (const [i, exp] of experience.entries()) {
        if (exp.uploadLetters) {
          if (
            typeof exp.uploadLetters === 'string' &&
            exp.uploadLetters.startsWith('http')
          ) {
            const blob = await urlToBlob(exp.uploadLetters);
            const file = blobToFile(blob, `experience_${i}.pdf`);
            formData.append('experience', file);
          } else {
            formData.append('experience', exp.uploadLetters);
          }
        }
      }

      const response = await ApiService.post(
        '/staff/handleStaffDetails',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log(response, 'response education details');

      if (response.status) {
        alert('Education details updated successfully!');
        navigate(-1);
        return response.data;
      } else {
        alert('Failed to update education details.');
        return null;
      }
    } catch (error) {
      console.error('Error updating education details:', error);
      alert('An error occurred while updating education details.');
      return null;
    }
  };

  return (
    <div>
      <form className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          Qualification
          <button
            type="button"
            onClick={addQualification}
            className="ml-2 bg-green-500 text-white p-2 rounded"
          >
            +
          </button>
        </h2>

        {qualification.map((qual, index) => (
          <div
            key={index}
            className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow"
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Qualification Name *"
                className="p-2 border rounded"
                value={qual.qualificationName}
                onChange={(e) =>
                  handleQualificationChange(
                    index,
                    'qualificationName',
                    e.target.value
                  )
                }
                // required
              />
              <input
                type="text"
                placeholder="Marks or CGPA *"
                className="p-2 border rounded"
                value={qual.marksOrCgpa}
                onChange={(e) =>
                  handleQualificationChange(
                    index,
                    'marksOrCgpa',
                    e.target.value
                  )
                }
                // required
              />
              <div key={index} className="mb-4">
                <input
                  type="file"
                  className="border rounded p-2"
                  onChange={(e) => handleFileChange(index, e)}
                />
                {qual.file && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={qual.file}
                      alt="Preview"
                      className="h-16 w-16 object-cover border"
                    />
                    <a
                      href={qual.file}
                      download
                      className="text-blue-600 hover:underline"
                    >
                      {/* Replace with an icon if needed */}
                      <MdFileDownload className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>
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
          <button
            type="button"
            onClick={addExperience}
            className="ml-2 bg-green-500 text-white p-2 rounded"
          >
            +
          </button>
        </h2>

        {experience.map((exp, index) => (
          <div
            key={index}
            className="relative mb-4 p-4 bg-gray-200 rounded-lg shadow"
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Previous Company *"
                className="p-2 border rounded"
                value={exp.previousCompany}
                onChange={(e) =>
                  handleExperienceChange(
                    index,
                    'previousCompany',
                    e.target.value
                  )
                }
                // required
              />
              <input
                type="text"
                placeholder="Previous Designation *"
                className="p-2 border rounded"
                value={exp.previous_designation}
                onChange={(e) =>
                  handleExperienceChange(
                    index,
                    'previous_designation',
                    e.target.value
                  )
                }
                // required
              />
              <input
                type="text"
                placeholder="Total Experience (Years) *"
                className="p-2 border rounded"
                value={exp.total_experience}
                onChange={(e) =>
                  handleExperienceChange(
                    index,
                    'total_experience',
                    e.target.value
                  )
                }
                // required
              />
              <input
                type="text"
                placeholder="Previous Salary *"
                className="p-2 border rounded"
                value={exp.previous_salary}
                onChange={(e) =>
                  handleExperienceChange(
                    index,
                    'previous_salary',
                    e.target.value
                  )
                }
                // required
              />
              <select
                className="p-2 border rounded"
                value={exp.letter}
                onChange={(e) =>
                  handleExperienceChange(index, 'letter', e.target.value)
                }
              >
                {letterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.replace(/([A-Z])/g, ' $1').trim()}
                  </option>
                ))}
              </select>
              <input
                type="file"
                className="border rounded p-2"
                onChange={(e) =>
                  handleExperienceChange(
                    index,
                    'uploadLetters',
                    e.target.files[0]
                  )
                }
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
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}
