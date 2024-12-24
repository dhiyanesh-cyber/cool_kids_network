// src/components/Signup.js
import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { Card, CardBody } from "@nextui-org/react";


const Signup = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(email);
      setSuccess('Account created successfully!');
      setError('');
      // Redirect to login after successful signup
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <Card className="w-[400px] px-6 py-3">
        <CardBody>
          <h2 className="text-xl font-normal mb-6 text-center text-dark-text">
            Create Your Cool Account
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
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
              <FaCheckCircle className="mr-2" /> Create Account
            </button>
          </form>
          {error && (
            <p className="mt-4 text-red-500 text-center bg-red-800 p-2 rounded">
              {error}
            </p>
          )}
          {success && (
            <p className="mt-4 text-green-600 text-center bg-green-800 p-2 rounded flex items-center justify-center">
              <FaCheckCircle className="mr-2" /> {success}
            </p>
          )}

        </CardBody>
      </Card>

    </div>
  );
};

export default Signup;