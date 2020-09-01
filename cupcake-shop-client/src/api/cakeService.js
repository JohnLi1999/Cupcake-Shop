import axios from './util/axios-api';
import authHeader from './util/auth-header';

export const getAllCakes = () => {
  return axios.get(`/cakes/all`);
};

export const addCake = (cakeRequest) => {
  return axios.post(`/cakes/one`, cakeRequest, {
    headers: authHeader(),
  });
};

export const updateCake = (id, cakeRequest) => {
  return axios.put(`/cakes/${id}`, cakeRequest, {
    headers: authHeader(),
  });
};
