import axios from './util/axios-api';
import authHeader from './util/auth-header';

export const upload = (file) => {
  return axios.post(`/upload`, file, {
    headers: authHeader(),
  });
};
