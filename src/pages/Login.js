// src/components/Login.jsx
import React, { useState } from 'react';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication - replace with actual Spotify auth
    setTimeout(() => {
      localStorage.setItem('spotify_access_token', 'demo_token');
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login to Spotify
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <input
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Spotify Username"
              value={credentials.username}
              onChange={handleInputChange}
            />
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login with Spotify'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
