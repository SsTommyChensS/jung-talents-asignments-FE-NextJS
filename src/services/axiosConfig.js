import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
});

instance.interceptors.request.use(function(config) {
    const token = process.env.NEXT_PUBLIC_TOKEN;
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default instance;