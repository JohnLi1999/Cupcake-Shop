import * as actionTypes from '../actionTypes';

export const orderLoading = (orderList) => {
  return {
    type: actionTypes.ORDER_LOADING,
    orderList,
  };
};
