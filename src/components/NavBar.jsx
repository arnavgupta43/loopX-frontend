import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-pink-900 via-rose-900 to-pink-800 backdrop-blur-lg border-b border-pink-700/30 shadow-lg shadow-pink-900/20 p-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold text-pink-100 hover:text-white transition-colors duration-300 tracking-wide"
      >
        LoopX
      </Link>

      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <Link
              to="/feed"
              className="text-pink-200 hover:text-pink-100 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-pink-800/50 font-medium"
            >
              Feed
            </Link>
            <Link
              to="/posts/new"
              className="text-pink-200 hover:text-pink-100 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-pink-800/50 font-medium"
            >
              New Post
            </Link>
            <Link
              to="/profile"
              className="text-pink-200 hover:text-pink-100 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-pink-800/50 font-medium"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-pink-200 hover:text-pink-100 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-pink-800/50 border border-pink-700/50 hover:border-pink-600 font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-pink-200 hover:text-pink-100 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-pink-800/50 border border-pink-700/50 hover:border-pink-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-pink-500/25 transform hover:scale-105"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
