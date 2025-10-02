// src/components/Login.jsx
import React from 'react';

export default function Login() {
  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:4000/login';
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Login with Spotify
    </button>
  );
}
