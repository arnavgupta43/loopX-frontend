import React, { useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { user, login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", bio: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await api.get("/user/me");
      setForm({ name: res.data.data.name || "", bio: res.data.data.bio || "" });
      setPreview(res.data.data.avatarUrl.url);
    })();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      const r = new FileReader();
      r.onload = () => setPreview(r.result);
      r.readAsDataURL(f);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("bio", form.bio);
    if (file) fd.append("file", file);
    const res = await api.patch("/user/me", fd);
    login({ userData: res.data.data, jwt: localStorage.getItem("token") });
    alert("Profile Photo Updated");
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <img src={preview} alt="" className="w-24 h-24 rounded-full mb-2" />
      <input type="file" onChange={handleFile} />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows="3"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Save Changes
      </button>
    </form>
  );
}
