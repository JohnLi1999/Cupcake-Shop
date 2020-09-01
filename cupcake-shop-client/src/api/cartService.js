import axios from './util/axios-api';
import authHeader from './util/auth-header';

export const updateAndGetCart = (user_id, cartItemList) => {
  return axios.put(`/cart/all/${user_id}`, cartItemList, {
    headers: authHeader(),
  });
};

export const addCartItem = (user_id, cake_id) => {
  return axios.post(`/cart/one/${user_id}/${cake_id}`, null, {
    headers: authHeader(),
  });
};

export const reduceCartItem = (user_id, cake_id) => {
  return axios.put(`/cart/one/${user_id}/${cake_id}`, null, {
    headers: authHeader(),
  });
};

export const deleteCartItem = (user_id, cake_id) => {
  return axios.delete(`/cart/one/${user_id}/${cake_id}`, {
    headers: authHeader(),
  });
};
