import React from "react";
import { Facebook, Twitter, Instagram, Dribbble, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  function navigateLogin() {
    navigate("/login");
  }
  function navigateRegister() {
    navigate("/register");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 relative overflow-hidden flex flex-col">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-2 h-20 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full transform rotate-45 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-3 h-32 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full transform -rotate-12 animate-pulse delay-300"></div>
        <div className="absolute top-60 left-1/3 w-2 h-24 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full transform rotate-30 animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-1/4 w-2 h-28 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full transform -rotate-45 animate-pulse delay-500"></div>
        <div className="absolute top-20 right-1/3 w-1 h-16 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full transform rotate-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-16 w-3 h-40 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full transform rotate-15 animate-pulse delay-200"></div>
        <div className="absolute top-1/3 right-8 w-2 h-24 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full transform -rotate-30 animate-pulse delay-800"></div>
        <div className="absolute bottom-1/3 left-8 w-2 h-20 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full transform rotate-75 animate-pulse delay-400"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 flex-1 max-w-6xl mx-auto w-full">
        {/* Logo */}
        <div className="mb-16 md:mb-20">
          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full px-8 py-4 inline-block shadow-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <span className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl filter">
                Loop<span className="text-purple-400 animate-pulse">X</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Engage, share and
            <br />
            <span className="text-gray-800">Stay in Loop</span>
          </h1>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20">
          <button
            onClick={navigateRegister}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get started
          </button>
          <button
            onClick={navigateLogin}
            className="bg-white/90 hover:bg-white text-purple-600 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
          >
            Login
          </button>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-8">
        <div className="flex space-x-4">
          <a
            href="#"
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
          >
            <Dribbble size={20} />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
          >
            <Globe size={20} />
          </a>
        </div>
      </div>

      {/* Additional floating elements for enhanced visual appeal */}
      <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-500"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/25 rounded-full animate-bounce delay-700"></div>
    </div>
  );
}
