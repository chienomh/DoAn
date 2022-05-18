import apiClient from './apiService';

export const createBill = params => apiClient.post(`/buy`, params);

export const getListBill = params =>
  apiClient.get(`/member/bill/${params}?sort=0`);

export const getBillDetail = params =>
  apiClient.get(`/member/bill/detail/${params}?sort=0`);

export const getCoupon = params => apiClient.get(`/coupon/${params}`);
