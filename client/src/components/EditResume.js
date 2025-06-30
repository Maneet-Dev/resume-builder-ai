import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditResume() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/resumes/${id}`);
                setFormData(res.data);
            } catch (err) {
                setError('Failed to load resume');
            } finally {
                setLoading(false);
            }
        };
        fetchResume();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleArrayChange = (field, index, e) => {
        const { name, value } = e.target;
        const list = [...formData[field]];
        list[index][name] = value;
        setFormData({ ...formData, [field]: list });
    };

    const addItem = (field) => {
        const newItem =
            field === 'skills' ? '' :
            field === 'education' ? { college: '', degree: '', startYear: '', endYear: '' } :
            { company: '', role: '', description: '', startDate: '', endDate: '' };

        setFormData({ ...formData, [field]: [...formData[field], newItem] });
    };

    const removeItem = (field, index) => {
        const list = [...formData[field]];
        list.splice(index, 1);
        setFormData({ ...formData, [field]: list });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/resumes/${id}`, formData);
            alert('Resume updated successfully');
            navigate('/resumes');
        } catch (err) {
            console.error('Error updating resume:', err);
            alert('Failed to update resume');
        }
    };

    if (loading) return <p className="text-center mt-8 text-gray-600">Loading...</p>;
    if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;
    if (!formData) return null;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit Resume</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Summary:</label>
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
                                        value={exp.startDate}
                                        onChange={(e) => handleArrayChange('experience', i, e)}
                                        required
                                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="date"
                                        name="endDate"
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

                <div className="text-center">
                    <button
                        type="submit"
                        className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
                    >
                        Update Resume
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditResume;
