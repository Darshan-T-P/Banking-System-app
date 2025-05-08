const API_URL = 'http://localhost:5000/api/users';
const API_URL_T = 'http://localhost:5000/api/transactions'; // Transaction API URL
import axios from 'axios';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

// Auth Services
export const authService = {
    // Sign up new user
    signUp: async (userData) => {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    // Sign in existing user
    signIn: async (credentials) => {
        const response = await fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return handleResponse(response);
    }
};

// User Profile Services
export const userService = {
    // Get user profile
    getProfile: async (userId) => {
        const response = await fetch(`${API_URL}/profile/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await fetch(`${API_URL}/profile/${userId}`);
            return handleResponse(response);
        } catch (error) {
            console.error('Get profile error:', error);
            throw new Error(error.message || 'Failed to fetch profile');
        }
    },

    // Update user profile
    updateProfile: async (userId, updateData) => {
        try {
            const response = await fetch(`${API_URL}/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Update profile error:', error);
            throw new Error(error.message || 'Failed to update profile');
        }
    },

    // Delete user account
    deleteAccount: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/delete/${userId}`, {
                method: 'DELETE'
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Delete account error:', error);
            throw new Error(error.message || 'Failed to delete account');
        }
    }
    
};

export const getTransactionHistory = async (accountId) => {
    try {
      const response = await axios.get(`${API_URL_T}/${accountId}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  };
  
  // Create a new transaction
  export const createTransaction = async (transactionData) => {
    try {
      const response = await axios.post(`${API_URL_T}/create`, transactionData);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  };