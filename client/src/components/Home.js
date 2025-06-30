import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">AI-Powered Resume Builder</h1>
      <p className="mb-6 text-lg">Create, edit and manage resumes with smart suggestions</p>
      <div className="space-x-4">
        <Link to="/create" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200 transition">
          Create a new resume
        </Link>
        <Link to="/resumes" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200 transition">
          View Resumes
        </Link>
      </div>
    </div>
  );
}

export default Home;
