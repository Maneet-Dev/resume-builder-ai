import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { token } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">AI-Powered Resume Builder</h1>
      <p className="mb-6 text-lg">Create, edit and manage resumes with smart suggestions</p>

      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/create" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200 transition">
              Create a new resume
            </Link>
            <Link to="/resumes" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200 transition">
              View Resumes
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200 transition">
              Login
            </Link>
            <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
