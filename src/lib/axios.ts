import axios from 'axios';

// In a real app, this would be import.meta.env.VITE_API_URL
const API_BASE_URL = '/api'; 

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for handling global errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // We will integrate toast notifications here later
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);