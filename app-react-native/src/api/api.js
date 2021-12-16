import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyConstants from '../core/constants';

const api = axios.create({
  baseURL: MyConstants.API_URL,
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