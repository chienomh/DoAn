import apiClient from './apiService';

export const sendMessAPI = params => apiClient.post(`/contact/add`, params);
