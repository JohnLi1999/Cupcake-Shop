import axios from './util/axios-api';

export const signup = (signUpRequest) => {
  return axios.post(`/auth/signup`, signUpRequest);
};

export const login = (loginRequest) => {
  return axios.post(`/auth/login`, loginRequest);
};
