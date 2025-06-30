import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ResumeList() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p className="text-center mt-8 text-gray-600">Loading resumes...</p>;
    if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

    if (resumes.length === 0)
        return (
            <p className="text-center mt-8 text-gray-700">
                No resumes found. <Link to="/create" className="text-blue-600 hover:underline">Create one</Link>!
            </p>
        );

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-8">
            <h2 className="text-3xl font-semibold mb-6 text-center">Saved Resumes</h2>
            <ul className="space-y-4">
                {resumes.map((resume) => (
                    <li
                        key={resume._id}
                        className="border border-gray-200 rounded p-4 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-semibold mb-1">{resume.name}</h3>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium">Email:</span> {resume.email}
                        </p>
                        <p className="text-gray-700 mb-3">
                            <span className="font-medium">Phone:</span> {resume.phone}
                        </p>
                        <div className="space-x-4">
                            <Link
                                to={`/edit/${resume._id}`}
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Edit
                            </Link>
                            <Link
                                to={`/preview/${resume._id}`}
                                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                Preview
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResumeList;
