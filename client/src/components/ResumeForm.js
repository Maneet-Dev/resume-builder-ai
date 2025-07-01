import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ResumeForm() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    skills: [''],
    education: [{ college: '', degree: '', startYear: '', endYear: '' }],
    projects: [{ title: '', technologies: [''], description: '' }],
    isFresher: false,
    experience: [{ company: '', role: '', description: '', startDate: '', endDate: '' }],
    certifications: [],
    templateId: templateId || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (field, index, e) => {
    const { name, value } = e.target;
    const list = [...formData[field]];
    list[index][name] = value;
    setFormData({ ...formData, [field]: list });
  };

  const handleTechChange = (projIndex, techIndex, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[projIndex].technologies[techIndex] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addItem = (field) => {
    if (field === 'skills') {
      setFormData({ ...formData, skills: [...formData.skills, ''] });
    } else if (field === 'education') {
      setFormData({
        ...formData,
        education: [...formData.education, { college: '', degree: '', startYear: '', endYear: '' }],
      });
    } else if (field === 'experience') {
      setFormData({
        ...formData,
        experience: [...formData.experience, { company: '', role: '', description: '', startDate: '', endDate: '' }],
      });
    } else if (field === 'projects') {
      setFormData({
        ...formData,
        projects: [...formData.projects, { title: '', technologies: [''], description: '' }],
      });
    } else if (field === 'certifications') {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, { title: '', issuer: '', startDate: '', endDate: '' }],
      });
    }
  };

  const removeItem = (field, index) => {
    const list = [...formData[field]];
    list.splice(index, 1);
    setFormData({ ...formData, [field]: list });
  };

  const addTechnology = (projIndex) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[projIndex].technologies.push('');
    setFormData({ ...formData, projects: updatedProjects });
  };

  const removeTechnology = (projIndex, techIndex) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[projIndex].technologies.splice(techIndex, 1);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const dataToSend = {
    skills: [],
    education: [],
    projects: [],
    experience: [],
    certifications: [],
    ...formData,
  };

  try {
    const res = await axios.post('http://localhost:5000/api/resumes', dataToSend);
    console.log('Resume saved', res.data);
    alert('Resume saved successfully');
    navigate('/resumes');
  } catch (err) {
    console.error('Error saving resume', err);
    alert('Failed to save resume. Please try again');
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Summary:</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isFresher"
            checked={formData.isFresher}
            onChange={handleChange}
            id="isFresher"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isFresher" className="text-gray-700">
            I am a fresher (no work experience)
          </label>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          {formData.skills.map((skill, i) => (
            <div key={i} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...formData.skills];
                  newSkills[i] = e.target.value;
                  setFormData({ ...formData, skills: newSkills });
                }}
                required
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('skills', i)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem('skills')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Skill
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          {formData.education.map((edu, i) => (
            <div key={i} className="space-y-2 mb-4 border border-gray-200 rounded p-4">
              <input
                type="text"
                name="college"
                placeholder="College Name"
                value={edu.college}
                onChange={(e) => handleArrayChange('education', i, e)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleArrayChange('education', i, e)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="startYear"
                  placeholder="Start Year"
                  value={edu.startYear}
                  onChange={(e) => handleArrayChange('education', i, e)}
                  required
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="endYear"
                  placeholder="End Year"
                  value={edu.endYear}
                  onChange={(e) => handleArrayChange('education', i, e)}
                  required
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('education', i)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem('education')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Education
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          {formData.projects.map((proj, i) => (
            <div key={i} className="space-y-2 mb-4 border border-gray-200 rounded p-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => handleArrayChange('projects', i, e)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={proj.description}
                onChange={(e) => handleArrayChange('projects', i, e)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <div>
                <label className="block font-medium text-gray-700">Technologies:</label>
                {proj.technologies.map((tech, j) => (
                  <div key={j} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechChange(i, j, e.target.value)}
                      className="flex-grow border border-gray-300 rounded px-3 py-2"
                    />
                    {proj.technologies.length > 1 && (
                      <button type="button" onClick={() => removeTechnology(i, j)} className="ml-2 text-red-600">
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addTechnology(i)} className="mt-2 text-blue-600">
                  Add Technology
                </button>
              </div>
              {formData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('projects', i)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
                >
                  Remove Project
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem('projects')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Project
          </button>
        </div>

        {!formData.isFresher && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            {formData.experience.map((exp, i) => (
              <div key={i} className="space-y-2 mb-4 border border-gray-200 rounded p-4">
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => handleArrayChange('experience', i, e)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Your Role"
                  value={exp.role}
                  onChange={(e) => handleArrayChange('experience', i, e)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleArrayChange('experience', i, e)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-2">
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleArrayChange('experience', i, e)}
                    required
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleArrayChange('experience', i, e)}
                    required
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('experience', i)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem('experience')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Experience
            </button>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-2">Certifications</h3>
          {formData.certifications.length === 0 && (
            <button
              type="button"
              onClick={() => addItem('certifications')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
            >
              Add Certification
            </button>
          )}

          {formData.certifications.length > 0 &&
            formData.certifications.map((cert, i) => (
              <div key={i} className="space-y-2 mb-4 border border-gray-200 rounded p-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Certification Title"
                  value={cert.title}
                  onChange={(e) => handleArrayChange('certifications', i, e)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="issuer"
                  placeholder="Issuer"
                  value={cert.issuer}
                  onChange={(e) => handleArrayChange('certifications', i, e)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-2">
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={cert.startDate}
                    onChange={(e) => handleArrayChange('certifications', i, e)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={cert.endDate}
                    onChange={(e) => handleArrayChange('certifications', i, e)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem('certifications', i)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove Certification
                </button>
              </div>
            ))}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            Save Resume
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeForm;
