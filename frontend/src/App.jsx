// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FaUser, FaUsers, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import authService from './services/authService';
import { NextUIProvider } from "@nextui-org/react";
import RoleUpdater from './components/RoleUpdater';
import Navbar from './components/nav/NavBar';
import HomePage from './components/Homepage';


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
        <div className="min-h-screen bg-dark-bg bg-opacity-90 text-dark-text flex flex-col">
          <Navbar user={user} onLogout={handleLogout} />
          <div className="container mx-auto min-h-svh flex-grow p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login onLogin={() => setUser(authService.getCurrentUser())} />} />
              <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
              <Route path='/update-role' element={<RoleUpdater />} />
              <Route
                path="/users"
                element={
                  user && (user.role === 'Cooler Kid' || user.role === 'Coolest Kid' || authService.isMaintainer()) ? (
                    <UserList />
                  ) : (
                    <Navigate to="/profile" />
                  )
                }
              />
            </Routes>
          </div>
          <footer className=" text-white p-4 text-center bg-dark-card bg-opacity-70 backdrop-blur-lg">
            <p>© 2024 Cool Kids Network. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;