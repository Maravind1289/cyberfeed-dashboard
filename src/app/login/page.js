"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-950 border border-gray-800 p-10 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-lg bg-gray-900 border border-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-gray-900 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 p-3 rounded-xl font-semibold hover:bg-blue-500">
          Sign In
        </button>

        <p className="text-gray-500 text-sm mt-5">
          Demo Login → admin / admin123
        </p>
      </form>
    </div>
  );
}




