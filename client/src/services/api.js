import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add bearer token to requests if available in LocalStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Projects APIs
export const fetchProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// Contact APIs
export const submitContact = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

export const fetchContacts = async () => {
  const response = await api.get('/contact');
  return response.data;
};

// Admin Auth APIs
export const adminLogin = async (password) => {
  const response = await api.post('/admin/login', { password });
  return response.data;
};

export default api;
