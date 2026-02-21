"use client"

import React, { useState } from 'react'
import axios from 'axios';

const page = () => {
  const [posts, setPosts] = useState({
    title: "",
  });


  const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosts({
      ...posts,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await axios.post("/api/posts", posts);
        alert("Post berhasil dibuat");
    } catch (error) {
        console.log("Gagal membuat post", error);
    }


}


  return (
    <div>
      <h1>Posts</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          name="title"
          onChange={handleCHange}
          value={posts.title}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default page
