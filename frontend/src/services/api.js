import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDashboardStats = () => api.get('/dashboard/stats');
export const getPullRequests = () => api.get('/pull-requests');
export const getPullRequestById = (id) => api.get(`/pull-requests/${id}`);
export const getReviewsByPrId = (id) => api.get(`/reviews/${id}`);

export default api;
