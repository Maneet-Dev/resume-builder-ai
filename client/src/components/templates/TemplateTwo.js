import React from 'react';

const formatCategoryName = (category) => {
    const spaced = category.replace(/([A-Z])/g, ' $1');
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

function TemplateTwo({ resume }) {
    if (!resume) return null;

    return (
        <div className="w-[794px] h-[1123px] mx-auto bg-white shadow-xl font-sans text-gray-900 overflow-hidden flex">
            {/* Left Sidebar */}
            <aside className="w-[30%] bg-gray-100 p-6 border-r space-y-6">
                {/* Name */}
                <h1 className="text-xl font-bold uppercase text-black tracking-wide">{resume.name}</h1>

                {/* Contact */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-800 uppercase border-b pb-1 mb-2">Contact</h2>
                    <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-700 uppercase">Email</h3>
                        <p className="text-sm text-gray-800 break-words whitespace-normal">{resume.email}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-700 uppercase">Phone</h3>
                        <p className="text-sm text-gray-800 break-words whitespace-normal">{resume.phone}</p>
                    </div>
                </section>

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
                    <section>
                        <h2 className="text-sm font-semibold text-gray-800 uppercase border-b pb-1 mb-2">Certifications</h2>
                        <div className="space-y-3">
                            {resume.certifications.map((cert, i) => (
                                <div key={i} className="text-xs break-words">
                                    <p className="font-semibold">{cert.title}</p>
                                    <p className="italic">{cert.issuer}</p>
                                    <p className="text-gray-600">
                                        {cert.startDate ? new Date(cert.startDate).toLocaleDateString() : ''} -{' '}
                                        {cert.endDate ? new Date(cert.endDate).toLocaleDateString() : 'Present'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </aside>

            {/* Main Content */}
            <main className="w-[70%] p-8 space-y-6">
                {/* Summary */}
                {resume.summary && (
                    <section>
                        <h2 className="text-lg font-bold text-black border-b pb-1 mb-2 uppercase">Summary</h2>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{resume.summary}</p>
                    </section>
                )}

                {/* Education */}
                {resume.education && resume.education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-black border-b pb-1 mb-2 uppercase">Education</h2>
                        <div className="space-y-2">
                            {resume.education.map((edu, i) => (
                                <div key={i} className="text-sm">
                                    <p className="font-semibold">{edu.degree}</p>
                                    <p className="text-gray-700 break-words">
                                        {edu.college} | {edu.startYear} - {edu.endYear}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {resume.projects && resume.projects.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-black border-b pb-1 mb-2 uppercase">Projects</h2>
                        <div className="space-y-3">
                            {resume.projects.map((proj, i) => (
                                <div key={i} className="text-sm break-words">
                                    <p className="font-semibold text-base">{proj.title}</p>
                                    <p className="italic text-xs text-gray-600">
                                        Technologies: {proj.technologies.join(', ')}
                                    </p>
                                    <p>{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {resume.experience && resume.experience.length > 0 && !resume.isFresher && (
                    <section>
                        <h2 className="text-lg font-bold text-black border-b pb-1 mb-2 uppercase">Experience</h2>
                        <div className="space-y-3">
                            {resume.experience.map((exp, i) => (
                                <div key={i} className="text-sm break-words">
                                    <p className="font-semibold text-base">{exp.role}</p>
                                    <p className="italic">{exp.company}</p>
                                    <p className="text-xs text-gray-600">
                                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} -{' '}
                                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                                    </p>
                                    <p className="mt-1">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default TemplateTwo;
