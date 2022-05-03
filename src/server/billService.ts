import apiClient from './apiService';

export const createBill = params => apiClient.post(`/member/buy`, params);
