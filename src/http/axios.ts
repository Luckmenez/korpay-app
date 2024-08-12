import axios from "axios";
import { decodeJwt } from "../utils/decodejwt";
import { updateUser, clearUser } from '../app/reduxActions';

export const api = axios.create({
  baseURL: 'https://korpay-core-production.up.railway.app/',
  withCredentials: true
});

api.interceptors.response.use((response) => {
  if(response.config.url === '/auth/login' && response.data.auth_token) {
    localStorage.setItem('auth_token', response.data.auth_token);
    
    const decodedToken = decodeJwt(response.data.auth_token);
    updateUser(decodedToken.user);
    response.decodedToken = decodedToken
  }
  return response;
}, (error) => {
  clearUser();
  return Promise.reject(error);
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  clearUser();
  return Promise.reject(error);
})

