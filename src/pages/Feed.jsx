// src/pages/Feed.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/feed");
        // res.data.data is your array of posts
        setPosts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {posts.map((post) => (
        <Link
          key={post._id}
          to={`/posts/${post._id}`}
          className="block hover:shadow-lg transition-shadow mb-4"
        >
          <PostCard
            post={post}
            onLikeToggle={(id, newCount) =>
              setPosts((prev) =>
                prev.map((x) =>
                  x._id === id ? { ...x, likeCount: newCount } : x
                )
              )
            }
          />
        </Link>
      ))}
    </div>
  );
}
