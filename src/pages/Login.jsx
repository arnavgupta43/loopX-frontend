import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      const { user, token } = res.data;
      login({ userData: user, jwt: token });
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-xl w-full max-w-sm"
      >
        <h1 className="text-2xl text-white mb-4">Login</h1>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full mb-3 p-2 rounded bg-white/20 text-white"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full mb-3 p-2 rounded bg-white/20 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 rounded text-white hover:bg-blue-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-white text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-300">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
