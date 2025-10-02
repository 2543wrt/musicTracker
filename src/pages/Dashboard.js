import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (!token) {
      window.location.href = '/';
      return;
    }

    fetchUserData(token);
    fetchTopTracks(token);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchTopTracks = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTopTracks(data.items || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('spotify_access_token');
    window.location.href = '/';
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Music Tracker Dashboard</h1>
        <button 
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      {user && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user.display_name}!</h2>
          <p className="text-gray-600">Followers: {user.followers?.total || 0}</p>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold mb-4">Your Top Tracks</h3>
        {topTracks.length > 0 ? (
          <div className="grid gap-4">
            {topTracks.map((track, index) => (
              <div key={track.id} className="flex items-center p-4 bg-gray-100 rounded">
                <span className="text-lg font-bold mr-4">{index + 1}</span>
                {track.album?.images?.[0] && (
                  <img 
                    src={track.album.images[0].url} 
                    alt={track.name}
                    className="w-16 h-16 rounded mr-4"
                  />
                )}
                <div>
                  <h4 className="font-semibold">{track.name}</h4>
                  <p className="text-gray-600">{track.artists?.map(artist => artist.name).join(', ')}</p>
                  <p className="text-sm text-gray-500">{track.album?.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No top tracks found.</p>
        )}
      </div>
    </div>
  );
}