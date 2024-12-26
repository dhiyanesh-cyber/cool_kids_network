// src/services/userService.js
import apiClient from './apiClient'

export const userService = {
  // Get current user's profile
  getCurrentUserProfile: async userEmail => {
    try {
      const response = await apiClient.get('/user/me', {
        params: { email: userEmail }
      })

      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user profile' }
    }
  },

  // Get list of users based on role
  getAllUsers: async userEmail => {
    try {
      const response = await apiClient.get('/user/all', {
        params: { email: userEmail }
      })

      return response.data
    } catch (error) {
      console.log(error)

      throw error.response?.data || { message: 'Failed to fetch users' }
    }
  },

  // Update user role (for maintainers/admins)
  updateUserRole: async userData => {
    try {
      const response = await apiClient.post('/user/update-role', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user role' }
    }
  },

  // Utility function to format user data
  formatUserData: user => {
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      country: user.country,
      role: user.role,
      createdAt: new Date(user.createdAt).toLocaleDateString()
    }
  },

  // Search or filter users (if backend supports)
  searchUsers: async searchTerm => {
    try {
      const response = await apiClient.get(`/user/search?term=${searchTerm}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'User search failed' }
    }
  }
}

export default userService
