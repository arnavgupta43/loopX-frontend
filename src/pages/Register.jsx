// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import { User, Upload, Eye, EyeOff } from "lucide-react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
    email: "",
    bio: "",
    password: "",
  });

  const [errors, setErrors] = useState([]); // ← holds validation errors
  const [loading, setLoading] = useState(false); // ← disables button
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Controlled inputs
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Keep raw file for upload, and DataURL for preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // clear previous
    setLoading(true);
    try {
      // Build FormData
      const fd = new FormData();
      fd.append("username", formData.username);
      fd.append("email", formData.email);
      fd.append("name", formData.firstName);
      fd.append("bio", formData.bio);
      fd.append("password", formData.password);
      if (profileImageFile) {
        fd.append("file", profileImageFile);
      }

      // Register
      await api.post("/auth/register", fd);

      // Login
      const loginRes = await api.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      const { user, token } = loginRes.data;
      login({ userData: user, jwt: token });
      navigate("/feed");
    } catch (err) {
      // If validation errors come as an array:
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.msg) {
        // A single message
        setErrors([err.response.data.msg]);
      } else {
        setErrors([err.message]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Navigate to login page
  const goToLogin = () => navigate("/login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center p-4 relative">
      {/* ...animated bg elements (omitted for brevity) */}

      <div className="relative z-10 w-full max-w-md">
        {/* Logo (omitted) */}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl space-y-6"
        >
          {/* Error Display */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              <ul className="list-disc list-inside space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* file */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center overflow-hidden border-4 border-white/30">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-white" />
                )}
              </div>
              <label
                htmlFor="file"
                className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 shadow-lg"
              >
                <Upload size={16} className="text-gray-600" />
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-white/70 text-sm mt-2">Upload Profile Picture</p>
          </div>

          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-white font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-white font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Choose a username"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-white font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-white font-medium mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="3"
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-white font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            } text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="text-center text-white/70 mt-4">
            Already have an account?{" "}
            <button
              onClick={goToLogin}
              className="text-yellow-300 hover:text-yellow-200"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
