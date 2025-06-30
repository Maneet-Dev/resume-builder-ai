import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return(
        <div style={{textAlign: 'center'}}>
            <h1>AI-Powered Resume Builder</h1>
            <p>Create, edit and manage resumes with smart suggestions</p>
            <Link to="/create">Create a new resume</Link> | <Link to="/resumes">View Resumes</Link>
        </div>
    );
}

export default Home;