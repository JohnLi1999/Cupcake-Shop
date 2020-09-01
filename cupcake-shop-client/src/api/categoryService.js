import axios from './util/axios-api';
import authHeader from './util/auth-header';

export const getAllCategories = () => {
  return axios.get(`/categories/all`);
};

export const addCategory = (categoryRequest) => {
  return axios.post(`/categories/one`, categoryRequest, {
    headers: authHeader(),
  });
};
