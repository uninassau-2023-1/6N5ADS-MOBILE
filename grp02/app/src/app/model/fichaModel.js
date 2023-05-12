import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://172.23.224.1:3000/api/ficha',
});