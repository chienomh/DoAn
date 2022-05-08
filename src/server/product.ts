import apiClient from './apiService';

export const getListProduct = () => apiClient.get(`/product/home`);

export const getProductDetailAPI = id => apiClient.get(`/product/${id}`);

export const listProduct = params =>
  apiClient.get(
    `/product/filter?branch=${
      params.branch !== -1 ? params.branch : ''
    }&color=${params.color !== -1 ? params.color : ''}&gender=${
      params.gender !== -1 ? params.gender : ''
    }&material=${params.material !== -1 ? params.material : ''}&offset=${
      params.offset !== -1 ? params.offset : ''
    }&pageNumber=1&pageSize=1&product_name=${
      params.product_name ? params.product_name : ''
    }&sort=0&style=${params.style !== -1 ? params.style : ''}&technology=${
      params.technology !== -1 ? params.technology : ''
    }`,
  );

export const getReview = id => apiClient.get(`/review/list?productId=${id}`);

export const actionReview = params =>
  apiClient.post('/member/review/add', params);
