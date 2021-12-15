import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://c3df-2804-14c-87b9-b60d-c0b3-4ad1-9aff-b6a7.ngrok.io',
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