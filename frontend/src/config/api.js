import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';


let urldev ='http://localhost:5038/api';
//let urlprod = 'http://localhost:8080/api';
export const api = axios.create({
    baseURL: urldev,
    headers: {
        'Content-Type': 'application/json'
    }
});


api.interceptors.request.use(
    (config) => {

        const token = useAuthStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);