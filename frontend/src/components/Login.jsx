// src/components/Login.js
import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { Card, CardBody } from "@nextui-org/react";


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authService.login(email);
      onLogin(); // Update the App state with the logged-in user
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-dark-text"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <Card className="w-[400px] px-6 py-3">
        <CardBody>
          <h2 className="text-xl font-normal mb-6 text-center text-dark-text">
            Welcome Back, Cool Kid!
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 pl-10 border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-text bg-dark-bg text-dark-text"
              />
              <FaEnvelope className="absolute left-3 top-4 text-dark-text" />
            </div>
            <button
              type="submit"
              className="w-full bg-dark-text text-dark-bg py-3 rounded-lg hover:bg-dark-hover transition duration-300 flex items-center justify-center"
            >
              <FaSignInAlt className="mr-2" /> Login
            </button>
          </form>
          {error && (
            <p className="mt-4 text-red-500 text-center bg-red-800 p-2 rounded">
              {error}
            </p>
          )}
        </CardBody>
      </Card>

    </div>
  );
};

export default Login;