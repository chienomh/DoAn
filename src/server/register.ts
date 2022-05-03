import apiClient from './apiService';

export const registerAPI = params => apiClient.post('/user/add', params);

export const loginAPI = params =>
  apiClient.post(
    `/login?password=${params.password}&username=${params.username}`,
  );

export const getInforAPI = () => apiClient.get(`/member/me`);

export const getDetailUser = params => apiClient.get(`/admin/user/${params}`);
