import axios from 'axios';

// Create an Axios instance with the base URL for your API
const api = axios.create({
    baseURL: 'http://localhost:5062/api/',  // Update to your actual backend URL
    timeout: 5000,  // Optional: set a timeout in milliseconds (5 seconds in this case)
});

// Add request interceptor (optional)
api.interceptors.request.use(
    (config) => {
        // Optionally add authentication tokens or headers here if needed
        // Example:
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        // Handle request error (e.g., logging)
        return Promise.reject(error);
    }
);

// Add response interceptor (optional)
api.interceptors.response.use(
    (response) => {
        // Any logic to handle the response, if needed
        return response;
    },
    (error) => {
        // Handle errors globally (e.g., show user-friendly messages)
        if (error.response) {
            // Server responded with a status code outside of the 2xx range
            console.error('API error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network error:', error.request);
        } else {
            // Other errors (e.g., setup issues)
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);  // Forward the error to your calling code
    }
);

export default api;
