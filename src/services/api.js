import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      // Always overwrite Authorization header with the latest token
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[Auth Interceptor] Added Authorization header for:', config.url);
    } else {
      console.warn('[Auth Interceptor] No token found for:', config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);



// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('apiKey');
      localStorage.removeItem('userEmail');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (email, password) => api.post('/auth/register', { email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  generateKey: () => api.post('/auth/generate-key'),
};

export const proxyService = {
  makeRequest: (apiKey, url, method = 'GET', body = null, headers = null) => {
    return api.post('/proxy', {
      url,
      method,
      body,
      headers: headers ? JSON.stringify(headers) : null,
    }, {
      headers: {
        'X-API-Key': apiKey,
      },
    });
  },
};

export const statsService = {
  getUserStats: () => api.get('/stats/user'),
  getTodayStats: () => api.get('/stats/today'),
  getHistory: (days = 7) => api.get(`/stats/history?days=${days}`),
};

export default api;