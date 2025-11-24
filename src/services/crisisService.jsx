import api from './api';

export const getCrisisPosts = async (params = {}) => {
  const response = await api.get('/api/crisis/posts/', { params });
  return response.data;
};

export const getCrisisPost = async (id) => {
  const response = await api.get(`/api/crisis/posts/${id}/`);
  return response.data;
};

export const createCrisisPost = async (data) => {
  const response = await api.post('/api/crisis/posts/', data);
  return response.data;
};