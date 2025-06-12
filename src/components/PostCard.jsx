// src/components/PostCard.jsx
import React, { useState } from "react";
import api from "../api/axios";
import { Heart } from "lucide-react";

export default function PostCard({ post, onLikeToggle }) {
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = async () => {
    const res = await api.post("/like/v1", {
      targetType: "post",
      targetId: post._id,
    });
    const updated = res.data.data.likeCount;
    setLikeCount(updated);
    if (onLikeToggle) onLikeToggle(post._id, updated);
  };

  return (
    <div className="bg-white p-4 rounded-lg mb-4 shadow">
      <h2 className="text-xl text-black">{post.title}</h2>
      <p className="text-black/80">{post.content}</p>
      {post.photoUrl?.url && (
        <img
          src={post.photoUrl.url}
          alt=""
          className="mt-2 rounded max-h-80 w-full object-cover"
        />
      )}
      <div className="mt-2 flex items-center space-x-4 text-black/80">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 hover:text-red-400"
        >
          <Heart size={16} />
          <span>{likeCount}</span>
        </button>
        <span>💬 {post.commentCount}</span>
      </div>
    </div>
  );
}
