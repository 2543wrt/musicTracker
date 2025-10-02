// src/components/Login.jsx
import React from 'react';

export default function Login() {
  const handleLogin = () => {
    window.location.href = 'https://music-tracker-psi.vercel.app/api/login';
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
