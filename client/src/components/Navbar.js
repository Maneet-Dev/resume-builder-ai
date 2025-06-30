import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold">Resume Builder</div>
      <div className="space-x-4">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/create"
          className={({ isActive }) => 
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          Create Resume
        </NavLink>
        <NavLink 
          to="/resumes"
          className={({ isActive }) => 
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          View Resumes
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
