import axios from './util/axios-api';
import authHeader from './util/auth-header';

export const addOrder = (user_id, orderRequest) => {
  return axios.post(`/orders/${user_id}`, orderRequest, {
    headers: authHeader(),
  });
};

export const getOrders = (user_id) => {
  return axios.get(`/orders/${user_id}`, {
    headers: authHeader(),
  });
};

/* ADMIN ONLY */

export const getAllOrders = () => {
  return axios.get(`/orders/all`, {
    headers: authHeader(),
  });
};

export const updateOrderStatus = (order_id, orderStatusRequest) => {
  return axios.put(`/orders/${order_id}`, orderStatusRequest, {
    headers: authHeader(),
  });
};
