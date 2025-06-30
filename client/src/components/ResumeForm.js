import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function ResumeForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        phone:'',
        summary: '',
        skills: [''],
        education: [{college:'',degree:'',startYear:'',endYear:''}],
        isFresher:false,
        experience:[{company:'',role:'',description:'',startDate:'',endDate:''}]
    });

    const handleChange = (e) => {
        const {name,value,type,checked} = e.target;
        if(type=== 'checkbox') {
            setFormData({...formData, [name]:checked});
        } else {
            setFormData({...formData,[name]:value});
        }
    };

    const handleArrayChange = (field,index,e) => {
        const {name,value} = e.target;
        const list = [...formData[field]];
        list[index][name] = value;
        setFormData({...formData,[field]:list});
    };

    const addItem = (field) => {
        if (field === 'skills') {
            setFormData({...formData,skills:[...formData.skills,'']});
        } else if (field === 'education') {
            setFormData({...formData,education:[...formData.education, {college:'',degree:'',startYear:'',endYear:''}]});
        } else if (field === 'experience') {
            setFormData({...formData,experience:[...formData.experience,{company:'',role:'',description:'',startDate:'',endDate:''}]});
        }
    };

    const removeItem = (field,index) => {
        const list = [...formData[field]];
        list.splice(index,1);
        setFormData({...formData, [field]:list});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/resumes', formData);
            console.log('Resume saved', res.data);
            alert('Resume saved successfully');

            navigate('/resumes');
        } catch (err) {
            console.error('Error saving resume', err);
            alert('Failed to save resume. Please try again');
        }
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Resume</h2>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required></input>

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required></input>

            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required></input>

            <label>Summary:</label>
            <textarea name="summary" value={formData.summary} onChange={handleChange}></textarea>

            <label>
                <input type="checkbox" name="isFresher" checked={formData.isFresher} onChange={handleChange}></input>
                I am a fresher (no work experience) 
            </label>

            <h3>Skills</h3>
            {formData.skills.map((skill, i) => (
                <div key = {i}>
                    <input type="text" value={skill} onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[i] = e.target.value;
                        setFormData({...formData, skills:newSkills});
                    }} required></input>
                    {formData.skills.length > 1 && (
                        <button type="button" onClick={() => removeItem('skills',i)}>Remove</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() =>addItem('skills')}>Add Skills</button>

            <h3>Education</h3>
            {formData.education.map((edu,i) => (
                <div key={i}>
                    <input type="text" name="college" placeholder="College Name" value={edu.college} onChange={(e) => handleArrayChange('education',i,e)}
                    required></input>
                    <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education',i,e)}
                    required></input>
                    <input type="number" name="startYear" placeholder="Start Year" value={edu.startYear} onChange={(e)=>handleArrayChange('education',i,e)}
                    required></input>
                    <input type="number" name="endYear" placeholder="End Year" value={edu.endYear} onChange={(e)=> handleArrayChange('education',i,e)}
                    required></input>
                    {formData.education.length > 1 && (
                        <button type="button" onClick={()=>removeItem('education',i)}>Remove</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={()=>addItem('education')}>Add Education</button>

            {!formData.isFresher && (
                <>
                <h3>Experience</h3>
                {formData.experience.map((exp,i) => (
                    <div key={i}>
                        <input type="text" name="company" placeholder="Company Name" value={exp.company} onChange={(e)=> handleArrayChange('experience',i,e)}
                        required></input>
                        <input type="text" name="role" placeholder = "Your Role" value={exp.role} onChange={(e)=>handleArrayChange('experience',i,e)}
                        required></input>
                        <input type="text" name="description" placeholder="Description" value={exp.description} onChange={(e)=>handleArrayChange('experience',i,e)}
                        required></input>
                        <input type="date" name="startDate" placeholder="Start Date" value={exp.startDate} onChange={(e)=>handleArrayChange('experience',i,e)}
                        required></input>
                        <input type="date" name="endDate" placeholder="End Date" value={exp.endDate} onChange={(e)=>handleArrayChange('experience',i,e)}
                        required></input>
                        {formData.experience.length > 1 && (
                            <button type="button" onClick={() =>removeItem('experience',i)}>Remove</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={()=>addItem('experience')}>Add Experience</button>
                </>
            )}
            
            <button type="submit">Save Resume</button>
        </form>
    );
}

export default ResumeForm;