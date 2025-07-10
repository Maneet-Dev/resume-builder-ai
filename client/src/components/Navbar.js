import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold cursor-pointer">
        <NavLink to="/" className="hover:text-yellow-300">
          Resume Builder
        </NavLink>
      </div>

      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                (isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300') +
                ' focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-1'
              }
            >
              Create Resume
            </NavLink>

            <NavLink
              to="/resumes"
              className={({ isActive }) =>
                (isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300') +
                ' focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-1'
              }
            >
              View Resumes
            </NavLink>

            <span className="mr-4">Hi, {user.name}</span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-1"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-1"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
