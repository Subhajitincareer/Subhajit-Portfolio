import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchData = async () => {
  try {
    const response = await api.get('/posts/1');
    return response;
  } catch (error) {
    throw error;
  }
};

export const postData = async (data) => {
  try {
    const response = await api.post('/posts', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;