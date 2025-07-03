import React from 'react';

const formatCategoryName = (category) => {
  const spaced = category.replace(/([A-Z])/g, ' $1');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

function TemplateOne({ resume }) {
  if (!resume) return null;

  return (
    <div className="w-[794px] h-[1123px] mx-auto bg-white p-10 rounded shadow-lg font-sans text-gray-900 overflow-auto">
      {/* Header */}
      <header className="pb-6 mb-0 text-center">
        <h1 className="text-4xl font-bold text-black uppercase tracking-wide">{resume.name}</h1>
        <div className="mt-2 text-gray-700 text-sm space-y-1">
          <p>{resume.email} <b>|</b> {resume.phone}</p>
        </div>
      </header>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-3 uppercase">
            Summary
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{resume.summary}</p>
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-3 uppercase">
            Education
          </h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-3 text-sm">
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
          <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-3 uppercase">
            Projects
          </h2>
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-4 text-sm">
              <p className="font-semibold text-base">{project.title}</p>
              <p className="italic text-xs text-gray-600 mb-1">
                Technologies: {project.technologies.join(', ')}
              </p>
              <p className="text-sm">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {!resume.isFresher && resume.experience && resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-3 uppercase">
            Experience
          </h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4 text-sm">
              <p className="font-semibold text-base">{exp.role}</p>
              <p className="italic">{exp.company}</p>
              <p className="text-xs text-gray-600 mb-1">
                {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resume.skills && typeof resume.skills === 'object' && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-3 uppercase">
            Skills
          </h2>

          {Object.entries(resume.skills).map(([category, skillList]) => (
            Array.isArray(skillList) && skillList.length > 0 ? (
              <div key={category} className="mb-2">
                <h3 className="text-sm font-semibold mb-1">
                  {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <ul className="flex flex-wrap gap-2 text-sm">
                  {skillList.map((skill, index) => (
                    <li key={index} className="bg-blue-200 text-black rounded-full px-3 py-1">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          ))}
        </section>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-3 uppercase">
            Certifications
          </h2>
          {resume.certifications.map((cert, i) => (
            <div key={i} className="mb-3 text-sm">
              <p className="font-semibold text-base">{cert.title}</p>
              <p className="italic">{cert.issuer}</p>
              <p className="text-xs text-gray-600">
                {cert.startDate ? new Date(cert.startDate).toLocaleDateString() : ''} -{' '}
                {cert.endDate ? new Date(cert.endDate).toLocaleDateString() : 'Present'}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default TemplateOne;
