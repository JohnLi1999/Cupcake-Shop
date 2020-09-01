import * as actionTypes from '../actionTypes';

export const userLoadingAll = (users) => {
  return {
    type: actionTypes.USER_LOADING_ALL,
    users,
  };
};

export const userDelete = (id) => {
  return {
    type: actionTypes.USER_DELETE,
    id,
  };
};

export const orderLoadingAll = (orders) => {
  return {
    type: actionTypes.ORDER_LOADING_ALL,
    orders,
  };
};

export const orderStatusUpdate = (orderId, newStatus) => {
  return {
    type: actionTypes.ORDER_STATUS_UPDATE,
    orderId,
    newStatus,
  };
};
