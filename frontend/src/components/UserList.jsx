// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';
import { AnimatePresence } from 'framer-motion';
import { CanvasRevealEffect } from './ui/canvas-reveal-effect';
import { CardSpotlight } from './ui/card-spotlight';
import { CardSpotlightDemo } from './ui/userListCard';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getAllUsers(currentUser.email);
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-dark-text"></div>
      </div>
    );
  }

  return (
    <div className="w-full container  px-4 py-8 ">
      <h2 className="text-3xl font-normal mb-6 text-center text-dark-text">
        Cool Kids Network Users
      </h2>
      {error && (
        <p className="text-red-500 text-center bg-red-800 p-2 rounded mb-4">
          {error}
        </p>
      )}


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <CardSpotlightDemo user={user}/>
        ))}
      </div>
      {users.length === 0 && (
        <p className="text-center text-dark-text">No users found</p>
      )}
    </div>
  );
};

export default UserList;