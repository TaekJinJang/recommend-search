import axios from 'axios';
import {BASE_URL} from 'constants/api';

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    config => {
        console.info('calling api');
        return config;
    },
    error => {
        return error;
    }
);
