import * as actionTypes from '../actionTypes';

export const cartLoadingAll = (cart) => {
  return {
    type: actionTypes.CART_LOADING_ALL,
    cart,
  };
};

export const cartClear = () => {
  return {
    type: actionTypes.CART_CLEAR,
  };
};

export const cartAddItem = (cakeId) => {
  return {
    type: actionTypes.CART_ADD_ITEM,
    cakeId,
  };
};

export const cartReduceItem = (cakeId) => {
  return {
    type: actionTypes.CART_REDUCE_ITEM,
    cakeId,
  };
};

export const cartDeleteItem = (cakeId) => {
  return {
    type: actionTypes.CART_DELETE_ITEM,
    cakeId,
  };
};
