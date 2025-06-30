import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ResumeList() {
    const [resumes,setResumes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/resumes');
                setResumes(res.data);
            } catch (err) {
                setError('Failed to load resumes');
            } finally {
                setLoading(false);
            }
        };
        fetchResumes();
    }, []);

    if (loading) return <p>Loading resumes...</p>;
    if (error) return <p>{error}</p>;

    if(resumes.length === 0) return <p>No resumes found. <Link to="/create">Create one</Link>!</p>

    return (
        <div>
            <h2>Saved Resumes</h2>
            <ul>
                {resumes.map(resume=> (
                    <li key={resume._id}>
                        <h3>{resume.name}</h3>
                        <p>Email:{resume.email}</p>
                        <p>Phone:{resume.phone}</p>
                        <Link to={`/edit/${resume._id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ResumeList;