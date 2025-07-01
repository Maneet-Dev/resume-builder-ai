import React from 'react';

function TemplateTwo({ resume }) {
    if (!resume) return null;

    return (
        <div className="w-[794px] h-[1123px] mx-auto bg-white p-10 shadow-xl font-sans text-gray-900 overflow-hidden">
            {/* Header */}
            <div className="text-center border-b pb-4">
                <h1 className="text-4xl font-bold uppercase text-black tracking-wide">{resume.name}</h1>
                <p className="mt-1 text-sm text-gray-600">
                    {resume.email} • {resume.phone}
                </p>
            </div>

            {/* Summary */}
            {resume.summary && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-1 uppercase">Summary</h2>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{resume.summary}</p>
                </section>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-1 uppercase">Skills</h2>
                    <ul className="flex flex-wrap gap-2 text-sm">
                        {resume.skills.map((skill, i) => (
                            <li key={i} className="bg-blue-200 text-black rounded-full px-3 py-1">{skill}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-1 uppercase">Education</h2>
                    {resume.education.map((edu, i) => (
                        <div key={i} className="mb-2 text-sm">
                            <p className="font-semibold">{edu.degree}</p>
                            <p className="text-gray-700">{edu.college} | {edu.startYear} - {edu.endYear}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-1 uppercase">Projects</h2>
                    {resume.projects.map((proj, i) => (
                        <div key={i} className="mb-3 text-sm">
                            <p className="font-semibold text-base">{proj.title}</p>
                            <p className="italic text-xs text-gray-600">Technologies: {proj.technologies.join(', ')}</p>
                            <p>{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
                <section className="mt-6">
                    <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-1 mb-1 uppercase">
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

export default TemplateTwo;
