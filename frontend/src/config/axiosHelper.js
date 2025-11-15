import axios from 'axios';
// export const baseURL = "http://localhost:8080";
export const baseURL = "http://139.59.88.227:8080";
export const HttpClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default HttpClient;