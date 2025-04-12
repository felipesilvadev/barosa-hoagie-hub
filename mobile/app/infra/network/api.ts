import axios from 'axios';

import { getToken } from '~/store/token';

const API_URL = 'http://localhost:3333';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
