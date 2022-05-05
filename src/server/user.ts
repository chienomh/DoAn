import apiClient from './apiService';

export const changePassword = params =>
  apiClient.get(
    `/user/change-password?newPassword=${params.newPassword}&oldPassword=${params.oldPassword}&username=${params.username}`,
  );

export const changeProfile = params =>
  apiClient.put(`/member/user/modified`, params);
