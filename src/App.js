import React, { useState, useEffect } from 'react';
import './App.css';
import { Login, Dashboard, Callback } from './components';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check URL path
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    if (path === '/callback' || urlParams.get('code')) {
      setCurrentPage('callback');
    } else if (path === '/dashboard') {
      setCurrentPage('dashboard');
    } else {
      // Check if user is already authenticated
      const token = localStorage.getItem('spotify_access_token');
      if (token) {
        setIsAuthenticated(true);
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('login');
      }
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'callback':
        return <Callback />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Music Tracker</h1>
              <p className="text-gray-600 mb-8">Track your Spotify listening habits</p>
              <Login />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
