import React, { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.get("/user/me");
      setProfile(res.data.data);
    })();
  }, []);

  if (!profile || !profile.avatarUrl) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <img
        src={profile.avatarUrl.url}
        alt=""
        className="w-32 h-32 rounded-full mb-4"
      />
      <h2 className="text-xl">{profile.username}</h2>
      <p className="mb-2">{profile.name}</p>
      <p className="mb-4">{profile.bio}</p>
      <Link to="/profile/edit" className="text-blue-400">
        Edit Profile
      </Link>
    </div>
  );
}
