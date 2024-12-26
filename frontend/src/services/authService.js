import apiClient from './apiClient'

export const authService = {
  // Signup a new user
  signup: async email => {
    try {
      const response = await apiClient.post('/auth/signup', { email })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' }
    }
  },

  // Login user
  login: async email => {
    try {
      const response = await apiClient.post('/auth/login', { email })

      const user = response.data.user

      if (user) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem(
          'isMaintainer',
          user.isMaintainer ? 'true' : 'false'
        )
        return user
      }

      throw new Error('Login failed')
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' }
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isMaintainer')
    window.location.href = '/login'
  },

  // Get current logged-in user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('user')
  },

  // Check user role
  hasRole: requiredRole => {
    const user = authService.getCurrentUser()
    return user && user.role === requiredRole
  },

  // Check if user has access (Cooler or Coolest Kid)
  canAccessUserList: () => {
    const user = authService.getCurrentUser()
    return user && (user.role === 'Cooler Kid' || user.role === 'Coolest Kid')
  },

  // Check if the current user is a maintainer
  isMaintainer: () => {
    return localStorage.getItem('isMaintainer') === 'true'
  }
}

export default authService
