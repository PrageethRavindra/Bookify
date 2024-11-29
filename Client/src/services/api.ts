import axios from 'axios';

// Create Axios 
const api = axios.create({
    baseURL: 'http://localhost:5062/api/',
    timeout: 5000,  
});

// Add request interceptor (optional)
api.interceptors.request.use(
    (config) => {
       
        return config;
    },
    (error) => {
        
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        // Handle responses globally here
        return response;
    },
    (error) => {
       
        if (error.response) {
            
            console.error('API error:', error.response.data);
        } else if (error.request) {
            
            console.error('Network error:', error.request);
        } else {
            
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);  
    }
);

export default api;
