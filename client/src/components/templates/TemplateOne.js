// src/components/templates/TemplateOne.js
import React from 'react';

function TemplateOne({ resume }) {
  if (!resume) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-lg font-sans text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-4xl font-bold">{resume.name}</h1>
        <div className="flex space-x-6 mt-2 text-gray-600 text-sm">
          <span>{resume.email}</span>
          <span>{resume.phone}</span>
        </div>
      </header>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Summary
          </h2>
          <p className="whitespace-pre-wrap">{resume.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Skills
          </h2>
          <ul className="flex flex-wrap gap-3">
            {resume.skills.map((skill, index) => (
              <li
                key={index}
                className="bg-blue-600 text-white rounded px-3 py-1 text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <p className="font-semibold">{edu.degree}</p>
              <p>
                {edu.college} | {edu.startYear} - {edu.endYear}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-lg">{project.title}</p>
              <p className="italic text-sm text-gray-600 mb-1">
                Technologies: {project.technologies.join(', ')}
              </p>
              <p>{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {!resume.isFresher && resume.experience && resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Experience
          </h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-lg">{exp.role}</p>
              <p className="italic">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-1">
                {exp.startDate} - {exp.endDate}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default TemplateOne;
