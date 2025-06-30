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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!formData) return null;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Resume</h2>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

            <label>Summary:</label>
            <textarea name="summary" value={formData.summary} onChange={handleChange} />

            <label>
                <input type="checkbox" name="isFresher" checked={formData.isFresher} onChange={handleChange} />
                I am a fresher (no work experience)
            </label>

            <h3>Skills</h3>
            {formData.skills.map((skill, i) => (
                <div key={i}>
                    <input type="text" value={skill} onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[i] = e.target.value;
                        setFormData({ ...formData, skills: newSkills });
                    }} required />
                    {formData.skills.length > 1 && (
                        <button type="button" onClick={() => removeItem('skills', i)}>Remove</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => addItem('skills')}>Add Skill</button>

            <h3>Education</h3>
            {formData.education.map((edu, i) => (
                <div key={i}>
                    <input type="text" name="college" placeholder="College Name" value={edu.college} onChange={(e) => handleArrayChange('education', i, e)} required />
                    <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', i, e)} required />
                    <input type="number" name="startYear" placeholder="Start Year" value={edu.startYear} onChange={(e) => handleArrayChange('education', i, e)} required />
                    <input type="number" name="endYear" placeholder="End Year" value={edu.endYear} onChange={(e) => handleArrayChange('education', i, e)} required />
                    {formData.education.length > 1 && (
                        <button type="button" onClick={() => removeItem('education', i)}>Remove</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => addItem('education')}>Add Education</button>

            {!formData.isFresher && (
                <>
                    <h3>Experience</h3>
                    {formData.experience.map((exp, i) => (
                        <div key={i}>
                            <input type="text" name="company" placeholder="Company Name" value={exp.company} onChange={(e) => handleArrayChange('experience', i, e)} required />
                            <input type="text" name="role" placeholder="Your Role" value={exp.role} onChange={(e) => handleArrayChange('experience', i, e)} required />
                            <input type="text" name="description" placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange('experience', i, e)} required />
                            <input type="date" name="startDate" value={exp.startDate} onChange={(e) => handleArrayChange('experience', i, e)} required />
                            <input type="date" name="endDate" value={exp.endDate} onChange={(e) => handleArrayChange('experience', i, e)} required />
                            {formData.experience.length > 1 && (
                                <button type="button" onClick={() => removeItem('experience', i)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem('experience')}>Add Experience</button>
                </>
            )}

            <button type="submit">Update Resume</button>
        </form>
    );
}

export default EditResume;
