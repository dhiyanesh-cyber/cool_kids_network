import React, { useState } from 'react';
import apiClient from '../services/apiClient';
import { Card, CardBody } from "@nextui-org/react";

const RoleUpdater = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [useName, setUseName] = useState(false); // State to toggle between email and name

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!useName && !email) {
      setError('Please provide an email.');
      return;
    }

    if (useName && !(firstName && lastName)) {
      setError('Please provide both first and last names.');
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
        email: useName ? undefined : email,
        firstName: useName ? firstName : undefined,
        lastName: useName ? lastName : undefined,
        role,
      };

      const response = await apiClient.put('/api/users/update-role', payload);
      setMessage(response.data.message || 'Role updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating the role.');
    }
  };

  return (
    <div className='min-h-[calc(100vh-200px)] flex items-center justify-center'>
      <Card className='w-[400px] px-6 py-3'>
        <CardBody className=" ">
          <h2 className="text-2xl font-bold text-center text-white mb-4">Update User Role</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!useName ? (
              <div>
                <label className="block mb-2 font-medium text-white">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter user's email"
                  className="w-full px-4 py-3 pl-5 border border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dark-text bg-dark-bg text-dark-text "
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block mb-2 font-medium text-white">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 pl-5 border border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dark-text bg-dark-bg text-dark-text"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-white">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 pl-5 border border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-dark-text bg-dark-bg text-dark-text"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block mb-2 font-medium text-white">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-dark-border rounded-lg bg-dark-input text-white focus:ring-2 focus:ring-cool-blue focus:outline-none"
              >
                <option value="">Select a role</option>
                <option value="Cool Kid">Cool Kid</option>
                <option value="Cooler Kid">Cooler Kid</option>
                <option value="Coolest Kid">Coolest Kid</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => setUseName(!useName)}
              className="w-full  text-white py-2 rounded-lg"
            >
              {useName ? 'Identify by Email' : 'Identify by Name'}
            </button>
            <button
              type="submit"
              className="w-full bg-dark-text text-dark-bg py-3 rounded-lg hover:bg-dark-hover transition duration-300 flex items-center justify-center"
            >
              Update Role
            </button>
          </form>
          {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </CardBody>
      </Card>
    </div>
  );
};

export default RoleUpdater;