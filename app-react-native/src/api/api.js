import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://7813-2804-1b3-6002-c794-c85a-c145-1d3d-45b6.ngrok.io',
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