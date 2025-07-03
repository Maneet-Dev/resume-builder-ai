import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import TemplateOne from './templates/TemplateOne';
import TemplateTwo from './templates/TemplateTwo';

function ResumePreview() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/resumes/${id}`);
        setResume(res.data);
      } catch (err) {
        setError('Failed to load resume');
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  if (loading)
    return <p className="text-center mt-8 text-gray-600">Loading resume...</p>;
  if (error)
    return <p className="text-center mt-8 text-red-600">{error}</p>;
  if (!resume)
    return <p className="text-center mt-8 text-gray-700">No resume found</p>;

  switch (resume.templateId) {
    case 'TemplateOne':
      return <TemplateOne resume={resume} />;
    case 'TemplateTwo':
      return <TemplateTwo resume={resume} />;
    default:
      return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-8">
          <h2 className="text-3xl font-bold mb-4">{resume.name}</h2>
          <p className="mb-1"><strong>Email:</strong> {resume.email}</p>
          <p className="mb-4"><strong>Phone:</strong> {resume.phone}</p>
          <p className="mb-6 whitespace-pre-wrap"><strong>Summary:</strong> {resume.summary}</p>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Skills</h3>
            {Object.entries(resume.skills).map(([category, skillList]) =>
              Array.isArray(skillList) && skillList.length > 0 ? (
                <div key={category} className="mb-3">
                  <p className="font-semibold capitalize">{category.replace(/([A-Z])/g, ' $1')}</p>
                  <ul className="list-disc list-inside ml-4 text-sm text-gray-800">
                    {skillList.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </section>

          <section className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Education</h3>
            {resume.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p><strong>{edu.degree}</strong> from {edu.college} ({edu.startYear} - {edu.endYear})</p>
              </div>
            ))}
          </section>

          {resume.projects && resume.projects.length > 0 && (
            <section className="mb-6">
              <h3 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Projects</h3>
              {resume.projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold text-lg">{proj.title}</p>
                  <p className="italic text-sm text-gray-600 mb-1">
                    Technologies: {proj.technologies.join(', ')}
                  </p>
                  <p>{proj.description}</p>
                </div>
              ))}
            </section>
          )}

          {!resume.isFresher && (
            <section className="mb-6">
              <h3 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Experience</h3>
              {resume.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold">{exp.role} at {exp.company}</p>
                  <p className="mb-1">{exp.description}</p>
                  <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <section className="mb-6">
              <h3 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Certifications</h3>
              {resume.certifications.map((cert, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold">{cert.title}</p>
                  <p>{cert.issuer}</p>
                  <p className="text-sm text-gray-600">{cert.startDate} - {cert.endDate}</p>
                </div>
              ))}
            </section>
          )}


          <Link
            to="/resumes"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Resumes
          </Link>
        </div>
      );
  }
}

export default ResumePreview;
