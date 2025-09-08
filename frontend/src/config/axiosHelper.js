import axios from 'axios';
// export const baseURL = "http://localhost:8080";
export const baseURL = "https://chatapp-production-cac5.up.railway.app";
export const HttpClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default HttpClient;
