import api from './api';

// ============ CRISIS POSTS ============
export const getCrisisPosts = async (params = {}) => {
  const response = await api.get('/api/crisis/posts/', { params });
  return response.data;
};

export const getCrisisPost = async (id) => {
  const response = await api.get(`/api/crisis/posts/${id}/`);
  return response.data;
};

export const createCrisisPost = async (formData) => {
  const response = await api.post('/api/crisis/posts/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateCrisisPost = async (id, formData) => {
  const response = await api.put(`/api/crisis/posts/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteCrisisPost = async (id) => {
  const response = await api.delete(`/api/crisis/posts/${id}/`);
  return response.data;
};

export const getMyCrisisPosts = async () => {
  const response = await api.get('/api/crisis/posts/my_posts/');
  return response.data;
};

export const approveCrisisPost = async (id) => {
  const response = await api.post(`/api/crisis/posts/${id}/approve/`);
  return response.data;
};

export const rejectCrisisPost = async (id) => {
  const response = await api.post(`/api/crisis/posts/${id}/reject/`);
  return response.data;
};

// ============ VOLUNTEERS ============
export const applyAsVolunteer = async (crisisId, message) => {
  const response = await api.post('/api/volunteers/apply/', {
    crisis_post: crisisId,
    message,
  });
  return response.data;
};

export const getMyVolunteerApplications = async () => {
  const response = await api.get('/api/volunteers/my-applications/');
  return response.data;
};

export const getCrisisVolunteers = async (crisisId) => {
  const response = await api.get(`/api/volunteers/crisis/${crisisId}/`);
  return response.data;
};

export const approveVolunteer = async (applicationId) => {
  const response = await api.post(`/api/volunteers/${applicationId}/approve/`);
  return response.data;
};

export const rejectVolunteer = async (applicationId) => {
  const response = await api.post(`/api/volunteers/${applicationId}/reject/`);
  return response.data;
};

// ============ DONATIONS ============
export const createMoneyDonation = async (data) => {
  const response = await api.post('/api/donations/money/create/', data);
  return response.data;
};

export const createGoodsDonation = async (data) => {
  const response = await api.post('/api/donations/goods/create/', data);
  return response.data;
};

export const getCrisisMoneyDonations = async (crisisId) => {
  const response = await api.get(`/api/donations/crisis/${crisisId}/money/`);
  return response.data;
};

export const getCrisisGoodsDonations = async (crisisId) => {
  const response = await api.get(`/api/donations/crisis/${crisisId}/goods/`);
  return response.data;
};

export const getCrisisDonationSummary = async (crisisId) => {
  const response = await api.get(`/api/donations/crisis/${crisisId}/summary/`);
  return response.data;
};

export const getMyDonations = async () => {
  const response = await api.get('/api/donations/my-donations/');
  return response.data;
};

// ============ UPDATES & COMMENTS ============
export const createCrisisUpdate = async (formData) => {
  const response = await api.post('/api/updates/create/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getCrisisUpdates = async (crisisId) => {
  const response = await api.get(`/api/updates/crisis/${crisisId}/`);
  return response.data;
};

export const getCrisisUpdate = async (updateId) => {
  const response = await api.get(`/api/updates/${updateId}/`);
  return response.data;
};

export const updateCrisisUpdate = async (updateId, formData) => {
  const response = await api.put(`/api/updates/${updateId}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteCrisisUpdate = async (updateId) => {
  const response = await api.delete(`/api/updates/${updateId}/`);
  return response.data;
};

export const getMyUpdates = async () => {
  const response = await api.get('/api/updates/my-updates/');
  return response.data;
};

export const createComment = async (updateId, text) => {
  const response = await api.post('/api/updates/comment/create/', {
    update: updateId,
    text,
  });
  return response.data;
};

export const getUpdateComments = async (updateId) => {
  const response = await api.get(`/api/updates/${updateId}/comments/`);
  return response.data;
};

export const updateComment = async (commentId, text) => {
  const response = await api.put(`/api/updates/comment/${commentId}/`, { text });
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/api/updates/comment/${commentId}/`);
  return response.data;
};

export const getMyComments = async () => {
  const response = await api.get('/api/updates/my-comments/');
  return response.data;
};