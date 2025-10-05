import React, { useEffect } from 'react';

function Callback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      console.error('Spotify auth error:', error);
      window.location.href = '/';
      return;
    }

    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  const exchangeCodeForToken = async (code) => {
    const CLIENT_ID = 'c2b820ea51594139ba5e988dbcc9dc4d';
    const REDIRECT_URI = 'http://localhost:3000/callback';

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('spotify_access_token', data.access_token);
        window.location.href = '/dashboard';
      } else {
        console.error('Failed to get access token:', data);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
        <p>Please wait while we log you in.</p>
      </div>
    </div>
  );
}

export default Callback;