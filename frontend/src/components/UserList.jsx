// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import { FaUser, FaGlobe, FaEnvelope, FaTag } from 'react-icons/fa';
import authService from '../services/authService';
import userService from '../services/userService';

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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-dark-text">
        Cool Kids Network Users
      </h2>
      {error && (
        <p className="text-red-500 text-center bg-red-800 p-2 rounded mb-4">
          {error}
        </p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-dark-card rounded-xl shadow-lg p-6 transform transition hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-dark-bg rounded-full flex items-center justify-center text-dark-text text-2xl mr-4">
                {user.firstName[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-text">
                  {user.firstName} {user.lastName}
                </h3>
                {currentUser.role === 'Coolest Kid' && (
                  <p className="text-sm text-dark-text">{user.email}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaGlobe className="mr-2 text-dark-text" />
                <span className="font-medium text-dark-text">{user.country}</span>
              </div>
              {currentUser.role === 'Coolest Kid' && (
                <div className="flex items-center">
                  <FaTag className="mr-2 text-dark-text" />
                  <span className="font-medium text-dark-text">{user.role}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {users.length === 0 && (
        <p className="text-center text-dark-text">No users found</p>
      )}
    </div>
  );
};

export default UserList;