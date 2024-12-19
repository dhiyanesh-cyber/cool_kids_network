// src/services/authService.js
import apiClient from './apiClient';

export const authService = {
  // Signup a new user
  signup: async (email) => {
    try {
      const response = await apiClient.post('/auth/signup', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  },

  // Login user
  login: async (email) => {
    try {

      const response = await apiClient.post('/auth/login', { email });

      if (response.data.user) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      }

      throw new Error('Login failed');
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Get current logged-in user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },

  // Check user role
  hasRole: (requiredRole) => {
    const user = authService.getCurrentUser();
    return user && user.role === requiredRole;
  },

  // Check if user has access (Cooler or Coolest Kid)
  canAccessUserList: () => {
    const user = authService.getCurrentUser();
    return user &&
      (user.role === 'Cooler Kid' || user.role === 'Coolest Kid');
  }
};

export default authService;