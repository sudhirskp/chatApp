import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api', // Ensure REACT_APP_API_BASE_URL is set in your .env file
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Handle unauthorized access
//             localStorage.removeItem('authToken');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

export const baseURL = "http://localhost:8080";
export const HttpClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default HttpClient;
