import apiClient from './apiService';

export const getListProduct = () => apiClient.get(`/product/home`);

export const getProductDetailAPI = id => apiClient.get(`/product/${id}`);

export const listProduct = params =>
  apiClient.get(
    `/product/filter?branch=${params.branch ? params.branch : ''}&color=${
      params.color ? params.color : ''
    }&gender=${params.gender ? params.gender : ''}&material=${
      params.material ? params.material : ''
    }&offset=${params.offset ? params.offset : ''}&pageNumber=${
      params.branch ? params.branch : ''
    }&pageSize=${params.pageSize ? params.pageSize : ''}&product_name=${
      params.product_name ? params.product_name : ''
    }&sort=0&style=${params.style ? params.style : ''}&technology=${
      params.technology ? params.technology : ''
    }`,
  );

export const getReview = id => apiClient.get(`/review/list?productId=${id}`);

export const actionReview = params =>
  apiClient.post('/member/review/add', params);
