import api, { API_BASE_URL } from './api';

export const login = async (username, password) => {
  const response = await api.post('/api/accounts/auth/login/', {
    username,
    password,
  });
  return response.data;
};

export const signup = async (email, username, password1, password2) => {
  const response = await api.post('/api/accounts/auth/signup/', {
    email,
    username,
    password1,
    password2,
  });
  return response.data;
};

export const checkSession = async () => {
  try {
    const response = await api.get('/api/accounts/auth/user/');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  try {
    await api.post('/api/accounts/auth/logout/');
  } catch (error) {
    console.error('Logout error:', error);
  }
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/accounts/auth/user/');
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/api/accounts/profile/');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put('/api/accounts/profile/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const googleLogin = async (accessToken) => {
  const response = await api.post('/api/accounts/google/', {
    access_token: accessToken,
  });
  return response.data;
};

export const getGitHubLoginURL = () => {
  return `${API_BASE_URL}/accounts/github/login/`;
};

export const getGoogleLoginURL = () => {
  return `${API_BASE_URL}/accounts/google/login/`;
};

export const changePassword = async (data) => {
  const response = await api.post('/api/accounts/auth/password/change/', {
    old_password: data.old_password,
    new_password1: data.new_password1,
    new_password2: data.new_password2,
  });
  return response.data;
};