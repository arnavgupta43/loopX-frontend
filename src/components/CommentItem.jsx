import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function CommentItem({ comment, onDelete, onUpdate }) {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    await api.delete(`/comments/${comment._id}`);
    if (onDelete) onDelete(comment._id);
  };

  return (
    <div className="bg-white/10 p-3 rounded mb-2">
      <p className="text-white"><strong>{comment.author.username}</strong> {comment.content}</p>
      {user?._id === comment.author._id && (
        <div className="flex space-x-2">
          <button onClick={handleDelete} className="text-red-300 text-sm">Delete</button>
        </div>
      )}
    </div>
  );
}
