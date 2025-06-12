import axios from "axios";

// 1) Create a new axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 2) Add a request interceptor to attach JWT automatically
api.interceptors.request.use(
  (config) => {
    // Read the token from localStorage (or Context)
    const token = localStorage.getItem("token");
    if (token) {
      // Attach it as Authorization Bearer <token>
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
