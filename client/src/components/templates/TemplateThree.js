import React from 'react';

function TemplateThree({ resume }) {
    if (!resume) return null;

    return (
        <div className="w-[794px] h-[1123px] mx-auto bg-white p-8 font-sans text-gray-900 overflow-hidden">
            {/* Header */}
            <header className="text-center border-b pb-4 mb-6">
                <h1 className="text-4xl font-bold text-indigo-700 uppercase tracking-wide">{resume.name}</h1>
                <p className="mt-2 text-sm text-gray-700">
                    {resume.email} | {resume.phone}
                </p>
            </header>

            {/* Top Grid Section */}
            <div className="grid grid-cols-2 gap-6 mb-8">
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

                {/* Education */}
                {resume.education && resume.education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-semibold text-indigo-600 mb-2">Education</h2>
                        <div className="space-y-2 text-sm">
                            {resume.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="font-bold">{edu.degree}</p>
                                    <p>{edu.college}</p>
                                    <p className="text-gray-600">
                                        {edu.startYear} - {edu.endYear}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-indigo-600 mb-2">Certifications</h2>
                    <div className="space-y-2 text-sm">
                        {resume.certifications.map((cert, i) => (
                            <div key={i}>
                                <p className="font-bold">{cert.title}</p>
                                <p className="italic text-gray-700">{cert.issuer}</p>
                                <p className="text-gray-600">
                                    {cert.startDate ? new Date(cert.startDate).toLocaleDateString() : ''} - {cert.endDate ? new Date(cert.endDate).toLocaleDateString() : 'Present'}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-indigo-600 mb-2">Projects</h2>
                    <div className="space-y-3 text-sm">
                        {resume.projects.map((proj, i) => (
                            <div key={i}>
                                <p className="font-bold text-base">{proj.title}</p>
                                <p className="italic text-xs text-gray-600">
                                    Technologies: {proj.technologies.join(', ')}
                                </p>
                                <p>{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience Timeline */}
            {!resume.isFresher && resume.experience && resume.experience.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-600 mb-4">Experience</h2>
                    <div className="relative border-l-2 border-indigo-300 pl-6 space-y-6 text-sm">
                        {resume.experience.map((exp, i) => (
                            <div key={i} className="relative">
                                <span className="absolute -left-[9px] top-1 w-4 h-4 bg-indigo-600 rounded-full"></span>
                                <p className="font-bold text-base">{exp.role}</p>
                                <p className="italic text-gray-700">{exp.company}</p>
                                <p className="text-xs text-gray-600">
                                    {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                                </p>
                                <p className="mt-1 text-sm">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default TemplateThree;
