
// src/services/storageService.js
export const storageService = {
    // Set item in local storage
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to local storage:', error);
        }
    },

    // Get item from local storage
    getItem: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from local storage:', error);
            return null;
        }
    },

    // Remove item from local storage
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from local storage:', error);
        }
    },

    // Clear all local storage
    clear: () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing local storage:', error);
        }
    }
};

export default storageService;