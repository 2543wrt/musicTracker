import React, { useEffect } from 'react';

export default function Callback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      console.error('Spotify authorization error:', error);
      window.location.href = '/';
      return;
    }

    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  const exchangeCodeForToken = async (code) => {
    try {
      // In a real app, this should be done through your backend
      // For now, we'll simulate storing the code and redirect to dashboard
      const response = await fetch(`https://music-tracker-psi.vercel.app/api/callback?code=${code}`);
      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('spotify_access_token', data.access_token);
        window.location.href = '/dashboard';
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      // For demo purposes, we'll just redirect to dashboard
      // In production, you'd want proper error handling
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Connecting to Spotify...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
      </div>
    </div>
  );
}