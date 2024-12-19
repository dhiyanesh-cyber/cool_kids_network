import React, { useState } from 'react';
import apiClient from '../services/apiClient';

const RoleUpdater = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure at least email or first & last names are provided
    if (!email && !(firstName && lastName)) {
      setError('Please provide either an email or both first and last names.');
      return;
    }

    if (!role) {
      setError('Please select a role.');
      return;
    }

    setError('');
    setMessage('');

    try {
      const payload = {
        email: email || undefined, // Send only if provided
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        role,
      };

      // Send a PUT request to the backend
      const response = await apiClient.put('/api/users/update-role', payload);
      setMessage(response.data.message || 'Role updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating the role.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-cool-blue mb-4">Update User Role</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Email (optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user's email"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cool-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">First Name (optional)</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cool-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Last Name (optional)</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cool-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cool-blue focus:outline-none"
          >
            <option value="">Select a role</option>
            <option value="Cool Kid">Cool Kid</option>
            <option value="Cooler Kid">Cooler Kid</option>
            <option value="Coolest Kid">Coolest Kid</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-cool-blue text-white py-2 rounded-lg hover:bg-cool-blue-dark transition duration-300"
        >
          Update Role
        </button>
      </form>
      {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default RoleUpdater;
