// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FaHome, FaUser, FaUsers, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import authService from './services/authService';
import { NextUIProvider } from "@nextui-org/react";


function App() {
  const [user, setUser] = useState(authService.getCurrentUser());

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setUser(null); // Clear user state
  };

  // Listen for changes in localStorage
  useEffect(() => {
    const updateUserFromStorage = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    };

    window.addEventListener('storage', updateUserFromStorage);

    return () => {
      window.removeEventListener('storage', updateUserFromStorage);
    };
  }, []);

  return (
    <NextUIProvider className='dark'>
      <Router>
        <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col">
          <nav className="bg-dark-card text-white p-4 shadow-md border-b border-dark-border">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold flex items-center">
                <FaHome className="mr-2" /> Cool Kids Network
              </Link>
              <ul className="flex space-x-4 items-center">
                {!user ? (
                  <>
                    <li>
                      <Link to="/signup" className="flex items-center hover:bg-dark-hover px-3 py-2 rounded transition">
                        <FaUserPlus className="mr-2" /> Signup
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="flex items-center hover:bg-dark-hover px-3 py-2 rounded transition">
                        <FaSignInAlt className="mr-2" /> Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/profile" className="flex items-center hover:bg-dark-hover px-3 py-2 rounded transition">
                        <FaUser className="mr-2" /> Profile
                      </Link>
                    </li>
                    {(user.role === 'Cooler Kid' || user.role === 'Coolest Kid') && (
                      <li>
                        <Link to="/users" className="flex items-center hover:bg-dark-hover px-3 py-2 rounded transition">
                          <FaUsers className="mr-2" /> User List
                        </Link>
                      </li>
                    )}
                    <li>
                      <button onClick={handleLogout} className="flex items-center hover:bg-red-600 px-3 py-2 rounded transition">
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
          <div className="container mx-auto min-h-svh flex-grow p-6">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/profile" /> : <Navigate to="/login" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login onLogin={() => setUser(authService.getCurrentUser())} />} />
              <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
              <Route
                path="/users"
                element={
                  user && (user.role === 'Cooler Kid' || user.role === 'Coolest Kid') ? (
                    <UserList />
                  ) : (
                    <Navigate to="/profile" />
                  )
                }
              />
            </Routes>
          </div>
          <footer className="bg-dark-card text-white p-4 text-center">
            <p>© 2024 Cool Kids Network. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;