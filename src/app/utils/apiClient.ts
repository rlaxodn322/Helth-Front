import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // NestJS API의 URL
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default apiClient;
