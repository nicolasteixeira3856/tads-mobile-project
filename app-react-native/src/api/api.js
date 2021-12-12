import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://f8b0-2804-1b3-6002-c794-4d83-7237-f9de-8c2c.ngrok.io',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  async function(config) {
    const token = await AsyncStorage.getItem("x_access_token"); 
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