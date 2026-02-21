"use client";

import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      await axios.post("/api/login", { email });

      window.location.href = "/dashboard";
    } catch (error) {
      console.log("Login gagal", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}