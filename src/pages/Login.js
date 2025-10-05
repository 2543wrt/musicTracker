
import React, { useEffect } from 'react';
import '../css/login.css';

function Login() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID || 'c2b820ea51594139ba5e988dbcc9dc4d';
  const REDIRECT_URI = 'http://localhost:3000/callback';
  const SCOPES = 'user-read-private user-read-email user-top-read';





  const handleLogin = () => {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: SCOPES
    });
    
    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    window.location.href = authUrl;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">
            Login to Spotify
          </h2>
          <p className="login-subtitle">Enter your credentials to continue</p>
        </div>
        <div className="login-form">
          <button
            onClick={handleLogin}
            className="login-button"
          >
            Login with Spotify
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
