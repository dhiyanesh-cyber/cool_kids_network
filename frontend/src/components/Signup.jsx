// src/components/Signup.js
import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

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
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-cool-blue">
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
              className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cool-blue"
            />
            <FaEnvelope className="absolute left-3 top-4 text-cool-gray" />
          </div>
          <button
            type="submit"
            className="w-full bg-cool-blue text-white py-3 rounded-lg hover:bg-cool-blue-dark transition duration-300 flex items-center justify-center"
          >
            <FaCheckCircle className="mr-2" /> Create Account
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-500 text-center bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-4 text-green-600 text-center bg-green-100 p-2 rounded flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;