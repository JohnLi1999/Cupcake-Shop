import axios from './util/axios-api';
import authHeader from './util/auth-header';

export const getCurrentUser = () => {
  return axios.get(`/users/me`, { headers: authHeader() });
};

export const updateUserInfo = (id, userInfoUpdateRequest) => {
  return axios.put(`/users/update_info/${id}`, userInfoUpdateRequest, {
    headers: authHeader(),
  });
};

export const updateUserPassword = (id, userPasswordUpdateRequest) => {
  return axios.put(`/users/update_password/${id}`, userPasswordUpdateRequest, {
    headers: authHeader(),
  });
};

/* ADMIN ONLY */

export const resetUserPassword = (id, userPasswordResetRequest) => {
  return axios.put(`/users/reset_password/${id}`, userPasswordResetRequest, {
    headers: authHeader(),
  });
};

export const deleteUser = (id) => {
  return axios.delete(`/users/${id}`, {
    headers: authHeader(),
  });
};

export const getAllUsers = () => {
  return axios.get(`/users/all`, {
    headers: authHeader(),
  });
};
