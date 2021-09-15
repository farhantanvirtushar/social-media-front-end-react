import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";

import { getUser } from "../User";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const user = getUser();

  const getPosts = async (setPosts) => {
    const res = await axios.get("api/posts/timeline/" + user._id);

    setPosts(res.data);
  };

  useEffect(() => {
    getPosts(setPosts);
  }, []);
  return (
    <div>
      <CreatePost />
      {posts.map((item) => (
        <Post key={item._id} post={item} />
      ))}
    </div>
  );
}
