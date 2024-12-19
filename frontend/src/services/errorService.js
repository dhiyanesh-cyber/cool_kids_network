// src/services/errorService.js
export const errorService = {
    // Generic error handler
    handleError: (error) => {
      let errorMessage = 'An unexpected error occurred';
  
      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = error.response.data.message || 
                       `Error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server';
      } else if (error.message) {
        // Something happened in setting up the request
        errorMessage = error.message;
      }
  
      // Log error (can be replaced with more sophisticated logging)
      console.error('Error:', errorMessage);
  
      return errorMessage;
    },
  
    // Validation error handler
    validateEmail: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) return 'Email is required';
      if (!emailRegex.test(email)) return 'Invalid email format';
      return null;
    }
  };
  
  export default errorService;