import apiClient from './apiService';

export const registerAPI = params => apiClient.post('/user/add', params);

export const loginAPI = params =>
  apiClient.post(
    `/login?username=${params.username}&password=${params.password}`,
  );
