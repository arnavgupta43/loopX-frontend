import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import CommentItem from "../components/CommentItem";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    (async () => {
      // 1) Fetch the full post
      const resPost = await api.get(`/post/get/${id}`);
      setPost(resPost.data.data);

      // 2) Fetch its comments
      const resComments = await api.get(`/comment/post/${id}`);
      setComments(resComments.data.data);
    })();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    const res = await api.post("/comment", {
      postId: id,
      content: newComment,
    });
    setComments([res.data.data, ...comments]);
    setNewComment("");
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      {post.photo?.url && <img src={post.photo.url} alt="" className="mb-4" />}

      <hr />

      <form onSubmit={handleComment} className="my-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Comment
        </button>
      </form>

      {comments.map((c) => (
        <CommentItem
          key={c._id}
          comment={c}
          onDelete={(cid) => setComments(comments.filter((x) => x._id !== cid))}
        />
      ))}
    </div>
  );
}
