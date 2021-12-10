import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://74cf-2804-1b3-6002-ac10-ed04-6ff1-89db-84f7.ngrok.io',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  async function(config) {
    const token = AsyncStorage.getItem("x_access_token"); 
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default api;