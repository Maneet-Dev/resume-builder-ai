import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold cursor-pointer">
        <NavLink to="/" className="hover:text-yellow-300">
          Resume Builder
        </NavLink>
      </div>
      <div className="space-x-4">
        {['/', '/create', '/resumes'].map((path, i) => {
          const label = path === '/' ? 'Home' : path === '/create' ? 'Create Resume' : 'View Resumes';
          return (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                (isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300") +
                " focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-1"
              }
            >
              {label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
